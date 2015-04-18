'use strict';

angular.module('moodiPortal.controllers')
  .controller('EventCtrl', ['$scope','eventFactory','$location','$log', 'moodFactory',
                            '$upload',
                            function($scope, eventFactory, $location, $log, moodFactory,
                                      $upload) {

    $scope.eventItems = eventFactory.query();
    $scope.isAddNew=false;
    $scope.addNewClick = function($event){
      $scope.isAddNew = !$scope.isAddNew;
    }
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

  $scope.editClick = function(item, e){
      if(e)
          e.preventDefault();
    item.edit = !item.edit;
    item.isOpen = false;
  };
  $scope.saveClick = function(item){
    item.$update();

  }

  $scope.AddNewSaveClick = function(items){
      //items.moods = getMoodsIdList($scope.moodsSelected);
      var saved = eventFactory.save(items);
      saved.$promise.then(function(obj){
        $log.info(obj);
      });
      
      $scope.isAddNew = false;
      $scope.backToList();
    }
  function backToList() {
      $scope.eventItems = null;
      $scope.eventItems = eventFactory.query();
      $location.path("/events");
    }

    $scope.moodsList = moodFactory.query();
    

   

    $scope.moodSelected = function($item, $model, $label){
      $log.info($item, $model);
      if(!$scope.newItem.moodsSelected){
        $scope.newItem.moodsSelected = [];
        $scope.newItem.moods = [];
      }
          
      $scope.newItem.moods.push($item._id);
      $scope.newItem.moodsSelected.push($item);

      $scope.newItem.nMood = "";
    }

    $scope.deleteItemClick = function(item, e){
      if(e)
        e.preventDefault();
      item.$delete();
      var index = $scope.eventItems.indexOf(item);
      if (index > -1) {
        $scope.eventItems.splice(index, 1);
      }
      //$scope.backToList();
    }
    $scope.removeItem = function(item, arr){
      var index = arr.indexOf(item);
      if(index>-1)
          arr.splice(index, 1);
    }

    function tickItems(list){
      angular.forEach( list, function( value, key ) {
        value.ticked = false;
    });
    }

    $scope.getImageUploadURL = function(_id){
      return "http://moodi-api.herokuapp.com/events/"+_id+"/image";
    }

    $scope.onFileSelect = function($files, item){
      console.log($files);
        var $file = $files[0];
        item.imageName = $file.name;
        item.uploading = true;
        $upload.upload({
            url: $scope.getImageUploadURL(item._id),
            file: $file,

        }).progress(function(evt) {
            item.uploaded = parseInt(100.0 * evt.loaded / evt.total);
        })
        .success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        item.uploading = false;
      });
    }

  }]);