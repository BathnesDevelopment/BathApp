angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, MapData) {

    $scope.markers = [];

    MapData.getLayer("libraries")
    .then(function (data) {
        if (data && data != "Failed") {
            for (i = 0; i < data.length ; i++) {
                $scope.markers.push(data[i]);
            }
        }
        else {
        }
    });

    $scope.map = {
        defaults: {
            tileLayer: "http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png",
            attributionControl: false,
            maxZoom: 20,
            zoomControlPosition: 'bottomleft',
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        },
        center: {
            lat: 51.3821440,
            lng: -2.3589420,
            zoom: 18
        },
        layers: {
            baselayers: {
                MapBox: {
                    layerOptions: { attribution: '<a browse-to="http://leafletjs.com">Leaflet</a>' },
                    name: 'Map items of interest',
                    url: 'http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png',
                    type: 'xyz',
                    maxZoom: 20,
                    zoomControlPosicloseDisplayOptionscloseDisplayOptionscion: 'bottomleft',
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            },
            overlays: {
                Libraries: {
                    type: 'group',
                    name: 'Libraries',
                    visible: true
                }
            }
        },
        markers: $scope.markers
    };
});