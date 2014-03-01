angular.module('myApp').controller('HeaderShowController',
        function($scope, $rootScope, $location, $firebase,
                fbUrl, $anchorScroll, $cookieStore) {

    var ref = new Firebase(fbUrl + '/rooms');
    $scope.rooms = $firebase(ref);
    $scope.deleteRoom = function() {
        if (!confirm('Do you want to delete the room?')) {
            return;
        }

        // Remove the room
        $scope.rooms.$remove($rootScope.roomId);
        $rootScope.onair = false;
        $rootScope.roomId = $rootScope.roomName = null;
        $location.path('/');
    };

    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }

    $scope.changeName = function () {
        var name = prompt('Please enter your name');
        if (name) {
            $rootScope.userName = name;
            $cookieStore.put('userName', userName);
        }
    }

});
