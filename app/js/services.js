'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('moodiPortal.services', []).
  value('version', '0.1').
  factory('moodFactory', function($resource, $http, $log) {
  	return $resource('http://moodi-api.herokuapp.com/moods/:Id', 
  		{ Id:'@_id' },
  		{ 
  			update: { 
  				method: 'PUT',
  				transformResponse: [function (data, headersGetter) {
                	// you can examine the raw response in here
             	   $log.info(data);
             	   $log.info(headersGetter());
             	   return data;
           		 }].concat($http.defaults.transformResponse) 
           		},
  			remove:{ 
  				method: 'DELETE',
  				params: {id: '@id'}, 
  				format: 'json' 
  			},
  			save :{
  				method: 'POST',
            	format: 'json',
            	transformResponse: [function (data, headersGetter) {
                	// you can examine the raw response in here
             	   $log.info(data);
             	   $log.info(headersGetter());
             	   return data;
           		 }].concat($http.defaults.transformResponse)
           		}
  		});
  }).
  factory('eventFactory', function($resource, $http, $log) {
    return $resource('http://moodi-api.herokuapp.com/events/:Id', 
      { Id:'@_id' },
      { 
        update: { 
          method: 'PUT',
          transformResponse: [function (data, headersGetter) {
                  // you can examine the raw response in here
                 return data;
               }].concat($http.defaults.transformResponse) 
              },
        remove:{ 
          method: 'DELETE',
          params: {id: '@id'}, 
          format: 'json' 
        },
        save :{
          method: 'POST',
              format: 'json',
              transformResponse: [function (data, headersGetter) {
                  // you can examine the raw response in here
                 return data;
               }].concat($http.defaults.transformResponse)
              }
      });
  }).
  factory('conciergeFactory', function($resource) {
    return $resource('http://moodi-api.herokuapp.com/concierge/:id', 
      { id:'@_id' });
  });;
