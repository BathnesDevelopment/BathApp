angular.module('MyBath.NewsDataService', [])
/**
 * Factory: Bath Data
 * The bath data factory includes methods to return and save data from the data web service.
 * This is split into three objects - MyHouse, MyNearest, and MyCouncil
*/
.factory('NewsData', function ($http, $q, DataTransformations, config) {
    return {
        // Method: NewsData.all()
        // Input: JSON[] / Empty
        // Output: JSON / Empty Array
        // Gets all the data back from local storage.
        all: function () {
            var newsData = window.localStorage.NewsData;
            if (newsData) {
                return angular.fromJson(newsData);
            }
            return [];
        },
        // Method: NewsData.save()
        // Input: JSON
        // Output: None
        // Saves the data from a JSON input, back into the local storage (overwriting previous storage)
        save: function (newsData) {
            window.localStorage.NewsData = angular.toJson(newsData);
        },
        // Method: NewsData.fetchAll()
        // Input: 
        // Output: 
        // Calls the news data service and returns the result.
        fetchAll: function (uId, pCode) {
            var bathData = [];
            var bathData_q = $q.defer();
            $http.get(config.newsWS)
                .success(function (data, status, headers, config) {
                    bathData = JSON.parse(data.GetAllDataResult);
                    if (bathData && bathData != []) {
                    }
                    else {
                        bathData = "Failed";
                    }
                    bathData_q.resolve(bathData);
                    return bathData;
                })
                .error(function (data, status, headers, config) {
                    bathData = "Failed";
                    bathData_q.resolve(bathData);
                    return "Failed";
                });
            return bathData_q.promise;
        },
        clear: function () {
            window.localStorage.removeItem('NewsData');
        }
    };
});