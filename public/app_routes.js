angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.otherwise('/home');
    $routeProvider
        // home page
        .when('/home', {
            templateUrl: 'modules/home/views/home.html',
            controller: 'HomeController',
            controllerAs: "home"
        })
        .when('/trail', {
            templateUrl: 'modules/trail/views/trail.html',
            controller: 'TrailController',
            controllerAs: "trail"
        })

        $locationProvider.html5Mode(true);

    }]);
