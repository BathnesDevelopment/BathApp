angular.module('MyBath.Controllers', [])
.controller('BathCouncilController', function ($scope, $state, $timeout, $ionicModal, $ionicLoading, UserData, BathData, Reports, $ionicSideMenuDelegate, $ionicActionSheet, $ionicPopup) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTUP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Global
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.currentReport = { type: '', description: '', userFirstname: '', userLastname: '', locationFound: true, useUserLocation: true, usePersonalDetails: true, userAddress: '', userUPRN: '', userLat: '', userLon: '', photo: '', lat: '', lon: '' };
    $scope.userData = UserData.all();
    $scope.uprn = $scope.userData.uprn;
    $scope.reports = Reports.getReports();
    $scope.currentLocation = null;
    $scope.map = null;
    $scope.mapmarkers = {};
    $scope.bathdata = BathData.all();
    $scope.addresses = [];
    $scope.binCollection = [];

    /////////////////////////////////////////////////////////////////////////////////////////////
    // TEST DATA - For use when testing in browser
    /////////////////////////////////////////////////////////////////////////////////////////////
    /*if ($scope.bathdata && $scope.bathdata.length == 0) {
        //$scope.playSchoolsNearby = { "Results": { "Nurseries Pre Schools and Out of School Childcare Nearby": [{ "_": "SNAPDRAGONS DAY NURSERY", "__": "4 GROSVENOR PLACE", "___": null, "____": "BA1 6AX", "MapSpurE": 376033.000794, "MapSpurN": 166172.003014, "MapSpurMinE": 376033.000794, "MapSpurMinN": 166172.003014, "MapSpurMaxE": 376033.000794, "MapSpurMaxN": 166172.003014, "Distance": 72.9, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "APPLE TREE DAY NURSERY", "__": "SPRING LANE", "___": "LARKHALL", "____": "BA1 6NY", "MapSpurE": 375794.998861, "MapSpurN": 166774.000694, "MapSpurMinE": 375794.998861, "MapSpurMinN": 166774.000694, "MapSpurMaxE": 375794.998861, "MapSpurMaxN": 166774.000694, "Distance": 625.4, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Busy Bees Pre-school (Bath)", "__": "St Marks School", "___": "Baytree Road", "____": "BA1 6ND", "MapSpurE": 375688.002703, "MapSpurN": 166710.998728, "MapSpurMinE": 375688.002703, "MapSpurMinN": 166710.998728, "MapSpurMaxE": 375688.002703, "MapSpurMaxN": 166710.998728, "Distance": 631.9, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.primarySchoolsNearby = { "Results": { "Primary_Schools_Nearby": [{ "_": "http://www.st-saviours-jun.bathnes.sch.uk|St Saviours CofE Junior School", "__": "Brookleaze Place", "___": "Larkhall", "____": "BA1 6RB", "MapSpurE": 375956.997821, "MapSpurN": 166668.001036, "MapSpurMinE": 375956.997821, "MapSpurMinN": 166668.001036, "MapSpurMaxE": 375956.997821, "MapSpurMaxN": 166668.001036, "Distance": 465.5, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "http://www.st-saviours-inf.bathnes.sch.uk|St Saviours CofE Infant School", "__": "Spring Lane", "___": "Larkhall", "____": "BA1 6NY", "MapSpurE": 375844.436247, "MapSpurN": 166670.970186, "MapSpurMinE": 375844.436247, "MapSpurMinN": 166670.970186, "MapSpurMaxE": 375844.436247, "MapSpurMaxN": 166670.970186, "Distance": 511.2, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Bathwick St Mary Church of England Primary School", "__": "Darlington Road", "___": null, "____": "BA2 6NN", "MapSpurE": 376034.996099, "MapSpurN": 165538.004494, "MapSpurMinE": 376034.996099, "MapSpurMinN": 165538.004494, "MapSpurMaxE": 376034.996099, "MapSpurMaxN": 165538.004494, "Distance": 685, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.secondarySchoolsNearby = { "Results": { "Secondary_Schools_Nearby": [{ "_": "http://www.st-marks.bathnes.sch.uk|St Marks CofE School", "__": "Baytree Road", "___": null, "____": "BA1 6ND", "MapSpurE": 375688.002703, "MapSpurN": 166710.998728, "MapSpurMinE": 375688.002703, "MapSpurMinN": 166710.998728, "MapSpurMaxE": 375688.002703, "MapSpurMaxN": 166710.998728, "Distance": 631.9, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "http://www.st-marks.bathnes.sch.uk|St Marks CofE School", "__": "Baytree Road", "___": null, "____": "BA1 6ND", "MapSpurE": 375688.002703, "MapSpurN": 166710.998728, "MapSpurMinE": 375688.002703, "MapSpurMinN": 166710.998728, "MapSpurMaxE": 375688.002703, "MapSpurMaxN": 166710.998728, "Distance": 631.9, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "http://www.beechencliff.bathnes.sch|Beechen Cliff School", "__": "Alexandra Park", "___": null, "____": "BA2 4RE", "MapSpurE": 375015.997243, "MapSpurN": 163750.996020, "MapSpurMinE": 375015.997243, "MapSpurMinN": 163750.996020, "MapSpurMaxE": 375015.997243, "MapSpurMaxN": 163750.996020, "Distance": 2692.2, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.collegesNearby = { "Results": { "Colleges_Nearby": [{ "_": "Norland College", "__": "York Place, London", "___": "Walcot", "____": "BA1 6AE", "MapSpurE": 375584.997154, "MapSpurN": 165901.000588, "MapSpurMinE": 375584.997154, "MapSpurMinN": 165901.000588, "MapSpurMaxE": 375584.997154, "MapSpurMaxN": 165901.000588, "Distance": 595.3, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Rusland College Ltd", "__": "Solsbury Way", "___": "Larkhall", "____": "BA1 6HH", "MapSpurE": 375087.003709, "MapSpurN": 166495.000557, "MapSpurMinE": 375087.003709, "MapSpurMinN": 166495.000557, "MapSpurMaxE": 375087.003709, "MapSpurMaxN": 166495.000557, "Distance": 1036.9, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.universitiesNearby = { "Results": { "Universities_Nearby": [{ "_": "University of Bath", "__": "The Avenue", "___": "Claverto", "____": "BA2 7AY", "MapSpurE": 377226.448654, "MapSpurN": 164469.990210, "MapSpurMinE": 377226.448654, "MapSpurMinN": 164469.990210, "MapSpurMaxE": 377226.448654, "MapSpurMaxN": 164469.990210, "Distance": 2089.1, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Bath Spa University", "__": "Newton Park Drive", "___": "Newton P", "____": "BA2 9BN", "MapSpurE": 369584.497282, "MapSpurN": 164159.918967, "MapSpurMinE": 369584.497282, "MapSpurMinN": 164159.918967, "MapSpurMaxE": 369584.497282, "MapSpurMaxN": 164159.918967, "Distance": 6821.3, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.librariesNearby = { "Results": { "Libraries_Nearby": { "_": "http://www.bathnes.gov.uk/BathNES/leisureandculture/Libraries/default.htm#The Podium - Central Library|The Podium - Central Library", "MapSpurE": 375114.764830, "MapSpurN": 165010.235567, "MapSpurMinE": 375114.764830, "MapSpurMinN": 165010.235567, "MapSpurMaxE": 375114.764830, "MapSpurMaxN": 165010.235567, "Distance": 1552.8, "MapSpurX": "0", "MapSpurY": "0" } } };
        $scope.mobileLibrariesNearby = { "Results": { "Mobile_Libraries_Nearby": { "village": "Bathampton", "stop": "Devonshire Road", "time": "16.20 ? 16.50", "day": "Thursday", "_": "http://www.bathnes.gov.uk/services/libraries-and-archives/access-all/mobile-library-routes/mobile-library-route-review|View the timetable", "MapSpurE": 377374.999919, "MapSpurN": 166048.998224, "MapSpurMinE": 377374.999919, "MapSpurMinN": 166048.998224, "MapSpurMaxE": 377374.999919, "MapSpurMaxN": 166048.998224, "Distance": 1299.4, "MapSpurX": "0", "MapSpurY": "0" } } };
        $scope.parkingNearby = { "Results": { "Parking_Zones": { "_": "Bath Central Parking Zone", "MapSpurE": 374864.745719, "MapSpurN": 164975.845411, "MapSpurMinE": 374323.766648, "MapSpurMinN": 164281.204250, "MapSpurMaxE": 375405.724791, "MapSpurMaxN": 165670.486572 } } };
        $scope.roadworksNearby = { "Results": { "Roadworks_Nearby": [{ "Organisation": "http://www.bathnes.gov.uk/services/streets-and-highway-maintenance/roadworks/public-utilities#contactB&amp;NES - Network Maintenance|B&amp;NES - Network Maintenance", "_": "Skip App - Granted", "Location": "Skip on the Highway - Rear of 6 Grosvenor Place, Ringswell Gardens, London Road, Bath, BA1 6AX", "Work____commenced": "12/02/2014 00:00:00", "Due_____to_____be_____completed_____on": "11/03/2014 00:00:00", "Advised______complete______on": null, "MapSpurE": 375993.000000, "MapSpurN": 166159.000000, "MapSpurMinE": 375993.000000, "MapSpurMinN": 166159.000000, "MapSpurMaxE": 375993.000000, "MapSpurMaxN": 166159.000000, "Distance": 112.6, "MapSpurX": "0", "MapSpurY": "0" }, { "Organisation": "http://www.bathnes.gov.uk/services/streets-and-highway-maintenance/roadworks/public-utilities#contactWESSEX WATER (Bath Operations)|WESSEX WATER (Bath Operations)", "_": "Section 81 (covers in verge)", "Location": "1, Unmade", "Work____commenced": "17/03/2014 00:00:00", "Due_____to_____be_____completed_____on": "19/03/2014 00:00:00", "Advised______complete______on": "17/03/2014 00:00:00", "MapSpurE": 375957.000000, "MapSpurN": 166148.000000, "MapSpurMinE": 375957.000000, "MapSpurMinN": 166148.000000, "MapSpurMaxE": 375957.000000, "MapSpurMaxN": 166148.000000, "Distance": 149.1, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.busStops = { "Results": { "Bus_Stops_Nearby": [{ "Bus_stop_name": "Balustrade", "MapSpurE": 375946.996562, "MapSpurN": 166162.995593, "MapSpurMinE": 375946.996562, "MapSpurMinN": 166162.995593, "MapSpurMaxE": 375946.996562, "MapSpurMaxN": 166162.995593, "Distance": 42.8, "MapSpurX": "0", "MapSpurY": "0" }, { "Bus_stop_name": "Balustrade", "MapSpurE": 375883.996050, "MapSpurN": 166104.002479, "MapSpurMinE": 375883.996050, "MapSpurMinN": 166104.002479, "MapSpurMaxE": 375883.996050, "MapSpurMaxN": 166104.002479, "Distance": 92.4, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.schoolCrossings = { "Results": { "School_Crossings_Nearby": [{ "Name_": "St Savior&#39;s Junior School", "Morning__times": "8.30- 9.05", "Afternoon___times": "3.20- 3.45", "_": "Brookleaze Buildings", "MapSpurE": 375976.340735, "MapSpurN": 166611.967076, "MapSpurMinE": 375976.340735, "MapSpurMinN": 166611.967076, "MapSpurMaxE": 375976.340735, "MapSpurMaxN": 166611.967076, "Distance": 483, "MapSpurX": "0", "MapSpurY": "0" }, { "Name_": "St Saviours Infant School", "Morning__times": "8.35- 9.10", "Afternoon___times": "3.10- 3.45", "_": "Junction of Eldon Place &amp; Spring Lane", "MapSpurE": 375893.618037, "MapSpurN": 166691.904194, "MapSpurMinE": 375893.618037, "MapSpurMinN": 166691.904194, "MapSpurMaxE": 375893.618037, "MapSpurMaxN": 166691.904194, "Distance": 568.5, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.planningApplicationsNearby = { "Results": { "Planning_Applications_Nearby": [{ "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00718/COND'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00718/COND|14/00718/COND", "PROPOSAL": "Discharge of conditions 3 and 4 attached to application 13/04170/LBA (Internal and external works to entrance hall of basement flat).", "Consulation___Expiry___Date": null, "MapSpurE": 376131.000000, "MapSpurN": 166249.000000, "MapSpurMinE": 376131.000000, "MapSpurMinN": 166249.000000, "MapSpurMaxE": 376131.000000, "MapSpurMaxN": 166249.000000, "Distance": 52.2, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00595/LBA'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00595/LBA|14/00595/LBA", "PROPOSAL": "Internal alterations and refurbishment, and rear external alterations to the ground floor/lower ground floor garden maisonette", "Consulation___Expiry___Date": "25/03/2014", "MapSpurE": 376033.000000, "MapSpurN": 166172.000000, "MapSpurMinE": 376033.000000, "MapSpurMinN": 166172.000000, "MapSpurMaxE": 376033.000000, "MapSpurMaxN": 166172.000000, "Distance": 72.9, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00594/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00594/FUL|14/00594/FUL", "PROPOSAL": "Internal alterations and refurbishment, and rear external alterations to the ground floor/lower ground floor garden maisonette", "Consulation___Expiry___Date": "25/03/2014", "MapSpurE": 376033.000000, "MapSpurN": 166172.000000, "MapSpurMinE": 376033.000000, "MapSpurMinN": 166172.000000, "MapSpurMaxE": 376033.000000, "MapSpurMaxN": 166172.000000, "Distance": 72.9, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00306/LBA'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00306/LBA|14/00306/LBA", "PROPOSAL": "Internal and external alterations for the conversion of the coach house into 1no. dwelling house to include erection of single storey rear extension, stone repairs, staircase, intermediate floor and other associated works.", "Consulation___Expiry___Date": "18/03/2014", "MapSpurE": 376060.000000, "MapSpurN": 166362.000000, "MapSpurMinE": 376060.000000, "MapSpurMinN": 166362.000000, "MapSpurMaxE": 376060.000000, "MapSpurMaxN": 166362.000000, "Distance": 143.6, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00305/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00305/FUL|14/00305/FUL", "PROPOSAL": "Conversion of coach house to create 1no. dwelling with erection of single storey rear garden extension and associated works.", "Consulation___Expiry___Date": "18/03/2014", "MapSpurE": 376060.000000, "MapSpurN": 166362.000000, "MapSpurMinE": 376060.000000, "MapSpurMinN": 166362.000000, "MapSpurMaxE": 376060.000000, "MapSpurMaxN": 166362.000000, "Distance": 143.6, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='13/03344/OUT'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=13/03344/OUT|13/03344/OUT", "PROPOSAL": "Demolition of existing house and swimming pool to facilitate the erection of 4no. dwellings and associated works. (Outline with all matters reserved)", "Consulation___Expiry___Date": "18/09/2013", "MapSpurE": 376243.000000, "MapSpurN": 166303.000000, "MapSpurMinE": 376243.000000, "MapSpurMinN": 166303.000000, "MapSpurMaxE": 376243.000000, "MapSpurMaxN": 166303.000000, "Distance": 176.2, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00802/AR'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00802/AR|14/00802/AR", "PROPOSAL": "Display of six sheet internally illuminated advertisements in bus shelters serving the No.13 Bathford-Foxhill Route; to be located along London Road at: Stop No. 30 (Balustrade) and Stop No.32 (Lambridge)", "Consulation___Expiry___Date": "03/04/2014", "MapSpurE": 375856.000000, "MapSpurN": 166104.000000, "MapSpurMinE": 375856.000000, "MapSpurMinN": 166104.000000, "MapSpurMaxE": 375856.000000, "MapSpurMaxN": 166104.000000, "Distance": 258.9, "MapSpurX": "0", "MapSpurY": "0" }, { "Reference": "/projects/bathnes/developmentcontrol/default.aspx?requesttype=parsetemplate&amp;template=DevelopmentControlApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='14/00989/FUL'&amp;SearchLayer=DCApplications&amp;SearchField=REFVAL&amp;SearchValue=14/00989/FUL|14/00989/FUL", "PROPOSAL": "Erection of single storey rear extension and loft conversion.", "Consulation___Expiry___Date": "17/04/2014", "MapSpurE": 375847.000000, "MapSpurN": 166348.000000, "MapSpurMinE": 375847.000000, "MapSpurMinN": 166348.000000, "MapSpurMaxE": 375847.000000, "MapSpurMaxN": 166348.000000, "Distance": 271.5, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.healthAndFitnessNearby = { "Results": { "Health_and_Fitness_Centres_Nearby": [{ "_": "http://www.macdonaldhotels.co.uk/bathspa/index.htm|Vital Health, Fitness &amp; Beauty (Bath Spa Hotel)", "MapSpurE": 376159.999471, "MapSpurN": 164829.997159, "MapSpurMinE": 376159.999471, "MapSpurMinN": 164829.997159, "MapSpurMaxE": 376159.999471, "MapSpurMaxN": 164829.997159, "Distance": 1392.9, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "http://www.bathymca.co.uk/|YMCA (CITY OF BATH)", "MapSpurE": 375046.001020, "MapSpurN": 165188.004681, "MapSpurMinE": 375046.001020, "MapSpurMinN": 165188.004681, "MapSpurMaxE": 375046.001020, "MapSpurMaxN": 165188.004681, "Distance": 1466.5, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.parksNearby = { "Results": { "Parks_or_Open_Spaces_Nearby": [{ "_": "Kensington Meadows", "MapSpurE": 376002.221981, "MapSpurN": 165980.127938, "MapSpurMinE": 375744.877134, "MapSpurMinN": 165808.197153, "MapSpurMaxE": 376259.566828, "MapSpurMaxN": 166152.058723, "Distance": 255.4, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Alice Park", "MapSpurE": 376460.544315, "MapSpurN": 166611.562192, "MapSpurMinE": 376343.551021, "MapSpurMinN": 166463.739505, "MapSpurMaxE": 376577.537610, "MapSpurMaxN": 166759.384878, "Distance": 540.4, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Sydney Gardens", "MapSpurE": 375788.060642, "MapSpurN": 165314.223551, "MapSpurMinE": 375638.087103, "MapSpurMinN": 165180.086947, "MapSpurMaxE": 375938.034181, "MapSpurMaxN": 165448.360155, "Distance": 954.8, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.allotmentsNearby = { "Results": { "Allotments_Nearby": [{ "_": "Claremont Road", "Provided__by": "B&amp;NES", "MapSpurE": 375850.562327, "MapSpurN": 166187.743508, "MapSpurMinE": 375788.221420, "MapSpurMinN": 166125.346369, "MapSpurMaxE": 375912.903234, "MapSpurMaxN": 166250.140647, "Distance": 238.8, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Hampton Row", "Provided__by": "B&amp;NES", "MapSpurE": 375952.425935, "MapSpurN": 165717.528106, "MapSpurMinE": 375898.350702, "MapSpurMinN": 165651.252078, "MapSpurMaxE": 376006.501168, "MapSpurMaxN": 165783.804135, "Distance": 521.1, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.playAreasNearby = { "Results": { "Play_Areas_Nearby": [{ "_": "Alice Park", "MapSpurE": 376380.051906, "MapSpurN": 166522.222765, "MapSpurMinE": 376345.101092, "MapSpurMinN": 166463.749503, "MapSpurMaxE": 376415.002720, "MapSpurMaxN": 166580.696027, "Distance": 420.3, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Midsummer Buildings", "MapSpurE": 375582.742130, "MapSpurN": 166535.413989, "MapSpurMinE": 375559.148888, "MapSpurMinN": 166517.184207, "MapSpurMaxE": 375606.335373, "MapSpurMaxN": 166553.643771, "Distance": 594.2, "MapSpurX": "0", "MapSpurY": "0" }, { "_": "Larkhall Recreation Ground", "MapSpurE": 375899.298884, "MapSpurN": 166830.399550, "MapSpurMinE": 375879.650903, "MapSpurMinN": 166803.162347, "MapSpurMaxE": 375918.946864, "MapSpurMaxN": 166857.636754, "Distance": 637.7, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.newLicensingAppsNearby = { "Results": { "New_Licensing_Applications_Nearby": { "Info": "<p>No records found nearby.</p>" } } };
        $scope.issuedLicensingAppsNearby = { "Results": { "Issued_Licensing_Applications_Nearby": [{ "LINK": "Mr Stephen Bates - Piercing-Practitioner/Responsible Person", "Address": "Flat 6, 36 Grosvenor Place, Lambridge, Bath, BA1 6BA", "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='12/02652/PCPER'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=12/02652/PCPER|12/02652/PCPER", "MapSpurE": 376175.000000, "MapSpurN": 166279.000000, "MapSpurMinE": 376175.000000, "MapSpurMinN": 166279.000000, "MapSpurMaxE": 376175.000000, "MapSpurMaxN": 166279.000000, "Distance": 105.4, "MapSpurX": "0", "MapSpurY": "0" }, { "LINK": "One Beaufort - Premises Licence", "Address": "1 Beaufort West, Lambridge, Bath, BA1 6QB", "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='10/03946/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=10/03946/LAPRE|10/03946/LAPRE", "MapSpurE": 375958.000000, "MapSpurN": 166186.000000, "MapSpurMinE": 375958.000000, "MapSpurMinN": 166186.000000, "MapSpurMaxE": 375958.000000, "MapSpurMaxN": 166186.000000, "Distance": 133.7, "MapSpurX": "0", "MapSpurY": "0" }, { "LINK": "Beaufort Store - Premises Licence", "Address": "3 - 4 Balustrade, London Road, Walcot, Bath, BA1 6QA", "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='10/02944/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=10/02944/LAPRE|10/02944/LAPRE", "MapSpurE": 375941.000000, "MapSpurN": 166170.000000, "MapSpurMinE": 375941.000000, "MapSpurMinN": 166170.000000, "MapSpurMaxE": 375941.000000, "MapSpurMaxN": 166170.000000, "Distance": 154.7, "MapSpurX": "0", "MapSpurY": "0" }, { "LINK": "Martin McColl Ltd - Premises Licence", "Address": "7 Lambridge Buildings, Larkhall, Bath, BA1 6RS", "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='11/01084/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=11/01084/LAPRE|11/01084/LAPRE", "MapSpurE": 376059.000000, "MapSpurN": 166469.000000, "MapSpurMinE": 376059.000000, "MapSpurMinN": 166469.000000, "MapSpurMaxE": 376059.000000, "MapSpurMaxN": 166469.000000, "Distance": 249.6, "MapSpurX": "0", "MapSpurY": "0" }, { "LINK": "The Rondo - Premises Licence", "Address": "St Saviour&#39;s Road, Larkhall, Bath, BA1  6RT", "Reference": "/projects/bathnes/licensing/default.aspx?requesttype=parsetemplate&amp;template=LicenceApplication.tmplt&amp;basepage=default.aspx&amp;Filter=^REFVAL^='11/04635/LAPRE'&amp;SearchLayer=LIApplications&amp;SearchField=REFVAL&amp;SearchValue=11/04635/LAPRE|11/04635/LAPRE", "MapSpurE": 376063.000000, "MapSpurN": 166482.000000, "MapSpurMinE": 376063.000000, "MapSpurMinN": 166482.000000, "MapSpurMaxE": 376063.000000, "MapSpurMaxN": 166482.000000, "Distance": 262.1, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.listedBuilding = { "Results": { "Listed_Building": { "Reference": null, "Description": "NOS. 1-41 AND ATTACHED AREA RAILINGS, 1-41, GROSVENOR PLACE", "Grading": "I", "_": "http://list.english-heritage.org.uk/resultsingle.aspx?uid=1396090|More Info at English Heritage", "MapSpurE": 376087.974739, "MapSpurN": 166215.010703, "MapSpurMinE": 375965.399538, "MapSpurMinN": 166121.227548, "MapSpurMaxE": 376210.549940, "MapSpurMaxN": 166308.793858 } } };
        $scope.yourCouncillors = { "Results": { "Your_Councillors": { "_": "<div id=\"myCouncillor\"><a href=\"http://democracy.bathnes.gov.uk/mgUserInfo.aspx?UID=1436\">Councillor Lisa Brett</a><br />(Liberal Democrats)<br /><img src=\"http://democracy.bathnes.gov.uk/UserData/6/3/4/Info00001436/smallpic.jpg\"/><br />Telephone <br />07787314094<br /><br /></div><br /> <div id=\"myCouncillor\"><a href=\"http://democracy.bathnes.gov.uk/mgUserInfo.aspx?UID=1437\">Councillor Paul Fox</a><br />(Liberal Democrats)<br /><img src=\"http://democracy.bathnes.gov.uk/UserData/7/3/4/Info00001437/smallpic.jpg\"/><br />Telephone <br />07974 328905<br /><br /></div><br /> ", "MapSpurE": 375777.201896, "MapSpurN": 166000.247175, "MapSpurMinE": 375091.802335, "MapSpurMinN": 165356.996303, "MapSpurMaxE": 376462.601458, "MapSpurMaxN": 166643.498046 } } };
        $scope.councilOffices = { "Results": { "____________________________": [{ "Your_nearest_Council_Office_is_": "http://www.bathnes.gov.uk/contact-us/council-offices?office=GUILDHALL|GUILDHALL", "MapSpurE": 375126.002848, "MapSpurN": 164839.004581, "MapSpurMinE": 375126.002848, "MapSpurMinN": 164839.004581, "MapSpurMaxE": 375126.002848, "MapSpurMaxN": 164839.004581, "Distance": 1683.3, "MapSpurX": "0", "MapSpurY": "0" }, { "Your_nearest_Council_Office_is_": "http://www.bathnes.gov.uk/contact-us/council-offices?office=LEWIS HOUSE|LEWIS HOUSE", "MapSpurE": 375229.997804, "MapSpurN": 164541.999598, "MapSpurMinE": 375229.997804, "MapSpurMinN": 164541.999598, "MapSpurMaxE": 375229.997804, "MapSpurMaxN": 164541.999598, "Distance": 1885.1, "MapSpurX": "0", "MapSpurY": "0" }] } };
        $scope.housingAllowanceZones = { "Results": { "___________": { "Your_Local_Housing_Allowance_Zone_is_": "http://www.bathnes.gov.uk/services/council-tax-benefits-and-grants/benefits/housing-benefit/local-housing-allowance-lha?Bath|Bath", "MapSpurE": 366754.986071, "MapSpurN": 166278.897416, "MapSpurMinE": 345139.968873, "MapSpurMinN": 149656.700470, "MapSpurMaxE": 388370.003269, "MapSpurMaxN": 182901.094362 } } };
        $scope.binCollection = { "Results": { "_______________": { "LLPG_UPRN": 100121173307, "_": "<table id=\"reftab\" colspan=\"2\"><tr><td> <strong>Your next weekly refuse collection is: </strong><br><span class=\"WasteHighlight\">Thursday, 2 October</span></td><td><a href=\"http://www.bathnes.gov.uk/services/bins-rubbish-and-recycling/collections-recycling-and-rubbish/rubbish-collection\" target=\" _blank\" ><img src=\"images/icons/refuse_sack75.png\" /></a><br>Route: M42</td></tr> <tr><td><strong>Your next weekly recycling collection is: </strong><br><span class=\"WasteHighlight\">Thursday, 2 October</span></td><td><a href=\"http://www.bathnes.gov.uk/services/bins-rubbish-and-recycling/recycling-and-rubbish/what-you-can-recycle\" target=\" _blank\" ><img src=\"images/icons/recycling_box75.png\" /></a><br>Route: M402</td></tr> <tr><td><strong>Your next fortnightly garden waste collection is: </strong><br><span class=\"WasteHighlight\">Thursday, 2 October</span></td><td><a href=\"http://www.bathnes.gov.uk/services/bins-rubbish-and-recycling/garden-waste-and-compost\" target=\" _blank\" ><img src=\"images/icons/garden_waste75.png\" /></a><br>Route: M41b<br>Week: B</td></tr> </table><P ALIGN=\"left\"><strong>Did we miss a collection? <a href=\"http://www.bathnes.gov.uk/reportit?uprn=100121173307\">Report It</a></strong></P>" } } };
    }*/


    if ($scope.userData && $scope.userData.length === 0) {
        //Defaults for LocalHidden
        $scope.userData = {"LocalHidden": {Libraries: true, Schools: true, Roadworks: true, CarPark: true, Allotments: true, Bus: true,  Crossings: true, Licenses: false, ParksAndRec: true, Planning: false, Sports: true}};
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    // OnLoad
    // The following all happens on loading the app.
    // - If the app has not been previously loaded then a tutorial is shown.
    // - If there is an existing user registered then their user data is loaded.
    // - Location is detected in the background (not to be used, but to save time later).
    // - The definition for the map is loaded.
    //  -Existing reports are loaded.
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODAL DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Register Details
    // The first register screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/register-details.html', function (modal) {
        $scope.registerModal = modal;
    }, {
        scope: $scope
    });
    $scope.register = function () {
        $scope.registerModal.show();
    };
    $scope.closeRegister = function () {
        $scope.registerModal.hide();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Register Address
    // Select address screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/register-set-address.html', function (modal) {
        $scope.propertyModal = modal;
    }, {
        scope: $scope
    });
    $scope.setAddress = function () {
        $scope.propertyModal.show();
    };
    $scope.closeSetAddress = function () {
        $scope.propertyModal.hide();
    };
    
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Display options
    // Options screen for local data display
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/options-data-display.html', function (modal) {
        $scope.displayOptionsModal = modal;
    }, {
        scope: $scope
    });
    $scope.displayOptions = function () {
        $scope.displayOptionsModal.show();
    };
    $scope.closeDisplayOptions = function () {
        // Save
        window.localStorage['UserData'] = angular.toJson($scope.userData);
        $scope.displayOptionsModal.hide();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt
    // The first report it screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-report.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItModal = modal;
    });
    $scope.reportIt = function () {
        $scope.reportItModal.show();
    };
    $scope.closeReportIt = function () {
        $scope.reportItModal.hide();
    };
    //Submit
    $scope.submitReportItPage1 = function (report) {
        $scope.reportItModal.hide();
        $scope.reportItPhotoModal.show();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Photo
    // Gives the user an option to add a photo to their report.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-photo.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItPhotoModal = modal;
    });
    $scope.reportItPhoto = function () {
        $scope.reportItPhotoModal.show();
    };
    $scope.closeReportItPhoto = function () {
        $scope.reportItPhotoModal.hide();
    };
    // Submit
    $scope.submitReportItPage2 = function (photo) {
        $scope.reportItPhotoModal.hide();
        $ionicLoading.show({
            template: 'Finding location...'
        });
        $scope.geoLocate();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Location
    // Add the user's current location to the report, or allows them to search for an address
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/report-it-location.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItLocationModal = modal;
    });
    $scope.reportItLocation = function () {
        $scope.reportItLocationModal.show();
    };
    $scope.closeReportItLocation = function () {
        $scope.reportItLocationModal.hide();
    };
    // Submit
    $scope.submitReportItPage3 = function (location) {
        if ( $scope.currentReport.useUserLocation ) {
            $scope.currentReport['lat'] = $scope.currentLocation['coords']['latitude'];
            $scope.currentReport['long']  = $scope.currentLocation['coords']['longitude']; 
        }
        $scope.reportItLocationModal.hide();
        $scope.reportItPersonalModal.show();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: ReportIt Personal details
    // Add the user's personal details to the report.  This will be optional.
    /////////////////////////////////////////////////////////////////////////////////////////////
    // set up the report it personal details modal
    $ionicModal.fromTemplateUrl('templates/report-it-personal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reportItPersonalModal = modal;
    });
    $scope.reportItPersonal = function () {
        $scope.reportItPersonalModal.show();
    };
    $scope.closeReportItPersonal = function () {
        $scope.reportItPersonalModal.hide();
    };
    // Submit
    $scope.submitReportItPage4 = function (report) {
        $scope.reportItPersonalModal.hide();
        Reports.addReport($scope.currentReport);
        $scope.currentReport = { type: '', description: '', userFirstname: '', userLastname: '', useUserLocation: true, usePersonalDetails: true, userAddress: '', userUPRN: '', userLat: '', userLon: '', photo: '', lat: '', lon: '' };
        $scope.reports = Reports.getReports();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal Cleanup
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.$on('$destroy', function () {
        $scope.reportItModal.remove();
        $scope.reportItLocationModal.remove();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // APP FUNCTIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: searchUserAddress
    // Searches for the user address
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.searchUserAddress = function (addressSearch) {
        if (addressSearch) {
            $scope.closeRegister();
            $ionicLoading.show({
                template: 'Searching...'
            });
            UserData.fetchUprn(addressSearch)
                .then(function (data) {
                    // check for whether we have postcode results
                    if (data && data !== "Failed") {
                        $ionicLoading.hide();
                        $scope.addresses = data;
                        $scope.setAddress();
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'No addresses found',
                            content: 'Sorry, couldn\'t find address.  Check search terms and internet connection.'
                        }).then(function (res) {
                        });
                    }
                });
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: setProperty
    // Sets the user selected property during registration
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.setProperty = function (uId) {
        $scope.propertyModal.hide();
        $ionicLoading.show({
            template: 'Fetching data...'
        });
        $scope.uprn = uId;
        UserData.save({ "uprn": uId, "addressSearch": $scope.userData.addressSearch, "firstname": $scope.userData.firstname, "lastname": $scope.userData.lastname, "email": $scope.userData.email, "phone": $scope.userData.phone, "LocalHidden": {Libraries: true, Schools: true, Roadworks: true, CarPark: true, Allotments: true, Bus: true,  Crossings: true, Licenses: false, ParksAndRec: true, Planning: false, Sports: true}});
        $scope.userData = UserData.all();
        BathData.fetchAll(uId)
            .then(function (data) {
                if (data && data != []) {
                    $scope.bathdata = data;
                    $ionicLoading.hide();
                    window.location.reload(true);
                }
                else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error downloading data',
                        content: 'Please check connection and try again.'
                    }).then(function (res) {
                    });
                }
            });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: options
    // Displays the options menu
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.options = function () {
        var refreshText = '';
        if ($scope.userData.uprn !== undefined) {
            refreshText = 'Refresh data';
        }
        var optionsSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Register' },
                { text: 'View instructions' },
                { text: refreshText },
                { text: '' }],
            destructiveText: 'Clear data',
            titleText: 'App options',
            cancelText: 'Cancel',
            buttonClicked: function (index) {
                if (index === 0) {
                    // either registering or un-registering
                    $scope.register();
                }
                if ( index === 2 && $scope.userData.uprn !== undefined ) {
                    //Refresh data
                   $ionicLoading.show({
                        template: 'Fetching data...'
                    });
                    BathData.fetchAll($scope.userData.uprn)
                        .then(function (data) {
                            if (data && data != []) {
                                $scope.bathdata = data;
                                $ionicLoading.hide();
                            }
                            else {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Error downloading data',
                                    content: 'Please check connection and try again.'
                                }).then(function (res) {
                                });
                            }
                    });                 
                }
                return true;
            },
            destructiveButtonClicked: function () {
                $scope.deleteData();
                return true;
            }       
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: SelectMenu
    // Called to select the current view - currently called in the menu bar and on various buttons 
    // throughout the app.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.selectMenu = function (menuItem) {
        $ionicSideMenuDelegate.toggleLeft(false);

        if (menuItem === 'home'){ $state.go('menu.home');}
        if (menuItem === 'map'){ $state.go('menu.map');}
        if (menuItem === 'reports'){ $state.go('menu.reports');}
        if (menuItem === 'localdata'){ $state.go('menu.local');}
        if (menuItem == 'details'){ $state.go('menu.details');}
        if (menuItem == 'mycouncil'){ $state.go('menu.mycouncil');}
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: toggleMenu
    // Moves the sidebar in or out.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showPopup
    // Shows a helper popup - used on various information buttons throughout the app.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showPopup = function (title, message) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
            buttons: [ {
                text: 'OK',
                type: 'button-clear button-positive'
            }]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////    
    // Function: deleteData
    // Removes the user's registered data
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.deleteData = function () {
        $ionicPopup.confirm({
            title: 'Clear data',
            template: 'This will clear all stored data on the app.'
        }).then(function(res) {
            if(res) {
                UserData.clear();
                BathData.clear();
                $scope.userData = {};
                $scope.bathData = {};
                $state.go('menu.home'); //TODO: Change this to the "new user screen, possibly - when added"
                window.location.reload(true);
            }
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////    
    // Function: deleteReport
    // Removes a single user report
    /////////////////////////////////////////////////////////////////////////////////////////////
     $scope.deleteReport = function( index ){
            if ($scope.reports[index]) {
                $scope.reports.splice(index, 1);
                Reports.saveReports($scope.reports);
            }
        };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showCouncilConnectPopup
    // A popup for council connect 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showCouncilConnectPopup = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Council Connect',
            template: 'Council Connect can help you with a range of enquiries including waste & recycling, roads & highways and general library & planning enquiries.',
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-clear'
                },
                {
                    text: 'Call',
                    type: 'button-clear button-positive',
                    onTap: function (e) {
                    }
                },
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: showCouncilConnectPopupOutOfHours
    // A popup for council connect 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.showCouncilConnectPopupOutOfHours = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Out of Hours',
            template: 'Council connect details',
            buttons: [
                { text: 'Cancel' },
                {
                    text: 'Save',
                    type: 'button-positive',
                    onTap: function (e) {
                    }
                },
            ]
        });
        alertPopup.then(function (res) {
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: takePhoto
    // Takes a photo, stores it in localStorage.reportPhoto
    // Displays it to the user in photoTaken, which is by default aLinkcolor blank image 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.takePhoto = function () {

        function onSuccess(imageURI) {
            // saves to currentReport.photo            
            imageURI = "data:image/jpeg;base64," + imageURI;
            $scope.$apply(function () {
                $scope.currentReport.photo = imageURI;
            });
        }

        function onFail(message) {
            // alert('Failed because: ' + message);
        }
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: geoLocate
    // Stores the geolocation.
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.geoLocate = function () {
        function onGeolocationSuccess(position) {
            $scope.currentLocation = position;
           /*
            * console.log('Latitude: ' + position.coords.latitude + '\n' +
            *      'Longitude: ' + position.coords.longitude + '\n' +
            *      'Accuracy: ' + position.coords.accuracy + '\n' +
            *      'Timestamp: ' + position.timestamp); // debug
            */

            $ionicLoading.hide();
            $scope.currentReport.useLocation = true;
            $scope.currentReport.locationFound = true;
            $scope.currentReport.locationMessage = "Your location has been successfully detected.  If you would like this to be used as part of the report, check the option below.";
            $scope.reportItLocationModal.show();
        }

        function onGeolocationError(error) {
            console.log('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n'); // debug
            $ionicLoading.hide();
            $scope.currentReport.locationMessage = "Your location was not detected.";
            $scope.currentReport.useLocation = false;
            $scope.currentReport.locationFound = false;
            $scope.reportItLocationModal.show();
        }
        navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: emailCouncilConnect
    // Test function to email Council Connect with the report
    // Uses https://github.com/katzer/cordova-plugin-email-composer/blob/0cc829af59b94b52db63a999064577a6962bf763/README.md
    // This will be replaced at some point
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.emailCouncilConnect = function () {
        try {
            window.plugin.email.open({
                to: ['councilconnect@bathnes.gov.uk'],
                subject: "Message from Bath App",
                body: "",
                isHtml: false
            });
        } catch (err) {
            console.log(err.message);
            window.location.href = "mailto:councilconnect@bathnes.gov.uk";
        }

    };
    
    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: mToMi
    // Converts meters to miles to an accuracy of 1 decimal place 
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.mToMi = function ( distM ) {
      res = distM * 0.000621371192;
      if (res > 1) {
        return res.toFixed(1);
      }
      return res.toFixed(2);
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: formatTime
    // Formats the time string returned by iShare for roadworks
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.formatTime = function( strTime ) {
        if (strTime == "01/01/4000 00:00:00" ) { 
            //This is returned when there's no date
            return "No data avaliable";
        }
        if (strTime.search( " 00:00:00" ) != -1) { 
            // Returned as a DateTime but we only really care about the date
            return strTime.slice(0,strTime.search(" 00:00:00"));
        }
        return strTime;
    };


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Function: formatAddress
    // Formats address strings returned by iShare
    /////////////////////////////////////////////////////////////////////////////////////////////
    $scope.formatAddress = function ( aPart1, aPart2, aPart3 ) {
        var res = "";
        if (aPart1) {
            res += aPart1  ;
        }
        if (aPart2) {
            if (aPart1) {
                 res += ", ";
            }
            res += aPart2;
        }
        if (aPart3) {
            if (aPart2 || aPart1) {
            res += ", ";
        }
        res += aPart3; 
        }
        return res;
    }
})
.controller('LocalDataController', function ($scope, $ionicSideMenuDelegate) {
    if ($scope.bathdata[0]) {
        $scope.librariesNearby = $scope.bathdata[0];
    }

    if ($scope.bathdata[1]) {
        $scope.mobileLibrariesNearby = $scope.bathdata[1];
    }

    if ($scope.librariesNearby && $scope.librariesNearby.Results) {
        // Do the string manipulation to clean up - need to make sure this won't blow up
        $scope.librariesNearby.Results.Libraries_Nearby.url = $scope.librariesNearby.Results.Libraries_Nearby._.split("|")[0];
        $scope.librariesNearby.Results.Libraries_Nearby.name = $scope.librariesNearby.Results.Libraries_Nearby._.split("|")[1];
        var geo = NEtoLL($scope.librariesNearby.Results.Libraries_Nearby.MapSpurE, $scope.librariesNearby.Results.Libraries_Nearby.MapSpurN);
        $scope.librariesNearby.Results.Libraries_Nearby.lat = geo.latitude;
        $scope.librariesNearby.Results.Libraries_Nearby.lon = geo.longitude;
    }
    if ($scope.mobileLibrariesNearby && $scope.mobileLibrariesNearby.Results) {
        // Do the string manipulation to clean up - need to make sure this won't blow up
        $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.timeAdjusted = $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.time.replace('?', '-');
        $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.url = $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby._.split("|")[0];
        var geo = NEtoLL($scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.MapSpurE, $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.MapSpurN);
        $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.lat = geo.latitude;
        $scope.mobileLibrariesNearby.Results.Mobile_Libraries_Nearby.lon = geo.longitude;
    }

    if ($scope.bathdata[2]) {
        $scope.playSchoolsNearby = $scope.bathdata[2];
    }
    if ($scope.bathdata[3]) {
        $scope.primarySchoolsNearby = $scope.bathdata[3];
    }
    if ($scope.bathdata[4]) {
        $scope.secondarySchoolsNearby = $scope.bathdata[4];
    }
    if ($scope.bathdata[5]) {
        $scope.collegesNearby = $scope.bathdata[5];
    }
    if ($scope.bathdata[6]) {
        $scope.universitiesNearby = $scope.bathdata[6];

    }

    if ($scope.universitiesNearby) {
        // ishare only returns 8 characters in the string for some reason
        // This should get fixed, but at the moment, this fixes the display for the 2 major universities
        for (var i = 0; i < $scope.universitiesNearby.Results.Universities_Nearby.length; i++) {
            if ($scope.universitiesNearby.Results.Universities_Nearby[i]['___'] == "Claverto") {
                $scope.universitiesNearby.Results.Universities_Nearby[i]['___'] = "Claverton Down";
            }
            if ($scope.universitiesNearby.Results.Universities_Nearby[i]['___'] == "Newton P") {
                $scope.universitiesNearby.Results.Universities_Nearby[i]['___'] = "Newton Park";
            }
        }
    }
    if ($scope.playSchoolsNearby && $scope.playSchoolsNearby.Results) {
        //for (i = 0; i < $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"].length ; i++) {
        //    var geo = NEtoLL($scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"][i].MapSpurE, $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"].MapSpurN);
        //    $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"][i].lat = geo.latitude;
        //    $scope.playSchoolsNearby.Results["Nurseries Pre Schools and Out of School Childcare Nearby"][i].lon = geo.longitude;
        //}
    }
    if ($scope.primarySchoolsNearby && $scope.primarySchoolsNearby.Results) {
        //for (i = 0; i < $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby.length ; i++) {
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].name = $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i]._.split('|')[1];
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].url = $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i]._.split('|')[0];
        //    var geo = NEtoLL($scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].MapSpurE, $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].MapSpurN);
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].lat = geo.latitude;
        //    $scope.primarySchoolsNearby.Results.Primary_Schools_Nearby[i].lon = geo.longitude;
        //}
    }
    if ($scope.secondarySchoolsNearby && $scope.secondarySchoolsNearby.Results) {
        for (i = 0; i < $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby.length ; i++) {
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].name = $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i]._.split('|')[1];
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].url = $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i]._.split('|')[0];
            var geo = NEtoLL($scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].MapSpurE, $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].MapSpurN);
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].lat = geo.latitude;
            $scope.secondarySchoolsNearby.Results.Secondary_Schools_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.collegesNearby && $scope.collegesNearby.Results) {
        for (i = 0; i < $scope.collegesNearby.Results.Colleges_Nearby.length ; i++) {
            var geo = NEtoLL($scope.collegesNearby.Results.Colleges_Nearby[i].MapSpurE, $scope.collegesNearby.Results.Colleges_Nearby[i].MapSpurN);
            $scope.collegesNearby.Results.Colleges_Nearby[i].lat = geo.latitude;
            $scope.collegesNearby.Results.Colleges_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.universitiesNearby && $scope.universitiesNearby.Results) {
        for (i = 0; i < $scope.universitiesNearby.Results.Universities_Nearby.length ; i++) {
            var geo = NEtoLL($scope.universitiesNearby.Results.Universities_Nearby[i].MapSpurE, $scope.universitiesNearby.Results.Universities_Nearby[i].MapSpurN);
            $scope.universitiesNearby.Results.Universities_Nearby[i].lat = geo.latitude;
            $scope.universitiesNearby.Results.Universities_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[8]) {
        $scope.roadworksNearby = $scope.bathdata[8];
    }
    if ($scope.bathdata[20]) {
        $scope.busStops = $scope.bathdata[20];
    }
    if ($scope.bathdata[21]) {
        $scope.schoolCrossings = $scope.bathdata[21];
    }
    if ($scope.bathdata[22]) {
        $scope.parkingNearby = $scope.bathdata[22];
    }


    if ($scope.parkingNearby && $scope.parkingNearby.Results) {
        for (i = 0; i < $scope.parkingNearby.Results.Parking_Zones.length ; i++) {
            var geo = NEtoLL($scope.parkingNearby.Results.Parking_Zones[i].MapSpurE, $scope.parkingNearby.Results.Parking_Zones[i].MapSpurN);
            $scope.parkingNearby.Results.Parking_Zones[i].lat = geo.latitude;
            $scope.parkingNearby.Results.Parking_Zones[i].lon = geo.longitude;
        }
    }
    if ($scope.roadworksNearby && $scope.roadworksNearby.Results) {
        for (i = 0; i < $scope.roadworksNearby.Results.Roadworks_Nearby.length ; i++) {
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].title = $scope.roadworksNearby.Results.Roadworks_Nearby[i].Organisation.split('|')[1].replace('amp;', '');
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].url = $scope.roadworksNearby.Results.Roadworks_Nearby[i].Organisation.split('|')[0].replace('amp;', '');
            var geo = NEtoLL($scope.roadworksNearby.Results.Roadworks_Nearby[i].MapSpurE, $scope.roadworksNearby.Results.Roadworks_Nearby[i].MapSpurN);
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].lat = geo.latitude;
            $scope.roadworksNearby.Results.Roadworks_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.busStops && $scope.busStops.Results) {
        for (i = 0; i < $scope.busStops.Results.Bus_Stops_Nearby.length ; i++) {
            var geo = NEtoLL($scope.busStops.Results.Bus_Stops_Nearby[i].MapSpurE, $scope.busStops.Results.Bus_Stops_Nearby[i].MapSpurN);
            $scope.busStops.Results.Bus_Stops_Nearby[i].lat = geo.latitude;
            $scope.busStops.Results.Bus_Stops_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.schoolCrossings && $scope.schoolCrossings.Results) {
        for (i = 0; i < $scope.schoolCrossings.Results.School_Crossings_Nearby.length ; i++) {
            var geo = NEtoLL($scope.schoolCrossings.Results.School_Crossings_Nearby[i].MapSpurE, $scope.schoolCrossings.Results.School_Crossings_Nearby[i].MapSpurN);
            $scope.schoolCrossings.Results.School_Crossings_Nearby[i].lat = geo.latitude;
            $scope.schoolCrossings.Results.School_Crossings_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.bathdata[12]) {
        $scope.healthAndFitnessNearby = $scope.bathdata[12];
    }

    if ($scope.healthAndFitnessNearby && $scope.healthAndFitnessNearby.Results) {
        for (i = 0; i < $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby.length ; i++) {
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].name = $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[1].replace('amp;', '');
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].url = $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i]._.split('|')[0];
            var geo = NEtoLL($scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurE, $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].MapSpurN);
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].lat = geo.latitude;
            $scope.healthAndFitnessNearby.Results.Health_and_Fitness_Centres_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[15]) {
        $scope.planningApplicationsNearby = $scope.bathdata[15];
    }

    if ($scope.planningApplicationsNearby && $scope.planningApplicationsNearby.Results) {
        for (i = 0; i < $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby.length ; i++) {
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].title = $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].url = $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
            var geo = NEtoLL($scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].MapSpurE, $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].MapSpurN);
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].lat = geo.latitude;
            $scope.planningApplicationsNearby.Results.Planning_Applications_Nearby[i].lon = geo.longitude;
        }
    }

    if ($scope.bathdata[16]) {
        $scope.newLicensingAppsNearby = $scope.bathdata[16];
    }
    if ($scope.bathdata[17]) {
        $scope.issuedLicensingAppsNearby = $scope.bathdata[17];
    }

    if ($scope.newLicensingAppsNearby && $scope.newLicensingAppsNearby.Results) {
        for (i = 0; i < $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby.length ; i++) {
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].title = $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].url = $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
            var geo = NEtoLL($scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].MapSpurE, $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].MapSpurN);
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].lat = geo.latitude;
            $scope.newLicensingAppsNearby.Results.New_Licensing_Applications_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.issuedLicensingAppsNearby && $scope.issuedLicensingAppsNearby.Results) {
        for (i = 0; i < $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby.length ; i++) {
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].title = $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[1].replace('amp;', '');
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].url = $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].Reference.split('|')[0].split('amp;').join('');
            var geo = NEtoLL($scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].MapSpurE, $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].MapSpurN);
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].lat = geo.latitude;
            $scope.issuedLicensingAppsNearby.Results.Issued_Licensing_Applications_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.bathdata[9]) {
        $scope.parksNearby = $scope.bathdata[9];
    }
    if ($scope.bathdata[11]) {
        $scope.allotmentsNearby = $scope.bathdata[11];
    }
    if ($scope.bathdata[10]) {
        $scope.playAreasNearby = $scope.bathdata[10];
    }

    if ($scope.parksNearby && $scope.parksNearby.Results) {
        for (i = 0; i < $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby.length ; i++) {
            var geo = NEtoLL($scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurE, $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].MapSpurN);
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].lat = geo.latitude;
            $scope.parksNearby.Results.Parks_or_Open_Spaces_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.allotmentsNearby && $scope.allotmentsNearby.Results) {
        for (i = 0; i < $scope.allotmentsNearby.Results.Allotments_Nearby.length ; i++) {
            $scope.allotmentsNearby.Results.Allotments_Nearby[i].ProvidedAdjusted = $scope.allotmentsNearby.Results.Allotments_Nearby[i].Provided__by.replace('amp;', '');
            var geo = NEtoLL($scope.allotmentsNearby.Results.Allotments_Nearby[i].MapSpurE, $scope.allotmentsNearby.Results.Allotments_Nearby[i].MapSpurN);
            $scope.allotmentsNearby.Results.Allotments_Nearby[i].lat = geo.latitude;
            $scope.allotmentsNearby.Results.Allotments_Nearby[i].lon = geo.longitude;
        }
    }
    if ($scope.playAreasNearby && $scope.playAreasNearby.Results) {
        for (i = 0; i < $scope.playAreasNearby.Results.Play_Areas_Nearby.length ; i++) {
            var geo = NEtoLL($scope.playAreasNearby.Results.Play_Areas_Nearby[i].MapSpurE, $scope.playAreasNearby.Results.Play_Areas_Nearby[i].MapSpurN);
            $scope.playAreasNearby.Results.Play_Areas_Nearby[i].lat = geo.latitude;
            $scope.playAreasNearby.Results.Play_Areas_Nearby[i].lon = geo.longitude;
        }
    }
})
.controller('MapController', function ($scope, $ionicSideMenuDelegate, MapData) {

    $scope.markers = new Array();

    MapData.getLayer("libraries")
    .then(function (data) {
        if (data && data != "Failed") {
            for (i = 0; i < data.length ; i++){
                $scope.markers.push(data[i]);
            }
        }
        else {
        }
    });

    $scope.map = {
        defaults: {
            tileLayer: "http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png",
            attributionControl: false,     
            maxZoom: 20,
            zoomControlPosition: 'bottomleft',
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        },
        center: {
            lat: 51.3821440,
            lng: -2.3589420,
            zoom: 18
        },
        layers: {
            baselayers: { 
                MapBox: {
                layerOptions:{attribution: '<a browse-to="http://leafletjs.com">Leaflet</a>'},
                    name: 'Map items of interest',
                    url: 'http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png',
                    type: 'xyz',
                    maxZoom: 20,
                    zoomControlPosicloseDisplayOptionscloseDisplayOptionscion: 'bottomleft',
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            },
            overlays: {
                Libraries: {
                    type: 'group', 
                    name: 'Libraries', 
                    visible: true 
                }
            }
        },
        markers: $scope.markers
    };
})
.controller('CouncilController', function ($scope, $ionicSideMenuDelegate) {
    $scope.reload = function() {
       $scope.reloadCouncilData();
       $scope.$broadcast('scroll.refreshComplete');
   }

    $scope.reloadCouncilData = function() {
        if ($scope.bathdata[13]) {
            $scope.yourCouncillors = $scope.bathdata[13];
        }
        if ( $scope.bathdata[14] && !($scope.bathdata[14].Results.Listed_Building.Info === "<p>No records found nearby.</p>") ) {
            $scope.listedBuilding = $scope.bathdata[14];
        }
        if ($scope.bathdata[18]) {
            $scope.councilOffices = $scope.bathdata[18];
        }
        if ($scope.bathdata[19]) {
            $scope.housingAllowanceZones = $scope.bathdata[19];
        }

        if ($scope.yourCouncillors && $scope.yourCouncillors.Results) {
            var phoneNumbers = /(\+[0-9]{1,2}|0)[0-9 ]{7,12}/
            var string = '<!DOCTYPE html><html><head></head><body>' + $scope.yourCouncillors.Results.Your_Councillors._ + '</body></html>';
            var doc = new DOMParser().parseFromString(string, 'text/html');

            var councillorList = doc.querySelectorAll('div#myCouncillor a');
            var councillors = []; // Some councillors have more than one URL returned from ishare
            for (var i = 0; i < councillorList.length; i++) {
                if ( councillorList[i].toString().search("democracy.bathnes")  != -1 ) {
                    councillors.push(councillorList[i]);
                 }
            };
            var councillorInfo = doc.querySelectorAll('div#myCouncillor');

            if (councillors[0]) {
                var tel = "";
                var party = "";

                if (councillorInfo[0] && councillorInfo[0].innerText.indexOf('Telephone') != -1) {
                    tel = phoneNumbers.exec(councillorInfo[0].innerText)[0];
                }
                $scope.yourCouncillors.Results.Your_Councillors.number1 = councillors[0].innerHTML;
                $scope.yourCouncillors.Results.Your_Councillors.info1 = councillors[0].href;
                $scope.yourCouncillors.Results.Your_Councillors.telephone1 = tel;
                $scope.yourCouncillors.Results.Your_Councillors.img1 = URLtoBase64(councillorInfo[0].getElementsByTagName('img')[0].src);
            }
            if (councillors[1]) {
                var tel = "";
                var party = "";

                if (councillorInfo[1] && councillorInfo[1].innerText.indexOf('Telephone') != -1) {
                    tel = phoneNumbers.exec(councillorInfo[1].innerText)[0];
                }
                $scope.yourCouncillors.Results.Your_Councillors.number2 = councillors[1].innerHTML;
                $scope.yourCouncillors.Results.Your_Councillors.info2 = councillors[1].href;
                $scope.yourCouncillors.Results.Your_Councillors.telephone2 = tel;
                $scope.yourCouncillors.Results.Your_Councillors.img2 = URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
            }
            if (councillors[2]) {
                var tel = "";
                var party = "";

                if (councillorInfo[2] && councillorInfo[2].innerText.indexOf('Telephone') != -1) {
                    tel = phoneNumbers.exec(councillorInfo[2].innerText)[0];
                }
                $scope.yourCouncillors.Results.Your_Councillors.number3 = councillors[3].innerHTML;
                $scope.yourCouncillors.Results.Your_Councillors.info3 = councillors[3].href;
                $scope.yourCouncillors.Results.Your_Councillors.telephone3 = tel;
                $scope.yourCouncillors.Results.Your_Councillors.img3 = URLtoBase64(councillorInfo[1].getElementsByTagName('img')[0].src);
            }
        }

        if ($scope.councilOffices && $scope.councilOffices.Results) {
            // if iShare returns just one, then this fails. Re-jig the object to be a new object holding the old one
            // Example: BA3 3UD
            if (typeof $scope.councilOffices.Results.____________________________.length === typeof undefined){
                res = $scope.councilOffices.Results.____________________________;
                $scope.councilOffices.Results.____________________________ = new Object();
                $scope.councilOffices.Results.____________________________[0] = res;
                $scope.councilOffices.Results.____________________________.length = 1; // for iteration below
            }
            for (i = 0; i < $scope.councilOffices.Results.____________________________.length; i++) {
                $scope.councilOffices.Results.____________________________[i].title = $scope.councilOffices.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[1].replace('amp;', '');
                $scope.councilOffices.Results.____________________________[i].url = $scope.councilOffices.Results.____________________________[i].Your_nearest_Council_Office_is_.split('|')[0].replace('amp;', '');
                var geo = NEtoLL($scope.councilOffices.Results.____________________________[i].MapSpurE, $scope.councilOffices.Results.____________________________[i].MapSpurN);
                $scope.councilOffices.Results.____________________________[i].lat = geo.latitude;
                $scope.councilOffices.Results.____________________________[i].lon = geo.longitude;
            }
        }

        if ($scope.bathdata[7]) {
            $scope.binCollection = $scope.bathdata[7];
        }

        if ($scope.binCollection && $scope.binCollection.Results && $scope.binCollection.Results._______________) {
            var string = '<!DOCTYPE html><html><head></head><body>' + $scope.binCollection.Results._______________._ + '</body></html>';
            var doc = new DOMParser().parseFromString(string, 'text/html');
            var collectionDates = doc.querySelectorAll('span.WasteHighlight');

            if (collectionDates && collectionDates[0]) {
                $scope.binCollection.Results._______________.waste = collectionDates[0].innerText;
            }
            if (collectionDates && collectionDates[1]) {
                $scope.binCollection.Results._______________.recycling = collectionDates[1].innerText;
            }
            if (collectionDates && collectionDates[2]) {
                $scope.binCollection.Results._______________.garden = collectionDates[2].innerText;
            }
        }
    };

    $scope.reloadCouncilData();
})
.directive('browseTo', function ($ionicGesture) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            var handleTap = function (e) {
                var inAppBrowser = window.open($attrs.browseTo, '_system');
            };

            var tapGesture = $ionicGesture.on('tap', handleTap, $element);

            $scope.$on('$destroy', function () {
                // Clean up - unbind drag gesture handler
                $ionicGesture.off(tapGesture, 'tap', handleTap);
            });
        }
    };
});

/* 
 * DOMParser HTML extension 
 * 2012-02-02 
 * 
 * By Eli Grey, http://eligrey.com 
 * Public domain. 
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK. 
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/

(function (DOMParser) {
    "use strict";
    var DOMParser_proto = DOMParser.prototype
      , real_parseFromString = DOMParser_proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types  
    try {
        // WebKit returns null on unsupported types  
        if ((new DOMParser).parseFromString("", "text/html")) {
            // text/html parsing is natively supported  
            return;
        }
    } catch (ex) { }

    DOMParser_proto.parseFromString = function (markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var doc = document.implementation.createHTMLDocument("")
              , doc_elt = doc.documentElement
              , first_elt;

            doc_elt.innerHTML = markup;
            first_elt = doc_elt.firstElementChild;

            if (doc_elt.childElementCount === 1
                && first_elt.localName.toLowerCase() === "html") {
                doc.replaceChild(first_elt, doc_elt);
            }

            return doc;
        } else {
            return real_parseFromString.apply(this, arguments);
        }
    };
}(DOMParser));

function NEtoLL(east, north) {
    // converts NGR easting and nothing to lat, lon. With proj4.js

    // British National Grid. Source: http://epsg.io/27700
    proj4.defs("NationalGrid", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
    var res = proj4('NationalGrid', 'WGS84', [east, north]);
    return { latitude: res[1], longitude: res[0] };
}

function isCouncilConnectHours() {
    // Returns true if it is currently Council Connect Hours
    // Council Connect hours are 8-6 MTTF
    // 9:30 - 6 W
    // Closed on weekends
    var time = new Date();

    var h = time.getHours();
    var m = time.getMinutes();
    var d = time.getDay();

    if (d === 0 || d === 6 || h < 8 || h > 18) { // weekend or closed hours
        return false;
    }

    if (d === 3 && (h < 9 || (h === 9 && m < 30))) { // Wednesday
        return false;
    }

    return true;
}

function URLtoBase64 ( url ) {
    return url;
    // Same origin means we can't do this atm. Might find a solution later
    // uses a canvas element to store an image as a base 64 URL
    var canvas = document.createElement("canvas");
    var img = new Image();
    img.src = url;
    canvas.height = img.height; 
    canvas.width = img.width;

    var cc = canvas.getContext("2d");
    cc.drawImage(img, 0, 0);

    var res = canvas.toDataURL("image/jpeg");
    console.log(res);
    canvas.remove();
    return res;
}