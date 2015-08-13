angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, $ionicModal, MapData, leafletEvents, UserData) {
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.fetching = {};
    $scope.mapLayers = {};

    MapData.getLayers().then(function (layers) {
        $scope.mapLayers = layers;
    });

    $scope.map = {
        defaults: {
            tileLayer: "http://{s}.tiles.mapbox.com/v4/bathnes.l28de60p/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYmF0aG5lcyIsImEiOiJuMEw5dHBzIn0.HoLmxVV_1uqwL2xHLw3T1w",
            attributionControl: false,
            maxZoom: 20,
            zoomControlPosition: 'bottomleft',
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        },
        maxbounds: {
            northEast: {
                lat: 51.439536,
                lng: -2.278544
            },
            southWest: {
                lat: 51.273101,
                lng: -2.705955
            }
        },
        center: {
            lat: 51.3821440,
            lng: -2.3589420,
            zoom: 18,
            autoDiscover: true,
        },
        layers: {},
        geojson: {
            data: { type: "FeatureCollection", features: [] },
            style: function (feature) { return {}; },
            pointToLayer: function (feature, latlng) {
                var marker = L.AwesomeMarkers.icon({
                    icon: feature.properties.Icon,
                    prefix: 'fa',
                    markerColor: feature.properties.Colour
                });
                return L.marker(latlng, { icon: marker });
            },
            onEachFeature: function (feature, layer) {
                var popupString = "";
                layer.bindPopup(popupString);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODAL DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Map Display options
    // Options screen for map data display
    /////////////////////////////////////////////////////////////////////////////////////////////

    $ionicModal.fromTemplateUrl('templates/options-map-display.html', function (modal) {
        $scope.mapDisplayOptionsModal = modal;
    }, {
        scope: $scope
    });

    $scope.mapDisplayOptions = function () {
        $scope.mapDisplayOptionsModal.show();
    };

    $scope.map.controls = {
        custom: [
            L.control.locate({ follow: true }),
            L.control.customlayers({ position: 'topright', action: $scope.mapDisplayOptions })
        ]
    };

    $scope.closeMapDisplayOptions = function () {
        // Save user data
        UserData.save($scope.userData);
        $scope.mapDisplayOptionsModal.hide();
        $scope.updateMapData();
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CONTROLLER FUNCTIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: addLayer
    // Adds a layer to the map
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.addLayer = function (name) {
        var lat = $scope.map.center.lat;
        var lng = $scope.map.center.lng;
        if (!$scope.userData.MapDisplay[name]) {
            return;
        }
        if ($scope.fetching[name] && $scope.fetching[name][0]) {
            return false;
        } else {
            $scope.fetching[name] = [true, new Date()];
            MapData.getLayer(name, lat, lng)
            .then(function (res) {
                if (res && res != "Failed") {
                    Array.prototype.push.apply($scope.map.geojson.data.features, res.features);
                }
                $scope.fetching[name][0] = false;
            });
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateMapData
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateMapData = function () {
        for (var e in $scope.userData.MapDisplay) { // Generate a list of layers we are displaying
            if ($scope.userData.MapDisplay.hasOwnProperty(e) && $scope.userData.MapDisplay[e]) {
                $scope.addLayer(e);
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CONTROLLER EVENTS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.$on('leafletDirectiveMap.overlayremove', function (event, target) {
        angular.noop();
    });

    $scope.$on('leafletDirectiveMap.overlayadd', function (event, target) {
        $scope.updateMapData();
    });
});