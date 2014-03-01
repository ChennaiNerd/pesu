navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia;

//
// Starting point of the application
//
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'firebase',
    //'ui.bootstrap',
    //'dialogs',
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'scripts/views/index.html',
                controller: 'MainController'
            })
            .when('/rooms/:id', {
                templateUrl: 'scripts/views/rooms/show.html',
                controller: 'RoomShowController'
            })

            .otherwise({redirectTo: function() { return '/'; }});
    })
   .constant('version', '0.1')
   .constant('fbUrl', 'https://pesu.firebaseio.com')
   .constant('fbRef', new Firebase('https://pesu.firebaseio.com'))
   .constant('peer',
        new Peer({
            key: 'gtutmmh453tyb9',
            config: {'iceServers': [
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
              ]} /* Sample servers, please use appropriate ones */
        }));

angular.module('myApp')
    .run(function($rootScope) {
    });


angular.module('myApp')
    .controller('MainController',
        function($scope, $rootScope, peer, $firebase, fbUrl, $location) {

    peer.on('open', function(){
        $rootScope.peerId = peer.id;
        console.log(peer.id);
    });

    $scope.startSession = function (roomName) {
        if (!roomName) {
            return alert('Please enter room name');
        }
        $scope.creating = true;

        // Add room
        var ref = new Firebase(fbUrl + '/rooms');
        $scope.rooms = $firebase(ref);
        $scope.rooms.$add({name: roomName, owner: $rootScope.peerId }).then(function(ref) {
            $scope.creating = false;
            $location.path('/rooms/' + ref.name());
            return;
        });
    }
});
