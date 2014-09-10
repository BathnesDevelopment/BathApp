angular.module('BathCouncil', ['ionic'])
 .config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('menu', {
			url: "/menu",
			abstract: true,
			templateUrl: "menu.html"
		})
		.state('menu.reports', {
			url: "/reports",
			views: {
				'mainContent': {
					templateUrl: "reports.html"
				}
			}
		})
		.state('menu.details', {
			url: "/details",
			views: {
				'mainContent': {
					templateUrl: "details.html"
				}
			}
		})
		.state('menu.map', {
			url: "/map",
			views: {
				'mainContent': {
					templateUrl: "map.html"
				}
			}
		})
		.state('menu.mycouncil', {
			url: "/mycouncil",
			views: {
				'mainContent': {
					templateUrl: "mycouncil.html"
				}
			}
		})
		.state('menu.home', {
			url: "/home",
			views: {
				'mainContent': {
					templateUrl: "home.html"
				}
			}
		});
		$urlRouterProvider.otherwise("/menu/home");
})
/**
 * The User factory handles saving and loading user data,
 * address lookups and registration.
 */
.factory('User', function () {
    return {
        getUser: function () {
            var userString = window.localStorage['user'];
            if (userString) {
                return angular.fromJson(userString);
            }
            return [];
        },
        save: function (user) {
            window.localStorage['user'] = angular.toJson(user);
        }
    }
})
.factory('Reports', function () {
    return {
        getReports: function () {
            var reports = window.localStorage['reports'];
            if (reports) {
                return angular.fromJson(reports);
            }
            return [];
        },
        saveReports: function (reports) {
            window.localStorage['reports'] = angular.toJson(reports);
        },
        addReport: function (report) {
            var reports = getReports();
			reports.add(report);
			saveReports(reports);
        },
		submitReports: function () {
            var reports = getReports();
			// reports is an array (of whatever length).
			// iterate through and submit to the webservice.  as successes are recorded, remove from array.
			var index;
			for (index = 0; index < reports.length; ++index) {
				$http({
					method: 'POST',
					url: 'request-url',
					data: "message=" + message,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				});
			}
        }
    }
})
.controller('BathCouncilController', function ($scope, $state, $timeout, $ionicModal, User, $ionicSideMenuDelegate, $ionicActionSheet,$ionicPopup) {
    // Load or initialize projects
    $scope.user = User.getUser();

    // Called to select the given project
    $scope.selectMenu = function (menuItem) {
        $ionicSideMenuDelegate.toggleLeft(false);
		
		if (menuItem == 'home') $state.go('menu.home');
		if (menuItem == 'map')
		{
			$state.transitionTo('menu.map', {
				location: true, inherit: true, relative: $state.$current, notify: true, reload: true
			});
			//$state.go('menu.map');
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
.controller('MapController', function ($scope, $state, $timeout, $ionicModal, User, $ionicSideMenuDelegate, $ionicActionSheet) {
	Astun.JS.IncludeJS('lite',function(){
		$('atMap').map = new Astun.JS.Map('atMap',{
				'layers':'DCApplications',
				'mapSource': 'BathNES/publisher_planning',
				view:{easting:375193, northing:165109, zoom:3000}
		});
	});
});