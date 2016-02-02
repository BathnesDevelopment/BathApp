Residents App
===========

An ionic app for Bath and North East Somerset Area.

To build, install cordova, then run:

- $ ionic resources
- $ cordova platform add ios
- $ cordova plugin add cordova-plugin-device
- $ cordova plugin add cordova-plugin-geolocation
- $ cordova plugin add cordova-plugin-camera
- $ cordova plugin add cordova-plugin-inappbrowser
- $ cordova plugin add cordova-plugin-statusbar
- $ cordova plugin add cordova-plugin-whitelist
- $ cordova plugin add cordova-plugin-file
- $ cordova plugin add cordova-plugin-network-information
- $ cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
- $ cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git
- $ ionic browser add crosswalk
- $ cordova prepare
- $ cordova build ios --release

Substitute ios for android above for Android

## Android build tasks
The build will create two APKs.  Run the commands:

- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore residentsapp.keystore C:\Development\BathApp\platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk residentsapp
- zipalign -v 4 C:\Development\BathApp\platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk C:\Development\BathApp\platforms\android\build\outputs\apk\MyPlaceARM.apk
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore residentsapp.keystore C:\Development\BathApp\platforms\android\build\outputs\apk\android-x86-release-unsigned.apk residentsapp
- zipalign -v 4 C:\Development\BathApp\platforms\android\build\outputs\apk\android-x86-release-unsigned.apk C:\Development\BathApp\platforms\android\build\outputs\apk\MyPlacex86.apk

## Supporting technologies

The following plugins/technologies are used:

- Ionic Framework
- Cordova
- NVD3
- NVD3 Angular
- Leaflet
- Leaflet angular
- Font Awesome