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
        // Returns a list of layers from the service - cached for a day.
        getLayers: function () {
            var layers_q = $q.defer();
            var layers = [];
            var layerCache = window.localStorage.MapLayerConfig;

            if (layerCache) {
                var cache = angular.fromJson(layerCache);
                if (moment().diff(moment(cache.updated), 'days') < 2) layers = cache.layers;
            }

            if (layers.length == 0) {
                $http.post(config.mapDataWS + "/GetAvailableMapLayers", {})
                .success(function (data) {
                    if (data.GetAvailableMapLayersResult) {
                        layers = JSON.parse(data.GetAvailableMapLayersResult);
                        window.localStorage.MapLayerConfig = angular.toJson({ updated: moment(), layers: layers });
                        layers_q.resolve(layers);
                    } else {
                        layers = "Failed";
                        layers_q.resolve(layers);
                    }
                }).error(function (data, status, headers, config) {
                    layers = "Failed";
                    layers_q.resolve(layers);
                });
            }
            else {
                layers_q.resolve(layers);
            }

            return layers_q.promise;
        },
        // Method: MapData.getLayer()
        // Input: 
        // Output: 
        // Returns geoJson from the web service for a layer - cached for a day.
        getLayer: function (layer, lat, lng) {
            var layerData_q = $q.defer();
            var layerData = '';
            var layerCache = window.localStorage.MapLayers;

            if (layerCache) {
                var layerCache = angular.fromJson(layerCache);
                if (layerCache[layer] && moment().diff(moment(layerCache[layer].updated), 'days') < 2) layerData = layerCache[layer].layer;
            }

            if (layerData == '') {
                $http.post(config.mapDataWS + "/GetMapLayer",
                    {
                        layerName: layer,
                        lat: lat,
                        lng: lng
                    })
                    .success(function (data) {
                        if (data.GetMapLayerResult) {
                            layerData = JSON.parse(data.GetMapLayerResult);
                            if (!layerCache) layerCache = {};

                            layerCache[layer] = { updated: moment(), layer: layerData };
                            window.localStorage.MapLayers = angular.toJson(layerCache);

                            layerData_q.resolve(layerData);
                        } else {
                            layerData = "Failed";
                            layerData_q.resolve(layerData);
                        }
                    }).error(function (data, status, headers, config) {
                        layerData = "Failed";
                        layerData_q.resolve(layerData);
                    });
            }
            else {
                layerData_q.resolve(layerData);
            }

            return layerData_q.promise;
        }
    };
});