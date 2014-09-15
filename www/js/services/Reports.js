angular.module('MyBath.ReportsService', [])
.factory('Reports', function () {
    return {
        getReports: function () {
            var reports = window.localStorage['reports'];
            if (reports) {
                return angular.fromJson(reports);
            }
            return [];
        },
        saveReports: function (reports) {
            window.localStorage['reports'] = angular.toJson(reports);
        },
        addReport: function (report) {
            var reports = window.localStorage['reports'];
            var reportsArray;
            if (reports) {
                var reportsArray = angular.fromJson(reports);
                reportsArray.push(report);
            }
            else {
                var reportsArray = [ report ];
            }
            window.localStorage['reports'] = angular.toJson(reportsArray);
        },
		submitReports: function () {
		    var reports = window.localStorage['reports'];
		    var reportsArray = angular.fromJson(reports);
			// reports is an array (of whatever length).
			// iterate through and submit to the web service.  as successes are recorded, remove from array.
			var index;
			for (index = 0; index < reports.length; ++index) {
				$http({
					method: 'POST',
					url: 'request-url',
					data: "message=" + message,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				});
			}
        }
    }
});