angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://localhost:62735/BathData.svc',
       'reportsWS': 'http://localhost:62735/Open311ReportWS.svc',
       'planningWS': '',
       'mapDataWS': 'http://localhost:62735/BathData.svc'
   });