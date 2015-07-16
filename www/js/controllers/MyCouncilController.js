angular.module('MyBath.MyCouncilController', [])
.controller('MyCouncilController', function ($scope, $ionicSideMenuDelegate, BathData, $ionicScrollDelegate) {

    $ionicScrollDelegate.scrollTop();

    $scope.myCouncil = BathData.getMyCouncil();

});