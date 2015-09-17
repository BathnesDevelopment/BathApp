angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://localhost:62735/BathData.svc/GetAllData',
       'reportsWS': 'http://localhost:62735/Open311ReportWS.svc',
       'planningWS': 'http://localhost:62735/PlanningComments.svc',
       'mapLayerConfigWS': 'http://localhost:62735/BathData.svc/GetAvailableMapLayers',
       'mapLayerWS': 'http://localhost:62735/BathData.svc/GetMapLayer/',
       'newsWS': 'http://localhost:62735/BathData.svc/GetNews',
       'liveTravelWS': 'http://localhost:62735/BathData.svc/GetLiveTravel',
   });