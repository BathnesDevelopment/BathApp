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
        // Method: DataTransformations.objectToArray()
        // Input: Object
        // Output: Array
        // Checks if an object is an array, if not converts it to a single item array.
        objectToArray: function (object) {
            if (!angular.isArray(object)) return [object];
            return object;
        }
    };
});