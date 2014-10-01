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
				    
				    if (data && data != []) {
						for (i = 0; i < data[0].features.length ; i++)
						{
							layerData.push({ lat: 51.3821440, lng: -2.3579420, layer: data[0].features[i].properties.layerName, message: data[0].features[i].properties.layerName });
						}
				    }
				    else {
				        layerData = "Failed";
				    }
				    layerData_q.resolve(layerData);
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
});