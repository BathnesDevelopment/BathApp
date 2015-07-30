angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://localhost:62735/BathData.svc',
       'reportWS': 'http://localhost:62735/Open311ReportWS.svc',
       'planningWS': ''
   });