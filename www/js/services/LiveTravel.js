angular.module('MyBath.LiveTravelService', [])
/**
 * Factory: Live Travel
*/
.factory('LiveTravel', function ($http, $q, DataTransformations, config) {
    return {
        // Method: LiveTravel.all()
        // Input: JSON[] / Empty
        // Output: JSON / Empty Array
        // Gets all the data back from local storage.
        all: function () {
            var liveTravel = window.localStorage.LiveTravel;
            if (liveTravel) {
                return angular.fromJson(liveTravel);
            }
            return [];
        },
        // Method: LiveTravel.save()
        // Input: JSON
        // Output: None
        // Saves the data from a JSON input, back into the local storage (overwriting previous storage)
        save: function (liveTravel) {
            window.localStorage.LiveTravel = angular.toJson(liveTravel);
        },
        // Method: LiveTravel.fetchAll()
        // Output: 
        // Calls the live travel data service and returns the result.
        // No cache for Live Travel - must be up to date.
        fetchAll: function () {
            var liveTravel = [];
            var liveTravel_q = $q.defer();
            $http.get({ url: config.liveTravelWS, params: { 'foobar': new Date().getTime() } })
                .success(function (data, status, headers, config) {
                    liveTravel = JSON.parse(data.GetLiveTravelResult);
                    if (liveTravel && liveTravel != []) {
                    }
                    else {
                        liveTravel = "Failed";
                    }
                    liveTravel_q.resolve(liveTravel);
                })
                .error(function (data, status, headers, config) {
                    liveTravel = "Failed";
                    liveTravel_q.resolve(liveTravel);
                });
            return liveTravel_q.promise;
        },
        clear: function () {
            window.localStorage.removeItem('LiveTravel');
        }
    };
});