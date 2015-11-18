angular.module('MyBath.HomeController', [])
.controller('HomeController', function ($scope, $state) {

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
                        $scope.showPopup(e.point.label, html);
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


});