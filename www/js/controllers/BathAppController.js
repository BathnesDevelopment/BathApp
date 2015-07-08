angular.module('MyBath.BathAppController', [])
.controller('BathAppController', function ($scope, $state, $timeout, $ionicModal, $ionicLoading, UserData, BathData, Reports, Comments, FeedData, $ionicSideMenuDelegate, $ionicActionSheet, $ionicPopup, DataTransformations) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTUP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.currentReport = { type: '', description: '', userFirstname: '', userLastname: '', locationFound: true, useUserLocation: true, usePersonalDetails: true, userAddress: '', userUPRN: '', userLat: '', userLon: '', photo: '', lat: '', long: '' };
    $scope.currentComment = Comments.getDefaultComment();
    $scope.userData = UserData.all();
    $scope.uprn = $scope.userData.uprn;
    $scope.reports = Reports.getReports();
    $scope.comments = Comments.getComments();
    $scope.currentLocation = null;
    $scope.map = null;
    $scope.mapmarkers = {};
    $scope.bathdata = BathData.all();
    $scope.addresses = [];
    $scope.binCollection = [];
    $scope.bathDataObject = BathData.toObj();
    $scope.feedData = FeedData.all();
    $scope.feedDataObject = FeedData.toObj();
    $scope.newBathDataObject = BathData.toNewObj();

    /////////////////////////////////////////////////////////////////////////////////////////////
    // OnLoad
    // The following all happens on loading the app.
    // - If the app has not been previously loaded then a tutorial is shown.
    // - If there is an existing user registered then their user data is loaded.
    // - Location is detected in the background (not to be used, but to save time later).
    // - The definition for the map is loaded.
    //  -Existing reports are loaded.
    /////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////
    // MODAL DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Register Details
    // The first register screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/register-details.html', function (modal) {
        $scope.registerModal = modal;
    }, {
        scope: $scope
    });
    $scope.register = function () {
        $scope.registerModal.show();
    };
    $scope.closeRegister = function () {
        $scope.registerModal.hide();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Register Address
    // Select address screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/register-set-address.html', function (modal) {
        $scope.propertyModal = modal;
    }, {
        scope: $scope
    });
    $scope.setAddress = function () {
        $scope.propertyModal.show();
    };
    $scope.closeSetAddress = function () {
        $scope.propertyModal.hide();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Display options
    // Options screen for local data display
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/options-data-display.html', function (modal) {
        $scope.displayOptionsModal = modal;
    }, {
        scope: $scope
    });
    $scope.displayOptions = function () {
        $scope.displayOptionsModal.show();
    };
    $scope.closeDisplayOptions = function () {
        // Save user data
        UserData.save($scope.userData);
        $scope.displayOptionsModal.hide();

    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: NewComment
    // planning comments screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/comments-new.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.commentModal = modal;
        });
        $scope.newComment = function () {
            $scope.commentModal.show();
            // Dummy reference for testing
            $scope.currentComment.reference = Math.floor((Math.random()*100000000));

            // Populate the form with user address, if that info exists
            if ($scope.userData.address) {
                $scope.currentComment.address = $scope.userData.address;
            }
            if ($scope.userData.phone) {
                $scope.currentComment.userPhone = $scope.userData.phone;
            }
            if ($scope.userData.email) {
                $scope.currentComment.userEmail = $scope.userData.email;
            }
        };
        $scope.closeComment = function () {
            $scope.commentModal.hide();
        };
        //Submit
        $scope.submitCommentPage1 = function (comment) {
            if ($scope.currentComment.type) {

                $scope.commentModal.hide();
                $scope.commentComposeModal.show();
                return;
            }
        };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Comment Compose
    // planning comments screen: Compose comment
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/comments-compose.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.commentComposeModal = modal;
        });
        $scope.submitComment = function(comment) {
            $scope.commentComposeModal.hide();
            Comments.addComment($scope.currentComment);
            $scope.currentComment = Comments.getDefaultComment();
            $scope.comments = Comments.getComments();
    };

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
    $scope.closeReportItPhoto = function () {
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
    $scope.closeReportItLocation = function () {
        $scope.reportItLocationModal.hide();
    };
    // Submit
    $scope.submitReportItPage3 = function (location) {
        if ($scope.currentReport.useUserLocation) {
            $scope.currentReport.lat = $scope.currentLocation.coords.latitude;
            $scope.currentReport.long = $scope.currentLocation.coords.longitude;
        }
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
    $scope.closeReportItPersonal = function () {
        $scope.reportItPersonalModal.hide();
    };
    // Submit
    $scope.submitReportItPage4 = function (report) {
        $scope.reportItPersonalModal.hide();
        Reports.addReport($scope.currentReport);
        $scope.currentReport = { type: '', description: '', userFirstname: '', userLastname: '', useUserLocation: true, usePersonalDetails: true, userAddress: '', userUPRN: '', userLat: '', userLon: '', photo: '', lat: '', long: '' };
        $scope.reports = Reports.getReports();
    };

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
    // Function: searchUserAddress
    // Searches for the user address
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.searchUserAddress = function (addressSearch) {
        if (addressSearch) {
            $scope.closeRegister();
            $ionicLoading.show({
                template: 'Searching...'
            });
            UserData.fetchUprn(addressSearch)
                .then(function (data) {
                    // check for whether we have postcode results
                    if (data && data !== "Failed") {
                        $ionicLoading.hide();
                        $scope.addresses = data;
                        $scope.setAddress();
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'No addresses found',
                            content: 'Sorry, couldn\'t find address.  Check search terms and internet connection.'
                        }).then(function (res) {

                        });
                    }
                });
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: setProperty
    // Sets the user selected property during registration
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.setProperty = function (uId, X, Y, address) {
        $scope.propertyModal.hide();
        $ionicLoading.show({
            template: 'Fetching data...'
        });
        $scope.uprn = uId;
        var LatLong = DataTransformations.NEtoLL(parseFloat(X), parseFloat(Y));
        UserData.save({ "address": address, "uprn": uId, "addressSearch": $scope.userData.addressSearch, "firstname": $scope.userData.firstname, "lastname": $scope.userData.lastname, "email": $scope.userData.email, "phone": $scope.userData.phone, "lat": LatLong.latitude, "lon": LatLong.longitude, "LocalHidden": {} });
        $scope.userData = UserData.all();
        FeedData.fetchAll(LatLong.latitude, LatLong.longitude)
            .then(function (data) {
                if (data && data != []) {
                    $scope.feedData = data;
                    $scope.feedDataObject = FeedData.toObj();
                }
            });
        BathData.fetchAll(uId)
            .then(function (data) {
                if (data && data != []) {
                    $scope.bathdata = data;
                    $scope.bathDataObject = BathData.toObj();
                    $ionicLoading.hide();
                }
                else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error downloading data',
                        content: 'Please check connection and try again.'
                    }).then(function (res) {
                    });
                }
            });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: pullRefresh
    // Called by the pull to refresh control
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.pullRefresh = function () {
        if ($scope.userData && $scope.userData.uprn) {
            FeedData.fetchAll($scope.userData.latitude, $scope.userData.longitude)
                .then(function (data) {
                    if (data && data != []) {
                        $scope.feedData = data;
                        $scope.feedDataObject = FeedData.toObj();
                    }
                });
            BathData.fetchAll($scope.userData.uprn)
                .then(function (data) {
                    if (data && data != []) {
                        $scope.bathdata = data;
                        $scope.bathDataObject = BathData.toObj();
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
        else {
            $scope.$broadcast('scroll.refreshComplete');
        }
    };


    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };

    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: options
    // Displays the options menu
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.options = function () {
        var refreshText = '';
        if ($scope.userData.uprn !== undefined) {
            refreshText = 'Refresh data';
        }
        var optionsSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Register' },
                { text: 'View instructions' },
                { text: refreshText },
                { text: '' }],
            destructiveText: 'Clear data',
            titleText: 'App options',
            cancelText: 'Cancel',
            buttonClicked: function (index) {
                if (index === 0) {
                    // either registering or un-registering
                    $scope.register();
                }
                if (index === 2 && $scope.userData.uprn !== undefined) {
                    //Refresh data
                    $ionicLoading.show({
                        template: 'Fetching data...'
                    });
                    FeedData.fetchAll($scope.userData.latitude, $scope.userData.longitude)
                        .then(function (data) {
                            if (data && data != []) {
                                $scope.feedData = data;
                                $scope.feedDataObject = FeedData.toObj();
                            }
                        });
                    BathData.fetchAll($scope.userData.uprn)
                        .then(function (data) {
                            if (data && data != []) {
                                $scope.bathdata = data;
                                $scope.bathDataObject = BathData.toObj();
                                $ionicLoading.hide();
                            }
                            else {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Error downloading data',
                                    content: 'Please check connection and try again.'
                                }).then(function (res) {
                                });
                            }
                        });
                }
                return true;
            },
            destructiveButtonClicked: function () {
                $scope.deleteData();
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
        if (menuItem === 'home') { $state.go('menu.home'); }
        if (menuItem === 'map') { $state.go('menu.map'); }
        if (menuItem === 'reports') { $state.go('menu.reports'); }
        if (menuItem === 'localdata') { $state.go('menu.local'); }
        if (menuItem === 'details') { $state.go('menu.details'); }
        if (menuItem === 'mycouncil') { $state.go('menu.mycouncil'); }
        if (menuItem === 'planning') { $state.go('menu.planningApp');}
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
            template: message,
            buttons: [{
                text: 'OK',
                type: 'button-clear button-full button-positive'
            }]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: deleteData
    // Removes the user's registered data
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.deleteData = function () {
        $ionicPopup.confirm({
            title: 'Clear data',
            template: 'This will clear all stored data on the app.',
            cancelType: 'button-clear button-full button-stable',
            okType: 'button-clear button-full button-assertive'
        }).then(function (res) {
            if (res) {
                UserData.clear();
                BathData.clear();
                $scope.userData = UserData.all(); //Get defaults
                $scope.bathData = {};
                $scope.bathDataObject = {};
                $scope.feedData = {};
                $scope.feedDataObject = {};
            }
        });
    };

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
    // Function: deleteComment
    // Removes a single comment
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.deleteComment = function (index) {
        if ($scope.comments[index]) {
            $scope.comments.splice(index, 1);
            Comments.saveComments($scope.comments);
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showCouncilConnectPopup
    // A popup for council connect
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showCouncilConnectPopup = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Council Connect',
            template: 'Council Connect can help you with a range of enquiries including waste & recycling, roads & highways and general library & planning enquiries.',
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-clear'
                },
                {
                    text: 'Call',
                    type: 'button-clear button-positive',
                    onTap: function (e) {
                    }
                },
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showCouncilConnectPopupOutOfHours
    // A popup for council connect
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showCouncilConnectPopupOutOfHours = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Out of Hours',
            template: 'Council connect details',
            buttons: [
                { text: 'Cancel' },
                {
                    text: 'Save',
                    type: 'button-positive',
                    onTap: function (e) {
                    }
                },
            ]
        });

        alertPopup.then(function (res) {
            // To do: handle the result
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: takePhoto
    // Takes a photo, stores it in localStorage.reportPhoto
    // Displays it to the user in photoTaken, which is by default aLinkcolor blank image
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.takePhoto = function () {
        navigator.camera.getPicture(
            function (imageURI) {
                // saves to currentReport.photo
                imageURI = "data:image/jpeg;base64," + imageURI;
                $scope.$apply(function () {
                    $scope.currentReport.photo = imageURI;
                });
            },
            function (failMessage) {
                // alert('Failed because: ' + message);
            },
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: geoLocate
    // Stores the geolocation.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.geoLocate = function () {

        navigator.geolocation.getCurrentPosition(
            function (position) {
                $scope.currentLocation = position;

                $ionicLoading.hide();
                $scope.currentReport.useLocation = true;
                $scope.currentReport.locationFound = true;
                $scope.currentReport.locationMessage = "Your location has been successfully detected.  If you would like this to be used as part of the report, check the option below.";
                $scope.reportItLocationModal.show();
            },
            function (error) {
                console.warn('code: ' + error.code + '\n' +
                      'message: ' + error.message + '\n'); // debug
                $ionicLoading.hide();
                $scope.currentReport.locationMessage = "Your location was not detected.";
                $scope.currentReport.useLocation = false;
                $scope.currentReport.locationFound = false;
                $scope.reportItLocationModal.show();
            },
            { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: emailCouncilConnect
    // Test function to email Council Connect with the report
    // Uses https://github.com/katzer/cordova-plugin-email-composer/blob/0cc829af59b94b52db63a999064577a6962bf763/README.md
    // This will be replaced at some point
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.emailCouncilConnect = function () {
        try {
            window.plugin.email.open({
                to: ['councilconnect@bathnes.gov.uk'],
                subject: "Message from Bath App",
                body: "",
                isHtml: false
            });
        } catch (err) {
            console.warn(err.message);
            window.location.href = "mailto:councilconnect@bathnes.gov.uk";
        }
    };
});