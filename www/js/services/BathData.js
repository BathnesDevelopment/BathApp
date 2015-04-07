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
        toNewObj: function () {
            return {
                "MyCouncil": {
                    "binCollection": {
                        "Results": {
                            "_______________": {
                                "LLPG_UPRN": 100120020953,
                                "_": "<table id=\"reftab\" colspan=\"2\"><tr><td> <strong>Your next weekly refuse collection is: </strong><br><span class=\"WasteHighlight\">Wednesday, 11 March</span></td><td><a href=\"http://www.bathnes.gov.uk/services/bins-rubbish-and-recycling/collections-recycling-and-rubbish/rubbish-collection\" target=\" _blank\" ><img src=\"images/icons/refuse_sack75.png\" /></a><br>Route: L32</td></tr> <tr><td><strong>Your next weekly recycling collection is: </strong><br><span class=\"WasteHighlight\">Wednesday, 11 March</span></td><td><a href=\"http://www.bathnes.gov.uk/services/bins-rubbish-and-recycling/recycling-and-rubbish/what-you-can-recycle\" target=\" _blank\" ><img src=\"images/icons/recycling_box75.png\" /></a><br>Route: L313</td></tr> <tr><td><strong>Your next fortnightly garden waste collection is: </strong><br><span class=\"WasteHighlight\">Wednesday, 11 March</span></td><td><a href=\"http://www.bathnes.gov.uk/services/bins-rubbish-and-recycling/garden-waste-and-compost\" target=\" _blank\" ><img src=\"images/icons/garden_waste75.png\" /></a><br>Route: L32b<br>Week: B</td></tr> </table><P ALIGN=\"left\"><strong>Did we miss a collection? <a href=\"http://www.bathnes.gov.uk/reportit?uprn=100120020953\">Report It</a></strong></P>",
                                "waste": "Wednesday, 11 March",
                                "recycling": "Wednesday, 11 March",
                                "garden": "Wednesday, 11 March"
                            }
                        }
                    },
                    "yourCouncillors": [
                      {
                          "name": "Councillor Loraine Morgan-Brinkhurst MBE",
                          "info": "http://democracy.bathnes.gov.uk/mgUserInfo.aspx?UID=160",
                          "telephone": "",
                          "img": "http://democracy.bathnes.gov.uk/UserData/0/6/1/Info00000160/smallpic.jpg"
                      },
                      {
                          "name": "Councillor Caroline Roberts",
                          "info": "http://democracy.bathnes.gov.uk/mgUserInfo.aspx?UID=262",
                          "telephone": "",
                          "img": "http://democracy.bathnes.gov.uk/UserData/2/6/2/Info00000262/smallpic.jpg"
                      }
                    ],
                    "listedBuilding": null,
                    "councilOffices": [
                      {
                          "Your_nearest_Council_Office_is_": "http://www.bathnes.gov.uk/contact-us/offices-and-one-stop-shopsGUILDHALL|GUILDHALL",
                          "MapSpurE": 375126.002848,
                          "MapSpurN": 164839.004581,
                          "MapSpurMinE": 375126.002848,
                          "MapSpurMinN": 164839.004581,
                          "MapSpurMaxE": 375126.002848,
                          "MapSpurMaxN": 164839.004581,
                          "Distance": 2473.2,
                          "MapSpurX": "0",
                          "MapSpurY": "0",
                          "title": "GUILDHALL",
                          "url": "http://www.bathnes.gov.uk/contact-us/offices-and-one-stop-shopsGUILDHALL",
                          "lat": 51.382049075810514,
                          "lon": -2.3588050827311737
                      },
                      {
                          "Your_nearest_Council_Office_is_": "http://www.bathnes.gov.uk/contact-us/offices-and-one-stop-shopsBATH ONE STOP SHOP, 3-4 MANVERS STREET|BATH ONE STOP SHOP, 3-4 MANVERS STREET",
                          "MapSpurE": 375229.997804,
                          "MapSpurN": 164541.999598,
                          "MapSpurMinE": 375229.997804,
                          "MapSpurMinN": 164541.999598,
                          "MapSpurMaxE": 375229.997804,
                          "MapSpurMaxN": 164541.999598,
                          "Distance": 2621.6,
                          "MapSpurX": "0",
                          "MapSpurY": "0",
                          "title": "BATH ONE STOP SHOP, 3-4 MANVERS STREET",
                          "url": "http://www.bathnes.gov.uk/contact-us/offices-and-one-stop-shopsBATH ONE STOP SHOP, 3-4 MANVERS STREET",
                          "lat": 51.379383132701975,
                          "lon": -2.35728999054393
                      },
                      {
                          "Your_nearest_Council_Office_is_": "http://www.bathnes.gov.uk/contact-us/offices-and-one-stop-shopsKEYNSHAM ONE STOP SHOP|KEYNSHAM ONE STOP SHOP",
                          "MapSpurE": 365484.953962,
                          "MapSpurN": 168458.498512,
                          "MapSpurMinE": 365484.953962,
                          "MapSpurMinN": 168458.498512,
                          "MapSpurMaxE": 365484.953962,
                          "MapSpurMaxN": 168458.498512,
                          "Distance": 7933.5,
                          "MapSpurX": "0",
                          "MapSpurY": "0",
                          "title": "KEYNSHAM ONE STOP SHOP",
                          "url": "http://www.bathnes.gov.uk/contact-us/offices-and-one-stop-shopsKEYNSHAM ONE STOP SHOP",
                          "lat": 51.41408662051207,
                          "lon": -2.497686819766102
                      }
                    ],
                    "housingAllowanceZones": null
                },
                "LocalData": {
                    "layers": {
                        "categories": [
                          {
                              "name": "Libraries",
                              "contents": [
                                "librariesNearby",
                                "mobileLibrariesNearby"
                              ]
                          },
                          {
                              "name": "Schools",
                              "contents": [
                                "playSchoolsNearby",
                                "primarySchoolsNearby",
                                "secondarySchoolsNearby",
                                "collegesNearby",
                                "universitiesNearby",
                                "schoolCrossings"
                              ]
                          },
                          {
                              "name": "Leasure",
                              "contents": [
                                "parksNearby",
                                "playAreasNearby",
                                "allotmentsNearby",
                                "healthAndFitnessNearby"
                              ]
                          },
                          {
                              "name": "Transport",
                              "contents": [
                                "roadworksNearby",
                                "busStops",
                                "parkingNearby"
                              ]
                          },
                          {
                              "name": "Planning & Licencing",
                              "contents": [
                                "planningApplicationsNearby",
                                "newLicensingAppsNearby",
                                "issuedLicensingAppsNearby"
                              ]
                          }
                        ],
                        "displayName": {
                            "librariesNearby": "Libraries",
                            "busStops": "Bus Stops",
                            "primarySchoolsNearby": "Primary Schools",
                            "roadworksNearby": "Roadworks",
                            "mobileLibrariesNearby": "Mobile Libraries",
                            "playSchoolsNearby": "Nursery/Play Schools",
                            "collegesNearby": "Colleges",
                            "secondarySchoolsNearby": "Secondary Schools",
                            "parkingNearby": "Parking zone",
                            "schoolCrossings": "School Crossings",
                            "healthAndFitnessNearby": "Health & Fitness Centres",
                            "newLicensingAppsNearby": "New License Applications",
                            "planningApplicationsNearby": "Planning Applications",
                            "issuedLicensingAppsNearby": "Issued License Applications",
                            "parksNearby": "Parks Nearby",
                            "playAreasNearby": "Play Areas",
                            "allotmentsNearby": "Allotments",
                            "universitiesNearby": "Universities"
                        }
                    },
                    "data": {
                        "librariesNearby": [
                          {
                              "_": "http://www.bathnes.gov.uk/BathNES/leisureandculture/Libraries/default.htm#Moorland Road Library|Moorland Road Library",
                              "MapSpurE": 373655.199378,
                              "MapSpurN": 164386.574088,
                              "MapSpurMinE": 373655.199378,
                              "MapSpurMinN": 164386.574088,
                              "MapSpurMaxE": 373655.199378,
                              "MapSpurMaxN": 164386.574088,
                              "Distance": 1211.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "url": "http://www.bathnes.gov.uk/BathNES/leisureandculture/Libraries/default.htm#Moorland Road Library",
                              "name": "Moorland Road Library",
                              "lat": 51.3779144081875,
                              "lon": -2.3799050394660015
                          }
                        ],
                        "mobileLibrariesNearby": [
                          {
                              "village": "Newbridge",
                              "stop": "Partis Way",
                              "time": "16.35 ? 17.00",
                              "day": "Wednesday",
                              "_": "http://www.bathnes.gov.uk/services/libraries-and-archives/access-all/mobile-library-routes/mobile-library-route-review|View the timetable",
                              "MapSpurE": 372405.000764,
                              "MapSpurN": 165620.001023,
                              "MapSpurMinE": 372405.000764,
                              "MapSpurMinN": 165620.001023,
                              "MapSpurMaxE": 372405.000764,
                              "MapSpurMaxN": 165620.001023,
                              "Distance": 595.7,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "timeAdjusted": "16.35 - 17.00",
                              "url": "http://www.bathnes.gov.uk/services/libraries-and-archives/access-all/mobile-library-routes/mobile-library-route-review",
                              "lat": 51.38894502526563,
                              "lon": -2.3979634542978023
                          }
                        ],
                        "playSchoolsNearby": [
                          {
                              "_": "Cabin After School Club",
                              "Service__Type": "Registered After School Care",
                              "phone": "01225 465691",
                              "website": "www.bathymca.co.uk",
                              "Address": "c/o Newbridge Junior School, Charmouth Road, Newbridge, Bath, BA1 3LL",
                              "MapSpurE": 372648.996857,
                              "MapSpurN": 165320.996612,
                              "MapSpurMinE": 372648.996857,
                              "MapSpurMinN": 165320.996612,
                              "MapSpurMaxE": 372648.996857,
                              "MapSpurMaxN": 165320.996612,
                              "Distance": 237.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Cabin After School Club",
                              "lat": null,
                              "lon": null,
                              "$$hashKey": "object:82"
                          },
                          {
                              "_": "Newbridge Breakfast Club",
                              "Service__Type": "Breakfast Club",
                              "phone": "01225 339606",
                              "website": null,
                              "Address": "Newbridge Primary School, Charmouth Road, Newbridge, Bath, BA1 3LL",
                              "MapSpurE": 372648.996857,
                              "MapSpurN": 165320.996612,
                              "MapSpurMinE": 372648.996857,
                              "MapSpurMinN": 165320.996612,
                              "MapSpurMaxE": 372648.996857,
                              "MapSpurMaxN": 165320.996612,
                              "Distance": 237.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Newbridge Breakfast Club",
                              "lat": null,
                              "lon": null,
                              "$$hashKey": "object:83"
                          },
                          {
                              "_": "Peter Pan Pre-School",
                              "Service__Type": "Playgroup or Pre-School",
                              "phone": "01225 481259",
                              "website": "www.peterpanpreschoolbath.co.uk",
                              "Address": "Methodist Church Hall, Kennington Road, Newbridge, Bath, BA1 3EA",
                              "MapSpurE": 372984.001934,
                              "MapSpurN": 165238.00037,
                              "MapSpurMinE": 372984.001934,
                              "MapSpurMinN": 165238.00037,
                              "MapSpurMaxE": 372984.001934,
                              "MapSpurMaxN": 165238.00037,
                              "Distance": 354.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Peter Pan Pre-School",
                              "lat": null,
                              "lon": null,
                              "$$hashKey": "object:84"
                          }
                        ],
                        "primarySchoolsNearby": [
                          {
                              "_": "http://www.newbridge.bathnes.sch.uk|Newbridge Primary School",
                              "__": "Charmouth Road",
                              "___": null,
                              "____": "BA1 3LL",
                              "MapSpurE": 372646.465623,
                              "MapSpurN": 165321.126575,
                              "MapSpurMinE": 372646.465623,
                              "MapSpurMinN": 165321.126575,
                              "MapSpurMaxE": 372646.465623,
                              "MapSpurMaxN": 165321.126575,
                              "Distance": 237.8,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Newbridge Primary School",
                              "url": "http://www.newbridge.bathnes.sch.uk",
                              "lat": 51.38626945860047,
                              "lon": -2.3944702621780065,
                              "$$hashKey": "object:89"
                          },
                          {
                              "_": "http://www.stmichaelsjuniors.org|St Michaels CofE Junior School",
                              "__": "Newton Road",
                              "___": "Twerton",
                              "____": "BA2 1RW",
                              "MapSpurE": 372048.105049,
                              "MapSpurN": 164822.619271,
                              "MapSpurMinE": 372048.105049,
                              "MapSpurMinN": 164822.619271,
                              "MapSpurMaxE": 372048.105049,
                              "MapSpurMaxN": 164822.619271,
                              "Distance": 670,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "St Michaels CofE Junior School",
                              "url": "http://www.stmichaelsjuniors.org",
                              "lat": 51.381757892187814,
                              "lon": -2.4030293428096052,
                              "$$hashKey": "object:90"
                          },
                          {
                              "_": "Twerton Infant School",
                              "__": "Poolemead Road",
                              "___": "Twerton",
                              "____": "BA2 1QR",
                              "MapSpurE": 372061.000324,
                              "MapSpurN": 164489.004767,
                              "MapSpurMinE": 372061.000324,
                              "MapSpurMinN": 164489.004767,
                              "MapSpurMaxE": 372061.000324,
                              "MapSpurMaxN": 164489.004767,
                              "Distance": 847.8,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Twerton Infant School",
                              "lat": 51.378758859606606,
                              "lon": -2.402817706573849,
                              "$$hashKey": "object:91"
                          }
                        ],
                        "secondarySchoolsNearby": [
                          {
                              "_": "http://www.oldfield.bathnes.sch.uk|Oldfield School",
                              "__": "Kelston Road",
                              "___": null,
                              "____": "BA1 9AB",
                              "MapSpurE": 371913.858964,
                              "MapSpurN": 166068.922521,
                              "MapSpurMinE": 371913.858964,
                              "MapSpurMinN": 166068.922521,
                              "MapSpurMaxE": 371913.858964,
                              "MapSpurMaxN": 166068.922521,
                              "Distance": 1238.7,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Oldfield School",
                              "url": "http://www.oldfield.bathnes.sch.uk",
                              "lat": 51.392957264594635,
                              "lon": -2.4050572656178897,
                              "$$hashKey": "object:96"
                          },
                          {
                              "_": "http://www.oldfield.bathnes.sch.uk|Oldfield School",
                              "__": "Kelston Road",
                              "___": null,
                              "____": "BA1 9AB",
                              "MapSpurE": 371913.858964,
                              "MapSpurN": 166068.922521,
                              "MapSpurMinE": 371913.858964,
                              "MapSpurMinN": 166068.922521,
                              "MapSpurMaxE": 371913.858964,
                              "MapSpurMaxN": 166068.922521,
                              "Distance": 1238.7,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Oldfield School",
                              "url": "http://www.oldfield.bathnes.sch.uk",
                              "lat": 51.392957264594635,
                              "lon": -2.4050572656178897,
                              "$$hashKey": "object:97"
                          },
                          {
                              "_": "http://www.hayesfield.co.uk|Hayesfield School Technology College",
                              "__": "Upper Oldfield Park",
                              "___": null,
                              "____": "BA2 3LA",
                              "MapSpurE": 374213.002497,
                              "MapSpurN": 164204.996064,
                              "MapSpurMinE": 374213.002497,
                              "MapSpurMinN": 164204.996064,
                              "MapSpurMaxE": 374213.002497,
                              "MapSpurMaxN": 164204.996064,
                              "Distance": 1780.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Hayesfield School Technology College",
                              "url": "http://www.hayesfield.co.uk",
                              "lat": 51.376307482104465,
                              "lon": -2.371877568173201,
                              "$$hashKey": "object:98"
                          }
                        ],
                        "collegesNearby": [
                          {
                              "_": "Bath Academy",
                              "__": "Queen Square",
                              "___": "Abbey",
                              "____": "BA1 2HX",
                              "MapSpurE": 374807.999086,
                              "MapSpurN": 165054.003038,
                              "MapSpurMinE": 374807.999086,
                              "MapSpurMinN": 165054.003038,
                              "MapSpurMaxE": 374807.999086,
                              "MapSpurMaxN": 165054.003038,
                              "Distance": 2143.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Bath Academy",
                              "lat": 51.3839681366029,
                              "lon": -2.363389737240762,
                              "$$hashKey": "object:103"
                          },
                          {
                              "_": "City Of Bath College",
                              "__": "Avon Street",
                              "___": "Abbey",
                              "____": "BA1 1UP",
                              "MapSpurE": 374856.999485,
                              "MapSpurN": 164580.998434,
                              "MapSpurMinE": 374856.999485,
                              "MapSpurMinN": 164580.998434,
                              "MapSpurMaxE": 374856.999485,
                              "MapSpurMaxN": 164580.998434,
                              "Distance": 2249,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "City Of Bath College",
                              "lat": 51.3797173147944,
                              "lon": -2.362651993222146,
                              "$$hashKey": "object:104"
                          }
                        ],
                        "universitiesNearby": [
                          {
                              "_": "Bath Spa University",
                              "__": "Newton Park Drive",
                              "___": "Newton Park",
                              "____": "BA2 9BN",
                              "MapSpurE": 369584.497282,
                              "MapSpurN": 164159.918967,
                              "MapSpurMinE": 369584.497282,
                              "MapSpurMinN": 164159.918967,
                              "MapSpurMaxE": 369584.497282,
                              "MapSpurMaxN": 164159.918967,
                              "Distance": 3216.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Bath Spa University",
                              "lat": 51.375672126605394,
                              "lon": -2.438370970537237,
                              "$$hashKey": "object:108"
                          },
                          {
                              "_": "University of Bath",
                              "__": "The Avenue",
                              "___": "Claverton Down",
                              "____": "BA2 7AY",
                              "MapSpurE": 377226.448654,
                              "MapSpurN": 164469.99021,
                              "MapSpurMinE": 377226.448654,
                              "MapSpurMinN": 164469.99021,
                              "MapSpurMaxE": 377226.448654,
                              "MapSpurMaxN": 164469.99021,
                              "Distance": 4602.6,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "University of Bath",
                              "lat": 51.37881967353838,
                              "lon": -2.328600315570747,
                              "$$hashKey": "object:109"
                          }
                        ],
                        "schoolCrossings": [
                          {
                              "Name_": "Newbridge Primary",
                              "Morning__times": "8.30- 9.05",
                              "Afternoon___times": "3.05- 3.55",
                              "_": "Newbridge Hill",
                              "MapSpurE": 372658.14063,
                              "MapSpurN": 165488.408691,
                              "MapSpurMinE": 372658.14063,
                              "MapSpurMinN": 165488.408691,
                              "MapSpurMaxE": 372658.14063,
                              "MapSpurMaxN": 165488.408691,
                              "Distance": 404.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Newbridge Hill",
                              "lat": 51.38777412815197,
                              "lon": -2.394315427065799,
                              "$$hashKey": "object:113"
                          },
                          {
                              "Name_": "St Michaels&#39;s Junior Twerton",
                              "Morning__times": "8.30-9.05",
                              "Afternoon___times": "3.00-3.25",
                              "_": "Outside 72 Newton Road (Costcutter)",
                              "MapSpurE": 372016.5512,
                              "MapSpurN": 164781.700984,
                              "MapSpurMinE": 372016.5512,
                              "MapSpurMinN": 164781.700984,
                              "MapSpurMaxE": 372016.5512,
                              "MapSpurMaxN": 164781.700984,
                              "Distance": 715.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Outside 72 Newton Road (Costcutter)",
                              "lat": 51.38138841735464,
                              "lon": -2.403479491845716,
                              "$$hashKey": "object:114"
                          }
                        ],
                        "parksNearby": [
                          {
                              "_": "Carr&#39;s Wood",
                              "MapSpurE": 372124.726402,
                              "MapSpurN": 165084.034442,
                              "MapSpurMinE": 371865.814993,
                              "MapSpurMinN": 164810.702682,
                              "MapSpurMaxE": 372383.63781,
                              "MapSpurMaxN": 165357.366202,
                              "Distance": 540.3,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Carr's Wood",
                              "lat": 51.38411217022533,
                              "lon": -2.4019490001464283
                          },
                          {
                              "_": "Brickfields",
                              "MapSpurE": 373182.341002,
                              "MapSpurN": 164333.609249,
                              "MapSpurMinE": 373060.194544,
                              "MapSpurMinN": 164165.687316,
                              "MapSpurMaxE": 373304.487459,
                              "MapSpurMaxN": 164501.531182,
                              "Distance": 911.4,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Brickfields",
                              "lat": 51.377415939949636,
                              "lon": -2.3866948045751686
                          },
                          {
                              "_": "Newbridge Fields",
                              "MapSpurE": 371921.180578,
                              "MapSpurN": 165762.540222,
                              "MapSpurMinE": 371773.222957,
                              "MapSpurMinN": 165515.320987,
                              "MapSpurMaxE": 372069.1382,
                              "MapSpurMaxN": 166009.759456,
                              "Distance": 1006.8,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Newbridge Fields",
                              "lat": 51.390202820802486,
                              "lon": -2.4049277040265276
                          }
                        ],
                        "playAreasNearby": [
                          {
                              "_": "Brassmill Lane",
                              "MapSpurE": 372403.174483,
                              "MapSpurN": 164962.099345,
                              "MapSpurMinE": 372370.80025,
                              "MapSpurMinN": 164937.736319,
                              "MapSpurMaxE": 372435.548715,
                              "MapSpurMaxN": 164986.462372,
                              "Distance": 288.8,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Brassmill Lane",
                              "lat": 51.383029464181426,
                              "lon": -2.397938355950263
                          },
                          {
                              "_": "Loxton Drive",
                              "MapSpurE": 372938.353154,
                              "MapSpurN": 164507.574452,
                              "MapSpurMinE": 372931.893148,
                              "MapSpurMinN": 164502.111016,
                              "MapSpurMaxE": 372944.813159,
                              "MapSpurMaxN": 164513.037888,
                              "Distance": 638,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Loxton Drive",
                              "lat": 51.37896850997717,
                              "lon": -2.390213562195951
                          },
                          {
                              "_": "Woodhouse Road",
                              "MapSpurE": 372013.566488,
                              "MapSpurN": 164900.881869,
                              "MapSpurMinE": 371996.730073,
                              "MapSpurMinN": 164879.303046,
                              "MapSpurMaxE": 372030.402903,
                              "MapSpurMaxN": 164922.460692,
                              "Distance": 676.7,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Woodhouse Road",
                              "lat": 51.38245987529084,
                              "lon": -2.403531807390266
                          }
                        ],
                        "allotmentsNearby": [
                          {
                              "_": "Avon Park",
                              "Provided__by": "B&amp;NES",
                              "MapSpurE": 372441.452179,
                              "MapSpurN": 165103.298928,
                              "MapSpurMinE": 372402.403569,
                              "MapSpurMinN": 165062.700549,
                              "MapSpurMaxE": 372480.500788,
                              "MapSpurMaxN": 165143.897306,
                              "Distance": 224.4,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Avon Park",
                              "ProvidedAdjusted": "Bath & North East Somerset Council",
                              "lat": 51.38430091753337,
                              "lon": -2.3973993443863884
                          },
                          {
                              "_": "King George&#39;s Road",
                              "Provided__by": "B&amp;NES",
                              "MapSpurE": 373232.322562,
                              "MapSpurN": 164570.701382,
                              "MapSpurMinE": 373190.046011,
                              "MapSpurMinN": 164547.997881,
                              "MapSpurMaxE": 373274.599113,
                              "MapSpurMaxN": 164593.404883,
                              "Distance": 765.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "King George's Road",
                              "ProvidedAdjusted": "Bath & North East Somerset Council",
                              "lat": 51.379550110389715,
                              "lon": -2.3859946453536427
                          }
                        ],
                        "healthAndFitnessNearby": [
                          {
                              "_": "http://www.ladieshealth.co.uk/|THE STUDIO (LADIES HEALTH &amp; FITNESS)",
                              "MapSpurE": 372392.995955,
                              "MapSpurN": 165253.995791,
                              "MapSpurMinE": 372392.995955,
                              "MapSpurMinN": 165253.995791,
                              "MapSpurMaxE": 372392.995955,
                              "MapSpurMaxN": 165253.995791,
                              "Distance": 320.8,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "THE STUDIO (LADIES HEALTH & FITNESS)",
                              "url": "http://www.ladieshealth.co.uk/",
                              "lat": 51.38565353206103,
                              "lon": -2.3981073980235235
                          },
                          {
                              "_": "http://www.phase-one.co.uk/|PHASE ONE",
                              "MapSpurE": 374055.002391,
                              "MapSpurN": 165126.002429,
                              "MapSpurMinE": 374055.002391,
                              "MapSpurMinN": 165126.002429,
                              "MapSpurMaxE": 374055.002391,
                              "MapSpurMaxN": 165126.002429,
                              "Distance": 1390.6,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "PHASE ONE",
                              "url": "http://www.phase-one.co.uk/",
                              "lat": 51.38458143949915,
                              "lon": -2.374215125044442
                          }
                        ],
                        "roadworksNearby": null,
                        "busStops": [
                          {
                              "Bus_stop_name": "Windsor Bridge Road",
                              "MapSpurE": 373568.997265,
                              "MapSpurN": 164962.999088,
                              "MapSpurMinE": 373568.997265,
                              "MapSpurMinN": 164962.999088,
                              "MapSpurMaxE": 373568.997265,
                              "MapSpurMaxN": 164962.999088,
                              "Distance": 912.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "name": "Windsor Bridge Road",
                              "lat": 51.38309327951667,
                              "lon": -2.381186625753759
                          }
                        ],
                        "parkingNearby": null,
                        "planningApplicationsNearby": [
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='15/00454/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=15/00454/FUL|15/00454/FUL",
                              "PROPOSAL": "Change of use from 3no bed dwelling (use class C3) to 4no bed house of multiple occupation (use class C4).",
                              "Consulation___Expiry___Date": "05/03/2015",
                              "MapSpurE": 372666,
                              "MapSpurN": 164994,
                              "MapSpurMinE": 372666,
                              "MapSpurMinN": 164994,
                              "MapSpurMaxE": 372666,
                              "MapSpurMaxN": 164994,
                              "Distance": 90,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "15/00454/FUL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…UL'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=15/00454/FUL",
                              "lat": 51.38332906862095,
                              "lon": -2.394164266104986
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='15/00468/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=15/00468/FUL|15/00468/FUL",
                              "PROPOSAL": "Installation of 3no. upvc double glazed windows to the first floor of the east facing elevation",
                              "Consulation___Expiry___Date": "10/03/2015",
                              "MapSpurE": 372715,
                              "MapSpurN": 164951,
                              "MapSpurMinE": 372715,
                              "MapSpurMinN": 164951,
                              "MapSpurMaxE": 372715,
                              "MapSpurMaxN": 164951,
                              "Distance": 142.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "15/00468/FUL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…UL'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=15/00468/FUL",
                              "lat": 51.38294480475783,
                              "lon": -2.3934568600148465
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='15/00680/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=15/00680/FUL|15/00680/FUL",
                              "PROPOSAL": "Installation of bifolding doors to rear elevation to replace 2 no. sash windows and French doors and relocation of existing boiler and flue.",
                              "Consulation___Expiry___Date": "19/03/2015",
                              "MapSpurE": 372795,
                              "MapSpurN": 165216,
                              "MapSpurMinE": 372795,
                              "MapSpurMinN": 165216,
                              "MapSpurMaxE": 372795,
                              "MapSpurMaxN": 165216,
                              "Distance": 185.3,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "15/00680/FUL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…UL'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=15/00680/FUL",
                              "lat": 51.385331390566975,
                              "lon": -2.3923277235043066
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/05698/EFUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/05698/EFUL|14/05698/EFUL",
                              "PROPOSAL": "Erection of student accommodation (sui generis) comprising 268 student bedrooms in studio/cluster flats and 62 bedrooms in 10 No. town houses comprising 1,2,3,4 and 5 storeys in height, together with 5  No. parking spaces (3 disabled and 2 management spaces); 96 covered cycle spaces; 2 No. covered refuse/recycling stores; covered plant rooms; vehicular access from the east (Mill Lane); emergency maintenance vehicular access from Lower Bristol Road; new hard/soft landscaping treatment, following demolition of existing industrial/office buildings.",
                              "Consulation___Expiry___Date": "21/01/2015",
                              "MapSpurE": 372745,
                              "MapSpurN": 164740,
                              "MapSpurMinE": 372745,
                              "MapSpurMinN": 164740,
                              "MapSpurMaxE": 372745,
                              "MapSpurMaxN": 164740,
                              "Distance": 353.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "14/05698/EFUL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…L'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=14/05698/EFUL",
                              "lat": 51.38104905969923,
                              "lon": -2.393009529023465
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/01717/COND'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/01717/COND|14/01717/COND",
                              "PROPOSAL": "Discharge of conditions 7, 8, 18, 19, 24 and 26 of application 13/01876/EFUL (Erection of student accommodation (sui generis) comprising 266 student bedrooms in studio/cluster flats and 61 bedrooms in 10 No. town houses comprising 1,2,3,4 and 5 storeys in height, together with 5  No. parking spaces (3 disabled and 2 management spaces); 96 covered cycle spaces; 2 No. covered refuse/recycling stores; covered plant rooms; vehicular access from the east (Mill Lane); emergency maintenance vehicular access from Lower Bristol Road; new hard/soft landscaping treatment, following demolition of existing industrial/office buildings.)",
                              "Consulation___Expiry___Date": null,
                              "MapSpurE": 372745,
                              "MapSpurN": 164740,
                              "MapSpurMinE": 372745,
                              "MapSpurMinN": 164740,
                              "MapSpurMaxE": 372745,
                              "MapSpurMaxN": 164740,
                              "Distance": 353.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "14/01717/COND",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…D'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=14/01717/COND",
                              "lat": 51.38104905969923,
                              "lon": -2.393009529023465
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='15/00719/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=15/00719/FUL|15/00719/FUL",
                              "PROPOSAL": "Construction of mansard roof to rear elevation.",
                              "Consulation___Expiry___Date": "23/03/2015",
                              "MapSpurE": 373029,
                              "MapSpurN": 165208,
                              "MapSpurMinE": 373029,
                              "MapSpurMinN": 165208,
                              "MapSpurMaxE": 373029,
                              "MapSpurMaxN": 165208,
                              "Distance": 384.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "15/00719/FUL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…UL'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=15/00719/FUL",
                              "lat": 51.38527067555792,
                              "lon": -2.3889645826342005
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/02349/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/02349/FUL|14/02349/FUL",
                              "PROPOSAL": "Construction of 16 studio apartments, including ancillary accommodation, for student occupation.",
                              "Consulation___Expiry___Date": "09/10/2014",
                              "MapSpurE": 372790,
                              "MapSpurN": 164700,
                              "MapSpurMinE": 372790,
                              "MapSpurMinN": 164700,
                              "MapSpurMaxE": 372790,
                              "MapSpurMaxN": 164700,
                              "Distance": 403.8,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "14/02349/FUL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…UL'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=14/02349/FUL",
                              "lat": 51.380691570381366,
                              "lon": -2.392359871895799
                          },
                          {
                              "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='15/00544/LBA'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=15/00544/LBA|15/00544/LBA",
                              "PROPOSAL": "Internal and external alternations to facilitate replacement of existing rooflights.",
                              "Consulation___Expiry___Date": "12/03/2015",
                              "MapSpurE": 372860,
                              "MapSpurN": 164704,
                              "MapSpurMinE": 372860,
                              "MapSpurMinN": 164704,
                              "MapSpurMaxE": 372860,
                              "MapSpurMaxN": 164704,
                              "Distance": 427.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "15/00544/LBA",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/developmentcontrol/defaul…BA'&SearchLayer=DCApplications&SearchField=REFVAL&SearchValue=15/00544/LBA",
                              "lat": 51.380730901657515,
                              "lon": -2.3913543955179604
                          }
                        ],
                        "newLicensingAppsNearby": [
                          {
                              "Licence": "TMS Symonds - Scrap Metal Dealers Collectors Licence",
                              "Address": "47 Avon Park, Newbridge, Bath, BA1 3JP",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/03851/SMDCOL'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=13/03851/SMDCOL|13/03851/SMDCOL",
                              "MapSpurE": 372352,
                              "MapSpurN": 165120,
                              "MapSpurMinE": 372352,
                              "MapSpurMinN": 165120,
                              "MapSpurMaxE": 372352,
                              "MapSpurMaxN": 165120,
                              "Distance": 315.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "13/03851/SMDCOL",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=13/03851/SMDCOL",
                              "lat": 51.384446715136896,
                              "lon": -2.3986860287706437
                          },
                          {
                              "Licence": "DBRA Ltd T/A Douglas &amp; Tucker - Scrap Metal Dealers Site Licence",
                              "Address": "5-8 The Arches, Lower Bristol Road, Bath, BA2 1EP",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/03737/SMDSIT'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=13/03737/SMDSIT|13/03737/SMDSIT",
                              "MapSpurE": 372485,
                              "MapSpurN": 164779,
                              "MapSpurMinE": 372485,
                              "MapSpurMinN": 164779,
                              "MapSpurMaxE": 372485,
                              "MapSpurMaxN": 164779,
                              "Distance": 354.2,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "13/03737/SMDSIT",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=13/03737/SMDSIT",
                              "lat": 51.381387128642345,
                              "lon": -2.3967483564823
                          },
                          {
                              "Licence": "Pizzarella - Premises Licence",
                              "Address": "15 Chelsea Road, Newbridge, Bath, BA1 3DU",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/03814/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=13/03814/LAPRE|13/03814/LAPRE",
                              "MapSpurE": 373027,
                              "MapSpurN": 165189,
                              "MapSpurMinE": 373027,
                              "MapSpurMinN": 165189,
                              "MapSpurMaxE": 373027,
                              "MapSpurMaxN": 165189,
                              "Distance": 376.9,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "13/03814/LAPRE",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…'&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=13/03814/LAPRE",
                              "lat": 51.38509974286625,
                              "lon": -2.388991872833088
                          }
                        ],
                        "issuedLicensingAppsNearby": [
                          {
                              "LINK": "J S Gills Newsagent - Premises Licence",
                              "Address": "153 Newbridge Road, Newbridge, Bath, BA1  3HG",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='06/01560/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=06/01560/LAPRE|06/01560/LAPRE",
                              "MapSpurE": 372648,
                              "MapSpurN": 165088,
                              "MapSpurMinE": 372648,
                              "MapSpurMinN": 165088,
                              "MapSpurMaxE": 372648,
                              "MapSpurMaxN": 165088,
                              "Distance": 17.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "06/01560/LAPRE",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…'&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=06/01560/LAPRE",
                              "Licence": "J S Gills Newsagent - Premises Licence",
                              "lat": 51.384173392184714,
                              "lon": -2.3944301810354927
                          },
                          {
                              "LINK": "Dolphin Inn - Premises Licence",
                              "Address": "103 Locksbrook Road, Newbridge, Bath, BA1 3EN",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/01542/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=13/01542/LAPRE|13/01542/LAPRE",
                              "MapSpurE": 372704,
                              "MapSpurN": 164890,
                              "MapSpurMinE": 372704,
                              "MapSpurMinN": 164890,
                              "MapSpurMaxE": 372704,
                              "MapSpurMaxN": 164890,
                              "Distance": 197.9,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "13/01542/LAPRE",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…'&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=13/01542/LAPRE",
                              "Licence": "Dolphin Inn - Premises Licence",
                              "lat": 51.38239579624028,
                              "lon": -2.393610211441096
                          },
                          {
                              "LINK": "Newbridge Primary School - Lotteries",
                              "Address": null,
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='09/02160/LOT'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=09/02160/LOT|09/02160/LOT",
                              "MapSpurE": 372649,
                              "MapSpurN": 165321,
                              "MapSpurMinE": 372649,
                              "MapSpurMinN": 165321,
                              "MapSpurMaxE": 372649,
                              "MapSpurMaxN": 165321,
                              "Distance": 237.5,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "09/02160/LOT",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…OT'&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=09/02160/LOT",
                              "Licence": "Newbridge Primary School - Lotteries",
                              "lat": 51.386268443176725,
                              "lon": -2.394433833200669
                          },
                          {
                              "LINK": "M &amp; S Waste - Scrap Metal Dealers",
                              "Address": "47 Avon Park, Newbridge, Bath, BA1 3JP",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/00970/SCRAP'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=13/00970/SCRAP|13/00970/SCRAP",
                              "MapSpurE": 372352,
                              "MapSpurN": 165120,
                              "MapSpurMinE": 372352,
                              "MapSpurMinN": 165120,
                              "MapSpurMaxE": 372352,
                              "MapSpurMaxN": 165120,
                              "Distance": 315.1,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "13/00970/SCRAP",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…'&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=13/00970/SCRAP",
                              "Licence": "M &amp; S Waste - Scrap Metal Dealers",
                              "lat": 51.384446715136896,
                              "lon": -2.3986860287706437
                          },
                          {
                              "LINK": "Miss Annette Smidt - Piercing-Practitioner/Responsible Person",
                              "Address": "3 Rosslyn Road, Newbridge, Bath, BA1 3LQ",
                              "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/01847/PCPER'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=13/01847/PCPER|13/01847/PCPER",
                              "MapSpurE": 372776,
                              "MapSpurN": 165383,
                              "MapSpurMinE": 372776,
                              "MapSpurMinN": 165383,
                              "MapSpurMaxE": 372776,
                              "MapSpurMaxN": 165383,
                              "Distance": 318.9,
                              "MapSpurX": "0",
                              "MapSpurY": "0",
                              "title": "13/01847/PCPER",
                              "url": "http://isharemaps.bathnes.gov.uk/projects/bathnes/licensing/default.aspx?re…'&SearchLayer=LIApplications&SearchField=REFVAL&SearchValue=13/01847/PCPER",
                              "Licence": "Miss Annette Smidt - Piercing-Practitioner/Responsible Person",
                              "lat": 51.38683204408432,
                              "lon": -2.3926136070713446
                          }
                        ]
                    }
                }
            };

        },
        toObj: function () {
            var res = {};
            var bathData = window.localStorage.BathData;
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
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Libraries|Libraries Nearby&uid=' + uId),
                // 1 - Mobile Libraries
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Libraries|Mobile Libraries Nearby&uid=' + uId),

                // Education
                // 2 - Play schools
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Play%20Schools%20and%20Nurseries&uid=' + uId),
                // 3 - Primary schools
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Primary%20Schools&uid=' + uId),
                // 4 - Secondary schools
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Secondary%20Schools&uid=' + uId),
                // 5 - Colleges
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Colleges%20and%20Further%20Education|Colleges Nearby&uid=' + uId),
                // 6 - Universities
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Colleges%20and%20Further%20Education|Universities Nearby&uid=' + uId),

                // Bins
                // 7 - Collection dates
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouse&format=JSON&group=Refuse%20and%20Recycling|_______________&uid=' + uId),

                // Roadworks
                // 8 - Roadworks
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Transport%20and%20Streets|Roadworks Nearby&uid=' + uId),

                // Leisure
                // 9 - Parks
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Parks%20and%20Open%20Spaces|Parks%20or%20Open%20spaces%20nearby&uid=' + uId),
                // 10 - Play areas
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Parks%20and%20Open%20Spaces|Play%20Areas%20Nearby&uid=' + uId),
                // 11 - Allotments
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Parks%20and%20Open%20Spaces|Allotments%20Nearby&uid=' + uId),

                // Health
                // 12 - Fitness
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Fitness%20and%20Recreation&uid=' + uId),

                // My council
                // 13 - Councillor
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouse&format=JSON&group=Council%20and%20Democracy|Your%20Councillors&uid=' + uId),
                // 14 - Listed building
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Property%20Details|Listed%20Building&uid=' + uId),

                // Planning
                // 15 - Planning apps
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Planning%20Applications|Planning%20Applications%20Nearby&uid=' + uId),

                // Licensing
                // 16 - New licenses
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Licensing%20Applications|New%20Licensing%20Applications%20Nearby&uid=' + uId),
                // 17 - Issued licenses
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Licensing%20Applications|Issued%20Licensing%20Applications%20Nearby&uid=' + uId),

                // 18 - council offices
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Council%20and%20Democracy|____________________________&uid=' + uId),
                // 19 - local housing allowance zone
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Council%20and%20Democracy|___________&uid=' + uId),
                // 20 - bus stops
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Transport%20and%20Streets|Bus%20stops%20nearby&uid=' + uId),
                // 21 - school crossings
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyNearest&format=JSON&group=Transport%20and%20Streets|School%20crossings%20nearby&uid=' + uId),
                // 22 - parking zones
                $http.get('https://isharemaps.bathnes.gov.uk/getdata.aspx?RequestType=LocalInfo&ms=BathNES/MyHouseLive&format=JSON&group=Parking%20Permit|Parking%20zones&uid=' + uId)
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
            try {
                var i = 0;
                var res = angular.fromJson(window.localStorage.BathData)[id];
                var doc;
                var geo;
                switch (id) {
                    //Local Data
                    case 0: // libraries Nearby
                        if (res && res.Results && res.Results.Libraries_Nearby) {
                            if (res.Results.Libraries_Nearby.Info) {
                                return null;
                            }
                            res.Results.Libraries_Nearby = DataTransformations.objectToArray(res.Results.Libraries_Nearby);
                            // Do the string manipulation to clean up - need to make sure this won't blow up
                            for (i = 0; i < res.Results.Libraries_Nearby.length ; i++) {
                                res.Results.Libraries_Nearby[i].url = res.Results.Libraries_Nearby[i]._.split("|")[0];
                                res.Results.Libraries_Nearby[i].name = res.Results.Libraries_Nearby[i]._.split("|")[1];
                                geo = DataTransformations.NEtoLL(res.Results.Libraries_Nearby[i].MapSpurE, res.Results.Libraries_Nearby[i].MapSpurN);
                                res.Results.Libraries_Nearby[i].lat = geo.latitude;
                                res.Results.Libraries_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Libraries_Nearby;
                        }
                        return null;
                    case 1: // Mobile libaries
                        if (res && res.Results) {
                            if (res.Results.Mobile_Libraries_Nearby.Info !== "<p>No records found nearby.</p>") {
                                res.Results.Mobile_Libraries_Nearby = DataTransformations.objectToArray(res.Results.Mobile_Libraries_Nearby);
                                // Do the string manipulation to clean up - need to make sure this won't blow up
                                for (i = 0; i < res.Results.Mobile_Libraries_Nearby.length ; i++) {
                                    res.Results.Mobile_Libraries_Nearby[i].timeAdjusted = res.Results.Mobile_Libraries_Nearby[i].time.replace('?', '-');
                                    res.Results.Mobile_Libraries_Nearby[i].url = res.Results.Mobile_Libraries_Nearby[i]._.split("|")[0];
                                    geo = DataTransformations.NEtoLL(res.Results.Mobile_Libraries_Nearby[i].MapSpurE, res.Results.Mobile_Libraries_Nearby[i].MapSpurN);
                                    res.Results.Mobile_Libraries_Nearby[i].lat = geo.latitude;
                                    res.Results.Mobile_Libraries_Nearby[i].lon = geo.longitude;
                                    return res.Results.Mobile_Libraries_Nearby;
                                }
                            }
                            else { return null; }
                        }
                        return null;
                    case 2: // Play Schools
                        if (res && res.Results && res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby) {
                            res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby = DataTransformations.objectToArray(res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby);
                            for (i = 0; i < res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby.length ; i++) {
                                res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].name = res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i]._;
                                geo = DataTransformations.NEtoLL(res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].MapSpurE, res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby.MapSpurN);
                                res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].lat = geo.latitude;
                                res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Nurseries_Pre_Schools_and_Out_of_School_Childcare_Nearby;
                        }
                        return null;
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
                                geo = DataTransformations.NEtoLL(res.Results.Primary_Schools_Nearby[i].MapSpurE, res.Results.Primary_Schools_Nearby[i].MapSpurN);
                                res.Results.Primary_Schools_Nearby[i].lat = geo.latitude;
                                res.Results.Primary_Schools_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Primary_Schools_Nearby;
                        }
                        return null;
                    case 4: // Secondary Schools
                        if (res && res.Results && res.Results.Secondary_Schools_Nearby) {
                            res.Results.Secondary_Schools_Nearby = DataTransformations.objectToArray(res.Results.Secondary_Schools_Nearby);
                            for (i = 0; i < res.Results.Secondary_Schools_Nearby.length ; i++) {
                                res.Results.Secondary_Schools_Nearby[i].name = res.Results.Secondary_Schools_Nearby[i]._.split('|')[1];
                                res.Results.Secondary_Schools_Nearby[i].url = res.Results.Secondary_Schools_Nearby[i]._.split('|')[0];
                                geo = DataTransformations.NEtoLL(res.Results.Secondary_Schools_Nearby[i].MapSpurE, res.Results.Secondary_Schools_Nearby[i].MapSpurN);
                                res.Results.Secondary_Schools_Nearby[i].lat = geo.latitude;
                                res.Results.Secondary_Schools_Nearby[i].lon = geo.longitude;
                                res.Results.Secondary_Schools_Nearby = DataTransformations.objectToArray(res.Results.Secondary_Schools_Nearby);
                            }
                            return res.Results.Secondary_Schools_Nearby;
                        }
                        return null;
                    case 5: // Colleges
                        if (res && res.Results && res.Results.Colleges_Nearby) {
                            res.Results.Colleges_Nearby = DataTransformations.objectToArray(res.Results.Colleges_Nearby);
                            for (i = 0; i < res.Results.Colleges_Nearby.length ; i++) {
                                res.Results.Colleges_Nearby[i].name = res.Results.Colleges_Nearby[i]._;
                                geo = DataTransformations.NEtoLL(res.Results.Colleges_Nearby[i].MapSpurE, res.Results.Colleges_Nearby[i].MapSpurN);
                                res.Results.Colleges_Nearby[i].lat = geo.latitude;
                                res.Results.Colleges_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Colleges_Nearby;
                        }
                        return null;
                    case 6: // Universities
                        if (res && res.Results && res.Results.Universities_Nearby) {
                            res.Results.Universities_Nearby = DataTransformations.objectToArray(res.Results.Universities_Nearby);
                            // ishare only returns 8 characters in the string for some reason
                            // This should get fixed, but at the moment, this fixes the display for the 2 major universities
                            for (i = 0; i < res.Results.Universities_Nearby.length; i++) {
                                res.Results.Universities_Nearby[i].name = res.Results.Universities_Nearby[i]._;
                                if (res.Results.Universities_Nearby[i].___ == "Claverto") {
                                    res.Results.Universities_Nearby[i].___ = "Claverton Down";
                                }
                                if (res.Results.Universities_Nearby[i].___ == "Newton P") {
                                    res.Results.Universities_Nearby[i].___ = "Newton Park";
                                }
                            }
                            for (i = 0; i < res.Results.Universities_Nearby.length ; i++) {
                                geo = DataTransformations.NEtoLL(res.Results.Universities_Nearby[i].MapSpurE, res.Results.Universities_Nearby[i].MapSpurN);
                                res.Results.Universities_Nearby[i].lat = geo.latitude;
                                res.Results.Universities_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Universities_Nearby;
                        }
                        return null;
                    case 8: // Roadworks
                        if (res.Results.Roadworks_Nearby.Info) {
                            return null;
                        }
                        if (res && res.Results && res.Results.Roadworks_Nearby) {
                            res.Results.Roadworks_Nearby = DataTransformations.objectToArray(res.Results.Roadworks_Nearby);
                            for (i = 0; i < res.Results.Roadworks_Nearby.length; i++) {
                                res.Results.Roadworks_Nearby[i].title = res.Results.Roadworks_Nearby[i].Organisation.split('|')[1].replace('amp;', '');
                                res.Results.Roadworks_Nearby[i].url = res.Results.Roadworks_Nearby[i].Organisation.split('|')[0].replace('amp;', '');
                                geo = DataTransformations.NEtoLL(res.Results.Roadworks_Nearby[i].MapSpurE, res.Results.Roadworks_Nearby[i].MapSpurN);
                                res.Results.Roadworks_Nearby[i].lat = geo.latitude;
                                res.Results.Roadworks_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Roadworks_Nearby;
                        }
                        return null;
                    case 9: // Parks
                        if (res && res.Results) {
                            res.Results.Parks_or_Open_Spaces_Nearby = DataTransformations.objectToArray(res.Results.Parks_or_Open_Spaces_Nearby);
                            for (i = 0; i < res.Results.Parks_or_Open_Spaces_Nearby.length ; i++) {
                                res.Results.Parks_or_Open_Spaces_Nearby[i].name = res.Results.Parks_or_Open_Spaces_Nearby[i]._.replace("&#39;", "'");
                                geo = DataTransformations.NEtoLL(res.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurE, res.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurN);
                                res.Results.Parks_or_Open_Spaces_Nearby[i].lat = geo.latitude;
                                res.Results.Parks_or_Open_Spaces_Nearby[i].lon = geo.longitude;
                            }
                        }
                        return res.Results.Parks_or_Open_Spaces_Nearby;
                    case 10: // Play Areas
                        if (res && res.Results && res.Results.Play_Areas_Nearby) {
                            res.Results.Play_Areas_Nearby = DataTransformations.objectToArray(res.Results.Play_Areas_Nearby);
                            for (i = 0; i < res.Results.Play_Areas_Nearby.length ; i++) {
                                res.Results.Play_Areas_Nearby[i].name = res.Results.Play_Areas_Nearby[i]._;
                                geo = DataTransformations.NEtoLL(res.Results.Play_Areas_Nearby[i].MapSpurE, res.Results.Play_Areas_Nearby[i].MapSpurN);
                                res.Results.Play_Areas_Nearby[i].lat = geo.latitude;
                                res.Results.Play_Areas_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Play_Areas_Nearby;
                        }
                        return null;
                    case 11: // Allotments
                        if (res && res.Results && res.Results.Allotments_Nearby) {
                            if (typeof res.Results.Allotments_Nearby.Info !== typeof undefined && res.Results.Allotments_Nearby.Info == "For allotment queries outside Bath, please contact your local Parish Council.") {
                                //res.allotmentsOutsideBath = true;
                                return null;
                            } else {
                                res.Results.Allotments_Nearby = DataTransformations.objectToArray(res.Results.Allotments_Nearby);
                                for (i = 0; i < res.Results.Allotments_Nearby.length ; i++) {
                                    res.Results.Allotments_Nearby[i].name = res.Results.Allotments_Nearby[i]._.replace("&#39;", "'");
                                    res.Results.Allotments_Nearby[i].ProvidedAdjusted = res.Results.Allotments_Nearby[i].Provided__by.replace('amp;', '');
                                    geo = DataTransformations.NEtoLL(res.Results.Allotments_Nearby[i].MapSpurE, res.Results.Allotments_Nearby[i].MapSpurN);
                                    res.Results.Allotments_Nearby[i].lat = geo.latitude;
                                    res.Results.Allotments_Nearby[i].lon = geo.longitude;
                                    if (res.Results.Allotments_Nearby[i].ProvidedAdjusted === "B&NES") {
                                        res.Results.Allotments_Nearby[i].ProvidedAdjusted = "Bath & North East Somerset Council";
                                    }
                                }
                                return res.Results.Allotments_Nearby;
                            }
                        }
                        return null;
                    case 12: // Health and Fitness
                        if (res && res.Results && res.Results.Health_and_Fitness_Centres_Nearby) {
                            res.Results.Health_and_Fitness_Centres_Nearby = DataTransformations.objectToArray(res.Results.Health_and_Fitness_Centres_Nearby);
                            for (i = 0; i < res.Results.Health_and_Fitness_Centres_Nearby.length ; i++) {
                                res.Results.Health_and_Fitness_Centres_Nearby[i].name = res.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[1].replace('amp;', '');
                                res.Results.Health_and_Fitness_Centres_Nearby[i].url = res.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[0];
                                geo = DataTransformations.NEtoLL(res.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurE, res.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurN);
                                res.Results.Health_and_Fitness_Centres_Nearby[i].lat = geo.latitude;
                                res.Results.Health_and_Fitness_Centres_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Health_and_Fitness_Centres_Nearby;
                        }
                        return null;
                    case 15: // Planning Applications
                        if (res.Results.Planning_Applications_Nearby.Info) {
                            return null;
                        }
                        if (res && res.Results && res.Results.Planning_Applications_Nearby) {
                            res.Results.Planning_Applications_Nearby = DataTransformations.objectToArray(res.Results.Planning_Applications_Nearby);
                            for (i = 0; i < res.Results.Planning_Applications_Nearby.length ; i++) {
                                res.Results.Planning_Applications_Nearby[i].title = res.Results.Planning_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
                                res.Results.Planning_Applications_Nearby[i].url = res.Results.Planning_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
                                res.Results.Planning_Applications_Nearby[i].url = "http://isharemaps.bathnes.gov.uk" + res.Results.Planning_Applications_Nearby[i].url;
                                geo = DataTransformations.NEtoLL(res.Results.Planning_Applications_Nearby[i].MapSpurE, res.Results.Planning_Applications_Nearby[i].MapSpurN);
                                res.Results.Planning_Applications_Nearby[i].lat = geo.latitude;
                                res.Results.Planning_Applications_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Planning_Applications_Nearby;
                        }
                        return null;
                    case 16: // New Licencing
                        if (res && res.Results && res.Results.New_Licensing_Applications_Nearby) {
                            if (res.Results.New_Licensing_Applications_Nearby.Info) {
                                return null;
                            }
                            res.Results.New_Licensing_Applications_Nearby = DataTransformations.objectToArray(res.Results.New_Licensing_Applications_Nearby);
                            for (i = 0; i < res.Results.New_Licensing_Applications_Nearby.length ; i++) {
                                res.Results.New_Licensing_Applications_Nearby[i].title = res.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
                                res.Results.New_Licensing_Applications_Nearby[i].url = res.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
                                res.Results.New_Licensing_Applications_Nearby[i].url = "http://isharemaps.bathnes.gov.uk" + res.Results.New_Licensing_Applications_Nearby[i].url;
                                geo = DataTransformations.NEtoLL(res.Results.New_Licensing_Applications_Nearby[i].MapSpurE, res.Results.New_Licensing_Applications_Nearby[i].MapSpurN);
                                res.Results.New_Licensing_Applications_Nearby[i].lat = geo.latitude;
                                res.Results.New_Licensing_Applications_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.New_Licensing_Applications_Nearby;
                        }
                        return null;
                    case 17: // Issued ditto
                        if (res && res.Results && res.Results.Issued_Licensing_Applications_Nearby) {
                            res.Results.Issued_Licensing_Applications_Nearby = DataTransformations.objectToArray(res.Results.Issued_Licensing_Applications_Nearby);
                            for (i = 0; i < res.Results.Issued_Licensing_Applications_Nearby.length ; i++) {
                                res.Results.Issued_Licensing_Applications_Nearby[i].title = res.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
                                res.Results.Issued_Licensing_Applications_Nearby[i].url = res.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
                                res.Results.Issued_Licensing_Applications_Nearby[i].url = "http://isharemaps.bathnes.gov.uk" + res.Results.Issued_Licensing_Applications_Nearby[i].url;
                                res.Results.Issued_Licensing_Applications_Nearby[i].Licence = res.Results.Issued_Licensing_Applications_Nearby[i].LINK;
                                geo = DataTransformations.NEtoLL(res.Results.Issued_Licensing_Applications_Nearby[i].MapSpurE, res.Results.Issued_Licensing_Applications_Nearby[i].MapSpurN);
                                res.Results.Issued_Licensing_Applications_Nearby[i].lat = geo.latitude;
                                res.Results.Issued_Licensing_Applications_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Issued_Licensing_Applications_Nearby;
                        }
                        return null;
                    case 20: // Bus Stops
                        if (res && res.Results && res.Results.Bus_Stops_Nearby) {
                            res.Results.Bus_Stops_Nearby = DataTransformations.objectToArray(res.Results.Bus_Stops_Nearby);
                            for (i = 0; i < res.Results.Bus_Stops_Nearby.length ; i++) {
                                geo = DataTransformations.NEtoLL(res.Results.Bus_Stops_Nearby[i].MapSpurE, res.Results.Bus_Stops_Nearby[i].MapSpurN);
                                res.Results.Bus_Stops_Nearby[i].name = res.Results.Bus_Stops_Nearby[i].Bus_stop_name;
                                res.Results.Bus_Stops_Nearby[i].lat = geo.latitude;
                                res.Results.Bus_Stops_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.Bus_Stops_Nearby;
                        }
                        return null;
                    case 21: // Crossings
                        if (res && res.Results && res.Results.School_Crossings_Nearby) {
                            res.Results.School_Crossings_Nearby = DataTransformations.objectToArray(res.Results.School_Crossings_Nearby);
                            for (i = 0; i < res.Results.School_Crossings_Nearby.length ; i++) {
                                geo = DataTransformations.NEtoLL(res.Results.School_Crossings_Nearby[i].MapSpurE, res.Results.School_Crossings_Nearby[i].MapSpurN);
                                res.Results.School_Crossings_Nearby[i].name = res.Results.School_Crossings_Nearby[i]._;
                                res.Results.School_Crossings_Nearby[i].lat = geo.latitude;
                                res.Results.School_Crossings_Nearby[i].lon = geo.longitude;
                            }
                            return res.Results.School_Crossings_Nearby;
                        }
                        return null;
                    case 22:
                        if (res && res.Results && res.Results["Parking Zones"]) {
                            if (res.Parking_Zones.Info && res["Parking Zones"].Info === "<p>No records found nearby.</p>") {
                                return null;
                            }
                            res.Results["Parking Zones"] = DataTransformations.objectToArray(res.Results["Parking Zones"]);
                            for (i = 0; i < res.Results.Parking_Zones.length ; i++) {
                                res.Results.Parking_Zones[i].name = res.Results.Parking_Zones[i]._;
                                geo = DataTransformations.NEtoLL(res.Results.Parking_Zones[i].MapSpurE, res.Results.Parking_Zones[i].MapSpurN);
                                res.Results.Parking_Zones[i].lat = geo.latitude;
                                res.Results.Parking_Zones[i].lon = geo.longitude;
                            }
                            return res.Parking_Zones;
                        }
                        return null;

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
                                yourCouncillors.Results.Your_Councillors.img1 = DataTransformations.URLtoBase64(councillorInfo[0].getElementsByTagName('img')[0].src);
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
                                yourCouncillors.Results.Your_Councillors.img2 = DataTransformations.URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
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
                                yourCouncillors.Results.Your_Councillors.img3 = DataTransformations.URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
                            }
                            return yourCouncillors.Results.Your_Councillors;
                        }
                        return null;
                    case 14:  // Listed Building
                        if (res && res.Results && res.Results.Listed_Building) {
                            if (res.Results.Listed_Building.Info === "<p>No records found nearby.</p>") {
                                return null;
                            }
                            return res.Results.Listed_Building;
                        }
                        return null;
                    case 18:  // Council offices
                        if (res && res.Results && res.Results.____________________________) {
                            // if iShare returns just one, then this fails. Re-jig the object to be a new object holding the old one
                            // Example: BA3 3UD
                            res.Results.____________________________ = DataTransformations.objectToArray(res.Results.____________________________);
                            for (i = 0; i < res.Results.____________________________.length; i++) {
                                res.Results.____________________________[i].title = res.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[1].replace('amp;', '');
                                res.Results.____________________________[i].url = res.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[0].replace('amp;', '');
                                geo = DataTransformations.NEtoLL(res.Results.____________________________[i].MapSpurE, res.Results.____________________________[i].MapSpurN);
                                res.Results.____________________________[i].lat = geo.latitude;
                                res.Results.____________________________[i].lon = geo.longitude;
                            }
                            return res.Results.____________________________;
                        }
                        return null;
                    default:
                        return null;
                }
            } catch (e) {
                // if app crashed half way through a data refresh, this will sometimes fail
                // An uncaught exception breaks the app
                // Insead, log, and just don't return data
                console.warn(e);
                return null;
            }
        }
    };
});