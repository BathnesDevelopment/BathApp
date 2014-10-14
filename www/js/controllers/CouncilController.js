angular.module('MyBath.CouncilController', [])
.controller('CouncilController', function ($scope, $ionicSideMenuDelegate, BathData) {
    //$scope.reload = function () {
    //$scope.reloadCouncilData();
    //$scope.$broadcast('scroll.refreshComplete');
    //};

    $scope.yourCouncillors = BathData.get(13);
    $scope.listedBuilding = BathData.get(14);
    $scope.councilOffices = BathData.get(18);
    $scope.housingAllowanceZones = BathData.get(19);
    $scope.binCollection = BathData.get(7);

});