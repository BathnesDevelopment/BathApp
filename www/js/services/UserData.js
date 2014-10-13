angular.module('MyBath.UserDataService', [])
/**
 * Factory: User Data
 * The user data factory includes methods to handle user data for the app.
 * This includes retrieving address data, as well as handling registration data
 * such as name and email, and storing these for retrieval in form processes.
*/
.factory('UserData', function ($http, $q) {
    return {
        all: function () {
            var userData = window.localStorage['UserData'];
            if (userData) {
                return angular.fromJson(userData);
            }
            return [];
        },
        save: function (userData) {
            window.localStorage['UserData'] = angular.toJson(userData);
        },
        fetchUprn: function (postcode) {
            var addressData = [];
            var addressData_q = $q.defer();
            $http.get("http://isharemaps.bathnes.gov.uk/getdata.aspx?service=LocationSearch&RequestType=LocationSearch&location=" + postcode + "&pagesize=200&startnum=1")
                .success(function (data, status, headers, config) {
                    addressData = data;
                    if (data && data != []) {
                    }
                    else {
                        addressData = "Failed";
                    }
                    addressData_q.resolve(data);
                    return addressData;
                })
                .error(function (data, status, headers, config) {
                    addressData = "Failed";
                    addressData_q.resolve(addressData);
                    return "Failed";
                });
            return addressData_q.promise;
        },
        clear: function () {
            window.localStorage.removeItem('UserData');
        }
    }
})