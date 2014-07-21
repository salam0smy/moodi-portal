'use strict';


// Declare app level module which depends on filters, and services
angular.module('moodiPortal', [
  'ngRoute',
  'moodiPortal.filters',
  'moodiPortal.services',
  'moodiPortal.directives',
  'moodiPortal.controllers',
  'ui.bootstrap',
  'ngResource'
]).
config(['$routeProvider','$httpProvider', 
       function($routeProvider, $httpProvider) {
  $routeProvider.when('/moods', {
                                templateUrl: 'partials/partial1.html', 
                                controller: 'MoodsCtrl'
                              });
  $routeProvider.when('/events', {
                                templateUrl: 'partials/partial2.html', 
                                controller: 'EventCtrl'
                              });
  $routeProvider.otherwise({redirectTo: '/moods'});
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
