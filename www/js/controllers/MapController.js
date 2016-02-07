angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $ionicModal, MapData, leafletEvents, leafletData, UserData) {
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.fetching = {};
    $scope.mapLayers = {};
    $scope.markers = null;
    $scope.map = {
        defaults: {
            tileLayer: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png',
            attribution: '&copy; OSM contributors, CartoDB',
            attributionControl: false,
            maxZoom: 18,
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
            zoom: 16,
            autoDiscover: true,
        },
        layers: {}
    };

    $scope.geoJson = { type: "FeatureCollection", features: [] };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ON LOAD
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get the layer list for option display
    MapData.getLayers().then(function (layers) {
        $scope.mapLayers = layers;

        // Group by category for purposes of display
        $scope.mapLayersByCategory = {};
        for (var layer in layers) {
            var cat = layers[layer]['category'];
            if (!$scope.mapLayersByCategory[cat]) $scope.mapLayersByCategory[cat] = {};
            $scope.mapLayersByCategory[cat][layer] = layers[layer];
        }

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
                //L.control.locate({ follow: true }),
                //L.control.customlayers({ position: 'topright', action: $scope.mapDisplayOptions })
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

        for (i = 0; i < $scope.geoJson.features.length; ++i) {
            if ($scope.geoJson.features[i].properties.LayerName == name) {
                $scope.fetching[name][0] = false;
                $scope.updateMapDisplay();
                return;
            }
        }

        var lat = $scope.map.center.lat;
        var lng = $scope.map.center.lng;

        MapData.getLayer(name, lat, lng)
        .then(function (res) {
            if (res && res != "Failed") {
                Array.prototype.push.apply($scope.geoJson.features, res.features);
                $scope.fetching[name][0] = false;

                // If there are no more currently fetching we update the map
                // This process can be 'angularified' in future by just updating the geoJson but 
                // not currently supported with the marker cluster plugin
                $scope.updateMapDisplay();
            }
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: removeLayer
    // Removes a layer from the map - triggered by options display close
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.removeLayer = function (name) {
        // remove relevant geoJSON objects as well
        for (i = 0; i < $scope.geoJson.features.length; ++i) {
            if ($scope.geoJson.features[i].properties.LayerName == name) {
                $scope.geoJson.features.splice(i, 1);
                --i;
            }
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateMapData
    // Triggered by closing the options display modal - checks for differences and applies changes
    //////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateMapData = function () {

        var loader = false;

        if ($scope.markers != null) {
            $scope.markers.clearLayers();
        }

        $scope.markers = new L.MarkerClusterGroup();

        // Remove layers
        for (var e in $scope.userData.MapDisplay) { // Generate a list of layers we are displaying
            if ($scope.userData.MapDisplay.hasOwnProperty(e) && !$scope.userData.MapDisplay[e]) {
                // Removes all layers that are set to false.
                $scope.removeLayer(e);
            }
        }

        for (var e in $scope.userData.MapDisplay) { // Set all the layers to fetching
            if ($scope.userData.MapDisplay.hasOwnProperty(e) && $scope.userData.MapDisplay[e]) {
                $scope.fetching[e] = [true, new Date()];
            }
        }
        // Add layers
        for (var e in $scope.userData.MapDisplay) { // Generate a list of layers we are displaying
            if ($scope.userData.MapDisplay.hasOwnProperty(e) && $scope.userData.MapDisplay[e]) {
                if (!loader) {
                    // Show the loader
                    $ionicLoading.show({
                        template: 'Loading map...'
                    });
                    loader = true;
                }
                $scope.addLayer(e);
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: mapPopup
    // Shows a map popup - shows information about the item and provides various links
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.mapPopup = function (features, lat, lng) {

        var title = '';
        var buttons = [{
            text: '<b><i class="ion-android-done"></i> OK</b>',
            type: 'button-clear button-full button-stable'
        },
        {
            text: '<b><i class="ion-android-done"></i> Navigate</b>',
            type: 'button-clear button-full button-balanced',
            onTap: function (e) {
                var geoUrl = "geo:" + lat + "," + lng + "?q=" + lat + "," + lng + "(" + title + ")";
                if (ionic.Platform.isIOS()) {
                    geoUrl = 'maps:q=' + title + '&ll=' + lat + "," + lng;
                }
                window.open(geoUrl, '_system');
            }
        }];

        var template = '';
        angular.forEach(features, function (val, key) {
            var exclusions = ['Colour', 'Distance', 'Icon', 'LayerName', 'LayerDisplayName', 'Website', 'Name'];
            if (exclusions.indexOf(key) == -1) template += '<div class="item"><h4>' + key + '</h4><p>' + val + (key == "Distance" ? " metres" : "") + '</p></div>';
            if (key == 'Name') title = val;
        });

        var alertPopup = $ionicPopup.alert({
            title: title,
            template: template,
            buttons: buttons
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateMapDisplay
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateMapDisplay = function () {

        var update = true;
        for (var fetch in $scope.fetching) {
            if ($scope.fetching[fetch][0] == true) update = false;
        }
        if (update) {
            var geoJsonLayer = L.geoJson($scope.geoJson, {
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
                    var exclusions = ['Colour', 'Distance', 'Icon', 'LayerName', 'LayerDisplayName', 'Website'];
                    for (var key in feature.properties) {
                        if (exclusions.indexOf(key) == -1) popupString += '<strong>' + key + '</strong> ' + feature.properties[key] + '<br/>';
                    }

                    // layer.bindPopup(popupString);
                    var clickEvent = function () {
                        $scope.mapPopup(feature.properties, layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]);
                    };
                    layer.on({
                        click: clickEvent
                    });
                }
            });
            $scope.markers.addLayer(geoJsonLayer);
            leafletData.getMap().then(function (map) {
                map.addLayer($scope.markers);
                // Hide the loader
                $ionicLoading.hide();
            });
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CONTROLLER EVENTS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.$on('leafletDirectiveMap.overlayremove', function (event, target) {
        angular.noop();
    });

    $scope.$on('leafletDirectiveMap.overlayadd', function (event, target) {
        angular.noop();
    });

    $scope.$on('leafletDirectiveMap.load', function (event) {
        $scope.updateMapData();
    });
});