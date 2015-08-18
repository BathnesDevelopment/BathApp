Residents App
===========

An ionic app for Bath and North East Somerset Area.

To build, install cordova, then run:

- $ cordova platform add ios
- $ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git
- $ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-camera.git
- $ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
- $ cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
- $ cordova plugin add cordova-plugin-statusbar
- $ cordova plugin add de.appplant.cordova.plugin.email-composer && cordova prepare
- $ cordova build ios
- $ cordova emulate ios

Substitute ios for android above to test on Android.

## Supporting technologies

The following plugins/technologies are used:

- Ionic Framework
- Cordova
- Highcharts
- Highcharts Angular
- Highcharts standalone adapter
- Leaflet
- Leaflet angular
- Proj4JS
- Font Awesome