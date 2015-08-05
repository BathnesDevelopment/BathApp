angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, $ionicModal, MapData, leafletEvents, UserData) {
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.markers = [];
    $scope.fetching = {};

    MapData.getLayers().then(function (res) {
        console.log("resolved");
        console.log(Object.keys(res));
        MapData.getLayer(Object.keys(res)[0]);
        $scope.mapLayers = res;
    });



    $scope.mapData = { data:{}};
    $scope.mapData.getCategories = function () {
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
        for (var e in $scope.mapData.data) {
            if ($scope.mapData.data.hasOwnProperty(e)) {
                if (!isIn($scope.mapData.data[e].category, res)) {
                    res.push($scope.mapData.data[e].category);
                }
            }
        }
        return res;
    };

    $scope.mapData.getItemsInCategory = function (category) {
        var res = [];
        for (var e in $scope.mapData.data) {
            if ($scope.mapData.data.hasOwnProperty(e) && $scope.mapData.data[e] && $scope.mapData.data[e].category === category) {
                res.push($scope.mapData.data[e]);
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
        layers: {
            baselayers: {
                MapBox: {
                    layerOptions: { attribution: '<a browse-to="http://leafletjs.com">Leaflet</a>' },
                    name: 'Map items of interest',
                    url: 'http://{s}.tiles.mapbox.com/v4/bathnes.l28de60p/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYmF0aG5lcyIsImEiOiJuMEw5dHBzIn0.HoLmxVV_1uqwL2xHLw3T1w',
                    type: 'xyz',
                    maxZoom: 20,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            },
            overlays: {
                Libraries: { type: 'group', name: 'Libraries', visible: true },
                PrimarySchools: { type: 'group', name: 'Primary Schools', visible: true },
                Council_Offices: { type: 'group', name: 'Council Offices', visible: true },
                NurseryPlaySchools: { type: 'group', name: 'Play Schools', visible: true },
                SecondarySchools: { type: 'group', name: 'Secondary Schools', visible: true },
                Colleges: { type: 'group', name: 'Colleges', visible: true },
                Universities: { type: 'group', name: 'Universities', visible: true },
                ConAreas: { type: 'group', name: 'Conservation Areas', visible: true },
                HealthandFitnessCentres: { type: 'group', name: 'Health & Fitness Centres', visible: true },
                PlayAreas: { type: 'group', name: 'Play Areas', visible: true },
                TennisCourts: { type: 'group', name: 'Tennis Courts', visible: true },
                Allotments: { type: 'group', name: 'Allotments', visible: true },
                MobileLibraryStops: { type: 'group', name: 'Mobile Library Stops', visible: true },
                BusStops: { type: 'group', name: 'Bus Stops', visible: true },
                Roadworks: { type: 'group', name: 'Roadworks', visible: true },
                CarParks: { type: 'group', name: 'Car Parks (static)', visible: true },
                CarParksLive: { type: 'group', name: 'Car Parks', visible: true },
                Parks: { type: 'group', name: 'Parks', visible: true },
                OpenSpaces: { type: 'group', name: 'Open Spaces', visible: true },
                PublicConveniences: { type: 'group', name: 'Public Conveniences', visible: true },
                AirQuality: { type: 'group', name: 'Air Quality Monitoring', visible: true },
                GPSurgeries: { type: 'group', name: 'GP Surgeries', visible: true }
            }
        },
        markers: $scope.markers
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
            MapData.getLayer(name, lat, lng, $scope.mapData.data)
            .then(function (data) {
                if (data && data != "Failed") {
                    for (i = 0; i < data.length ; i++) {
                        if (!$scope.alreadyMarked(data[i].message)) {
                            $scope.markers.push(data[i]);
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

        var i = $scope.markers.length;

        // Loop through markers, remove any that are from inactive layers
        while (i--) {
            if (i === -1) { break; }
            if (!$scope.userData.MapDisplay[$scope.markers[i].layer] == true) {
                $scope.markers.splice(i, 1);
            }
        }

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