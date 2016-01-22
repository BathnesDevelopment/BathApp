angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'https://residentsapptest.bathnes.gov.uk/BathData.svc/GetAllData',
       'addressWS': 'https://residentsapptest.bathnes.gov.uk/BathData.svc/GetAddress',
       'reportsWS': 'https://residentsapptest.bathnes.gov.uk/Open311ReportWS.svc',
       'planningWS': 'https://residentsapptest.bathnes.gov.uk/PlanningComments.svc',
       'mapLayerConfigWS': 'https://residentsapptest.bathnes.gov.uk/BathData.svc/GetAvailableMapLayers',
       'mapLayerWS': 'https://residentsapptest.bathnes.gov.uk/BathData.svc/GetMapLayer/',
       'newsWS': 'https://residentsapptest.bathnes.gov.uk/BathData.svc/GetNews',
       'liveTravelWS': 'https://residentsapptest.bathnes.gov.uk/BathData.svc/GetLiveTravel'
});