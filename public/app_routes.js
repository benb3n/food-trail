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
        .when('/gallery', {
            templateUrl: 'modules/gallery/views/gallery.html',
            controller: 'GalleryController',
            controllerAs: "gallery"
        })
        .when('/ar', {
            templateUrl: 'modules/arvideo/views/arvideo.html',
            controller: 'ArvideoController',
            controllerAs: "arvideo"
        })
        .when('/virtual', {
            templateUrl: 'modules/virtual/views/virtual.html',
            controller: 'VirtualController',
            controllerAs: "virtual"
        })


        $locationProvider.html5Mode(true);

    }]);
