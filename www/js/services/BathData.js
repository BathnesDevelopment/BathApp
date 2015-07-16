angular.module('MyBath.BathDataService', [])
/**
 * Factory: Bath Data
 * The bath data factory includes methods to return and save data from the data web service.
 * This is split into three objects - MyHouse, MyNearest, and MyCouncil
*/
.factory('BathData', function ($http, $q, DataTransformations) {
    return {
        // Method: BathData.all()
        // Input: JSON[] / Empty
        // Output: JSON / Empty Array
        // gets all the data back from local storage.
        all: function () {
            var bathData = window.localStorage.BathData;
            if (bathData) {
                return angular.fromJson(bathData);
            }
            return [];
        },
        toNewObj: function () {
            return {};
        },
        // Method: BathData.save
        // Input: JSON
        // Output: None
        // saves the data from a JSON input, back into the local storage (overwriting previous storage)
        save: function (bathData) {
            window.localStorage.BathData = angular.toJson(bathData);
        },
        // Method: BathData.fetchAll()
        // Input: uId string (UPRN)
        // Output:
        // calls all of the iShare links and aggregates the returned data into a single JSON array, queryable by index.
        // this data is returned as a promise.
        fetchAll: function (uId) {
            return $q.all([
                
            ]).then(function (results) {
                var aggregatedData = [];
                angular.forEach(results, function (result) {
                    aggregatedData = aggregatedData.concat(result.data);
                });
                window.localStorage.BathData = angular.toJson(aggregatedData);
                return aggregatedData;
            }, function (error) {
                return [];
            });
        },
        clear: function () {
            window.localStorage.removeItem('BathData');
        },
        get: function (id) {
            
        }
    };
});