angular.module('MyBath.MyHouseController', [])
.controller('MyHouseController', function ($scope, $ionicSideMenuDelegate, BathData, $ionicScrollDelegate) {

    $ionicScrollDelegate.scrollTop();

    // $scope.myHouse = BathData.getMyHouse();

});