angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, $ionicModal, MapData, leafletEvents, UserData) {
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.markers = [];
    $scope.fetching = {};

    $scope.mapData = {data:
        {
       Universities:
        {
            name: "Universities",
            category: "Education",
            icon: {
                type: "awesomeMarker",
                icon: "bug",
                markerColor: "red",
                prefix: "ion"
            },
            pins: [
                    {
                      lat:51.37881967353838,
                      lng:-2.328600315570747,
                      icon:{
                         type:"awesomeMarker",
                         icon:"university",
                         markerColor:"darkred",
                         prefix:"ion"
                      },
                      layer:"Universities",
                      message:"University of Bath"
                    },
                    {
                      lat:51.375672126605394,
                      lng:-2.438370970537237,
                      icon:{
                         type:"awesomeMarker",
                         icon:"university",
                         markerColor:"darkred",
                         prefix:"ion"
                      },
                      layer:"Universities",
                      message:"Bath Spa University"
                    }
            ]
       },
        Colleges:
        {
            name: "Colleges",
            category: "Education",
            icon: {
                type: "awesomeMarker",
                icon: "bug",
                markerColor: "blue",
                prefix: "ion"
            },
            pins: [
                {
                  lat:51.3839681366029,
                  lng:-2.363389737240762,
                  icon:{
                     type:"awesomeMarker",
                     icon:"university",
                     markerColor:"green",
                     prefix:"fa"
                  },
                  layer:"Colleges",
                  message:"Bath Academy"
                },
                {
                  lat:51.3797173147944,
                  lng:-2.362651993222146,
                  icon:{
                     type:"awesomeMarker",
                     icon:"university",
                     markerColor:"green",
                     prefix:"fa"
                  },
                  layer:"Colleges",
                  message:"City Of Bath College"
                },
                {
                  lat:51.39161800175411,
                  lng:-2.3522832435231336,
                  icon:{
                     type:"awesomeMarker",
                     icon:"university",
                     markerColor:"green",
                     prefix:"fa"
                  },
                  layer:"Colleges",
                  message:"Norland College"
                },
                {
                  lat:51.3969371741379,
                  lng:-2.3594821978987874,
                  icon:{
                     type:"awesomeMarker",
                     icon:"university",
                     markerColor:"green",
                     prefix:"fa"
                  },
                  layer:"Colleges",
                  message:"Rusland College Ltd"
                },
                {
                  lat:51.36452641577454,
                  lng:-2.3430834487784513,
                  icon:{
                     type:"awesomeMarker",
                     icon:"university",
                     markerColor:"green",
                     prefix:"fa"
                  },
                  layer:"Colleges",
                  message:"Prior Park College"
                },
                {
                  lat:51.28080410686142,
                  lng:-2.4809598508115815,
                  icon:{
                     type:"awesomeMarker",
                     icon:"university",
                     markerColor:"green",
                     prefix:"fa"
                  },
                  layer:"Colleges",
                  message:"Norton Radstock College"
                }
            ]

        },
        Allotments:
        {
            name: "Allotments",
            category: "Leasure",
            pins:[
                {
                  lat:51.38099195283369,
                  lng:-2.3500750333747944,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Canal Garden"
                },
                {
                  lat:51.37687571940716,
                  lng:-2.3510751722137697,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Abbey View"
                },
                {
                  lat:51.37326442972254,
                  lng:-2.357698485311214,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Lyncombe Hill Farm"
                },
                {
                  lat:51.38644680902663,
                  lng:-2.3719454666669697,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Ring Common"
                },
                {
                  lat:51.38418408464328,
                  lng:-2.375462084416616,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Lower Common East"
                },
                {
                  lat:51.38478373253358,
                  lng:-2.3754669947612905,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Lower Common West"
                },
                {
                  lat:51.389385857099086,
                  lng:-2.3477627443386533,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Hampton Row"
                },
                {
                  lat:51.37164450013343,
                  lng:-2.3711573875665386,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Bloomfield Road"
                },
                {
                  lat:51.39360453963368,
                  lng:-2.3626371923300864,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Richmond Hill"
                },
                {
                  lat:51.36940703050754,
                  lng:-2.362487099431525,
                  icon:{
                     type:"awesomeMarker",
                     icon:"leaf",
                     markerColor:"darkred",
                     prefix:"ion"
                  },
                  layer:"Allotments",
                  message:"Lyncombe Vale"
                }
            ]
        }
    }};

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
        }
        for (var e in $scope.mapData.data) {
            if ($scope.mapData.data.hasOwnProperty(e)) {
                if (!isIn($scope.mapData.data[e].category,res)) {
                    res.push($scope.mapData.data[e].category);
                }
            }
        }
        return res;
    }

    $scope.mapData.getItemsInCategory = function (category) {
        var res = [];
        for (var e in $scope.mapData.data) {
            if ($scope.mapData.data.hasOwnProperty(e) && $scope.mapData.data[e] && $scope.mapData.data[e].category === category ) {
                res.push($scope.mapData.data[e]);
            }
        }
        return res;
    }

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

    $scope.controls = {
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
            MapData.getLayer(name, lat, lng, $scope)
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