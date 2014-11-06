angular.module('MyBath.MapDataService', [])
/**
 * Factory: Map Data
 * 
*/
.factory('MapData', function ($http, $q) {
    function toTitleCase(str)
        {
            // Converts a string to title case
            // Source http://stackoverflow.com/a/196991
            return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }
    
    var icons = {
        defaultIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-bug  "></i>'
        },
        conservationIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon balanced ion-leaf></i>'
        },
        libraryIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-android-book"></i>'
        },
        officeIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-coffee"></i>'
        },
        toiletIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-woman"></i><i class="icon calm ion-man"></i>'
        },
        parkIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-ios7-tennisball"></i>'
        },
        wasteIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-ios7-trash"></i>'
        },
        carParkIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-model-s"></i>'
        },
        schoolIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-ios7-home"></i>'
        },
        roadworksIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-wrench"></i>'
        },
        universityIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-university"></i>'
        },
        fitnessIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-happy"></i>'
        },
        playSchoolIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon balanced on-ios7-paw"></i>'
        },
        busIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-pin"></i>'
        }

    };

    return {
        layerList: function () {
            return layerList;
        },
        getLayer: function (layer, lat, lng) {
            var getIcon = function(layer) {
                switch (layer){
                    case "MobileLibraryStops":
                    case "Libraries":
                        return icons.libraryIcon;
                    case "CivicAmenitySites":
                        return icons.wasteIcon;
                    case "carParks":
                    case "CarParksLive":
                        return icons.carParkIcon;
                    case "Council_Offices":
                        return icons.officeIcon;
                    case "PublicConveniences":
                        return icons.toiletIcon;
                    case "HealthandFitnessCentres":
                        return icons.fitnessIcon;
                    case "BusStops":
                        return icons.busIcon;
                    case "PrimarySchools":
                    case "SecondarySchools":
                    case "Colleges":
                        return icons.schoolIcon;
                    case "Roadworks":
                        return icons.roadworksIcon;
                    case "Universities":
                        return icons.universityIcon;
                    case "Parks":
                    case "PlayAreas":
                    case "TennisCourts":
                    case "OpenSpaces":
                        return icons.parkIcon;
                    case "ConAreas":
                    case "Allotments":
                        return icons.conservationIcon;
                    case "NurseryPlaySchools":
                        return icons.playSchoolIcon;
                    default:
                        console.warn("default layer: " + layer);
                        return icons.defaultIcon;
                }
            
            };
            var pos = LLtoNE(lat, lng);
            var start = 'https://isharemaps.bathnes.gov.uk/MapGetImage.aspx?MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&mapid=-1&SearchType=findMyNearest&Distance=16094&MaxResults=10';
            var start2 = 'https://isharemaps.bathnes.gov.uk/MapGetImage.aspx?RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&mapid=-1&SearchType=findMyNearest&Distance=16094&MaxResults=10&MapSource=BathNES/';
            var NorthEastString = "&Easting=" + pos.east + "&Northing=" + pos.north;

            var layerList = {
                Libraries: start + NorthEastString + '&ActiveLayer=Libraries',
                PrimarySchools: start + NorthEastString + '&ActiveLayer=PrimarySchools',
                Council_Offices: start + NorthEastString + '&ActiveLayer=Council_Offices',
                NurseryPlaySchools: start + NorthEastString + '&ActiveLayer=NurseryPlaySchools',
                SecondarySchools: start + NorthEastString + '&ActiveLayer=SecondarySchools',
                Colleges: start + NorthEastString + '&ActiveLayer=Colleges',
                Universities: start + NorthEastString + '&ActiveLayer=Universities',
                ConAreas: start + NorthEastString + '&ActiveLayer=ConAreas',
                CivicAmenitySites: start + NorthEastString + '&ctiveLayer=CivicAmenitySites',
                HealthandFitnessCentres: start + NorthEastString + '&ActiveLayer=HealthandFitnessCentres',
                PlayAreas: start + NorthEastString + '&ActiveLayer=PlayAreas',
                TennisCourts: start + NorthEastString + '&ActiveLayer=TennisCourts',
                Allotments: start + NorthEastString + '&ActiveLayer=Allotments',
                MobileLibraryStops: start + NorthEastString + '&ActiveLayer=MobileLibraryStops',
                BusStops: 'https://isharemaps.bathnes.gov.uk/MapGetImage.aspx?MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&mapid=-1&SearchType=findMyNearest&Distance=500&MaxResults=25' + NorthEastString + '&ActiveLayer=BusStops',
                Roadworks: start + NorthEastString + '&ActiveLayer=Roadworks',
                CarParks: start2 + 'CarParks&ActiveLayer=CarParks' + NorthEastString,
                Parks: start2 + 'ParksOpenSpaces&ActiveLayer=Parks' + NorthEastString,
                OpenSpaces: start2 + 'ParksOpenSpaces&ActiveLayer=OpenSpaces' + NorthEastString,
                PublicConveniences: start2 + 'Public_Infrastructure&ActiveLayer=PublicConveniences' + NorthEastString,
                CarParksLive: "http://data.bathhacked.org/resource/u3w2-9yme.json",
                AirQuality: "http://data.bathhacked.org/resource/hqr9-djir.json?$order=datetime%20desc"
            };
        
            var url = layerList[layer];
            var layerData = [];
            var layerData_q = $q.defer();

            $http.get(url)
                .success(function (data, status, headers, config) {
                    var northing = "";
                    var easting = "";
                    var latLng = [];
                    var title = "";
                    var bgC = "";
                    var icon = {};
                    
                    if ( layer === "CarParksLive") {
                        for (i = 0; i < data.length ; i++) {
                            northing = data[i].northing;
                            easting = data[i].easting;

                            latlng = NEtoLL(easting, northing);

                            // Remaining spaces
                            var rem = parseInt(data[i].capacity, 10) - parseInt(data[i].occupancy, 10);
                            if (rem < 0) {
                                rem = 0;
                            }

                            icon = Object.create(getIcon(layer));
                            bgC = "#66cc33";

                            // Change the colour if it's almost full
                            var pFull = parseInt(data[i].percentage, 10);
                            if (pFull > 80 || rem < 30) {
                                bgC = "#d39211";
                            }
                            if (pFull > 95 || rem < 15) {
                                bgC = "#cc2311";
                            }

                            icon.html = '<p class = "circle-marker" style="background:' + bgC + '">' + rem + '</p>';
                            title = data[i].name + "<br>" + pFull    + "% full";
                            title = title.replace("CP", "Car Park");
                            title = title.replace("P+R", "Park & Ride");
                            layerData.push({ lat: latlng.latitude, lng: latlng.longitude, icon: icon, layer: "CarParksLive", message: title });
                        }
                    } else if ( layer === "AirQuality" ) {
                        // Data is sorted by the server in decending order.
                        // Store the latest for each sensor
                        i = 0;
                        aqData = {};
                        while ( i < 900 ) {
                            curr_slug = data[i].sensor_location_slug;
                            if ( !aqData[curr_slug] ) {
                               aqData[curr_slug] = data[i];
                            }
                            if (aqData.guildhall && aqData.londonrdenc &&
                                aqData.londonrdaurn && aqData.royalvicpark &&
                                aqData.windsorbridge) {
                                data = aqData;
                                break;
                            }
                            i++;
                        }

                        var aqMon = ["guildhall", "londonrdenc", "londonrdaurn",
                                    "royalvicpark", "windsorbridge"];
                        for (i = 0; i < aqMon.length; i++) {
                            // Create labels for our monitors
                            // If there's an index band on
                            // http://uk-air.defra.gov.uk/air-pollution/daqi?view=more-info&pollutant=ozone#pollutant
                            // Colour code

                            var maxLevel = 0;
                            title = aqData[aqMon[i]].sensor_location_name;

                            if(aqData[aqMon[i]].nox) {
                                title += "<br />NO<sub>x</sub>: "+ aqData[aqMon[i]].nox + " ppb";
                            }

                            if(aqData[aqMon[i]].no) {
                                title += "<br />NO: "+ aqData[aqMon[i]].no + " ppb";
                            }

                            if(aqData[aqMon[i]].no2) {
                                title += "<br />NO<sub>2</sub>: " + aqData[aqMon[i]].no2 + " ppb ";
                                var numno2 = parseFloat(aqData[aqMon[i]].no2);
                                if (numno2 < 67) {
                                    title += "<span style='background:#9CFF9C'>(1 - Low)</span>";
                                    maxLevel = 1;
                                } else if (numno2 < 134) {
                                    title += "<span style='background:#31FF00'>(2 - Low)</span>";
                                    maxLevel = 2;
                                } else if (numno2 < 200) {
                                    title += "<span style='background:#31CF00'>(3 - Low)</span>";
                                    maxLevel = 3;
                                } else if (numno2 < 267) {
                                    title += "<span style='background:#FFFF00'>(4 - Moderate)</span>";
                                    maxLevel = 4;
                                } else if (numno2 < 334) {
                                    title += "<span style='background:#FFCF00'>(5 - Moderate)</span>";
                                    maxLevel = 5;
                                } else if (numno2 < 400) {
                                    title += "<span style='background:#FFCF00'>(6 - Moderate)</span>";
                                    maxLevel = 6;
                                } else if (numno2 < 467) {
                                    title += "<span style='background:#FF9A00'>(7 - High)</span>";
                                    maxLevel = 7;
                                } else if (numno2 < 534) {
                                    title += "<span style='background:#FF0000'>(8 - High)</span>";
                                    maxLevel = 8;
                                } else if (numno2 < 600) {
                                    title += "<span style='background:#990000'>(9 - High)</span>";
                                    maxLevel = 9;
                                } else if (numno2 < 1000) {
                                    title += "<span style='background:#CE30FF'>(10 - Very High)</span>";
                                    maxLevel = 10;
                                } else {
                                    title += "(outlier)";
                                }
                            }

                            if(aqData[aqMon[i]].co) {
                                title += "<br />CO: "+ aqData[aqMon[i]].co + " ppm";
                            }

                            if(aqData[aqMon[i]].pm10) {
                                title += "<br />PM10: "+ aqData[aqMon[i]]["pm10"] + " μg/m³ ";
                                var numpm10 = parseFloat(aqData[aqMon[i]]["pm10"]);
                                if (numpm10 < 16) {
                                    title += "<span style='background:#9CFF9C'>(1 - Low)</span>";
                                    if (maxLevel < 1) maxLevel=1;
                                } else if (numpm10 < 33) {
                                    title += "<span style='background:#31FF00'>(2 - Low)</span>";
                                    if (maxLevel < 2) maxLevel=2;
                                } else if (numpm10 < 50) {
                                    title += "<span style='background:#31CF00'>(3 - Low)</span>";
                                    if (maxLevel < 3) maxLevel=3;
                                } else if (numpm10 < 58) {
                                    title += "<span style='background:#FFFF00'>(4 - Moderate)</span>";
                                    if (maxLevel < 4) maxLevel=4;
                                } else if (numpm10 < 66) {
                                    title += "<span style='background:#FFCF00'>(5 - Moderate)</span>";
                                    if (maxLevel < 5) maxLevel=5;
                                } else if (numpm10 < 75) {
                                    title += "<span style='background:#FFCF00'>(6 - Moderate)</span>";
                                    if (maxLevel < 6) maxLevel=6;
                                } else if (numpm10 < 83) {
                                    title += "<span style='background:#FF9A00'>(7 - High)</span>";
                                    if (maxLevel < 7) maxLevel=7;
                                } else if (numpm10 < 91) {
                                    title += "<span style='background:#FF0000'>(8 - High)</span>";
                                    if (maxLevel < 8) maxLevel=8;
                                } else if (numpm10 < 100) {
                                    title += "<span style='background:#990000'>(9 - High)</span>";
                                    if (maxLevel < 9) maxLevel=9;
                                } else if (numpm10 < 450) {
                                    title += "<span style='background:#CE30FF'>(10 - Very High)</span>";
                                    maxLevel = 10;
                                } else {
                                    title += "(outlier)";
                                }
                            }

                            if(aqData[aqMon[i]].o3) {
                                title += "<br />O<sub>3</sub>: "+ aqData[aqMon[i]]["o3"] + " ppb ";
                                var numo3 = parseFloat(aqData[aqMon[i]]["o3"]);
                                if (numo3 < 33) {
                                    title += "<span style='background:#9CFF9C'>(1 - Low)</span>";
                                    if (maxLevel < 1) maxLevel=1;
                                } else if (numo3 < 66) {
                                    title += "<span style='background:#31FF00'>(2 - Low)</span>";
                                    if (maxLevel < 2) maxLevel=2;
                                } else if (numo3 < 100) {
                                    title += "<span style='background:#31CF00'>(3 - Low)</span>";
                                    if (maxLevel < 3) maxLevel=3;
                                } else if (numo3 < 120) {
                                    title += "<span style='background:#FFFF00'>(4 - Moderate)</span>";
                                    if (maxLevel < 4) maxLevel=4;
                                } else if (numo3 < 140) {
                                    title += "<span style='background:#FFCF00'>(5 - Moderate)</span>";
                                    if (maxLevel < 5) maxLevel=5;
                                } else if (numo3 < 160) {
                                    title += "<span style='background:#FFCF00'>(6 - Moderate)</span>";
                                    if (maxLevel < 6) maxLevel=6;
                                } else if (numo3 < 187) {
                                    title += "<span style='background:#FF9A00'>(7 - High)</span>";
                                    if (maxLevel < 7) maxLevel=7;
                                } else if (numo3 < 213) {
                                    title += "<span style='background:#FF0000'>(8 - High)</span>";
                                    if (maxLevel < 8) maxLevel=8;
                                } else if (numo3 < 240) {
                                    title += "<span style='background:#990000'>(9 - High)</span>";
                                    if (maxLevel < 9) maxLevel=9;
                                } else if (numo3 < 450) {
                                    title += "<span style='background:#CE30FF'>(10 - Very High)</span>";
                                    maxLevel = 10;
                                } else {
                                    title += "(outlier)";
                                }
                            }

                            // make an icon

                            icon = Object.create(getIcon(layer));
                            bgC = "";
                            switch (maxLevel) {
                                case 1:
                                    bgC = "#9CFF9C";
                                    break;
                                case 2:
                                    bgC = "#31FF00";
                                    break;
                                case 3:
                                    bgC = "#31CF00";
                                    break;
                                case 4:
                                    bgC = "#FFFF00";
                                    break;
                                case 5:
                                    bgC = "#FFCF00";
                                    break;
                                case 6:
                                    bgC = "#FF9A00";
                                    break;
                                case 7:
                                    bgC = "#FF6464";
                                    break;
                                case 8:
                                    bgC = "#FF0000";
                                    break;
                                case 9:
                                    bgC = "#990000";
                                    break;
                                case 10:
                                    bgC = "#CE30FF";
                                    break;
                            }

                            icon.html = '<p class = "circle-marker" style="background:' + bgC + '">' + maxLevel + '</p>';

                            
                            layerData.push({ lat: parseFloat(aqData[aqMon[i]].sensor_location.latitude), lng: parseFloat(aqData[aqMon[i]].sensor_location.longitude), icon: icon, layer: "AirQuality", message: title });
                        }
                    } else if (data && data != [] && !(data.error) && layer !== "CarParksLive" ) {
                        for (i = 0; i < data[0].features.length ; i++) {
                            northing = data[0].features[i].geometry.coordinates[0][0];
                            easting = data[0].features[i].geometry.coordinates[0][1];
                            var titleAndUrl = data[0].features[i].properties.fields._;
                            title = data[0].features[i].properties.fields._;
                            if ( title ) {
                                if ( layer == "PlayAreas" ) {
                                    title = data[0].features[i].properties.html;
                                } else if (titleAndUrl.indexOf('|') != -1) {
                                title = titleAndUrl.split('|')[1];
                                }
                            } else {
                                // Add the HTML data - to display *something*
                                title = data[0].features[i].properties.html;
                            }
                            if (title.search( /Distance from.* pin [0-9]+\)/ ) !== -1) {
                                title = title.slice(0,title.search(/Distance from.* pin [0-9]+\)/));
                            }
                            if (title.search( /[A-Z ]{8}/ ) !== -1) {
                                title = toTitleCase(title);
                            }
                            
                        
                            latlng = NEtoLL(northing, easting);
                            layerData.push({ lat: latlng.latitude, lng: latlng.longitude, icon: getIcon(layer), layer: data[0].properties.layerName, message: title });
                        }
                    } else {
                        layerData =  "Failed";
                    }
                    layerData_q.resolve(layerData);
                    return layerData;
                })
                .error(function (data, status, headers, config) {
                    layerData = "Failed";
                    layerData_q.resolve(layerData);
                    return "Failed";
                });
            return layerData_q.promise;
        }
    };
});