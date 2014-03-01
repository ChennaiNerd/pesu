angular.module('myApp').controller('RoomShowController',
        function($scope, $rootScope, $firebase, $location,
                 $routeParams, fbUrl, peer, $window, $cookieStore) {

    if ($routeParams.id) {
        $scope.roomId = $routeParams.id;
        $rootScope.roomId = $routeParams.id;
        $rootScope.onair = !!$scope.roomId;
    } else {
        $location.path('/');
        return;
    }

    $scope.roomId = $routeParams.id;
    var ref = new Firebase(fbUrl + '/rooms/' + $scope.roomId);
    $scope.room = $firebase(ref);
    $scope.room.$on('loaded', function() {
        $rootScope.roomName = $scope.room.name;
        if (!$rootScope.roomName) {
            $rootScope.roomId = null;
            $rootScope.onair = false;
            $location.path('/');
            return;
        }

        // Get user name
        var userName = $cookieStore.get('userName');
        if (userName) {
            $rootScope.userName = userName;
        } else {
            if (peer.id === $scope.room.owner) {
                $rootScope.userName = 'Guest 1';
            } else {
                $rootScope.userName = 'Guest 2';
            }
        }

        // Create user media
        step1();

    });

    // Receiving a call
    peer.on('call', function(call){
        // Answer the call automatically (instead of prompting user) for demo purposes
        call.answer($window.localStream);
        step3(call);
    });

    peer.on('error', function(err){
        alert(err.message);
        // Return to step 2 if error occurs
        step2();
    });

    $scope.makeCall = function(room){
        // Initiate a call!
        var call = peer.call(room.owner, window.localStream);
        step3(call);
    }

    $scope.endCall = function() {
        window.existingCall.close();
        step2();
    }

    $scope.retry = function () {
        angular.element('#step1-error').hide();
        step1();
    }

    function step1() {
        // Get audio/video stream
        navigator.getUserMedia({audio: true, video: true},
            function(stream) {
                // Set your video displays
                angular.element('#my-video').prop('src', URL.createObjectURL(stream));
                window.localStream = stream;
                step2();

                // connect from other end.
                if (peer.id !== $scope.room.owner) {
                    $scope.makeCall($scope.room);
                }

            }, function(err){
                  console.log('Failed to get local stream', err);
                // $('#step1-error').show();
            });
    }


    function step2 () {
        // $('#step1, #step3').hide();
        // $('#step2').show();
    }

    function step3 (call) {
        // Hang up on an existing call if present
        if ($window.existingCall) {
            $window.existingCall.close();
        }

        // Wait for stream on the call, then set peer video display
        call.on('stream', function(stream){
            angular.element('#their-video').prop('src', URL.createObjectURL(stream));
        });

        // UI stuff
        $window.existingCall = call;
        call.on('close', step2);
        angular.element('#step1, #step2').hide();
        angular.element('#step3').show();
    }

});