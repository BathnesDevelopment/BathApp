angular.module('MyBath.LocalDataController', [])
.controller('LocalDataController', function ($scope, $ionicScrollDelegate, BathData, $ionicSideMenuDelegate) {
    $ionicScrollDelegate.scrollTop();

    $scope.getData = function ( item ) {
        return $scope.newBathDataObject.LocalData.data[item];
    };

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
    };


    $scope.getDataRows = function ( name ) {
        // returns an array of rowNumbers equal to the number of rows of data that we're showing
        res = [];
        if ($scope.newBathDataObject.LocalData.data[name]) {
            for (var i = 0; i !== $scope.newBathDataObject.LocalData.data[name].length; i++){
                if (i % 3 === 0) {
                    res.push(i/3);
                }
            }
            return res;
        }
        console.warn($scope.newBathDataObject.LocalData.data[name],name);
        return [0];
    };

    $scope.getDataCols = function ( name, rowNum ) {
        //returns an array of cols to display
        var res = [];
        if ($scope.newBathDataObject.LocalData.data[name]) {
            for (i = rowNum *3; i < (rowNum+1)*3; i++) {
                if ($scope.newBathDataObject.LocalData.data[name][i]) {
                    res.push($scope.newBathDataObject.LocalData.data[name][i]);
                }
            }
        }
        return res;
    };

    $scope.getLocalHidden = function () {
        var res = [];
        for (var e in $scope.userData.LocalHidden) {
            if ($scope.userData.LocalHidden.hasOwnProperty(e) && $scope.userData.LocalHidden[e]){
               res.push(e);
            }
        }
        return res;
    };

    $scope.shownData = function() {
        var LocalHidden = $scope.userData.LocalHidden;
        res = [];
        for (var e in LocalHidden) {
            if (LocalHidden.hasOwnProperty(e) && LocalHidden[e]) {
                res.push(e);
            }
        }
        return res;
    };
});