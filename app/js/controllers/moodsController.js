'use strict';

angular.module('moodiPortal.controllers')
  .controller('MoodsCtrl', ['$scope', 'moodFactory','$location','$log', 
  							function($scope, moodFactory, $location, $log) {
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

  	function clearItem(data){
  		for (var k in data) {
        if (data.hasOwnProperty(k)) {
           data[k] = "";
        }
    }
  	}
  }]);