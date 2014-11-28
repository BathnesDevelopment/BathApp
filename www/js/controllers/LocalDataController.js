angular.module('MyBath.LocalDataController', [])
.controller('LocalDataController', function ($scope, $ionicScrollDelegate, BathData, $ionicSideMenuDelegate) {
    $ionicScrollDelegate.scrollTop();
});