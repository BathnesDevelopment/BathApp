angular.module('MyBath.ReportsService', [])
.factory('Reports', function ($http, $q, config) {
    return {
        getReports: function () {
            var reports = window.localStorage.reports;
            if (reports) {
                return angular.fromJson(reports);
            }
            return [];
        },
        getServices: function () {

            var servicesResponse = [];
            var servicesResponse_q = $q.defer();
            var reportServices = [];

            $http.get(config.reportsWS + "/ServicesFull.json")
                .success(function (data, status, headers, config) {
                    reportServices = data;
                    window.localStorage.reportServices = data;
                    servicesResponse_q.resolve(reportServices);
                })
                .error(function (data, status, headers, config) {
                    servicesResponse_q.resolve(reportServices);
                });

            return servicesResponse_q.promise;
        },
        saveReports: function (reports) {
            window.localStorage.reports = angular.toJson(reports);
        },
        addReport: function (report) {
            var reports = window.localStorage.reports;
            var reportsArray;
            if (reports) {
                reportsArray = angular.fromJson(reports);
                reportsArray.push(report);
            }
            else {
                reportsArray = [report];
            }
            window.localStorage.reports = angular.toJson(reportsArray);
        },
        submitReports: function () {
            var reportResponse = [];
            var reportResponse_q = $q.defer();
            var reportsData = [];

            var reports = window.localStorage.reports;
            var reportsArray = angular.fromJson(reports);
            var index;
            if (reportsArray) {
                for (index = 0; index < reportsArray.length; ++index) {
                    // Build up the data object
                    if (reportsArray[index].status == 'Not sent') {

                        var attribute = [];

                        angular.forEach(reportsArray[index].attributes, function (val, key) {
                            attribute.push({ "Key": key, "Value": val });
                        });

                        reportsData.push({
                            "service_code": reportsArray[index].service.service_code,
                            "attribute": attribute,
                            "lat": reportsArray[index].lat,
                            "long": reportsArray[index].long,
                            "address_string": null,
                            "address_id": null,
                            "email": reportsArray[index].userEmail,
                            "first_name": reportsArray[index].userFirstname,
                            "last_name": reportsArray[index].userLastname,
                            "phone": reportsArray[index].userPhone,
                            "description": reportsArray[index].description,
                            // We're using the media url here for the actual photo content.
                            // This isn't official Open 311 but we're calling a modified method anyway to submit multiple requests
                            // Will also support 'normal' use
                            "media_url": null
                        });
                    }
                }
            }

            // A single post to the web service can include all the reports.
            if (reportsData.length > 0) {
                $http.post(config.reportsWS + "/MultiRequests.json", reportsData )
                    .success(function (data, status, headers, config) {
                        reportResponse = data;
                        if (reportResponse && reportResponse.length > 0) {
                            // Set reports to done
                            for (index = 0; index < reportsArray.length; ++index) {
                                // Build up the data object
                                reportsArray[index].status = 'Sent';
                                reportsArray[index].id = '';
                            }
                            window.localStorage.reports = angular.toJson(reportsArray);
                            reportResponse = reportsArray;
                        }
                        else {
                            reportResponse = "Failed";
                        }
                        reportResponse_q.resolve(reportResponse);
                    })
                    .error(function (data, status, headers, config) {
                        reportResponse = "Failed";
                        reportResponse_q.resolve(reportResponse);
                    });
            } else {
                reportResponse = [];
                reportResponse_q.resolve(reportResponse);
            }

            return reportResponse_q.promise;
        }
    };
});