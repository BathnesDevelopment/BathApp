angular.module('BathApp.config', [])
   .constant('config', {
       'bathDataWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc',
       'reportsWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/Open311ReportWS.svc',
       'planningWS': '',
       'mapDataWS': 'http://isharemapstest.bathnes.gov.uk/residentsapp/BathData.svc'
   });