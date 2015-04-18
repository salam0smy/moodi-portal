'use strict';

angular.module('moodiPortal.controllers')
  .controller('MoodsCtrl', ['$scope', 'moodFactory','$location','$log', '$upload',
  							function($scope, moodFactory, $location, $log, $upload) {
	$scope.items = moodFactory.query();
	$scope.newItem = {
		name: "name",
		altName: "alternative Name",
		status: "Status"
	}

	$scope.editClick = function(item, e){
    	if(e)
      	  e.preventDefault();
		item.edit = !item.edit;
		item.isOpen = false;
	};

	$scope.saveClick = function(item){
		item.$update();

	}

	$scope.backToList = backToList;
  
  	function backToList() {
  		$scope.items = null;
  		$scope.items = moodFactory.query();
   	 	$location.path("/moods");
  	}

  	$scope.addNewClick = function($event){
  		$scope.isAddNew = !$scope.isAddNew;
  	}

  	$scope.AddNewSaveClick = function(items){
  		var saved = moodFactory.save(items);
  		saved.$promise.then(function(obj){
  			$log.info(obj);
  		});
  		
  		$scope.isAddNew = false;
  		$scope.backToList();
  	}

  	$scope.deleteItemClick = function(item, e){
  		if(e)
  			e.preventDefault();
  		item.$delete();
  		var index = $scope.items.indexOf(item);
  		if (index > -1) {
  			$scope.items.splice(index, 1);
  		}
  		//$scope.backToList();
  	}
    $scope.concClick = function(_id){
        $location.path("/concierge/"+_id);
    };

    $scope.getImageUploadURL = function(_id){
      return "http://moodi-api.herokuapp.com/moods/"+_id+"/image";
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

  	function clearItem(data){
  		for (var k in data) {
        if (data.hasOwnProperty(k)) {
           data[k] = "";
        }
    }
  	}
  }]);