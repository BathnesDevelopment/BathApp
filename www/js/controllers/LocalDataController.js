angular.module('MyBath.LocalDataController', [])
.controller('LocalDataController', function ($scope, $ionicScrollDelegate, BathData, $ionicSideMenuDelegate) {
    $ionicScrollDelegate.scrollTop();

    $scope.getData = function ( item ) {
        return $scope.bathDataObject[item];
    }

    $scope.additionalIcons = function ( item ) {
        switch (item) {
            case "librariesNearby":
                return '<a class="tab-item" browse-to="http://www.librarieswest.org.uk/02_Catalogue/02_001_Search.aspx?">'+
                    '<i class="icon ion-android-book positive"></i> Library catalogue</a>';
            case "busStops":
                return '<a class="tab-item" browse-to="http://www.nextbuses.mobi/WebView/BusStopSearch'+
                       '/BusStopSearchResults?id={{userData.addressSearch}}">' +
                       '<i class="icon ion-android-locate assertive"></i> Timetable Search</a>"';
        }
        return "";
    }


    $scope.getDataRows = function ( name ) {
        // returns an array of rowNumbers equal to the number of rows of data that we're showing
        res = [];
        if ($scope.bathDataObject[name]) {
            for (var i = 0; i !== $scope.bathDataObject[name].length; i++){
                if (i % 3 === 0) {
                    res.push(i/3);
                }
            }
            return res;
        }
        console.warn($scope.bathDataObject[name]);
        return [0];
    }

    $scope.getDataCols = function ( name, rowNum ) {
        //returns an array of cols to display
        var res = [];
        if ($scope.bathDataObject[name]) {
            for (i = rowNum *3; i < (rowNum+1)*3; i++) {
                if ($scope.bathDataObject[name][i]) {
                    res.push($scope.bathDataObject[name][i]);
                }
            }
        }
        return res;
    }

    $scope.getLocalHidden = function () {
        var res = [];
        for (var e in $scope.userData.LocalHidden) {
            if ($scope.userData.LocalHidden.hasOwnProperty(e) && $scope.userData.LocalHidden[e]){
               res.push(e);
            }
        }
        return res;
    }


    $scope.getTitle = function (item) {
        switch (item) {
            case "librariesNearby":
                return "Libraries";
            case "busStops":
                return "Bus Stops";
            case "primarySchoolsNearby":
                return "Primary Schools";
            case "roadworksNearby":
                return "Roadworks";
            case "mobileLibrariesNearby":
                return "Mobile Libraries";
            case "playSchoolsNearby":
                return "Nursery/Play Schools";
            case "collegesNearby":
                return "Colleges";
            case "secondarySchoolsNearby":
                return "Secondary Schools";
            case "parkingNearby":
                return "Parking zone";
            case "schoolCrossings":
                return "School Crossings";
            case "healthAndFitnessNearby":
                return "Health & Fitness Centres";
            case "newLicensingAppsNearby":
                return "New License Applications"
            case "planningApplicationsNearby":
                return "Planning Applications";
            case "issuedLicensingAppsNearby":
                return "Issued License Applications";
            case "parksNearby":
                return "Parks Nearby";
            case "playAreasNearby":
                return "Play Areas";
            case "allotmentsNearby":
                return "Allotments";
            case "universitiesNearby":
                return "Universities";
        }
        console.warn("no description for "+ item);
        return item;
    }

    $scope.shownData = function() {
        var LocalHidden = $scope.userData.LocalHidden;
        res = [];
        for (var e in LocalHidden) {
            if (LocalHidden.hasOwnProperty(e) && LocalHidden[e]) {
                res.push(e);
            }
        }
        return res;
    }
});