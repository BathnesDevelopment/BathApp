angular.module('MyBath.Controllers', [])
.controller('BathCouncilController', function ($scope, $state, $timeout, $ionicModal, $ionicLoading, UserData, BathData, Reports, $ionicSideMenuDelegate, $ionicActionSheet, $ionicPopup) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTUP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.currentReport = { firstname:'', lastname:'', useLocation: true, address: '', uprn:'', lat:'', lon: '', photo: 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=' }
    $scope.userData = null;
    $scope.reports = null;
    $scope.currentLocation = null;
    $scope.map = null;
    $scope.mapmarkers = {};

    /////////////////////////////////////////////////////////////////////////////////////////////
    // OnLoad
    // The following all happens on loading the app.
    // - If the app has not been previously loaded then a tutorial is shown.
    // - If there is an existing user registered then their user data is loaded.
    // - Location is detected in the background (not to be used, but to save time later).
    // - The definition for the map is loaded.
    // - Existing reports are loaded.
    /////////////////////////////////////////////////////////////////////////////////////////////

    $scope.map = {
        defaults: {
            tileLayer: "http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png",
            maxZoom: 20,
            zoomControlPosition: 'bottomleft',
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        },
        //markers: $scope.mapmarkers,
        layers: {
            baselayers: {
                MapBox: {
                    name: 'OpenStreetMap',
                    url: 'http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png',
                    type: 'xyz',
                    maxZoom: 20,
                    zoomControlPosition: 'bottomleft',
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            },
            overlays: {
                Schools: {
                    type: 'geoJSON',
                    name: 'Schools',
                    url: 'http://isharemaps.bathnes.gov.uk/MapGetImage.aspx?Type=json&MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&ActiveLayer=PrimarySchools&SearchType=findMyNearest&Distance=1609&MaxResults=50&Easting=375059&Northing=164907',
                    visible: true,
                    layerOptions: {
                        style: {
                            "color": "#00D",
                            "fillColor": "#00D",
                            "weight": 1.0,
                            "opacity": 0.6,
                            "fillOpacity": .2
                        }
                    }
                },
                School2: {
                    type: 'geoJSON',
                    name: 'Schools',
                    url: 'http://isharemaps.bathnes.gov.uk/MapGetImage.aspx?Type=json&MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&ActiveLayer=PrimarySchools&SearchType=findMyNearest&Distance=1609&MaxResults=50&Easting=375059&Northing=164907',
                    visible: true,
                    layerOptions: {
                        style: {
                            "color": "#00D",
                            "fillColor": "#00D",
                            "weight": 1.0,
                            "opacity": 0.6,
                            "fillOpacity": .2
                        }
                    }
                },
                School3: {
                    type: 'geoJSON',
                    name: 'Schools',
                    url: 'http://isharemaps.bathnes.gov.uk/MapGetImage.aspx?Type=json&MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&ActiveLayer=PrimarySchools&SearchType=findMyNearest&Distance=1609&MaxResults=50&Easting=375059&Northing=164907',
                    visible: true,
                    layerOptions: {
                        style: {
                            "color": "#00D",
                            "fillColor": "#00D",
                            "weight": 1.0,
                            "opacity": 0.6,
                            "fillOpacity": .2
                        }
                    }
                }
            }
        },
        center: {
            lat: 51.3821440,
            lng: -2.3589420,
            zoom: 18
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODAL DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt
    // The first report it screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-report.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItModal = modal;
    });
    $scope.reportIt = function () {
        $scope.reportItModal.show();
    };
    $scope.closeReportIt = function () {
        $scope.reportItModal.hide();
    };
    //Submit
    $scope.submitReportItPage1 = function (report) {
        $scope.reportItModal.hide();
        $scope.reportItPhotoModal.show();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Photo
    // Gives the user an option to add a photo to their report.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-photo.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItPhotoModal = modal;
    });
    $scope.reportItPhoto = function () {
        $scope.reportItPhotoModal.show();
    };
    $scope.closeReportIt = function () {
        $scope.reportItPhotoModal.hide();
    };
    // Submit
    $scope.submitReportItPage2 = function (photo) {
        $scope.reportItPhotoModal.hide();
        $ionicLoading.show({
            template: 'Finding location...'
        });
        $scope.geoLocate();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Location
    // Add the user's current location to the report, or allows them to search for an address
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-location.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItLocationModal = modal;
    });
    $scope.reportItLocation = function () {
        $scope.reportItLocationModal.show();
    };
    $scope.closeReportIt = function () {
        $scope.reportItLocationModal.hide();
    };
    // Submit
    $scope.submitReportItPage3 = function (location) {
        $scope.reportItLocationModal.hide();
        $scope.reportItPersonalModal.show();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Personal details
    // Add the user's personal details to the report.  This will be optional.
    /////////////////////////////////////////////////////////////////////////////////////////////
    // set up the report it personal details modal
    $ionicModal.fromTemplateUrl('templates/report-it-personal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItPersonalModal = modal;
    });
    $scope.reportItPersonal = function () {
        $scope.reportItPersonalModal.show();
    };
    $scope.closeReportIt = function () {
        $scope.reportItPersonalModal.hide();
    };
    // Submit
    $scope.submitReportItPage4 = function (report) {
        $scope.reportItPersonalModal.hide();

        Reports.saveReport($scope.currentReport);
        $scope.currentReport = { firstname:'', lastname:'', useLocation: true, address: '', uprn:'', lat:'', lon: '', photo: '' };
    }


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal Cleanup
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.$on('$destroy', function () {
        $scope.reportItModal.remove();
        $scope.reportItLocationModal.remove();
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // APP FUNCTIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: options
    // Displays the options menu
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.options = function () {
        var optionsSheet = $ionicActionSheet.show({
            buttons: [
				{ text: 'Register' },
                { text: 'View instructions' },
                { text: 'Refresh data' },
                { text: '' }],
            destructiveText: 'Clear data',
            titleText: 'App options',
            cancelText: 'Cancel',
            buttonClicked: function (index) {
                if (index == 0) {
                    // either registering or un-registering


                }
                return true;
            }
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: SelectMenu
    // Called to select the current view - currently called in the menu bar and on various buttons 
    // throughout the app.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.selectMenu = function (menuItem) {
        $ionicSideMenuDelegate.toggleLeft(false);

        if (menuItem == 'home') $state.go('menu.home');
        if (menuItem == 'map') $state.go('menu.map');
        if (menuItem == 'reports') $state.go('menu.reports');
		if (menuItem == 'localdata') $state.go('menu.local');
        if (menuItem == 'details') $state.go('menu.details');
        if (menuItem == 'mycouncil') $state.go('menu.mycouncil');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: toggleMenu
    // Moves the sidebar in or out.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showPopup
    // Shows a helper popup - used on various information buttons throughout the app.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showPopup = function (title, message) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: takePhoto
    // Takes a photo, stores it in localStorage.reportPhoto
    // Displays it to the user in photoTaken, which is by default aLinkcolor blank image 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.takePhoto = function () {
        
        function onSuccess(imageURI) {
            // saves to currentReport.photo            
            imageURI = "data:image/jpeg;base64," + imageURI;
            $scope.$apply(function(){
              $scope.currentReport.photo = imageURI;
             });
        }

        function onFail(message) {
            // alert('Failed because: ' + message);
        }
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: geoLocate
    // Stores the geolocation.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.geoLocate = function () {
        function onGeolocationSuccess(position) {
            $scope.currentLocation = position;
            console.log('Latitude: ' + position.coords.latitude + '\n' +
                  'Longitude: ' + position.coords.longitude + '\n' +
                  'Accuracy: ' + position.coords.accuracy + '\n' +
                  'Timestamp: ' + position.timestamp); // debug

            $ionicLoading.hide();
            $scope.currentReport.useLocation = true;
            $scope.currentReport.locationMessage = "Your location has been successfully detected.  If you would like this to be used as part of the report, check the option below.";
            $scope.reportItLocationModal.show();
        };

        function onGeolocationError(error) {
            console.log('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n'); // debug
            $ionicLoading.hide();
            $scope.currentReport.locationMessage = "Your location was not detected.";
            $scope.currentReport.useLocation = false;
            $scope.reportItLocationModal.show();
        }
        navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
    };

})
.controller('MapController', function ($scope, $state, $timeout, $ionicModal, UserData, $ionicSideMenuDelegate, $ionicActionSheet) {

});