angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, MapData, leafletEvents) {

    $scope.markers = [];
    $scope.fetching = {};
    function addLayer(name,lat,lng) {
        lat = $scope.map.center.lat;
        lng = $scope.map.center.lng;

        if ($scope.fetching[name] && $scope.fetching[name][0]) {
            return false;
        } else {
            $scope.fetching[name] = [true, new Date()];
            MapData.getLayer(name,lat,lng)
            .then(function (data) {
                if (data && data != "Failed") {
                    for (i = 0; i < data.length ; i++) {
                        if (! alreadyMarked(data[i].message) ) {
                            $scope.markers.push(data[i]);
                            //if ($scope.markers.length > 300) {
                                // Gets laggy at about 300 markers, user may well have moved away from starting position
                                //$scope.markers = $scope.markers.slice($scope.markers.length-100);
                            //}
                        }
                    }
                }
                $scope.fetching[name][0] = false;
            });
        }
    }

    function alreadyMarked(markerData) {
        for (var i = 0; i < $scope.markers.length; i++) {
            if (markerData === $scope.markers[i].message) { return true; }
        }
        return false;
    }

   $scope.$on('leafletDirectiveMap.overlayremove', function(event, target){
                    angular.noop();
                });

     $scope.$on('leafletDirectiveMap.overlayadd', function(event, target){
                    for (var overlay in $scope.map.layers.overlays) {
                        // Loop to get the real name
                        if ($scope.map.layers.overlays[overlay].name === target.leafletEvent.name) {
                            addLayer(overlay);
                            return;
                        }
                    }
                });

    $scope.$on('leafletDirectiveMap.moveend', function(event) {
        /*addLayer("Libraries");
        addLayer("PrimarySchools");
        addLayer("Council_Offices");
        addLayer("NurseryPlaySchools");
        addLayer("SecondarySchools");
        addLayer("Colleges");
        addLayer("ConAreas");
        addLayer("CivicAmenitySites");
        addLayer("HealthandFitnessCentres");
        addLayer("PlayAreas"); // Doesn't really return much useful info
        addLayer("TennisCourts");
        addLayer("Allotments");
        addLayer("MobileLibraryStops");
        addLayer("Roadworks");
        addLayer("Parks");
        addLayer("OpenSpaces");
        addLayer("PublicConveniences");*/
        
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
            zoom: 18,
            autoDiscover: true,

        },
        layers: {
            baselayers: {
                MapBox: {
                    layerOptions: { attribution: '<a browse-to="http://leafletjs.com">Leaflet</a>' },
                    name: 'Map items of interest',
                    url: 'http://{s}.tiles.mapbox.com/v3/brysona.k5b5fb46/{z}/{x}/{y}.png',
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
                },
                PrimarySchools: {
                    type: 'group',
                    name: 'Primary Schools',
                    visible: false
                },
                Council_Offices: {
                    type: 'group',
                    name: 'Council Offices',
                    visible: true
                },
                NurseryPlaySchools: {
                    type: 'group',
                    name: 'Play Schools',
                    visible: false
                },
                SecondarySchools: {
                    type: 'group',
                    name: 'Secondary Schools',
                    visible: false
                },
                Colleges: {
                    type: 'group',
                    name: 'Colleges',
                    visible: false
                },
                Universities: {
                    type: 'group',
                    name: 'Universities',
                    visible: true
                },
                ConAreas: { //TODO: Update the display of this
                    type: 'group',
                    name: 'Conservation Areas',
                    visible: false
                },
                /*CivicAmenitySites: {
                    type: 'group',
                    name: 'Waste & Recyling Sites',
                    visible: false
                },*/
                HealthandFitnessCentres: {
                    type: 'group',
                    name: 'Health & Fitness Centres',
                    visible: false
                },
                PlayAreas: {
                    type: 'group',
                    name: 'Play Areas',
                    visible: false
                },
                TennisCourts: {
                    type: 'group',
                    name: 'Tennis Courts',
                    visible: false
                },
                Allotments: {
                    type: 'group',
                    name: 'Allotments',
                    visible: true
                },
                MobileLibraryStops: {
                    type: 'group',
                    name: 'Mobile Library Stops',
                    visible: false
                },
                BusStops: {
                    type: 'group',
                    name: 'Bus Stops',
                    visible: false
                },
                Roadworks: {
                    type: 'group',
                    name: 'Roadworks',
                    visible: false
                },
                CarParks: {
                    type: 'group',
                    name: 'Car Parks (static)',
                    visible: false
                },
                 CarParksLive: {
                    type: 'group',
                    name: 'Car Parks',
                    visible: true
                },
                Parks: {
                    type: 'group',
                    name: 'Parks',
                    visible: false
                },
                OpenSpaces: {
                    type: 'group',
                    name: 'Open Spaces',
                    visible: false
                },
                PublicConveniences: {
                    type: 'group',
                    name: 'Public Conveniences',
                    visible: false
                },
                AirQuality: {
                    type: 'group',
                    name: 'Air Quality Monitoring',
                    visible: false
                }
            }
        },
        markers: $scope.markers
    };

    /*addLayer("Libraries");
    addLayer("PrimarySchools");
    addLayer("Council_Offices");
    addLayer("NurseryPlaySchools");
    addLayer("SecondarySchools");
    addLayer("Colleges");
    addLayer("Universities");
    addLayer("ConAreas");
    addLayer("CivicAmenitySites");
    addLayer("HealthandFitnessCentres");
    addLayer("PlayAreas");
    addLayer("TennisCourts");
    addLayer("Allotments");
    addLayer("MobileLibraryStops");
    addLayer("BusStops");
    addLayer("Roadworks");
    //addLayer("CarParks");
    addLayer("Parks");
    addLayer("OpenSpaces");
    addLayer("PublicConveniences");
    addLayer("CarParksLive");
    addLayer("BusStops");*/


});
