angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://isharemapstest.bathnes.gov.uk/ResidentsApp/BathData.svc',
       'reportsWS': 'http://isharemapstest.bathnes.gov.uk/ResidentsApp/Open311ReportWS.svc',
       'planningWS': '',
       'mapDataWS': 'http://isharemapstest.bathnes.gov.uk/ResidentsApp/BathData.svc'
   });