angular.module('MyBath.MyNearestController', [])
.controller('MyNearestController', function ($scope, $ionicScrollDelegate, BathData, $ionicSideMenuDelegate) {

    $ionicScrollDelegate.scrollTop();

    // $scope.myNearest = BathData.getMyNearest();

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: filterData
    // Filters the data based on
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.filterMyNearest = function () {
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