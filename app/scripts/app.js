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
                controller: 'HeaderShowController'
            })
            .when('/:id', {
                templateUrl: 'scripts/views/rooms/show.html',
                controller: 'RoomShowController'
            })

            //isAuthenticated is set below in the .run() command
            .otherwise({redirectTo: function() { return isAuthenticated? '/app' : '/'; }});
    })
   .constant('version', '0.1')
   .constant('fbUrl', 'https://pesu.firebaseio.com')
   .constant('fbRef', new Firebase('https://pesu.firebaseio.com'))
   .constant('peer', new Peer({key: 'gtutmmh453tyb9'}));

angular.module('myApp')

    /** AUTHENTICATION
    ***************/
    .run(function($rootScope) {
    })

    /** ROOT SCOPE AND UTILS
    *************************/
    .run(['$rootScope', '$location', '$log', function($rootScope, $location, $log) {
        $rootScope.$log = $log;

        $rootScope.keypress = function(key, $event) {
            $rootScope.$broadcast('keypress', key, $event);
        };

    }]);

angular.module('myApp').controller('MainController', function($scope, peer) {

    $scope.startSession = function () {
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        });
    }
});
