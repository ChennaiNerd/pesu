angular.module('myApp').controller('RoomShowController',
        function($scope, $rootScope, $firebase, $location, $routeParams, fbUrl) {

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
        }
    });

});