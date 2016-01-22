angular.module('MyBath.DataTransformations', [])
/**
 * Factory: Data Transformations
 * Includes various methods to transform data
 * Method names should be descriptive and clear so that when calls are made
 * there is no reason to look in this code (except when debugging errors here!)
*/
.factory('DataTransformations', function () {
    return {
        // Method: DataTransformations.removeArrayDuplicates()
        // Input: Array
        // Output: Array
        // Removes duplicates from an array and returns the new array
        removeArrayDuplicates: function () {
            var names = [];
            array = array.filter(function isNotDupe(element) {
                if (names.indexOf(element.name) !== -1) return false;
                names.push(element.name);
                return true;
            });
            return array;
        },
        // Method: DataTransformations.objectToArray(object)
        // Input: Object
        // Output: Array
        // Checks if an object is an array, if not converts it to a single item array.
        objectToArray: function (object) {
            if (!angular.isArray(object)) return [object];
            return object;
        },
        // Method: DataTransformations.toTitleCase(str)
        // Input: String
        // Output: String
        // Converts a string to title case
        // Source http://stackoverflow.com/a/196991
        toTitleCase: function (str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        // Method: DataTransformations.isCouncilConnectHours()
        // Input: NA
        // Output: Boolean
        // Returns true if it is currently Council Connect Hours
        // Council Connect hours are 8-6 MTTF, 9:30 - 6 W, Closed on weekends
        isCouncilConnectHours: function () {
            var time = new Date();
            var h = time.getHours();
            var m = time.getMinutes();
            var d = time.getDay();

            if (d === 0 || d === 6 || h < 8 || h > 18) { // weekend or closed hours
                return false;
            }

            if (d === 3 && (h < 9 || (h === 9 && m < 30))) { // Wednesday
                return false;
            }

            return true;
        },
        // Method: DataTransformations.URLtoBase64(str)
        // Input: String
        // Output: String
        // Same origin means we can't do this atm. Might find a solution later
        // uses a canvas element to store an image as a base 64 URL
        URLtoBase64: function (url) {
            return url;
        },
        // Method: DataTransformations.NEtoLL()
        // Input: Northing/Easting Coordinates
        // Output: Lat/Lng object
        // converts NGR easting and nothing to lat, lon. With proj4.js
        // British National Grid. Source: http://epsg.io/27700
        NEtoLL: function (east, north) {
            proj4.defs("NationalGrid", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
            var res = proj4('NationalGrid', 'WGS84', [east, north]);
            return { latitude: res[1], longitude: res[0] };
        },
        // Method: DataTransformations.LLtoNE()
        // Input: LatLngCoordinates
        // Output: Northing/Easting object
        // Converts LatLng to Northing/Easting
        LLtoNE: function (lat, lng) {
            proj4.defs("NationalGrid", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
            var res = proj4('WGS84', 'NationalGrid', [lng, lat]);
            return { east: res[0], north: res[1] };
        },
        // Method: DataTransformations.formatAddress()
        // Input: Address strings
        // Output: Address string
        // Formats address strings returned by iShare
        formatAddress: function (aPart1, aPart2, aPart3) {
            var res = "";
            if (aPart1) res += aPart1;
            if (aPart2) {
                if (aPart1) {
                    res += ", ";
                }
                res += aPart2;
            }
            if (aPart3) {
                if (aPart2 || aPart1) {
                    res += ", ";
                }
                res += aPart3;
            }
            return res;
        },
        // Method: DataTransformations.formatTime()
        // Input: string
        // Output: string
        // Formats the time string returned by iShare for roadworks
        formatTime: function (strTime) {
            if (strTime === "01/01/4000 00:00:00") {
                //This is returned when there's no date
                return "No data available";
            }
            if (strTime.search(" 00:00:00") !== -1) {
                // Returned as a DateTime but we only really care about the date
                return strTime.slice(0, strTime.search(" 00:00:00"));
            }
            return strTime;
        },
        // Method: DataTransformations.mToMi()
        // Input: number
        // Output: number
        // Converts meters to miles to an accuracy of 1 decimal place
        mToMi: function (distM) {
            res = distM * 0.000621371192;
            if (res > 1) {
                return res.toFixed(1);
            }
            return res.toFixed(2);
        }
    };
});