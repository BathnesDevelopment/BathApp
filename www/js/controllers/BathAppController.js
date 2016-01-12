angular.module('MyBath.BathAppController', [])
.controller('BathAppController', function ($scope, $state, $timeout, $ionicModal, $ionicLoading, $cordovaStatusbar, $cordovaCalendar, $cordovaCamera, $cordovaGeolocation, $ionicPlatform, UserData, BathData, Reports, Comments, NewsData, LiveTravel, $ionicSideMenuDelegate, $ionicActionSheet, $ionicPopup, DataTransformations) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTUP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////

    // Load up the user data and registration process variables
    $scope.userData = UserData.all();
    $scope.addresses = [];

    // Data object for My Council page
    $scope.myCouncil = BathData.getMyCouncil();

    // Data object for My Nearest page
    $scope.myNearest = BathData.getMyNearest();

    // Data object for My House page
    $scope.myHouse = BathData.getMyHouse();

    // Data object for Health providers page
    $scope.health = BathData.getHealth();

    // Report services data
    $scope.reportServices = [];
    Reports.getServices().then(function (reportServices) {
        $scope.reportServices = reportServices;
    });

    // Data object for latest news.
    $scope.news = {};
    NewsData.fetch().then(function (news) {
        if (news && news != [] && news != "Failed") $scope.news = news;
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                            content: 'Sorry, couldn\'t find address.  Check search terms and internet connection.',
                            buttons: [{
                                text: '<b><i class="ion-android-done"></i> Dismiss</b>',
                                type: 'button-clear button-full button-positive'
                            }]
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
    $scope.setProperty = function (uprn, lat, lng, address, postcode) {
        $scope.propertyModal.hide();
        $ionicLoading.show({
            template: 'Fetching data...'
        });
        $scope.uprn = uprn;

        UserData.save({ "address": address, "uprn": uprn, "addressSearch": $scope.userData.addressSearch, "firstname": $scope.userData.firstname, "lastname": $scope.userData.lastname, "email": $scope.userData.email, "phone": $scope.userData.phone, "postcode": postcode, "lat": lat, "lon": lng, "displayCategories": $scope.userData.displayCategories, "pushNotifications": $scope.userData.pushNotifications });
        $scope.userData = UserData.all();

        $scope.pullRefresh();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: pullRefresh
    // Called by the pull to refresh control
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.pullRefresh = function () {
        if ($scope.userData && $scope.userData.uprn && $scope.userData.postcode) {

            BathData.fetchAll($scope.userData.uprn, $scope.userData.postcode)
                .then(function (data) {
                    if (data && data != [] && data != "Failed") {
                        BathData.save(data);
                        $scope.myCouncil = data.myCouncil;
                        $scope.myNearest = data.myNearest;
                        $scope.myHouse = data.myHouse;
                        $scope.health = data.health;
                        $scope.$broadcast('scroll.refreshComplete');
                        $ionicLoading.hide();
                    } else {
                        $scope.$broadcast('scroll.refreshComplete');
                        $ionicLoading.hide();
                        $scope.showPopup('Failed', 'Failed to fetch property data - please try again later.');
                    }
                });
        }
        else {
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
            $scope.showPopup('Set location', 'You need to set your location before refreshing data.');
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: toggleGroup
    // To do:
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: isGroupShown
    // To do:
    /////////////////////////////////////////////////////////////////////////////////////////////
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
            refreshText = '<i class="icon ion-refresh"></i>Refresh data';
        }
        var optionsSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<i class="icon ion-location"></i>Register/Set location' },
                { text: '<i class="icon ion-android-settings"></i>Display options' },
                { text: refreshText }
            ],
            destructiveText: 'Clear data',
            titleText: 'App options',
            cancelText: '<i class="ion-android-close"></i> Cancel',
            buttonClicked: function (index) {
                if (index === 0) {
                    // either registering or un-registering
                    $scope.register();
                }
                if (index === 1) {
                    $scope.displayOptions();
                }
                if (index === 3 && $scope.userData.uprn !== undefined) {
                    //Refresh data
                    $ionicLoading.show({
                        template: 'Fetching data...'
                    });

                    $scope.pullRefresh();
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
    // Function: showPopup
    // Shows a helper popup - used on various information buttons throughout the app.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showPopup = function (title, message) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
            buttons: [{
                text: '<b><i class="ion-android-done"></i> Dismiss</b>',
                type: 'button-clear button-full button-positive'
            }]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: payForIt
    // Presents the user with the various pay for it options (website redirect)
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.payForIt = function () {

        // An elaborate, custom popup
        $scope.payData = {};
        var payPopUp = $ionicPopup.show({
            template: '<label class="item item-input item-select"><div class="input-label">Pay type</div><select ng-model="payData.selection"><option value="BH">Allotments</option><option value="20">Council tax</option><option value="47">Garden waste</option></select>',
            title: 'Pay a bill',
            subTitle: 'Select the type of bill you would like to pay.  This will launch the bathnes.gov.uk website.',
            scope: $scope,
            buttons: [
              {
                  text: '<i class="ion-android-close"></i> Cancel',
                  type: 'button-clear button-full button-stable'
              },
              {
                  text: '<b><i class="ion-card"></i> Pay</b>',
                  type: 'button-clear button-full button-positive',
                  onTap: function (e) {
                      if (!$scope.payData.selection) {
                          e.preventDefault();
                      } else {
                          window.open('https://www.civicaepay.co.uk/BathNES/Webpay_public/webpay/default.aspx?Fund=' + $scope.payData.selection, '_system');
                      }
                  }
              }
            ]
        });
        payPopUp.then(function (res) { });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showItemPopup
    // Shows an item popup - shows information about the item and provides various links
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showItemPopup = function (item) {

        var buttons = [{
            text: '<b><i class="ion-android-done"></i> OK</b>',
            type: 'button-clear button-full button-positive'
        }];
        var template = '<div class="list card">';
        angular.forEach(item, function (val, key) {
            if (!key.match("Name|Max|Min|Easting|Northing|Website|Lat|Lng|photoUrl|Recycling|Household waste|Garden waste|type|Committees|Category|hashKey")) {
                template += '<div class="item item-icon-left"><small><i class="icon ion-home"></i><strong>' + key + '</strong> ' + val + (key == "Distance" ? " metres" : "") + '</small></div>';
            }
        });
        template += '</div>';

        var alertPopup = $ionicPopup.alert({
            title: item.Name,
            template: template,
            buttons: buttons
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
            template: 'This will clear all stored data on the app (including saved reports).',
            cancelType: 'button-clear button-full button-stable',
            okType: 'button-clear button-full button-assertive'
        }).then(function (res) {
            if (res) {
                UserData.clear();
                BathData.clear();
                Reports.saveReports([]);
                Comments.saveComments([]);
                $scope.reports = Reports.getReports();
                $scope.comments = Comments.getComments();
                $scope.userData = UserData.all(); //Get defaults
                $scope.bathData = {};
                $scope.myCouncil = {};
                $scope.myNearest = {};
                $scope.myHouse = {};
                $scope.health = {};
                $scope.bathDataObject = {};
                $scope.feedData = {};
                $scope.feedDataObject = {};
            }
        });
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
    // Function: openWebsite
    // A general popup when opening external sites
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.openWebsite = function (url) {
        var alertPopup = $ionicPopup.alert({
            title: 'External link',
            template: 'Open the following link in your default browser ' + url + '?',
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-android-open"></i> Website</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {
                        window.open(url, '_system');
                    }
                }
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: emailTo
    // A general popup for composing an email
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.emailTo = function (emailAddress) {
        var alertPopup = $ionicPopup.alert({
            title: 'Send email',
            template: 'Use default mail app to compose email to: ' + emailAddress + '?',
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-at"></i> Email</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {
                        window.open('mailto:' + emailAddress, '_system');
                    }
                }
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: callNumber
    // A general popup for phone numbers
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.callNumber = function (phone) {
        var alertPopup = $ionicPopup.alert({
            title: 'Call number',
            template: 'Call this number: ' + phone + '?',
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-ios-telephone"></i> Call</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {
                        window.open('tel:' + phone, '_system', 'location=yes');
                    }
                }
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: textTo
    // A general popup for texting
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.textTo = function (phone, body) {
        var alertPopup = $ionicPopup.alert({
            title: 'Compose text',
            template: 'Compose text message to ' + phone + '?',
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-android-textsms"></i> Text</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {
                        window.open('sms:' + phone + '?body=' + body, '_system', 'location=yes');
                    }
                }
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: createEvent
    // Creates an event in the device calendar
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.createEvent = function (name) {
        var alertPopup = $ionicPopup.alert({
            title: 'Create event',
            template: 'Create event:' + name,
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-calendar"></i> Add</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {
                        $cordovaCalendar.createEventWithOptions({
                            title: name,
                            location: $userData.address,
                            notes: '',
                            startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
                            recurrence: 'weekly'
                        }).then(function (result) {
                            // success
                        }, function (err) {
                            // error
                        });
                    }
                },
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateNews
    // Updates the news data - will run on each load
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateNews = function () {
        if (!$scope.refreshingNews) {
            $scope.refreshingNews = true;
            NewsData.fetch()
                    .then(function (data) {
                        if (data && data != [] && data != "Failed") {
                            $scope.news = data;
                            $scope.refreshingNews = false;
                        } else {
                            // use cached data
                            $scope.refreshingNews = false;
                        }
                    });
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
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-ios-telephone"></i> Call</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {
                        window.open('tel:01225394041', '_system', 'location=yes');
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
            template: 'Council connect is open 8.00am – 6.00pm Mon, Tues, Thurs & Fri and 9.30am – 6.00pm on Weds.  An emergency out of hours service is provided.',
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-ios-telephone"></i> Emergency</b>',
                    type: 'button-assertive',
                    onTap: function (e) {
                        window.open('tel:01225477477', '_system', 'location=yes');
                    }
                },
            ]
        });
        alertPopup.then(function (res) {
            // To do: handle the result
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: navigateTo
    // Uses the default map application to navigate
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.navigateTo = function (lat, lng) {

        var alertPopup = $ionicPopup.alert({
            title: 'Navigation',
            template: 'Launch default maps application?',
            buttons: [
                {
                    text: '<i class="ion-android-close"></i> Cancel',
                    type: 'button-clear button-stable'
                },
                {
                    text: '<b><i class="ion-navigate"></i> Navigate</b>',
                    type: 'button-clear button-balanced',
                    onTap: function (e) {

                        var geoUrl = "geo:" + lat + "," + lng + "?q=" + lat + "," + lng;
                        if (ionic.Platform.isIOS()) {
                            geoUrl = 'maps:q=' + lat + "," + lng + '&ll=' + lat + "," + lng;
                        }
                        window.open(geoUrl, '_system');

                    }
                }
            ]
        });
        alertPopup.then(function (res) { });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: emailCouncilConnect
    // Test function to email Council Connect with the report
    // Uses https://github.com/katzer/cordova-plugin-email-composer/blob/0cc829af59b94b52db63a999064577a6962bf763/README.md
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
            window.location.href = "mailto:councilconnect@bathnes.gov.uk";
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: isEmpty
    // Tests whether an object is empty for use in templates
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.isEmpty = function (obj) {
        for (var i in obj) if (i != '$$hashKey' && obj.hasOwnProperty(i)) return false;
        return true;
    };
});