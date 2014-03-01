angular.module('myApp').controller('RoomShowController',
        function($scope, $rootScope, $firebase, $location, $routeParams, fbUrl) {

    if ($routeParams.id) {
        $scope.roomId = $routeParams.id;
        $rootScope.roomId = $routeParams.id;
        $rootScope.onair = !!$scope.roomId
    } else {
        $location.path('/');
        return;
    }

    $scope.roomId = $routeParams.id;
    var ref = new Firebase(fbUrl + '/rooms/' + $scope.roomId);
    $scope.room = $firebase(ref).then(function(room) {
        console.log(room);
    });

});