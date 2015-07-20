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
            window.localStorage.myCouncil = angular.toJson(bathData.myCouncil);
            window.localStorage.myHouse = angular.toJson(bathData.myHouse);
            window.localStorage.myNearest = angular.toJson(bathData.myNearest);
        },
        // Method: BathData.fetchAll()
        // Input: uId string (UPRN)
        // Output: 
        // Calls the bath data service and returns the result.
        fetchAll: function (uId, pCode) {
            var bathData = [];
            var bathData_q = $q.defer();
            $http.post("http://vm-project-dev/BathData.svc/GetAllData", { uprn: uId, postcode: pCode })
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
            window.localStorage.removeItem('BathData');
        },
        getMyHouse: function (id) {
            var myHouse = window.localStorage.myHouse;
            if (myHouse && myHouse != 'undefined') {
                return angular.fromJson(myHouse);
            }
            return [];
        },
        getMyNearest: function (id) {
            var myNearest = window.localStorage.myNearest;
            if (myNearest && myNearest != 'undefined') {
                return angular.fromJson(myNearest);
            }
            return [];
        },
        getMyCouncil: function (id) {
            var myCouncil = window.localStorage.myCouncil;
            if (myCouncil && myCouncil != 'undefined') {
                return angular.fromJson(myCouncil);
            }
            return [];
        }
    };
});