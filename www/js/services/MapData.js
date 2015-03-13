angular.module('MyBath.MapDataService', [])
/**
 * Factory: Map Data
 *
*/
.factory('MapData', function ($http, $q, DataTransformations) {

    return {
        getLayer: function (layer, lat, lng) {
            var layerData = [];
            var layerData_q = $q.defer();

            $http.get("http://example.com")
                .success(function (data, status, headers, config) {

                    if (!$scope.mapData.data[layer]) {
                        return "Failed";
                    }
                    var northing = "";
                    var easting = "";
                    var latLng = [];
                    var title = "";
                    var bgC = "";
                    var icon = {};
                    var i = 0;

                    if ( $scope.mapData.data[layer].icon ) {
                        icon = $scope.mapData.data[layer].icon;

                    } else {
                        icon = {
                            type: "awesomeMarker",
                            icon: "bug",
                            markerColor: "red",
                            prefix: "ion"
                        };
                    }
                    for ( var e in $scope.mapData.data[layer].pins ) {
                        if (! $scope.mapData.data[layer].pins[e].icon ) {
                            $scope.mapData.data[layer].pins[e].icon = icon;
                        }
                        layerData.push($scope.mapData.data[layer].pins[e]);
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