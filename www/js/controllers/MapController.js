angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, MapData, leafletEvents) {

    $scope.markers = [];

    $scope.fetching = {};
    function addLayer(name,lat,lng) {
        if ($scope.fetching[name]) {
            return false;
        } else {
            $scope.fetching[name] = true;
            MapData.getLayer(name,lat,lng)
            .then(function (data) {
                if (data && data != "Failed") {
                    if (! data[0].layer ){
                    console.log("what? " + name);
                    console.log(data[0]);
                    }
                    for (i = 0; i < data.length ; i++) {
                        if (! alreadyMarked(data[i].message) ) {
                            $scope.markers.push(data[i]);
                            if ($scope.markers.length%10 === 0) {
                                console.log($scope.markers.length);
                            }
                            if ($scope.markers.length > 300) {
                                // Gets laggy at about 300 markers, user may well have moved away from starting position
                                $scope.markers = $scope.markers.slice($scope.markers.length-100);
                            }
                        }
                    }
                }
                $scope.fetching[name] = false;
            });
        }
    }

    function alreadyMarked(markerData) {
        for (var i = 0; i < $scope.markers.length; i++) {
            if (markerData === $scope.markers[i].message) {
                return true;
            }
        }
        return false;
    }

    $scope.$on('leafletDirectiveMap.moveend', function(event) {
        addLayer("Libraries",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("PrimarySchools",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("Council_Offices",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("NurseryPlaySchools",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("SecondarySchools",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("Colleges",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("Universities",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("ConAreas",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("CivicAmenitySites",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("HealthandFitnessCentres",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("PlayAreas",$scope.map.center.lat, $scope.map.center.lng); // Doesn't really return much useful info
        addLayer("TennisCourts",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("Allotments",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("MobileLibraryStops",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("BusStops",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("Roadworks",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("CarParks",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("Parks",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("OpenSpaces",$scope.map.center.lat, $scope.map.center.lng);
        addLayer("PublicConveniences",$scope.map.center.lat, $scope.map.center.lng);
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
                },
                PrimarySchools: {
                    type: 'group',
                    name: 'Primary Schools',
                    visible: true
                },
                Council_Offices: {
                    type: 'group',
                    name: 'Council Offices',
                    visible: false
                },
                NurseryPlaySchools: {
                    type: 'group',
                    name: 'Play Schools',
                    visible: false
                },
                SecondarySchools: {
                    type: 'group',
                    name: 'Secondary Schools',
                    visible: true
                },
                Colleges: {
                    type: 'group',
                    name: 'Colleges',
                    visible: false
                },
                Universities: {
                    type: 'group',
                    name: 'Universities',
                    visible: false
                },
                ConAreas: { //TODO: Update the display of this
                    type: 'group',
                    name: 'Conservation Areas',
                    visible: false
                },
                CivicAmenitySites: {
                    type: 'group',
                    name: 'Wase & Recyling Sites',
                    visible: false
                },
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
                    visible: false
                },
                MobileLibraryStops: {
                    type: 'group',
                    name: 'Mobile Library Stops',
                    visible: false
                },
                BusStops: {
                    type: 'group',
                    name: 'Bus Stops',
                    visible: true
                },
                Roadworks: {
                    type: 'group',
                    name: 'Roadworks',
                    visible: false
                },
                CarParks: {
                    type: 'group',
                    name: 'Car Parks',
                    visible: false
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
                }
            }
        },
        markers: $scope.markers
    };

    addLayer("Libraries",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("PrimarySchools",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("Council_Offices",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("NurseryPlaySchools",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("SecondarySchools",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("Colleges",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("Universities",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("ConAreas",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("CivicAmenitySites",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("HealthandFitnessCentres",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("PlayAreas",$scope.map.center.lat, $scope.map.center.lng); // Doesn't really return much useful info
    addLayer("TennisCourts",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("Allotments",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("MobileLibraryStops",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("BusStops",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("Roadworks",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("CarParks",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("Parks",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("OpenSpaces",$scope.map.center.lat, $scope.map.center.lng);
    addLayer("PublicConveniences",$scope.map.center.lat, $scope.map.center.lng);

});
