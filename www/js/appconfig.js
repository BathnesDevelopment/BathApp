angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://vm-project-dev/BathData.svc',
       'reportsWS': 'http://vm-project-dev/Open311ReportWS.svc',
       'planningWS': '',
       'mapDataWS': 'http://vm-project-dev/BathData.svc/'
   });