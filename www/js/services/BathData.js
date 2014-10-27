angular.module('MyBath.BathDataService', [])
/**
 * Factory: Bath Data
 * The bath data factory includes methods to return and save data from iShare to local storage
 * and returns that data from local storage.
*/
.factory('BathData', function ($http, $q, DataTransformations) {
    return {
        // Method: BathData.all()
        // Input: JSON[] / Empty
        // Output: JSON / Empty Array
        // gets all the data back from local storage.
        all: function () {
            // we need a one time only delete as there's invalid data leftover from earlier release
            var cleanUp = window.localStorage.cleanUp;
            if (!cleanUp) {
                window.localStorage.removeItem('BathData');
                window.localStorage.cleanUp = 'cleaned';
            }
            var bathData = window.localStorage.BathData;
            if (bathData) {
                return angular.fromJson(bathData);
            }
            return [];
        },
        toObj: function () {
            var bathData = window.localStorage.BathData;
            var res = {};
            if (bathData) {
                res.librariesNearby = this.get(0);
                res.mobileLibrariesNearby = this.get(1);
                res.playSchoolsNearby = this.get(2);
                res.primarySchoolsNearby = this.get(3);
                res.secondarySchoolsNearby = this.get(4);
                res.collegesNearby = this.get(5);
                res.universitiesNearby = this.get(6);
                res.binCollection = this.get(7);
                res.roadworksNearby = this.get(8);
                res.parksNearby = this.get(9);
                res.playAreasNearby = this.get(10);
                res.allotmentsNearby = this.get(11);
                res.healthAndFitnessNearby = this.get(12);
                res.yourCouncillors = this.get(13);
                res.listedBuilding = this.get(14);
                res.planningApplicationsNearby = this.get(15);
                res.newLicensingAppsNearby = this.get(16);
                res.issuedLicensingAppsNearby = this.get(17);
                res.councilOffices = this.get(18);
                res.housingAllowanceZones = this.get(19);
                res.busStops = this.get(20);
                res.schoolCrossings = this.get(21);
                res.parkingNearby = this.get(22);
            }
            return res;
        },
        // Method: BathData.save
        // Input: JSON
        // Output: None
        // saves the data from a JSON input, back into the local storage (overwriting previous storage)
        save: function (bathData) {
            window.localStorage.BathData = angular.toJson(bathData);
        },
        // Method: BathData.fetchAll()
        // Input: uId string (UPRN)
        // Output: 
        // calls all of the iShare links and aggregates the returned data into a single JSON array, queryable by index.
        // this data is returned as a promise.
        fetchAll: function (uId) {
            return $q.all([
                // Libraries
                // 0 - Libraries
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Libraries|Libraries Nearby&uid=' + uId),
                // 1 - Mobile Libraries
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Libraries|Mobile Libraries Nearby&uid=' + uId),

                // Education
                // 2 - Play schools
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Play%20Schools%20and%20Nurseries&uid=' + uId),
                // 3 - Primary schools
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Primary%20Schools&uid=' + uId),
                // 4 - Secondary schools
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Secondary%20Schools&uid=' + uId),
                // 5 - Colleges
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Colleges%20and%20Further%20Education|Colleges Nearby&uid=' + uId),
                // 6 - Universities
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Colleges%20and%20Further%20Education|Universities Nearby&uid=' + uId),

                // Bins
                // 7 - Collection dates
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouse&format=JSON&group=Refuse%20and%20Recycling|_______________&uid=' + uId),

                // Roadworks
                // 8 - Roadworks
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Transport%20and%20Streets|Roadworks Nearby&uid=' + uId),

                // Leisure
                // 9 - Parks
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Parks%20and%20Open%20Spaces|Parks%20or%20Open%20spaces%20nearby&uid=' + uId),
                // 10 - Play areas
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Parks%20and%20Open%20Spaces|Play%20Areas%20Nearby&uid=' + uId),
                // 11 - Allotments
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Parks%20and%20Open%20Spaces|Allotments%20Nearby&uid=' + uId),

                // Health
                // 12 - Fitness
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Fitness%20and%20Recreation&uid=' + uId),

                // My council
                // 13 - Councillor 
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouse&format=JSON&group=Council%20and%20Democracy|Your%20Councillors&uid=' + uId),
                // 14 - Listed building
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Property%20Details|Listed%20Building&uid=' + uId),

                // Planning
                // 15 - Planning apps
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Planning%20Applications|Planning%20Applications%20Nearby&uid=' + uId),

                // Licensing
                // 16 - New licenses
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Licensing%20Applications|New%20Licensing%20Applications%20Nearby&uid=' + uId),
                // 17 - Issued licenses
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Licensing%20Applications|Issued%20Licensing%20Applications%20Nearby&uid=' + uId),

                // 18 - council offices
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Council%20and%20Democracy|____________________________&uid=' + uId),
                // 19 - local housing allowance zone
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Council%20and%20Democracy|___________&uid=' + uId),
                // 20 - bus stops
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Transport%20and%20Streets|Bus%20stops%20nearby&uid=' + uId),
                // 21 - school crossings
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Transport%20and%20Streets|School%20crossings%20nearby&uid=' + uId),
                // 22 - parking zones
                $http.get('http://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Parking%20Permit|Parking%20zones&uid=' + uId)
            ]).then(function (results) {
                var aggregatedData = [];
                angular.forEach(results, function (result) {
                    aggregatedData = aggregatedData.concat(result.data);
                });
                window.localStorage.BathData = angular.toJson(aggregatedData);
                return aggregatedData;
            }, function (error) {
                return [];
            });
        },
        clear: function () {
            window.localStorage.removeItem('BathData');
        },
        get: function (id) {
            var i = 0;
            var res = angular.fromJson(window.localStorage.BathData)[id];
            var doc;
            var geo;
            switch (id) {
                //Local Data
                case 0: // libraries Nearby
                    if (res && res.Results && res.Results.Libraries_Nearby) {
                        if (res.Results.Libraries_Nearby.Info) {
                            return {};
                        }
                        res.Results.Libraries_Nearby = DataTransformations.objectToArray(res.Results.Libraries_Nearby);
                        // Do the string manipulation to clean up - need to make sure this won't blow up
                        for (i = 0; i < res.Results.Libraries_Nearby.length ; i++) {
                            res.Results.Libraries_Nearby[i].url = res.Results.Libraries_Nearby[i]._.split("|")[0];
                            res.Results.Libraries_Nearby[i].name = res.Results.Libraries_Nearby[i]._.split("|")[1];
                            geo = NEtoLL(res.Results.Libraries_Nearby[i].MapSpurE, res.Results.Libraries_Nearby[i].MapSpurN);
                            res.Results.Libraries_Nearby[i].lat = geo.latitude;
                            res.Results.Libraries_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Libraries_Nearby;
                    }
                    return {};
                case 1: // Mobile libaries
                    if (res && res.Results) {
                        if (res.Results.Mobile_Libraries_Nearby.Info !== "<p>No records found nearby.</p>") {
                            res.Results.Mobile_Libraries_Nearby = DataTransformations.objectToArray(res.Results.Mobile_Libraries_Nearby);
                            // Do the string manipulation to clean up - need to make sure this won't blow up
                            for (i = 0; i < res.Results.Mobile_Libraries_Nearby.length ; i++) {
                                res.Results.Mobile_Libraries_Nearby[i].timeAdjusted = res.Results.Mobile_Libraries_Nearby[i].time.replace('?', '-');
                                res.Results.Mobile_Libraries_Nearby[i].url = res.Results.Mobile_Libraries_Nearby[i]._.split("|")[0];
                                geo = NEtoLL(res.Results.Mobile_Libraries_Nearby[i].MapSpurE, res.Results.Mobile_Libraries_Nearby[i].MapSpurN);
                                res.Results.Mobile_Libraries_Nearby[i].lat = geo.latitude;
                                res.Results.Mobile_Libraries_Nearby[i].lon = geo.longitude;
                                return res.Results.Mobile_Libraries_Nearby;
                            }
                        }
                        else { return {}; }
                    }
                    return {};
                case 2: // Play Schools
                    if (res && res.Results && res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby) {
                        res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby = DataTransformations.objectToArray(res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby);
                        for (i = 0; i < res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].MapSpurE, res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby.MapSpurN);
                            res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].lat = geo.latitude;
                            res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby;
                    }
                    return {};
                case 3: // Primary Schools
                    if (res && res.Results && res.Results.Primary_Schools_Nearby) {
                        res.Results.Primary_Schools_Nearby = DataTransformations.objectToArray(res.Results.Primary_Schools_Nearby);
                        for (i = 0; i < res.Results.Primary_Schools_Nearby.length ; i++) {
                            res.Results.Primary_Schools_Nearby[i].name = res.Results.Primary_Schools_Nearby[i]._.split('|')[1];
                            if (typeof res.Results.Primary_Schools_Nearby[i].name === typeof undefined) {
                                res.Results.Primary_Schools_Nearby[i].name = res.Results.Primary_Schools_Nearby[i]._;
                            } else {
                                res.Results.Primary_Schools_Nearby[i].url = res.Results.Primary_Schools_Nearby[i]._.split('|')[0];
                            }
                            geo = NEtoLL(res.Results.Primary_Schools_Nearby[i].MapSpurE, res.Results.Primary_Schools_Nearby[i].MapSpurN);
                            res.Results.Primary_Schools_Nearby[i].lat = geo.latitude;
                            res.Results.Primary_Schools_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Primary_Schools_Nearby;
                    }
                    return {};
                case 4: // Secondary Schools
                    if (res && res.Results && res.Results.Secondary_Schools_Nearby) {
                        res.Results.Secondary_Schools_Nearby = DataTransformations.objectToArray(res.Results.Secondary_Schools_Nearby);
                        for (i = 0; i < res.Results.Secondary_Schools_Nearby.length ; i++) {
                            res.Results.Secondary_Schools_Nearby[i].name = res.Results.Secondary_Schools_Nearby[i]._.split('|')[1];
                            res.Results.Secondary_Schools_Nearby[i].url = res.Results.Secondary_Schools_Nearby[i]._.split('|')[0];
                            geo = NEtoLL(res.Results.Secondary_Schools_Nearby[i].MapSpurE, res.Results.Secondary_Schools_Nearby[i].MapSpurN);
                            res.Results.Secondary_Schools_Nearby[i].lat = geo.latitude;
                            res.Results.Secondary_Schools_Nearby[i].lon = geo.longitude;
                            res.Results.Secondary_Schools_Nearby = DataTransformations.objectToArray(res.Results.Secondary_Schools_Nearby);
                        }
                        return res.Results.Secondary_Schools_Nearby;
                    }
                    return {};
                case 5: // Colleges
                    if (res && res.Results && res.Results.Colleges_Nearby) {
                        res.Results.Colleges_Nearby = DataTransformations.objectToArray(res.Results.Colleges_Nearby);
                        for (i = 0; i < res.Results.Colleges_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.Colleges_Nearby[i].MapSpurE, res.Results.Colleges_Nearby[i].MapSpurN);
                            res.Results.Colleges_Nearby[i].lat = geo.latitude;
                            res.Results.Colleges_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Colleges_Nearby;
                    }
                    return {};
                case 6: // Universities
                    if (res && res.Results && res.Results.Universities_Nearby) {
                        res.Results.Universities_Nearby = DataTransformations.objectToArray(res.Results.Universities_Nearby);
                        // ishare only returns 8 characters in the string for some reason
                        // This should get fixed, but at the moment, this fixes the display for the 2 major universities
                        for (i = 0; i < res.Results.Universities_Nearby.length; i++) {
                            if (res.Results.Universities_Nearby[i].___ == "Claverto") {
                                res.Results.Universities_Nearby[i].___ = "Claverton Down";
                            }
                            if (res.Results.Universities_Nearby[i].___ == "Newton P") {
                                res.Results.Universities_Nearby[i].___ = "Newton Park";
                            }
                        }
                        for (i = 0; i < res.Results.Universities_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.Universities_Nearby[i].MapSpurE, res.Results.Universities_Nearby[i].MapSpurN);
                            res.Results.Universities_Nearby[i].lat = geo.latitude;
                            res.Results.Universities_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Universities_Nearby;
                    }
                    return {};
                case 8: // Roadworks
                    if (res && res.Results && res.Results.Roadworks_Nearby) {
                        res.Results.Roadworks_Nearby = DataTransformations.objectToArray(res.Results.Roadworks_Nearby);
                        for (i = 0; i < res.Results.Roadworks_Nearby.length ; i++) {
                            res.Results.Roadworks_Nearby[i].title = res.Results.Roadworks_Nearby[i].Organisation.split('|')[1].replace('amp;', '');
                            res.Results.Roadworks_Nearby[i].url = res.Results.Roadworks_Nearby[i].Organisation.split('|')[0].replace('amp;', '');
                            geo = NEtoLL(res.Results.Roadworks_Nearby[i].MapSpurE, res.Results.Roadworks_Nearby[i].MapSpurN);
                            res.Results.Roadworks_Nearby[i].lat = geo.latitude;
                            res.Results.Roadworks_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Roadworks_Nearby;
                    }
                    return {};
                case 9: // Parks
                    if (res && res.Results) {
                        res.Results.Parks_or_Open_Spaces_Nearby = DataTransformations.objectToArray(res.Results.Parks_or_Open_Spaces_Nearby);
                        for (i = 0; i < res.Results.Parks_or_Open_Spaces_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurE, res.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurN);
                            res.Results.Parks_or_Open_Spaces_Nearby[i].lat = geo.latitude;
                            res.Results.Parks_or_Open_Spaces_Nearby[i].lon = geo.longitude;
                        }
                    }
                    return res;
                case 10: // Play Areas
                    if (res && res.Results && res.Results.Play_Areas_Nearby) {
                        res.Results.Play_Areas_Nearby = DataTransformations.objectToArray(res.Results.Play_Areas_Nearby);
                        for (i = 0; i < res.Results.Play_Areas_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.Play_Areas_Nearby[i].MapSpurE, res.Results.Play_Areas_Nearby[i].MapSpurN);
                            res.Results.Play_Areas_Nearby[i].lat = geo.latitude;
                            res.Results.Play_Areas_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Play_Areas_Nearby;
                    }
                    return {};
                case 11: // Allotments
                    if (res && res.Results && res.Results.Allotments_Nearby) {
                        if (typeof res.Results.Allotments_Nearby.Info !== typeof undefined && res.Results.Allotments_Nearby.Info == "For allotment queries outside Bath, please contact your local Parish Council.") {
                            //res.allotmentsOutsideBath = true;
                            return {};
                        } else {
                            res.Results.Allotments_Nearby = DataTransformations.objectToArray(res.Results.Allotments_Nearby);
                            for (i = 0; i < res.Results.Allotments_Nearby.length ; i++) {
                                res.Results.Allotments_Nearby[i].ProvidedAdjusted = res.Results.Allotments_Nearby[i].Provided__by.replace('amp;', '');
                                geo = NEtoLL(res.Results.Allotments_Nearby[i].MapSpurE, res.Results.Allotments_Nearby[i].MapSpurN);
                                res.Results.Allotments_Nearby[i].lat = geo.latitude;
                                res.Results.Allotments_Nearby[i].lon = geo.longitude;
                                if (res.Results.Allotments_Nearby[i].ProvidedAdjusted === "B&NES") {
                                    res.Results.Allotments_Nearby[i].ProvidedAdjusted = "Bath & North East Somerset Council";
                                }
                            }
                            return res.Results.Allotments_Nearby;
                        }
                    }
                    return {};
                case 12: // Health and Fitness
                    if (res && res.Results && res.Results.Health_and_Fitness_Centres_Nearby) {
                        res.Results.Health_and_Fitness_Centres_Nearby = DataTransformations.objectToArray(res.Results.Health_and_Fitness_Centres_Nearby);
                        for (i = 0; i < res.Results.Health_and_Fitness_Centres_Nearby.length ; i++) {
                            res.Results.Health_and_Fitness_Centres_Nearby[i].name = res.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[1].replace('amp;', '');
                            res.Results.Health_and_Fitness_Centres_Nearby[i].url = res.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[0];
                            geo = NEtoLL(res.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurE, res.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurN);
                            res.Results.Health_and_Fitness_Centres_Nearby[i].lat = geo.latitude;
                            res.Results.Health_and_Fitness_Centres_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Health_and_Fitness_Centres_Nearby;
                    }
                    return {};
                case 15: // Planning Applications
                    if (res && res.Results && res.Results.Planning_Applications_Nearby) {
                        res.Results.Planning_Applications_Nearby = DataTransformations.objectToArray(res.Results.Planning_Applications_Nearby);
                        for (i = 0; i < res.Results.Planning_Applications_Nearby.length ; i++) {
                            res.Results.Planning_Applications_Nearby[i].title = res.Results.Planning_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
                            res.Results.Planning_Applications_Nearby[i].url = res.Results.Planning_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
                            geo = NEtoLL(res.Results.Planning_Applications_Nearby[i].MapSpurE, res.Results.Planning_Applications_Nearby[i].MapSpurN);
                            res.Results.Planning_Applications_Nearby[i].lat = geo.latitude;
                            res.Results.Planning_Applications_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Planning_Applications_Nearby;
                    }
                    return {};
                case 16: // New Licencing
                    if (res && res.Results && res.Results.New_Licensing_Applications_Nearby) {
                        if (res.Results.New_Licensing_Applications_Nearby.Info) {
                            return {};
                        }
                        res.Results.New_Licensing_Applications_Nearby = DataTransformations.objectToArray(res.Results.New_Licensing_Applications_Nearby);
                        for (i = 0; i < res.Results.New_Licensing_Applications_Nearby.length ; i++) {
                            res.Results.New_Licensing_Applications_Nearby[i].title = res.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
                            res.Results.New_Licensing_Applications_Nearby[i].url = res.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
                            geo = NEtoLL(res.Results.New_Licensing_Applications_Nearby[i].MapSpurE, res.Results.New_Licensing_Applications_Nearby[i].MapSpurN);
                            res.Results.New_Licensing_Applications_Nearby[i].lat = geo.latitude;
                            res.Results.New_Licensing_Applications_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.New_Licensing_Applications_Nearby;
                    }
                    return {};
                case 17: // Issued ditto
                    if (res && res.Results && res.Results.Issued_Licensing_Applications_Nearby) {
                        res.Results.Issued_Licensing_Applications_Nearby = DataTransformations.objectToArray(res.Results.Issued_Licensing_Applications_Nearby);
                        for (i = 0; i < res.Results.Issued_Licensing_Applications_Nearby.length ; i++) {
                            res.Results.Issued_Licensing_Applications_Nearby[i].title = res.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
                            res.Results.Issued_Licensing_Applications_Nearby[i].url = res.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
                            geo = NEtoLL(res.Results.Issued_Licensing_Applications_Nearby[i].MapSpurE, res.Results.Issued_Licensing_Applications_Nearby[i].MapSpurN);
                            res.Results.Issued_Licensing_Applications_Nearby[i].lat = geo.latitude;
                            res.Results.Issued_Licensing_Applications_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Issued_Licensing_Applications_Nearby;
                    }
                    return {};
                case 20: // Bus Stops
                    if (res && res.Results && res.Results.Bus_Stops_Nearby) {
                        res.Results.Bus_Stops_Nearby = DataTransformations.objectToArray(res.Results.Bus_Stops_Nearby);
                        for (i = 0; i < res.Results.Bus_Stops_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.Bus_Stops_Nearby[i].MapSpurE, res.Results.Bus_Stops_Nearby[i].MapSpurN);
                            res.Results.Bus_Stops_Nearby[i].lat = geo.latitude;
                            res.Results.Bus_Stops_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.Bus_Stops_Nearby;
                    }
                    return {};
                case 21: // Crossings
                    if (res && res.Results && res.Results.School_Crossings_Nearby) {
                        res.Results.School_Crossings_Nearby = DataTransformations.objectToArray(res.Results.School_Crossings_Nearby);
                        for (i = 0; i < res.Results.School_Crossings_Nearby.length ; i++) {
                            geo = NEtoLL(res.Results.School_Crossings_Nearby[i].MapSpurE, res.Results.School_Crossings_Nearby[i].MapSpurN);
                            res.Results.School_Crossings_Nearby[i].lat = geo.latitude;
                            res.Results.School_Crossings_Nearby[i].lon = geo.longitude;
                        }
                        return res.Results.School_Crossings_Nearby;
                    }
                    return {};
                case 22:
                    if (res && res.Results && res.Results["Parking Zones"]) {
                        if (res.Parking_Zones.Info && res["Parking Zones"].Info === "<p>No records found nearby.</p>") {
                            return {};
                        }
                        res.Results["Parking Zones"] = DataTransformations.objectToArray(res.Results["Parking Zones"]);
                        for (i = 0; i < res.Results.Parking_Zones.length ; i++) {
                            geo = NEtoLL(res.Results.Parking_Zones[i].MapSpurE, res.Results.Parking_Zones[i].MapSpurN);
                            res.Results.Parking_Zones[i].lat = geo.latitude;
                            res.Results.Parking_Zones[i].lon = geo.longitude;
                        }
                        return res.Parking_Zones;
                    }
                    return {};

                    // My council
                case 7:  // Collection dates
                    if (res && res.Results && res.Results._______________) {
                        string = '<!DOCTYPE html><html><head></head><body>' + res.Results._______________._ + '</body></html>';
                        doc = new DOMParser().parseFromString(string, 'text/html');
                        var collectionDates = doc.querySelectorAll('span.WasteHighlight');

                        if (collectionDates && collectionDates[0]) {
                            res.Results._______________.waste = collectionDates[0].innerText;
                        }
                        if (collectionDates && collectionDates[1]) {
                            res.Results._______________.recycling = collectionDates[1].innerText;
                        }
                        if (collectionDates && collectionDates[2]) {
                            res.Results._______________.garden = collectionDates[2].innerText;
                        }
                    }
                    return res;
                case 13:  // Councillor 
                    var yourCouncillors = res;
                    if (res && res.Results && res.Results.Your_Councillors) {
                        var phoneNumbers = /(\+[0-9]{1,2}|0)[0-9 ]{7,12}/;
                        string = '<!DOCTYPE html><html><head></head><body>' + yourCouncillors.Results.Your_Councillors._ + '</body></html>';
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
                            yourCouncillors.Results.Your_Councillors.number1 = councillors[0].innerHTML;
                            yourCouncillors.Results.Your_Councillors.info1 = councillors[0].href;
                            yourCouncillors.Results.Your_Councillors.telephone1 = tel;
                            yourCouncillors.Results.Your_Councillors.img1 = URLtoBase64(councillorInfo[0].getElementsByTagName('img')[0].src);
                        }
                        if (councillors[1]) {
                            tel = "";
                            party = "";

                            if (councillorInfo[1] && councillorInfo[1].innerText.indexOf('Telephone') != -1) {
                                tel = phoneNumbers.exec(councillorInfo[1].innerText)[0];
                            }
                            yourCouncillors.Results.Your_Councillors.number2 = councillors[1].innerHTML;
                            yourCouncillors.Results.Your_Councillors.info2 = councillors[1].href;
                            yourCouncillors.Results.Your_Councillors.telephone2 = tel;
                            yourCouncillors.Results.Your_Councillors.img2 = URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
                        }
                        if (councillors[2]) {
                            tel = "";
                            party = "";

                            if (councillorInfo[2] && councillorInfo[2].innerText.indexOf('Telephone') != -1) {
                                tel = phoneNumbers.exec(councillorInfo[2].innerText)[0];
                            }
                            yourCouncillors.Results.Your_Councillors.number3 = councillors[3].innerHTML;
                            yourCouncillors.Results.Your_Councillors.info3 = councillors[3].href;
                            yourCouncillors.Results.Your_Councillors.telephone3 = tel;
                            yourCouncillors.Results.Your_Councillors.img3 = URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
                        }
                        return yourCouncillors.Results.Your_Councillors;
                    }
                    return {};
                case 14:  // Listed Building
                    if (res && res.Results && res.Results.Listed_Building) {
                        if (res.Results.Listed_Building.Info === "<p>No records found nearby.</p>") {
                            return {};
                        }
                        return res.Results.Listed_Building;
                    }
                    return {};
                case 18:  // Council offices
                    if (res && res.Results && res.Results.____________________________) {
                        // if iShare returns just one, then this fails. Re-jig the object to be a new object holding the old one
                        // Example: BA3 3UD
                        res.Results.____________________________ = DataTransformations.objectToArray(res.Results.____________________________);
                        for (i = 0; i < res.Results.____________________________.length; i++) {
                            res.Results.____________________________[i].title = res.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[1].replace('amp;', '');
                            res.Results.____________________________[i].url = res.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[0].replace('amp;', '');
                            geo = NEtoLL(res.Results.____________________________[i].MapSpurE, res.Results.____________________________[i].MapSpurN);
                            res.Results.____________________________[i].lat = geo.latitude;
                            res.Results.____________________________[i].lon = geo.longitude;
                        }
                        return res.Results.____________________________;
                    }
                    return {};
                default:
                    return {};
            }
        }
    };
});