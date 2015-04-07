angular.module('MyBath.LocalDataController', [])
.controller('LocalDataController', function ($scope, $ionicScrollDelegate, BathData, $ionicSideMenuDelegate) {

    $ionicScrollDelegate.scrollTop();
    $scope.localData = {};
    for (var e in $scope.newBathDataObject.LocalData.data) {
        if ($scope.newBathDataObject.LocalData.data.hasOwnProperty(e) && $scope.newBathDataObject.LocalData.data[e]) {
            $scope.localData[e] = [];
            for (var i = 0; i < Math.ceil($scope.newBathDataObject.LocalData.data[e].length / 3) ; i++) {
                $scope.localData[e].push($scope.newBathDataObject.LocalData.data[e].slice(i * 3, (i + 1) * 3));
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: getData
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.getData = function (item) {
        return $scope.newBathDataObject.LocalData.data[item];
    };


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: additionalIcons
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.additionalIcons = function (item) {
        switch (item) {
            case "librariesNearby":
                return '<a class="tab-item" browse-to="http://www.librarieswest.org.uk/02_Catalogue/02_001_Search.aspx?">' +
                    '<i class="icon ion-ios-book positive"></i> Library catalogue</a>';
            case "busStops":
                return '<a class="tab-item" browse-to="http://www.nextbuses.mobi/WebView/BusStopSearch' +
                       '/BusStopSearchResults?id={{userData.addressSearch}}">' +
                       '<i class="icon ion-android-locate assertive"></i> Timetable Search</a>"';
        }
        return "";
    };


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: getLocalHidden
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.getLocalHidden = function () {
        var res = [];
        for (var e in $scope.userData.LocalHidden) {
            if ($scope.userData.LocalHidden.hasOwnProperty(e) && $scope.userData.LocalHidden[e]) {
                res.push(e);
            }
        }
        return res;
    };

    
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: getLocalHidden
    // 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.shownData = function () {
        var localHidden = $scope.userData.LocalHidden;
        res = [];
        for (var e in localHidden) {
            if (localHidden.hasOwnProperty(e) && localHidden[e]) {
                res.push(e);
            }
        }
        return res;
    };

});