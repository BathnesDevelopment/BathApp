angular.module('MyBath.LocalDataController', [])
.controller('LocalDataController', function ($scope, $ionicSideMenuDelegate, BathData) {

    $scope.librariesNearby = BathData.get(0);
    $scope.mobileLibrariesNearby = BathData.get(1);
    $scope.playSchoolsNearby = BathData.get(2);
    $scope.primarySchoolsNearby = BathData.get(3);
    $scope.secondarySchoolsNearby = BathData.get(4);
    $scope.collegesNearby = BathData.get(5);
    $scope.universitiesNearby =BathData.get(6);
    $scope.roadworksNearby = BathData.get(8);
    $scope.healthAndFitnessNearby = BathData.get(12);
    $scope.planningApplicationsNearby = BathData.get(15);
    $scope.busStops = BathData.get(20);
    $scope.schoolCrossings = BathData.get(21);
    $scope.parkingNearby = BathData.get(22);
    $scope.newLicensingAppsNearby = BathData.get(16);
    $scope.issuedLicensingAppsNearby = BathData.get(17);
    $scope.parksNearby = BathData.get(9);
    $scope.playAreasNearby = BathData.get(10);
    $scope.allotmentsNearby = BathData.get(11);
});