angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc/GetAllData',
       'addressWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc/GetAddress',
       'reportsWS': 'https://isharemapstest.bathnes.gov.uk/residentsapp/Open311ReportWS.svc',
       'planningWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/PlanningComments.svc',
       'mapLayerConfigWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc/GetAvailableMapLayers',
       'mapLayerWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc/GetMapLayer/',
       'newsWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc/GetNews',
       'liveTravelWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc/GetLiveTravel'
});