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
            return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
        }
    };
});