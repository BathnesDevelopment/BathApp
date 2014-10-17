angular.module('MyBath.MapController', [])
.controller('MapController', function ($scope, $ionicSideMenuDelegate, MapData) {

    $scope.markers = [];


    function addLayer(name) {
      MapData.getLayer(name)
    .then(function (data) {
        if (data && data != "Failed") {
            for (i = 0; i < data.length ; i++) {
                $scope.markers.push(data[i]);
            }
        }
        else {
        }
    });

    }

    addLayer("libraries");
    addLayer("primarySchools");
    addLayer("councilOffices");
    addLayer("playSchools");
    addLayer("secondarySchools");
    addLayer("colleges");
    addLayer("universities");
    addLayer("conservationAreas");
    addLayer("wasteAndRecyling");
    addLayer("healthAndFitness");
    addLayer("playAreas"); // Doesn't really return much useful
    addLayer("tennisCourts");
    addLayer("allotments");
    addLayer("mobileLibaries");
    addLayer("busStops");
    addLayer("roadworks");
    addLayer("carParks");
    addLayer("parks");
    addLayer("openSpaces");
    addLayer("wc");

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
                    name: 'allotments',
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
                    visible: false
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
});