'use strict';

angular.module('moodiPortal.controllers')
  .controller('EventCtrl', ['$scope','eventFactory', 
                            function($scope, eventFactory) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
     $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

       $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  }]);