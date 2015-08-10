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
            var reports = window.localStorage.reports;
            var reportsArray = angular.fromJson(reports);

            var reportsData = [];
            // reports is an array (of whatever length).
            // iterate through and submit to the web service.  as successes are recorded, remove from array.
            var index;
            for (index = 0; index < reportsArray.length; ++index) {
                // Build up the data object
                reportsData.push({
                    "service_code": "",
                    "attribute": [],
                    "lat": "",
                    "long": "",
                    "address_string": "",
                    "address_id": "",
                    "email": "email",
                    "device_id": "device",
                    "account_id": "",
                    "first_name": "",
                    "last_name": "",
                    "phone": "",
                    "description": "",
                    "media_url": ""
                });
            }

            // A single post to the web service can include all the reports.
            var reportResponse = [];
            var reportResponse_q = $q.defer();
            if (reportsData.length > 0) {
                $http.post(config.reportsWS + "/CreateServiceRequests", { "request": reportsData })
                    .success(function (data, status, headers, config) {
                        reportResponse = JSON.parse(data.CreateServiceRequestsResponse);
                        if (reportResponse && reportResponse != []) {
                        }
                        else {
                            reportResponse = "Failed";
                        }
                        reportResponse_q.resolve(reportResponse);
                        return reportResponse;
                    })
                    .error(function (data, status, headers, config) {
                        reportResponse = "Failed";
                        reportResponse_q.resolve(reportResponse);
                        return reportResponse;
                    });
            } else {
                reportResponse = "No outstanding reports";
                reportResponse_q.resolve(reportResponse);
                return reportResponse;
            }

            return reportResponse_q.promise;
        }
    };
});