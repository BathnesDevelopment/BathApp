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
                        reportsData.push({
                            "service_code": reportsArray[index].type,
                            "attribute": null,
                            "lat": reportsArray[index].lat,
                            "long": reportsArray[index].long,
                            "address_string": "",
                            "address_id": reportsArray[index].userAddress,
                            "email": reportsArray[index].userEmail,
                            "device_id": "device",
                            "account_id": "",
                            "first_name": reportsArray[index].userFirstname,
                            "last_name": reportsArray[index].userLastname,
                            "phone": reportsArray[index].userPhone,
                            "description": reportsArray[index].description,
                            "media_url": ""
                        });
                    }
                    
                }
            }
            
            // A single post to the web service can include all the reports.
            if (reportsData.length > 0) {
                $http.post(config.reportsWS + "/CreateServiceRequests", { "request": reportsData })
                    .success(function (data, status, headers, config) {
                        reportResponse = data.CreateServiceRequestsResult;
                        if (reportResponse && reportResponse.length > 0) {
                            // Set reports to done
                            for (index = 0; index < reportsArray.length; ++index) {
                                // Build up the data object
                                reportsArray[index].status = 'Sent';
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