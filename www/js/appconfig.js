angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://vm-project-dev/BathData.svc',
       'reportWS': 'http://vm-project-dev/Open311ReportWS.svc',
       'planningWS': '',
       'mapDataWS': 'http://vm-project-dev/BathData.svc/'
   });