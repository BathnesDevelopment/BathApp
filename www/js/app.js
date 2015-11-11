angular.module('BathCouncil', ['ionic', 'leaflet-directive', 'ngCordova', 'ngSanitize', 'BathApp.config', 'MyBath.BathDataService', 'MyBath.ReportsService', 'MyBath.CommentsService', 'MyBath.UserDataService', 'MyBath.MapDataService', 'MyBath.NewsDataService', 'MyBath.BathAppController', 'MyBath.ReportsController', 'MyBath.MyNearestController', 'MyBath.MyCouncilController', 'MyBath.MyHouseController', 'MyBath.MapController', 'MyBath.DataTransformations', 'MyBath.BathAppFilters', 'MyBath.BathAppDirectives', 'MyBath.LiveTravelService', 'nvd3'])
.run(function ($ionicPlatform, $cordovaStatusbar) {
    $ionicPlatform.ready(function () {
        if (typeof StatusBar != 'undefined') {
            $cordovaStatusbar.overlaysWebView(false);
            $cordovaStatusbar.style(1);
            if (cordova.platformId == 'android') {
                StatusBar.backgroundColorByHexString("#33AB5F");
            }
            $cordovaStatusbar.show();
        }
    });
})
.config(function ($stateProvider, $urlRouterProvider) {
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
                    templateUrl: "templates/reports.html",
                    controller: "ReportsController"
                }
            }
        })
        .state('menu.news', {
            url: "/news",
            views: {
                'mainContent': {
                    templateUrl: "templates/news.html"
                }
            }
        })
        .state('menu.health', {
            url: "/health",
            views: {
                'mainContent': {
                    templateUrl: "templates/health.html"
                }
            }
        })
        .state('menu.mynearest', {
            url: "/local",
            views: {
                'mainContent': {
                    templateUrl: "templates/my-nearest.html",
                    controller: "MyNearestController"
                }
            }
        })
        .state('menu.myhouse', {
            url: "/house",
            views: {
                'mainContent': {
                    templateUrl: "templates/my-house.html",
                    controller: "MyHouseController"
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
                    templateUrl: "templates/map.html",
                    controller: "MapController"
                }
            }
        })
        .state('menu.mycouncil', {
            url: "/mycouncil",
            views: {
                'mainContent': {
                    templateUrl: "templates/my-council.html",
                    controller: "MyCouncilController"
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
        })
        .state('menu.planningApp', {
            url: "/comments",
            views: {
                'mainContent': {
                    templateUrl: "templates/comments.html"
                }
            }
        });
    $urlRouterProvider.otherwise("/menu/home");
});