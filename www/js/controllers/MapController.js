angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, $ionicModal, MapData, leafletEvents, UserData) {
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.markers = [];
    $scope.fetching = {};
    $scope.mapLayers = {};

    MapData.getLayers().then(function (layers) {
        $scope.mapLayers = layers;
    });

    $scope.getCategories = function () {
        var res = [];
        var isIn = function (element, list) {
            //returns true if the element is in the list
            for (var i = 0; i < list.length; i++) {
                if (element === list[i]) {
                    return true;
                }
            }
            return false;
        };
        for (var e in $scope.mapLayers.data) {
            if ($scope.mapLayers.data.hasOwnProperty(e)) {
                if (!isIn($scope.mapLayers.data[e].category, res)) {
                    res.push($scope.mapLayers.data[e].category);
                }
            }
        }
        return res;
    };

    $scope.getItemsInCategory = function (category) {
        var res = [];
        for (var e in $scope.mapLayers.data) {
            if ($scope.mapLayers.data.hasOwnProperty(e) && $scope.mapLayers.data[e] && $scope.mapLayers.data[e].category === category) {
                res.push($scope.mapLayers.data[e]);
            }
        }
        return res;
    };

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
        layers: { },
		geojson: { }
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
    $scope.addLayer = function(name) {
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
            .then(function (data) {
                if (data && data != "Failed") {
                    for (i = 0; i < data.length ; i++) {
                        if (!$scope.alreadyMarked(data[i].message)) {
                            //$scope.markers.push(data[i]);
							$scope.map.geojson[name] = data;
                        }
                    }
                }
                $scope.fetching[name][0] = false;
            });
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: alreadyMarked
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.alreadyMarked = function (markerData) {
        for (var i = 0; i < $scope.markers.length; i++) {
            if (markerData === $scope.markers[i].message) { return true; }
        }
        return false;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateMapData
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateMapData = function () {

        //var i = $scope.markers.length;

        // Loop through markers, remove any that are from inactive layers
        //while (i--) {
            //if (i === -1) { break; }
            //if (!$scope.userData.MapDisplay[$scope.markers[i].layer] == true) {
                //$scope.markers.splice(i, 1);
            //}
        //}

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