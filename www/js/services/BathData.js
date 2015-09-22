angular.module('MyBath.BathDataService', [])
/**
 * Factory: Bath Data
 * The bath data factory includes methods to return and save data from the data web service.
 * This is split into three objects - MyHouse, MyNearest, and MyCouncil
*/
.factory('BathData', function ($http, $q, DataTransformations, config) {
    return {
        // Method: BathData.all()
        // Input: JSON[] / Empty
        // Output: JSON / Empty Array
        // Gets all the data back from local storage.
        all: function () {
            var bathData = window.localStorage.BathData;
            if (bathData) {
                return angular.fromJson(bathData);
            }
            return [];
        },
        // Method: BathData.save()
        // Input: JSON
        // Output: None
        // Saves the data from a JSON input, back into the local storage (overwriting previous storage)
        save: function (bathData) {
            window.localStorage.MyCouncil = angular.toJson(bathData.myCouncil);
            window.localStorage.MyHouse = angular.toJson(bathData.myHouse);
            window.localStorage.MyNearest = angular.toJson(bathData.myNearest);
            window.localStorage.Health = angular.toJson(bathData.health);
        },
        // Method: BathData.fetchAll()
        // Input: uId string (UPRN)
        // Output: 
        // Calls the bath data service and returns the result.
        fetchAll: function (uId, pCode) {
            var bathData = [];
            var bathData_q = $q.defer();
            $http.get(config.bathDataWS + "?uprn=" + uId + "&postcode=" + pCode)
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
            window.localStorage.removeItem('MyCouncil');
            window.localStorage.removeItem('MyHouse');
            window.localStorage.removeItem('MyNearest');
            window.localStorage.removeItem('Health');
        },
        getMyHouse: function (id) {
            var myHouse = window.localStorage.MyHouse;
            if (myHouse && myHouse != 'undefined') {
                return angular.fromJson(myHouse);
            }
            return [];
        },
        getMyNearest: function (id) {
            var myNearest = window.localStorage.MyNearest;
            if (myNearest && myNearest != 'undefined') {
                return angular.fromJson(myNearest);
            }
            return [];
        },
        getMyCouncil: function (id) {
            var myCouncil = window.localStorage.MyCouncil;
            if (myCouncil && myCouncil != 'undefined') {
                return angular.fromJson(myCouncil);
            }
            return [];
        },
        getHealth: function (id) {
            var health = window.localStorage.Health;
            if (health && health != 'undefined') {
                return angular.fromJson(health);
            }
            return [];
        }
    };
});