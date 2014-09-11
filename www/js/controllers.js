angular.module('mybath.controllers', [])
.controller('BathCouncilController', function ($scope, $state, $timeout, $ionicModal, UserData, $ionicSideMenuDelegate, $ionicActionSheet,$ionicPopup) {
    // Load or initialize projects
    //$scope.user = UserDATA.getUser();

    // Called to select the given project
    $scope.selectMenu = function (menuItem) {
        $ionicSideMenuDelegate.toggleLeft(false);
		
		if (menuItem == 'home') $state.go('menu.home');
		if (menuItem == 'map')
		{
			//$state.transitionTo('menu.map', {
				//location: true, inherit: true, relative: $state.$current, notify: true, reload: true
			//});
			$state.go('menu.map');
		}
		if (menuItem == 'reports') $state.go('menu.reports');
		if (menuItem == 'details') $state.go('menu.details');
		if (menuItem == 'mycouncil') $state.go('menu.mycouncil');
    };

    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
	
	// A popup dialog
	$scope.showPopup = function(title,message) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: message
		});
		alertPopup.then(function(res) {
		});
	};

    // set up the report it first modal
    $ionicModal.fromTemplateUrl('report-it-report.html', {
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
    // Clean-up the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.reportItModal.remove();
		$scope.reportItLocationModal.remove();
    });
    // set up the report it photo modal
    $ionicModal.fromTemplateUrl('report-it-photo.html', {
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

    // set up the report it location modal
    $ionicModal.fromTemplateUrl('report-it-location.html', {
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

    // set up the report it personal details modal
    $ionicModal.fromTemplateUrl('report-it-personal.html', {
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

    $scope.submitReportItPage1 = function (report) {
        $scope.reportItModal.hide();
        $scope.reportItPhotoModal.show();
    };

    $scope.submitReportItPage2 = function (photo) {
        $scope.reportItPhotoModal.hide();
        $scope.reportItLocationModal.show();
    };

    $scope.submitReportItPage3 = function (location) {
        $scope.reportItLocationModal.hide();
        $scope.reportItPersonalModal.show();
    };

	$scope.submitReportItPage3 = function (report) {
        $scope.reportItPersonalModal.hide();
		// we need to store the report - and then run a sync
    }
	
	$scope.map = {
		defaults: {
			tileLayer: "http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png",
			maxZoom: 20,
			zoomControlPosition: 'bottomleft',
			path: {
				weight: 10,
				color: '#800000',
				opacity: 1 }
		},
		layers: {
			baselayers:{
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
					type: 'group',
					name: 'Schools',
					visible: false
				},
				AirQuality: {
					type: 'group',
					name: 'Air Quality',
					visible: false
				}
			}
		},
		center: {
			lat: 51.3821440,
			lng: -2.3589420,
			zoom: 18
		}
	};

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
					// either registering or unregistering
					
				
				}
                return true;
            }
        });
    };
})
.controller('MapController', function ($scope, $state, $timeout, $ionicModal, UserData, $ionicSideMenuDelegate, $ionicActionSheet) {
	//Astun.JS.IncludeJS('lite',function(){
	//	$('atMap').map = new Astun.JS.Map('atMap',{
	//			'layers':'DCApplications',
	//			'mapSource': 'BathNES/publisher_planning',
	//			view:{easting:375193, northing:165109, zoom:3000}
	//	});
	//});
});