'use strict';

/* Filters */

angular.module('moodiPortal.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('selectedMood', function(){
  	return function(input, ids){
  		var filtered = [];
    	angular.forEach(input, function(item) {
      		var indx = ids.indexOf(item._id);
      		
      		item.ticked = indx>0;
       		filtered.push(item);

     	});
    }
    return filtered;
  });
