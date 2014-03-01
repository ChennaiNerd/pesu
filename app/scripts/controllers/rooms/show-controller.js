angular.module('myApp').controller('RoomShowController',
        function($scope, $rootScope, $firebase, $location, $routeParams, fbUrl) {

    if ($routeParams.id) {
        $scope.roomId = $routeParams.id;
    } else {
        $location.path('/');
        return;
    }

    $scope.roomId = $routeParams.id;
    var ref = new Firebase(fbUrl + '/rooms');
    $scope.room = $firebase(ref);
    $scope.addRoom = function() {
        $scope.rooms.$add({name: $scope.roomName});
        $scope.roomName = "";
    };
    $scope.removeRoom = function(id) {
        $scope.rooms.$remove(id);
    };
});