angular.module('MyBath.UserDataService', [])
/**
 * Factory: User Data
 * The user data factory includes methods to handle user data for the app.
 * This includes retrieving address data, as well as handling registration data
 * such as name and email, and storing these for retrieval in form processes.
*/
.factory('UserData', function ($http, $q, config) {
    return {
        all: function () {
            var userData = window.localStorage.UserData;
            if (!userData) {
                // Defaults
                userData = {
                    "pushNotifications": true,
                    "displayCategories": {
                        "Leisure and Culture": true,
                        "Transport and Travel": true,
                        "Education": true,
                        "Council and Democracy": true,
                        "Health and Fitness": true,
                        "Waste and Recycling": true,
                        "Planning and Licensing": true
                    }
                };
            }
            return angular.fromJson(userData);
        },
        save: function (userData) {
            window.localStorage.UserData = angular.toJson(userData);
        },
        fetchUprn: function (postcode) {
            var addressData = [];
            var addressData_q = $q.defer();
            $http.post(config.addressWS, { searchString: postcode })
                .success(function (data, status, headers, config) {
                    addressData = JSON.parse(data.GetAddressResult);
                    if (data && data != []) {

                    }
                    else {
                        addressData = "Failed";
                    }
                    addressData_q.resolve(addressData);
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
    };
});