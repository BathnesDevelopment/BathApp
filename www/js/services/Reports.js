angular.module('MyBath.ReportsService', [])
.factory('Reports', function ($http, $q, config, $cordovaFile) {
    return {
        getReports: function () {
            var reports = window.localStorage.reports;
            var reportJson = angular.fromJson(reports);
            if (reportJson) {
                // The photos are from a separate directory - we need to attach them to the object.
                reportJson.forEach(function (report) {
                    if (report.photo) {
                        // Get the photo
                        $cordovaFile.readAsDataURL(cordova.file.dataDirectory, $scope.inputs.readFile)
                            .then(function (success) {
                                report.photoData = success;
                            }, function (error) {
                                // Do nothing
                            });
                    }
                });
                return reportJson;
            }
            return [];
        },
        getServices: function () {
            var servicesResponse = [];
            var servicesResponse_q = $q.defer();
            var reportServices = [];

            var reportCache = window.localStorage.ReportServices;
            // Set maximum cache to 1 month
            if (reportCache) {
                var cache = angular.fromJson(reportCache);
                if (moment().diff(moment(cache.updated), 'days') < 30) reportServices = reportCache.services;
            }

            // Always try to update the report services - if not will fall back to saved
            $http.get(config.reportsWS + "/ServicesFull.json")
                .success(function (data, status, headers, config) {
                    reportServices = data;
                    window.localStorage.ReportServices = angular.toJson({ updated: moment(), services: reportServices });
                    servicesResponse_q.resolve(reportServices);
                })
                .error(function (data, status, headers, config) {
                    servicesResponse_q.resolve(reportServices);
                });
            return servicesResponse_q.promise;
        },
        saveReports: function (reports) {

            // Whenever we save the reports we need to strip out the photo data 
            // (it should already be saved away).
            reports.forEach(function (report) {
                if (report.photoData) delete report.photoData;
            });

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

            // If there's a photo then save it
            if (report.photoData) {
                $cordovaFile.writeFile(cordova.file.dataDirectory, report.photo, report.photoData, true)
                    .then(function (success) {
                        // No need to do anything 
                    }, function (error) {
                        // Do nothing.
                    });
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
                            "media_url": reportsArray[index].photoData
                        });
                    }
                }
            }

            // A single post to the web service can include all the reports.
            if (reportsData.length > 0) {
                $http.post(config.reportsWS + "/MultiRequests.json", reportsData)
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