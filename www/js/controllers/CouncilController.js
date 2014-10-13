angular.module('MyBath.CouncilController', [])
.controller('CouncilController', function ($scope, $ionicSideMenuDelegate) {
    //$scope.reload = function () {
    //$scope.reloadCouncilData();
    //$scope.$broadcast('scroll.refreshComplete');
    //};

    //$scope.reloadCouncilData = function () {
    var i = 0;
    var string = '';
    var doc;
    if ($scope.bathdata[13]) {
        $scope.yourCouncillors = $scope.bathdata[13];
    }
    if ($scope.bathdata[14] && $scope.bathdata[14].Results.Listed_Building.Info !== "<p>No records found nearby.</p>") {
        $scope.listedBuilding = $scope.bathdata[14];
    }
    if ($scope.bathdata[18]) {
        $scope.councilOffices = $scope.bathdata[18];
    }
    if ($scope.bathdata[19]) {
        $scope.housingAllowanceZones = $scope.bathdata[19];
    }

    if ($scope.yourCouncillors && $scope.yourCouncillors.Results) {
        var phoneNumbers = /(\+[0-9]{1,2}|0)[0-9 ]{7,12}/;
        string = '<!DOCTYPE html><html><head></head><body>' + $scope.yourCouncillors.Results.Your_Councillors._ + '</body></html>';
        doc = new DOMParser().parseFromString(string, 'text/html');

        var councillorList = doc.querySelectorAll('div#myCouncillor a');
        var councillors = []; // Some councillors have more than one URL returned from ishare
        for (i = 0; i < councillorList.length; i++) {
            if (councillorList[i].toString().search("democracy.bathnes") != -1) {
                councillors.push(councillorList[i]);
            }
        }
        var councillorInfo = doc.querySelectorAll('div#myCouncillor');
        var tel = "";
        var party = "";
        if (councillors[0]) {

            if (councillorInfo[0] && councillorInfo[0].innerText.indexOf('Telephone') != -1) {
                tel = phoneNumbers.exec(councillorInfo[0].innerText)[0];
            }
            $scope.yourCouncillors.Results.Your_Councillors.number1 = councillors[0].innerHTML;
            $scope.yourCouncillors.Results.Your_Councillors.info1 = councillors[0].href;
            $scope.yourCouncillors.Results.Your_Councillors.telephone1 = tel;
            $scope.yourCouncillors.Results.Your_Councillors.img1 = URLtoBase64(councillorInfo[0].getElementsByTagName('img')[0].src);
        }
        if (councillors[1]) {
            tel = "";
            party = "";

            if (councillorInfo[1] && councillorInfo[1].innerText.indexOf('Telephone') != -1) {
                tel = phoneNumbers.exec(councillorInfo[1].innerText)[0];
            }
            $scope.yourCouncillors.Results.Your_Councillors.number2 = councillors[1].innerHTML;
            $scope.yourCouncillors.Results.Your_Councillors.info2 = councillors[1].href;
            $scope.yourCouncillors.Results.Your_Councillors.telephone2 = tel;
            $scope.yourCouncillors.Results.Your_Councillors.img2 = URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
        }
        if (councillors[2]) {
            tel = "";
            party = "";

            if (councillorInfo[2] && councillorInfo[2].innerText.indexOf('Telephone') != -1) {
                tel = phoneNumbers.exec(councillorInfo[2].innerText)[0];
            }
            $scope.yourCouncillors.Results.Your_Councillors.number3 = councillors[3].innerHTML;
            $scope.yourCouncillors.Results.Your_Councillors.info3 = councillors[3].href;
            $scope.yourCouncillors.Results.Your_Councillors.telephone3 = tel;
            $scope.yourCouncillors.Results.Your_Councillors.img3 = URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
        }
    }

    if ($scope.councilOffices && $scope.councilOffices.Results) {
        // if iShare returns just one, then this fails. Re-jig the object to be a new object holding the old one
        // Example: BA3 3UD
        if (typeof $scope.councilOffices.Results.____________________________.length === typeof undefined) {
            var res = $scope.councilOffices.Results.____________________________;
            $scope.councilOffices.Results.____________________________ = {};
            $scope.councilOffices.Results.____________________________[0] = res;
            $scope.councilOffices.Results.____________________________.length = 1; // for iteration below
        }
        for (i = 0; i < $scope.councilOffices.Results.____________________________.length; i++) {
            $scope.councilOffices.Results.____________________________[i].title = $scope.councilOffices.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[1].replace('amp;', '');
            $scope.councilOffices.Results.____________________________[i].url = $scope.councilOffices.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[0].replace('amp;', '');
            var geo = NEtoLL($scope.councilOffices.Results.____________________________[i].MapSpurE, $scope.councilOffices.Results.____________________________[i].MapSpurN);
            $scope.councilOffices.Results.____________________________[i].lat = geo.latitude;
            $scope.councilOffices.Results.____________________________[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[7]) {
        $scope.binCollection = $scope.bathdata[7];
    }

    if ($scope.binCollection && $scope.binCollection.Results && $scope.binCollection.Results._______________) {
        string = '<!DOCTYPE html><html><head></head><body>' + $scope.binCollection.Results._______________._ + '</body></html>';
        doc = new DOMParser().parseFromString(string, 'text/html');
        var collectionDates = doc.querySelectorAll('span.WasteHighlight');

        if (collectionDates && collectionDates[0]) {
            $scope.binCollection.Results._______________.waste = collectionDates[0].innerText;
        }
        if (collectionDates && collectionDates[1]) {
            $scope.binCollection.Results._______________.recycling = collectionDates[1].innerText;
        }
        if (collectionDates && collectionDates[2]) {
            $scope.binCollection.Results._______________.garden = collectionDates[2].innerText;
        }
    }
    //};

    //$scope.reloadCouncilData();
});