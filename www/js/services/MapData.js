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
            console.log(layers_q);
            return layers_q.promise;
        },
        // Method: MapData.getLayer()
        // Input: 
        // Output: 
        // 
        getLayer: function (layer, lat, lng) {
            var layerData = [];
            var layerData_q = $q.defer();

            $http.post(config.mapDataWS + "/GetMapLayer",
                {
                    layername: layer,
                    lat: "51.3821440",
                    lng: "-2.3589420"
                })
                .success(function (data) {
                    if (data.GetMapLayerResult) {
                        res = JSON.parse(data.GetMapLayerResult);
                        console.log(res);
                        layerData_q.resolve(layers);
                        return layers;
                    } else {
                        res = "Failed";
                        console.warn(data);
                        layers_q.resolve(res);
                        return "Failed";
                    }
                }).error(function (data, status, headers, config) {
                    layers = "Failed";
                    layers_q.resolve(layers);
                    return "Failed";
                });
        }
    };
});