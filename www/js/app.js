angular.module('BathCouncil', ['ionic', 'leaflet-directive', 'MyBath.BathDataService', 'MyBath.ReportsService', 'MyBath.UserDataService', 'MyBath.MapDataService','MyBath.BathAppController','MyBath.LocalDataController','MyBath.CouncilController','MyBath.MapController','MyBath.DataTransformations'])
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
                    templateUrl: "templates/local-data.html",
                    controller: "LocalDataController"
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
                    controller: "CouncilController"
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
})
.filter('title', function() {
    // converts a string (i.e. one in allcaps) to Sentence case
    return function (original) {
        var res = "";
        var words = original.toLowerCase().split(' ');
        var i = 0;
        var j = 0;
        while (i < words.length) {
            if (words[i].charAt(j) === '(') {
                // Deal with ( by adding it to res and processing the string as if it were not there
                res += words[i].charAt(j);
                j++;
                continue;
            }
            res += words[i].charAt(j).toUpperCase() + words[i].slice(j+1);
            i++;
            j = 0;
            if (i !== words.length){
                res += " ";
            }
        }
        return res;
    };
})
//.filter('firstCap')
;