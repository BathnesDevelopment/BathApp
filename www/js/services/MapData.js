angular.module('MyBath.MapDataService', [])
/**
 * Factory: Map Data
 * 
*/
.factory('MapData', function ($http, $q) {
    return {
        layer: function (url) {
            var layerData = [];
            var layerData_q = $q.defer();
            
            $http.get(url)
				.success(function (data, status, headers, config) {
				    layerData = data;
				    if (data && data != []) {
				    }
				    else {
				        layerData = "Failed";
				    }
				    layerData_q.resolve(data);
				    return layerData;
				})
				.error(function (data, status, headers, config) {
				    layerData = "Failed";
				    layerData_q.resolve(layerData);
				    return "Failed";
				});
            return layerData_q.promise;
        }
    }
})