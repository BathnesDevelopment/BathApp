angular.module('MyBath.MapDataService', [])
/**
 * Factory: Map Data
 *
*/
.factory('MapData', function ($http, $q, DataTransformations) {
    return {
        getLayer: function (layer, lat, lng, mapData) {
            var layerData = [];
            var layerData_q = $q.defer();

            $http.get("http://example.com")
                .success(function (data, status, headers, config) {
                    if (!mapData[layer]) {
                        return "Failed";
                    }
                    var icon = {};

                    if (!mapData[layer].icon) {
                        mapData[layer].icon = {
                            type: "awesomeMarker",
                            icon: "bug",
                            markerColor: "red",
                            prefix: "ion"
                        };
                    }
                    icon = mapData[layer].icon;
                    for (var e in mapData[layer].pins) {
                        if (!mapData[layer].pins[e].icon) {
                            mapData[layer].pins[e].icon = icon;
                        }
                        layerData.push(mapData[layer].pins[e]);
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
    };
});