angular.module('MyBath.HomeController', [])
.controller('HomeController', function ($scope, $state, $ionicLoading, $ionicPopup, LiveTravel) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTUP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Home page
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.carParkOptions = {
        chart: {
            type: 'multiBarHorizontalChart',
            height: 300,
            x: function (d) { return d.label; },
            y: function (d) { return d.value; },
            showControls: false,
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.0f')(d);
            },
            showLegend: false,
            transitionDuration: 500,
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Available spaces',
                tickFormat: function (d) {
                    return d3.format(',.0f')(d);
                }
            },
            multibar: {
                dispatch: {
                    elementClick: function (e) {
                        var html = '<div class="row"><div class="col big">' + e.point.status + '</div></div>';
                        html += '<div class="row"><div class="col"><small>Spaces</small></div><div class="col"><small>Capacity</small></div></div>';
                        html += '<div class="row"><div class="col big">' + e.point.value + '</div><div class="col big">' + e.point.capacity + '</div></div>';
                        html += '<div class="row"><div class="col"><small>Last updated</small></div></div>';
                        html += '<div class="row"><div class="col">' + moment(e.point.lastUpdated, 'DD/MM/YYYY hh:mm:ss').fromNow() + '</div></div>';

                        var carParkPopup = $ionicPopup.alert({
                            title: e.point.label,
                            template: html,
                            buttons: [{
                                text: '<b><i class="ion-android-close"></i> Cancel</b>',
                                type: 'button-clear button-full button-stable'
                            },
                            {
                                text: '<b><i class="ion-navigate"></i> Navigate</b>',
                                type: 'button-clear button-full button-balanced',
                                onTap: function (e) {
                                    var geoUrl = "geo:" + lat + "," + lng + "?q=" + lat + "," + lng + "(" + e.point.value + ")";
                                    if (ionic.Platform.isIOS()) {
                                        geoUrl = 'maps:q=' + e.point.value + '&ll=' + lat + "," + lng;
                                    }
                                    window.open(geoUrl, '_system');
                                }
                            }]
                        });
                        carParkPopup.then(function (res) {
                        });


                    }
                }
            },
            tooltips: false,
            margin: { left: 110 },
            barColor: function (d, i) {
                var color = '#387ef5';
                if (d.value < 150) color = '#ffc900';
                if (d.value < 70) color = '#ef473a';
                return color;
            }
        }
    };

    $scope.carParkData = [
            {
                "key": "Car park spaces",
                "values": []
            }];

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: updateCarParks
    // Updates the car park data - will run on each load
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.updateCarParks = function (showLoading) {
        if (!$scope.refreshingCarParks) {
            $scope.refreshingCarParks = true;
            if (showLoading) {
                $ionicLoading.show({
                    template: 'Refreshing car parks...'
                });
            }

            LiveTravel.fetchAll()
                    .then(function (data) {
                        if (showLoading) $ionicLoading.hide();
                        if (data && data != [] && data != "Failed") {
                            $scope.carParkData[0].values = [];
                            for (var carPark in data.carParks) {
                                // Only show if car park updated within last 30 mins
                                if (data.carParks[carPark] && moment().diff(moment(data.carParks[carPark]['last updated']), 'minutes') < 15) {
                                    var numberOfSpaces = parseInt(data.carParks[carPark].Capacity - parseInt(data.carParks[carPark].Occupancy));
                                    if (numberOfSpaces < 0) numberOfSpaces = 0;
                                    $scope.carParkData[0].values.push({ "label": data.carParks[carPark].Name.replace('CP', ''), "value": numberOfSpaces, "status": data.carParks[carPark].Status, "capacity": data.carParks[carPark].Capacity, "lastUpdated": data.carParks[carPark]['Last updated'] });
                                }
                            }
                            $scope.refreshingCarParks = false;
                        } else {
                            // currently do nothing - chart will only display if there is data.
                            $scope.refreshingCarParks = false;
                        }
                    });
        }
    };
    $scope.updateCarParks(false);
    // Need this to refresh the chart when moving back to the page.
    $scope.$on('$ionicView.loaded', function (e) {
        if (this.location.toString().indexOf('/home') != -1) {
            if ($scope.carParkApi) $scope.carParkApi.update();
        }
    });
});