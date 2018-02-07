angular.module('ChineseBiz', [
    'ngRoute',
    'appRoutes',
    'appConstants',
    'HomeCtrl',
    'TrailCtrl',
    'ngMap'

])
/*.run(function($rootScope, $http, $location) {
    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if(restrictedPage && !localStorage.currentUser) {
            $location.path('/login');
        }    
    });
})*/
