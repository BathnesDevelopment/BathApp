angular.module('MyBath.LocalDataController', [])
.controller('LocalDataController', function ($scope, $ionicSideMenuDelegate) {
    var i = 0;
    var geo;
    var temp;
    if ($scope.bathdata[0]) {
        $scope.librariesNearby = $scope.bathdata[0];
    }

    if ($scope.bathdata[1]) {
        $scope.mobileLibrariesNearby = $scope.bathdata[1];
    }

    //if ($scope.librariesNearby && $scope.librariesNearby.Results) {
    //    // Do the string manipulation to clean up - need to make sure this won't blow up
    //    $scope.librariesNearby.Results.Libraries_Nearby.url = $scope.librariesNearby.Results.Libraries_Nearby._.split("|")[0];
    //    $scope.librariesNearby.Results.Libraries_Nearby.name = $scope.librariesNearby.Results.Libraries_Nearby._.split("|")[1];
    //    geo = NEtoLL($scope.librariesNearby.Results.Libraries_Nearby.MapSpurE, $scope.librariesNearby.Results.Libraries_Nearby.MapSpurN);
    //    $scope.librariesNearby.Results.Libraries_Nearby.lat = geo.latitude;
    //    $scope.librariesNearby.Results.Libraries_Nearby.lon = geo.longitude;
    //}
    if ($scope.mobileLibrariesNearby && $scope.mobileLibrariesNearby.Results) {
        if ($scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.Info !== "<p>No records found nearby.</p>") {
            // Do the string manipulation to clean up - need to make sure this won't blow up
            $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.timeAdjusted = $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.time.replace('?', '-');
            $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.url = $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby._.split("|")[0];
            geo = NEtoLL($scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.MapSpurE, $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.MapSpurN);
            $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.lat = geo.latitude;
            $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.lon = geo.longitude;
        } else {
            $scope.mobileLibrariesNearby = {};
        }
    }

    if ($scope.bathdata[2]) {
        $scope.playSchoolsNearby = $scope.bathdata[2];
    }
    if ($scope.bathdata[3]) {
        $scope.primarySchoolsNearby = $scope.bathdata[3];
    }
    if ($scope.bathdata[4]) {
        $scope.secondarySchoolsNearby = $scope.bathdata[4];
    }
    if ($scope.bathdata[5]) {
        $scope.collegesNearby = $scope.bathdata[5];
    }
    if ($scope.bathdata[6]) {
        $scope.universitiesNearby = $scope.bathdata[6];
    }

    if ($scope.universitiesNearby) {
        if (typeof $scope.universitiesNearby.Results.Universities_Nearby.length === typeof undefined) {
            temp = $scope.universitiesNearby.Results.Universities_Nearby;
            $scope.universitiesNearby.Results.Universities_Nearby = {};
            $scope.universitiesNearby.Results.Universities_Nearby[0] = temp;
            $scope.universitiesNearby.Results.Universities_Nearby[0].length = 1;
        }
        // ishare only returns 8 characters in the string for some reason
        // This should get fixed, but at the moment, this fixes the display for the 2 major universities
        for (i = 0; i < $scope.universitiesNearby.Results.Universities_Nearby.length; i++) {
            if ($scope.universitiesNearby.Results.Universities_Nearby[i].___ == "Claverto") {
                $scope.universitiesNearby.Results.Universities_Nearby[i].___ = "Claverton Down";
            }
            if ($scope.universitiesNearby.Results.Universities_Nearby[i].___ == "Newton P") {
                $scope.universitiesNearby.Results.Universities_Nearby[i].___ = "Newton Park";
            }
        }
    }
    if ($scope.universitiesNearby && $scope.universitiesNearby.Results) {
        for (i = 0; i < $scope.universitiesNearby.Results.Universities_Nearby.length ; i++) {
            geo = NEtoLL($scope.universitiesNearby.Results.Universities_Nearby[i].MapSpurE, $scope.universitiesNearby.Results.Universities_Nearby[i].MapSpurN);
            $scope.universitiesNearby.Results.Universities_Nearby[i].lat = geo.latitude;
            $scope.universitiesNearby.Results.Universities_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.playSchoolsNearby && $scope.playSchoolsNearby.Results) {
        //for (i = 0; i < $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"].length ; i++) {
        //    var geo = NEtoLL($scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"][i].MapSpurE, $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"].MapSpurN);
        //    $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"][i].lat = geo.latitude;
        //    $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"][i].lon = geo.longitude;
        //}
    }
    if ($scope.primarySchoolsNearby && $scope.primarySchoolsNearby.Results) {
        //for (i = 0; i < $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby.length ; i++) {
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].name = $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i]._.split('|')[1];
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].url = $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i]._.split('|')[0];
        //    var geo = NEtoLL($scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].MapSpurE, $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].MapSpurN);
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].lat = geo.latitude;
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].lon = geo.longitude;
        //}
    }
    if ($scope.secondarySchoolsNearby && $scope.secondarySchoolsNearby.Results) {
        if (typeof $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby.length === typeof undefined) {
            temp = $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby;
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby = {};
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[0] = temp;
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby.length ; i++) {
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].name = $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i]._.split('|')[1];
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].url = $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i]._.split('|')[0];
            geo = NEtoLL($scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].MapSpurE, $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].MapSpurN);
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].lat = geo.latitude;
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.collegesNearby && $scope.collegesNearby.Results) {
        if (typeof $scope.collegesNearby.Results.Colleges_Nearby.length === typeof undefined) {
            temp = $scope.collegesNearby.Results.Colleges_Nearby;
            $scope.collegesNearby.Results.Colleges_Nearby = {};
            $scope.collegesNearby.Results.Colleges_Nearby[0] = temp;
            $scope.collegesNearby.Results.Colleges_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.collegesNearby.Results.Colleges_Nearby.length ; i++) {
            geo = NEtoLL($scope.collegesNearby.Results.Colleges_Nearby[i].MapSpurE, $scope.collegesNearby.Results.Colleges_Nearby[i].MapSpurN);
            $scope.collegesNearby.Results.Colleges_Nearby[i].lat = geo.latitude;
            $scope.collegesNearby.Results.Colleges_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[8]) {
        $scope.roadworksNearby = $scope.bathdata[8];
    }
    if ($scope.bathdata[20]) {
        $scope.busStops = $scope.bathdata[20];
    }
    if ($scope.bathdata[21]) {
        $scope.schoolCrossings = $scope.bathdata[21];
    }
    if ($scope.bathdata[22] && $scope.bathdata[22].Results.Parking_Zones.Info !== "<p>No records found nearby.</p>") {
        $scope.parkingNearby = $scope.bathdata[22];
    }


    if ($scope.parkingNearby && $scope.parkingNearby.Results) {
        if (typeof $scope.parkingNearby.Results.Parking_Zones.length === typeof undefined) {
            temp = $scope.parkingNearby.Results.Parking_Zones;
            $scope.parkingNearby.Results.Parking_Zones = {};
            $scope.parkingNearby.Results.Parking_Zones[0] = temp;
            $scope.parkingNearby.Results.Parking_Zones[0].length = 1;
        }
        for (i = 0; i < $scope.parkingNearby.Results.Parking_Zones.length ; i++) {
            geo = NEtoLL($scope.parkingNearby.Results.Parking_Zones[i].MapSpurE, $scope.parkingNearby.Results.Parking_Zones[i].MapSpurN);
            $scope.parkingNearby.Results.Parking_Zones[i].lat = geo.latitude;
            $scope.parkingNearby.Results.Parking_Zones[i].lon = geo.longitude;
        }
    }

    if ($scope.roadworksNearby && $scope.roadworksNearby.Results) {
        if (typeof $scope.roadworksNearby.Results.Roadworks_Nearby.length === typeof undefined) {
            temp = $scope.roadworksNearby.Results.Roadworks_Nearby;
            $scope.roadworksNearby.Results.Roadworks_Nearby = {};
            $scope.roadworksNearby.Results.Roadworks_Nearby[0] = temp;
            $scope.roadworksNearby.Results.Roadworks_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.roadworksNearby.Results.Roadworks_Nearby.length ; i++) {
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].title = $scope.roadworksNearby.Results.Roadworks_Nearby[i].Organisation.split('|')[1].replace('amp;', '');
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].url = $scope.roadworksNearby.Results.Roadworks_Nearby[i].Organisation.split('|')[0].replace('amp;', '');
            geo = NEtoLL($scope.roadworksNearby.Results.Roadworks_Nearby[i].MapSpurE, $scope.roadworksNearby.Results.Roadworks_Nearby[i].MapSpurN);
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].lat = geo.latitude;
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.busStops && $scope.busStops.Results) {
        if (typeof $scope.busStops.Results.Bus_Stops_Nearby.length === typeof undefined) {
            temp = $scope.busStops.Results.Bus_Stops_Nearby;
            $scope.busStops.Results.Bus_Stops_Nearby = {};
            $scope.busStops.Results.Bus_Stops_Nearby[0] = temp;
            $scope.busStops.Results.Bus_Stops_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.busStops.Results.Bus_Stops_Nearby.length ; i++) {
            geo = NEtoLL($scope.busStops.Results.Bus_Stops_Nearby[i].MapSpurE, $scope.busStops.Results.Bus_Stops_Nearby[i].MapSpurN);
            $scope.busStops.Results.Bus_Stops_Nearby[i].lat = geo.latitude;
            $scope.busStops.Results.Bus_Stops_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.schoolCrossings && $scope.schoolCrossings.Results) {
        if (typeof $scope.schoolCrossings.Results.School_Crossings_Nearby.length === typeof undefined) {
            temp = $scope.schoolCrossings.Results.School_Crossings_Nearby;
            $scope.schoolCrossings.Results.School_Crossings_Nearby = {};
            $scope.schoolCrossings.Results.School_Crossings_Nearby[0] = temp;
            $scope.schoolCrossings.Results.School_Crossings_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.schoolCrossings.Results.School_Crossings_Nearby.length ; i++) {
            geo = NEtoLL($scope.schoolCrossings.Results.School_Crossings_Nearby[i].MapSpurE, $scope.schoolCrossings.Results.School_Crossings_Nearby[i].MapSpurN);
            $scope.schoolCrossings.Results.School_Crossings_Nearby[i].lat = geo.latitude;
            $scope.schoolCrossings.Results.School_Crossings_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.bathdata[12]) {
        $scope.healthAndFitnessNearby = $scope.bathdata[12];
    }

    if ($scope.healthAndFitnessNearby && $scope.healthAndFitnessNearby.Results) {
        if (typeof $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby.length === typeof undefined) {
            temp = $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby;
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby = {};
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[0] = temp;
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby.length ; i++) {
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].name = $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[1].replace('amp;', '');
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].url = $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[0];
            geo = NEtoLL($scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurE, $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurN);
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].lat = geo.latitude;
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[15]) {
        $scope.planningApplicationsNearby = $scope.bathdata[15];
    }

    if ($scope.planningApplicationsNearby && $scope.planningApplicationsNearby.Results) {
        if (typeof $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby.length === typeof undefined) {
            temp = $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby;
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby = {};
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[0] = temp;
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby.length ; i++) {
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].title = $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].url = $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
            geo = NEtoLL($scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].MapSpurE, $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].MapSpurN);
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].lat = geo.latitude;
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[16]) {
        $scope.newLicensingAppsNearby = $scope.bathdata[16];
    }
    if ($scope.bathdata[17]) {
        $scope.issuedLicensingAppsNearby = $scope.bathdata[17];
    }

    if ($scope.newLicensingAppsNearby && $scope.newLicensingAppsNearby.Results) {
        if (typeof $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby.length === typeof undefined) {
            temp = $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby;
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby = {};
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[0] = temp;
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby.length ; i++) {
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].title = $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].url = $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
            geo = NEtoLL($scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].MapSpurE, $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].MapSpurN);
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].lat = geo.latitude;
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.issuedLicensingAppsNearby && $scope.issuedLicensingAppsNearby.Results) {
        if (typeof $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby.length === typeof undefined) {
            temp = $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby;
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby = {};
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[0] = temp;
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby.length ; i++) {
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].title = $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].url = $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
            geo = NEtoLL($scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].MapSpurE, $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].MapSpurN);
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].lat = geo.latitude;
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.bathdata[9]) {
        $scope.parksNearby = $scope.bathdata[9];
    }
    if ($scope.bathdata[11]) {
        $scope.allotmentsNearby = $scope.bathdata[11];
    }
    if ($scope.bathdata[10]) {
        $scope.playAreasNearby = $scope.bathdata[10];
    }

    if ($scope.parksNearby && $scope.parksNearby.Results) {
        if (typeof $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby.length === typeof undefined) {
            temp = $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby;
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby = {};
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[0] = temp;
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby.length ; i++) {
            geo = NEtoLL($scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurE, $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurN);
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].lat = geo.latitude;
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.allotmentsNearby && $scope.allotmentsNearby.Results) {
        if (typeof $scope.allotmentsNearby.Results.Allotments_Nearby.Info !== typeof undefined && $scope.allotmentsNearby.Results.Allotments_Nearby.Info == "For allotment queries outside Bath, please contact your local Parish Council.") {
            $scope.allotmentsOutsideBath = true;
            $scope.allotmentsNearby.Results = {};
        } else {
            if (typeof $scope.allotmentsNearby.Results.Allotments_Nearby.length === typeof undefined) {
                temp = $scope.allotmentsNearby.Results.Allotments_Nearby;
                $scope.allotmentsNearby.Results.Allotments_Nearby = {};
                $scope.allotmentsNearby.Results.Allotments_Nearby[0] = temp;
                $scope.allotmentsNearby.Results.Allotments_Nearby[0].length = 1;
            }
            for (i = 0; i < $scope.allotmentsNearby.Results.Allotments_Nearby.length ; i++) {
                $scope.allotmentsNearby.Results.Allotments_Nearby[i].ProvidedAdjusted = $scope.allotmentsNearby.Results.Allotments_Nearby[i].Provided__by.replace('amp;', '');
                geo = NEtoLL($scope.allotmentsNearby.Results.Allotments_Nearby[i].MapSpurE, $scope.allotmentsNearby.Results.Allotments_Nearby[i].MapSpurN);
                $scope.allotmentsNearby.Results.Allotments_Nearby[i].lat = geo.latitude;
                $scope.allotmentsNearby.Results.Allotments_Nearby[i].lon = geo.longitude;
            }
        }
    }
    if ($scope.playAreasNearby && $scope.playAreasNearby.Results) {
        if (typeof $scope.playAreasNearby.Results.Play_Areas_Nearby.length === typeof undefined) {
            temp = $scope.playAreasNearby.Results.Play_Areas_Nearby;
            $scope.playAreasNearby.Results.Play_Areas_Nearby = {};
            $scope.playAreasNearby.Results.Play_Areas_Nearby[0] = temp;
            $scope.playAreasNearby.Results.Play_Areas_Nearby[0].length = 1;
        }
        for (i = 0; i < $scope.playAreasNearby.Results.Play_Areas_Nearby.length ; i++) {
            geo = NEtoLL($scope.playAreasNearby.Results.Play_Areas_Nearby[i].MapSpurE, $scope.playAreasNearby.Results.Play_Areas_Nearby[i].MapSpurN);
            $scope.playAreasNearby.Results.Play_Areas_Nearby[i].lat = geo.latitude;
            $scope.playAreasNearby.Results.Play_Areas_Nearby[i].lon = geo.longitude;
        }
    }
});