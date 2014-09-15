angular.module('BathCouncil', ['ionic','leaflet-directive','MyBath.BathDataService','MyBath.ReportsService','MyBath.UserDataService', 'MyBath.Controllers'])
 .config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('menu', {
			url: "/menu",
			abstract: true,
			templateUrl: "templates/menu.html"
		})
		.state('menu.reports', {
			url: "/reports",
			views: {
				'mainContent': {
					templateUrl: "templates/reports.html"
				}
			}
		})
		.state('menu.local', {
			url: "/local",
			views: {
				'mainContent': {
					templateUrl: "templates/local-data.html"
				}
			}
		})
		.state('menu.details', {
			url: "/details",
			views: {
				'mainContent': {
					templateUrl: "templates/details.html"
				}
			}
		})
		.state('menu.map', {
			url: "/map",
			views: {
				'mainContent': {
					templateUrl: "templates/map.html"
				}
			}
		})
		.state('menu.mycouncil', {
			url: "/mycouncil",
			views: {
				'mainContent': {
					templateUrl: "templates/my-council.html"
				}
			}
		})
		.state('menu.home', {
			url: "/home",
			views: {
				'mainContent': {
					templateUrl: "templates/home.html"
				}
			}
		});
		$urlRouterProvider.otherwise("/menu/home");
});
