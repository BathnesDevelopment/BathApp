angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, MapData, leafletEvents) {

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.markers = [];

    $scope.fetching = {};

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
                    zoomControlPosicloseDisplayOptionscloseDisplayOptionscion: 'bottomleft',
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            },
            overlays: {
                Libraries: { type: 'group', name: 'Libraries', visible: true },
                PrimarySchools: { type: 'group', name: 'Primary Schools', visible: false },
                Council_Offices: { type: 'group', name: 'Council Offices', visible: true },
                NurseryPlaySchools: { type: 'group', name: 'Play Schools', visible: false },
                SecondarySchools: { type: 'group', name: 'Secondary Schools', visible: false },
                Colleges: { type: 'group', name: 'Colleges', visible: false },
                Universities: { type: 'group', name: 'Universities', visible: true },
                ConAreas: { type: 'group', name: 'Conservation Areas', visible: false },
                HealthandFitnessCentres: { type: 'group', name: 'Health & Fitness Centres', visible: false },
                PlayAreas: { type: 'group', name: 'Play Areas', visible: false },
                TennisCourts: { type: 'group', name: 'Tennis Courts', visible: false },
                Allotments: { type: 'group', name: 'Allotments', visible: true },
                MobileLibraryStops: { type: 'group', name: 'Mobile Library Stops', visible: false },
                BusStops: { type: 'group', name: 'Bus Stops', visible: false },
                Roadworks: { type: 'group', name: 'Roadworks', visible: true },
                CarParks: { type: 'group', name: 'Car Parks (static)', visible: false },
                CarParksLive: { type: 'group', name: 'Car Parks', visible: true },
                Parks: { type: 'group', name: 'Parks', visible: false },
                OpenSpaces: { type: 'group', name: 'Open Spaces', visible: false },
                PublicConveniences: { type: 'group', name: 'Public Conveniences', visible: false },
                AirQuality: { type: 'group', name: 'Air Quality Monitoring', visible: false },
                GPSurgeries: { type: 'group', name: 'GP Surgeries', visible: true }
            }
        },
        markers: $scope.markers
    };

    $scope.controls = {
        custom: [L.control.locate({ follow: true })]
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

        if ($scope.fetching[name] && $scope.fetching[name][0]) {
            return false;
        } else {
            $scope.fetching[name] = [true, new Date()];
            MapData.getLayer(name, lat, lng)
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

    $scope.alreadyMarked = function (markerData) {
        for (var i = 0; i < $scope.markers.length; i++) {
            if (markerData === $scope.markers[i].message) { return true; }
        }
        return false;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CONTROLLER EVENTS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.$on('leafletDirectiveMap.overlayremove', function (event, target) {
        angular.noop();
    });

    $scope.$on('leafletDirectiveMap.overlayadd', function (event, target) {
        for (var overlay in $scope.map.layers.overlays) {
            // Loop to get the real name
            if ($scope.map.layers.overlays[overlay].name === target.leafletEvent.name) {
                $scope.addLayer(overlay);
                return;
            }
        }
    });
});