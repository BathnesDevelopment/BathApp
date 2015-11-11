angular.module('MyBath.ReportsController', [])
.controller('ReportsController', function ($scope, $state, $timeout, $ionicModal, $ionicLoading, $cordovaCamera, $cordovaGeolocation, $ionicPlatform, UserData, BathData, Reports, DataTransformations) {

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Reports
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.currentReport = { type: '', description: '', userFirstname: '', userLastname: '', locationFound: true, useUserLocation: true, usePersonalDetails: true, userAddress: '', userUPRN: '', userLat: '', userLon: '', photo: '', lat: '', long: '', status: 'Not sent', photo: '' };
    $scope.reports = Reports.getReports();

    $scope.reportMap = {
        defaults: {
            tileLayer: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png',
            maxZoom: 16,
            zoomControlPosition: 'bottomleft'
        },
        maxbounds: {
            northEast: { lat: 51.439536, lng: -2.278544 },
            southWest: { lat: 51.273101, lng: -2.705955 }
        },
        center: { lat: 51.3821440, lng: -2.3589420, zoom: 16 },
        markers: { reportItMarker: { lat: 0, lng: 0, focus: true, message: "Drag me to adjust position of report", draggable: true } }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODAL DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Category
    // The first report it screen - user selects a category
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-report.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItCategoryModal = modal;
    });
    $scope.reportIt = function () {
        $scope.reportItCategoryModal.show();
    };
    $scope.closeReportIt = function () {
        $scope.reportItCategoryModal.hide();
    };
    //Submit
    $scope.submitReportItCategory = function (report) {
        if (report.service) {
            $scope.currentReport.userFirstname = $scope.userData.firstname;
            $scope.currentReport.userLastname = $scope.userData.lastname;
            $scope.currentReport.userEmail = $scope.userData.email;
            $scope.currentReport.userPhone = $scope.userData.phone;
            $scope.currentReport.userAddress = $scope.userData.address;
            $scope.currentReport.userUPRN = $scope.userData.uprn;
            $scope.reportItCategoryModal.hide();
            $scope.reportItDetailsModal.show();
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Details
    // The description field and any other custom fields
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-details.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItDetailsModal = modal;
    });
    $scope.closeReportIt = function () {
        $scope.reportItDetailsModal.hide();
    };
    //Submit
    $scope.submitReportItDetails = function (report) {
        $scope.reportItDetailsModal.hide();

        // We only show the photo dialog if 'photo' is one of the attributes on the service.
        if (report.service.attributes[0] && report.service.attributes[0].code == 'photo') {
            $scope.reportItPhoto();
        } else {
            $scope.reportItLocation();
        }
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
    $scope.closeReportItPhoto = function () {
        $scope.reportItPhotoModal.hide();
    };
    // Submit
    $scope.submitReportItPhoto = function (photo) {
        $scope.reportItPhotoModal.hide();
        $scope.reportItLocation();
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
        $ionicLoading.show({
            template: 'Finding location...'
        });
        var posOptions = { timeout: 5000, enableHighAccuracy: true };
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
              $scope.currentLocation = position;
              $scope.updateMap(position);
              $ionicLoading.hide();
              $scope.currentReport.locationFound = true;
              $scope.currentReport.locationMessage = "Your location has been successfully detected.  If you would like this to be used as part of the report, check the option below.";
              $scope.reportItLocationModal.show();
          }, function (error) {
              $ionicLoading.hide();
              $scope.currentReport.locationMessage = "Your location was not detected.";
              $scope.currentReport.locationFound = false;
              $scope.reportItLocationModal.show();
          });
    };
    $scope.closeReportItLocation = function () {
        $scope.reportItLocationModal.hide();
    };
    $scope.submitReportItLocation = function (report) {

        // User must select an option for location.
        if (report.userLocationOption) {
            $scope.reportItLocationModal.hide();

            if (report.userLocationOption == 'useDetected') {
                $scope.currentReport.lat = $scope.currentLocation.coords.latitude;
                $scope.currentReport.long = $scope.currentLocation.coords.longitude;
                $scope.reportItPersonal();
            }

            if (report.userLocationOption == 'newAddress') {
                // Details will have been set by the form.
                $scope.reportItPersonal();
            }

            if (report.userLocationOption == 'userAddress') {
                // Fill out the location by the saved user details.
                $scope.currentReport.address = $scope.userData.address;
                $scope.currentReport.addressId = $scope.userData.uprn;
                $scope.reportItPersonal();
            }

            if (report.userLocationOption == 'mapLocation') {
                $scope.reportItMap();
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Map
    // Allows the user to customise the detected location
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-map.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItMapModal = modal;
    });
    $scope.reportItMap = function () {
        $scope.reportItMapModal.show();
    };
    $scope.closeReportItMap = function () {
        $scope.reportItMapModal.hide();
    };
    // Submit
    $scope.submitReportItMap = function (location) {
        $scope.currentReport.lat = $scope.reportMap.markers.reportItMarker.lat;
        $scope.currentReport.long = $scope.reportMap.markers.reportItMarker.lng;
        $scope.reportItMapModal.hide();
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
    $scope.closeReportItPersonal = function () {
        $scope.reportItPersonalModal.hide();
    };
    // Submit
    $scope.submitReportItPersonal = function (report) {
        $scope.reportItPersonalModal.hide();

        // To do: deal with photos as a file.

        $scope.currentReport.photo = '';
        Reports.addReport($scope.currentReport);
        $scope.currentReport = { type: '', description: '', userFirstname: '', userLastname: '', useUserLocation: true, usePersonalDetails: true, userAddress: '', userUPRN: '', userLat: '', userLon: '', photo: '', lat: '', long: '', status: 'Not sent', photo: '' };
        $scope.reports = Reports.getReports();
        $scope.submitReports();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal Cleanup
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.$on('$destroy', function () {
        $scope.reportItModal.remove();
        $scope.reportItLocationModal.remove();
    });

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: deleteReport
    // Removes a single user report
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.deleteReport = function (index) {
        if ($scope.reports[index]) {
            $scope.reports.splice(index, 1);
            Reports.saveReports($scope.reports);
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: submitReports
    // Submits all outstanding reports.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.submitReports = function () {
        $ionicLoading.show({
            template: 'Submitting reports...'
        });
        Reports.submitReports().then(function (data) {
            $ionicLoading.hide();
            var message = '';
            if (data && data == "Failed") {
                message = 'Failed.  Please try again later.'
            }
            else if (data && data.length == 0) {
                message = 'No outstanding reports.'
            }
            else if (data && data.length > 0) {
                message = 'Succeeded.';
                Reports.saveReports(data);
                $scope.reports = Reports.getReports();
            }

            $ionicPopup.alert({
                title: 'Reports',
                content: message,
                buttons: [{
                    text: '<i class="ion-android-done"></i> Dismiss',
                    type: 'button-clear button-full button-positive'
                }]
            })
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: takePhoto
    // Takes a photo, stores it in localStorage.reportPhoto
    // Displays it to the user in photoTaken, which is by default aLinkcolor blank image
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.takePhoto = function () {

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
            imageURI = "data:image/jpeg;base64," + imageURI;
            $scope.$apply(function () {
                $scope.currentReport.photo = imageURI;
            });
        }, function (err) { });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateMap
    // Sets the Report It map with the current detected position as center.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateMap = function (position) {
        $scope.reportMap.center.lat = position.coords.latitude;
        $scope.reportMap.center.lng = position.coords.longitude;
        $scope.reportMap.markers.reportItMarker.lat = position.coords.latitude;
        $scope.reportMap.markers.reportItMarker.lng = position.coords.longitude;
    };
});