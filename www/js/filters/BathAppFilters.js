angular.module('MyBath.BathAppFilters', [])
.filter('MetresToMiles', function () {
    return function (input) {
        res = input * 0.000621371192;
        if (res > 1) {
            return res.toFixed(1);
        }
        return res.toFixed(2);
    };
})
.filter('isDefined', function () {
    return function (value, msg) {
        if (value === undefined) {
            throw new Error('isDefined filter got undefined value ' + msg);
        }
        return value;
    };
})
.filter('title', function () {
    // converts a string (i.e. one in allcaps) to Sentence case
    return function (original) {
        var res = "";
        if (original && original !== "") {
            var words = original.toLowerCase().split(' ');
            var i = 0;
            var j = 0;
            while (i < words.length) {
                if (words[i].charAt(j) === '(') {
                    // Deal with ( by adding it to res and processing the string as if it were not there
                    res += words[i].charAt(j);
                    j++;
                    continue;
                }
                res += words[i].charAt(j).toUpperCase() + words[i].slice(j + 1);
                i++;
                j = 0;
                if (i !== words.length) {
                    res += " ";
                }
            }
        }
        return res;
    };
})
.filter('sentence', function () {
    return function (original) {
        if (original) {
            if (original.length > 1) {
                return original.charAt(0).toUpperCase() + original.toLowerCase().slice(1);
            } else {
                return original;
            }
        } else {
            return '';
        }
    };
})
.filter('formatTime', function () {
    return function (strTime) {
        if (strTime && strTime === "01/01/4000 00:00:00") {
            //This is returned when there's no date
            return "No data available";
        }
        if (strTime && strTime.search(" 00:00:00") !== -1) {
            // Returned as a DateTime but we only really care about the date
            return strTime.slice(0, strTime.search(" 00:00:00"));
        }
        return strTime;
    };
})
.filter('formatAddress', function () {
    return function (aPart1, aPart2, aPart3) {
        var res = "";
        if (aPart1) res += aPart1;
        if (aPart2) {
            if (aPart1) res += ", ";
            res += aPart2;
        }
        if (aPart3) {
            if (aPart2 || aPart1) res += ", ";
            res += aPart3;
        }
        return res;
    };
})
//////////////////////////////////////////////////////////////////////////////////////
// filter: generalProperties()
// Returns the properties from an object not reserved for other uses (e.g. lat)
//////////////////////////////////////////////////////////////////////////////////////
.filter('generalProperties', function () {
    return function (obj) {
        var filtered = {};
        for (var i = 0; i < Object.keys(obj).length; i++) {
            if (!Object.keys(obj)[i].match("Name|Max|Min|Easting|Northing|Distance|Website|Lat|Lng|")) {
                filtered[Object.keys(obj)[i]] = obj[Object.keys(obj)[i]];
            }
        }
        return filtered;
    };
})
//////////////////////////////////////////////////////////////////////////////////////
// filter: binRoute
// Returns a friendly description of a bin route
//////////////////////////////////////////////////////////////////////////////////////
.filter('binDates', function () {
    return function (str) {
        return 'Thursday Week B';
    };
})
//////////////////////////////////////////////////////////////////////////////////////
// filter: mapCategories
//
//////////////////////////////////////////////////////////////////////////////////////
.filter('mapCategories', function () {
    return function (mapLayers, field) {
        var categories = {};
        for (var x in mapLayers) categories[mapLayers[x][field]] = mapLayers[x][field];
        return categories;
    };
})
//////////////////////////////////////////////////////////////////////////////////////
// filter: mapCategoryItems
//
//////////////////////////////////////////////////////////////////////////////////////
.filter('mapCategoryItems', function () {
    return function (mapLayers, category) {
        var layers = {};
        for (var x in mapLayers) {
            if (mapLayers[x].category == category) layers[x] = mapLayers[x];
        }
        return layers;
    };
})
//////////////////////////////////////////////////////////////////////////////////////
// filter: splitObject(side)
// Splits an objects properties in two - either left or right side (for use in columns)
//////////////////////////////////////////////////////////////////////////////////////
.filter('splitObject', function () {
    return function (array, side) {
        var cutPoint = Math.ceil(Object.keys(array).length / 2);
        var filtered = {};
        for (var i = 0; i < Object.keys(array).length; i++) {
            if (side == 'left' && i < cutPoint) filtered[Object.keys(array)[i]] = array[Object.keys(array)[i]];
            if (side == 'right' && i >= cutPoint) filtered[Object.keys(array)[i]] = array[Object.keys(array)[i]];
        }
        return filtered;
    };
});