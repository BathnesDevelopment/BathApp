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
							var northing = data[0].features[i].geometry.coordinates[0][0];
							var easting = data[0].features[i].geometry.coordinates[0][1];
							var titleAndUrl = data[0].features[i].properties.fields._;
							var title = data[0].features[i].properties.fields._;
							if (titleAndUrl.indexOf('|') != -1) {
								title = titleAndUrl.split('|')[1];
							}
							var latlng = NEtoLL(northing,easting);
							layerData.push({ lat: latlng.latitude, lng: latlng.longitude, icon : { iconUrl: 'images/android-book.png', iconSize: [30,30]}, layer: data[0].properties.layerName, message: title });
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