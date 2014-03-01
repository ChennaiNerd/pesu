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
            .when('/:id', {
                templateUrl: 'scripts/views/rooms/show.html',
                controller: 'RoomShowController'
            })

            .otherwise({redirectTo: function() { return '/'; }});
    })
   .constant('version', '0.1')
   .constant('fbUrl', 'https://pesu.firebaseio.com')
   .constant('fbRef', new Firebase('https://pesu.firebaseio.com'))
   .constant('peer', new Peer({key: 'gtutmmh453tyb9'}));

angular.module('myApp')
    .run(function($rootScope) {
    });


angular.module('myApp')
    .controller('MainController',
        function($scope, peer, $firebase, fbUrl, $location) {

    $scope.startSession = function (roomName) {
        if (!roomName) {
            return alert('Please enter room name');
        }
        $scope.creating = true;

        // Add room
        var ref = new Firebase(fbUrl + '/rooms');
        $scope.rooms = $firebase(ref);
        $scope.rooms.$add({name: roomName}).then(function(ref) {
            $scope.creating = false;
            $location.path('/' + ref.name());
            return;
        });
    }
});
