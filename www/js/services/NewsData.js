angular.module('MyBath.NewsDataService', [])
/**
 * Factory: News data
 * 
 * 
*/
.factory('NewsData', function ($http, $q, DataTransformations, config) {
    return {
        // Method: NewsData.get()
        // Input: None
        // Output: JSON
        // 
        get: function() {

        },
        // Method: NewsData.save()
        // Input: JSON
        // Output: None
        // Saves the data from a JSON input, back into the local storage (overwriting previous storage)
        save: function (newsData) {
            window.localStorage.NewsData = angular.toJson(newsData);
        },
        // Method: NewsData.fetch()
        // Input: 
        // Output: 
        // Calls the news data service and returns the result.
        fetch: function () {
            var newsData = [];
            var newsData_q = $q.defer();

            // Cache news data for 1 week
            var newsCache = window.localStorage.NewsData;
            if (newsCache) {
                var cache = angular.fromJson(newsCache);
                if (moment().diff(moment(cache.updated), 'days') < 8) newsData = cache.news;
            }

            $http.get(config.newsWS)
                .success(function (data, status, headers, config) {
                    if (newsData && newsData != []) {
                        newsData = JSON.parse(data.GetNewsResult);
                        window.localStorage.NewsData = angular.toJson({ updated: moment(), news: newsData });
                    }
                    newsData_q.resolve(newsData);
                })
                .error(function (data, status, headers, config) {
                    newsData_q.resolve(newsData);
                });
            return newsData_q.promise;
        },
        // Method: NewsData.clear()
        // Input: None
        // Output: None
        // 
        clear: function () {
            window.localStorage.removeItem('NewsData');
        }
    };
});