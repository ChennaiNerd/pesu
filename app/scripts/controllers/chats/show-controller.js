angular.module('myApp').controller('ChatShowController',
        function($scope, $rootScope, $routeParams, $firebase, fbUrl) {

    $scope.roomId = $routeParams.id;
    var ref = new Firebase(fbUrl + '/rooms/' + $scope.roomId + '/messages');
    $scope.messages = $firebase(ref);

    $scope.addMessage = function(e) {
        if (e.keyCode != 13) {
            return;
        };
        $scope.messages.$add({ body: $scope.msg, from: $rootScope.userName });
        $scope.msg = '';
    }

});
