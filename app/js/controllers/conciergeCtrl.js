'use strict'

angular.module('moodiPortal.controllers')
  .controller('conciergeCtrl', ['$scope','$location','$log','conciergeFactory',
  								'$routeParams', function($scope, $location, 
  														 $log, conciergeFactory,
                            							 $routeParams) {

    $scope.events = conciergeFactory.query({'id':$routeParams.id});



                            }]);