angular.module('MyBath.MapDataService', [])
/**
 * Factory: Map Data
 *
*/
.factory('MapData', function ($http, $q, DataTransformations, config) {
    return {
        // Method: MapData.getLayers()
        // Input: 
        // Output: Array
        // Returns a list of layers from the service
        getLayers: function () {
            var layers_q = $q.defer();
            var layers = [];
            $http.post(config.mapDataWS + "/GetAvailableMapLayers", {})
                .success(function (data) {
                    if (data.GetAvailableMapLayersResult) {
                        layers = JSON.parse(data.GetAvailableMapLayersResult);
                        layers_q.resolve(layers);
                        return layers;
                    } else {
                        layers = "Failed";
                        console.warn(data);
                        layers_q.resolve(layers);
                        return "Failed";
                    }
                }).error(function (data, status, headers, config) {
                    layers = "Failed";
                    layers_q.resolve(layers);
                    return "Failed";
                });
            return layers_q.promise;
        },
        // Method: MapData.getLayer()
        // Input: 
        // Output: 
        // 
        getLayer: function (layer, lat, lng) {
            var layerData_q = $q.defer();
            var layerData = [];
            $http.post(config.mapDataWS + "/GetMapLayer",
                {
                    layerName: layer,
                    lat: lat,
                    lng: lng
                })
                .success(function (data) {
                    if (data.GetMapLayerResult) {
                        layerData = JSON.parse(data.GetMapLayerResult);
                        layerData_q.resolve(layerData);
                        return layerData;
                    } else {
                        layerData = "Failed";
                        layerData_q.resolve(res);
                        return layerData;
                    }
                }).error(function (data, status, headers, config) {
                    layerData = "Failed";
                    layerData_q.resolve(layerData);
                    return layerData;
                });
            return layerData_q.promise;
        }
    };
});