angular.module('MyBath.FeedDataService', [])
.factory('FeedData', function ($http, $q) {

    return {
        all: function() {
            var data = window.localStorage.FeedData;
            if (data){
                return angular.fromJson(data);
            } else {
                return [];
            }
            
        },
         fetchAll: function(lat, lon) {
            lat = lat || 51.37;
            lon = lon || -2.35;
            i = 0;
            var key = '';
            return $q.all([
                $http.get("http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/location.xml?apikey=" + key + "&latitude=" + lat + "&longitude=" +lon),
                $http.get("http://v1.syndication.nhschoices.nhs.uk/organisations/hospitals/location.xml?apikey=" + key + "&latitude=" + lat + "&longitude=" +lon),
                $http.get("http://v1.syndication.nhschoices.nhs.uk/organisations/dentists/location.xml?apikey=" + key + "&latitude=" + lat + "&longitude=" +lon),
                $http.get("http://v1.syndication.nhschoices.nhs.uk/organisations/pharmacies/location.xml?apikey=" + key + "&latitude=" + lat + "&longitude=" +lon)
            ]).then(function (results) {
                var aggregatedData = [];
                angular.forEach(results, function (result) {
                    var data = result.data;
                    var xxjs = new X2JS();
                    var json = xxjs.xml_str2json(data);
                    aggregatedData = aggregatedData.concat(json);
                });
                window.localStorage.FeedData = angular.toJson(aggregatedData);
                return aggregatedData;
            }, function (error) {
                return [];
            });
        },
        getTracking: function () {
            res = [];
            var data = angular.fromJson(window.localStorage.FeedData);
            for (var i = 0; i < data.length; i++) {
                res[i] = data[i].feed.tracking.__text;
            }
            return res;
        },
        get: function ( id ) {
            try {
                var data = window.localStorage.FeedData;
                var i = 0;
                var l = 0;
                var j = 0;
                var results = [];
                data = angular.fromJson(data)[id];
                if (!data) {
                    console.warn("No data feed for ID " + id);
                    return [];
                }
                switch (id) {
                    case 0: // 0 - GPs
                         results = [];
                         for (i = 0; i < data.feed.entry.length && i < 4; i++) {
                            results[i] = {};
                            results[i].title = data.feed.entry[i].title.__text;
                            results[i].url = data.feed.entry[i].link[1]._href;
                            results[i].address = "";
                            results[i].distance = parseFloat(data.feed.entry[i].content.organisationSummary.Distance.__text) * 1000;
                            l = data.feed.entry[i].content.organisationSummary.address.addressLine.length;
                            for (j = 1; j < l ; j++) {
                               results[i].address += data.feed.entry[i].content.organisationSummary.address.addressLine[j].__text + ", ";
                            }
                            results[i].address += data.feed.entry[i].content.organisationSummary.address.postcode.__text;
                            if (data.feed.entry[i].content.organisationSummary.contact.telephone) {
                                results[i].tel = data.feed.entry[i].content.organisationSummary.contact.telephone.__text;
                            }
                            results[i].lat = data.feed.entry[i].content.organisationSummary.geographicCoordinates.latitude.__text;
                            results[i].lon = data.feed.entry[i].content.organisationSummary.geographicCoordinates.longitude.__text;
                        }
                        return results;
                    case 1: // 1 - Hospitals
                    case 2: //2 - dentists
                    case 3: //3 - pharmacies
                        results = [];
                        for (i = 0; i < data.feed.entry.length && i < 4; i++) {
                            results[i] = {};
                            results[i].title = data.feed.entry[i].title.__text;
                            results[i].url = data.feed.entry[i].link[1]._href;
                            results[i].address = "";
                            results[i].distance = parseFloat(data.feed.entry[i].content.organisationSummary.Distance.__text) * 1000;
                            l = data.feed.entry[i].content.organisationSummary.address.addressLine.length;
                            for (j = 0; j < l ; j++) {
                               results[i].address += data.feed.entry[i].content.organisationSummary.address.addressLine[j].__text + ", ";
                            }
                            results[i].address += data.feed.entry[i].content.organisationSummary.address.postcode.__text;
                            if (data.feed.entry[i].content.organisationSummary.contact.telephone) {
                                results[i].tel = data.feed.entry[i].content.organisationSummary.contact.telephone.__text;
                            } //else {
                            //  console.warn("no tel: ",data.feed.entry[i]);
                            //}
                            results[i].lat = data.feed.entry[i].content.organisationSummary.geographicCoordinates.latitude.__text;
                            results[i].lon = data.feed.entry[i].content.organisationSummary.geographicCoordinates.longitude.__text;
                        }
                        return results;
                }
                return data;
            } catch (e) {
                // if app crashed half way through a data refresh, this will sometimes fail
                // An uncaught exception breaks the app
                // Insead, log, and just don't return data
                console.warn(e);
                return undefined;
            }
        },
        toObj: function() {
            var feedData = window.localStorage.FeedData;
            var res = {};
            if (feedData){
                res.gpsNearby = this.get(0);
                res.hospitalsNearby = this.get(1);
                res.dentistsNearby = this.get(2);
                res.pharmaciesNearby = this.get(3);
                res.tracking = this.getTracking();
            }
            return res;
        }
    };
});