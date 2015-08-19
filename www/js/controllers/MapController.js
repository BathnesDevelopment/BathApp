angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, $ionicModal, MapData, leafletEvents, UserData) {
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.fetching = {};
    $scope.mapLayers = {};
    $scope.map = {
        defaults: {
            tileLayer: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a> contributors, <a href="http://cartodb.com/attributions">CartoDB</a>',
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
            zoom: 14,
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
                var popupString = '<strong>' + feature.properties.LayerDisplayName + '</strong><br/>';
                var exclusions = ['Colour', 'Distance', 'Icon', 'LayerName', 'LayerDisplayName'];
                for (var key in feature.properties) {
                    if (exclusions.indexOf(key) == -1) popupString += '<strong>' + key + '</strong> ' + feature.properties[key] + '<br/>';
                }
                layer.bindPopup(popupString);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ON LOAD
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get the layer list for option display
    MapData.getLayers().then(function (layers) {
        $scope.mapLayers = layers;
    });

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
    // Adds a layer to the map - triggered by options display close
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
    // Function: removeLayer
    // Removes a layer from the map - triggered by options display close
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.removeLayer = function (name) {
        // remove relevant geoJSON objects as well
        for (i = 0; i < $scope.map.geojson.data.features.length; ++i) {
            if ($scope.map.geojson.data.features[i].properties.LayerName == name) {
                $scope.map.geojson.data.features.splice(i, 1);
                --i;
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateMapData
    // Triggered by closing the options display modal - checks for differences and applies changes
    //////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateMapData = function () {
        // Add layers
        for (var e in $scope.userData.MapDisplay) { // Generate a list of layers we are displaying
            if ($scope.userData.MapDisplay.hasOwnProperty(e) && $scope.userData.MapDisplay[e]) {
                $scope.addLayer(e);
            }
        }
        // Remove layers
        for (var e in $scope.userData.MapDisplay) { // Generate a list of layers we are displaying
            if ($scope.userData.MapDisplay.hasOwnProperty(e) && !$scope.userData.MapDisplay[e]) {
                $scope.removeLayer(e);
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