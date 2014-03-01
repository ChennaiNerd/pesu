angular.module('myApp').controller('HeaderShowController',
        function($scope, $rootScope, $location, $firebase, fbUrl) {

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
});
