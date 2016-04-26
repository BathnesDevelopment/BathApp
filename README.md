# Bath and North East Somerset Council Residents App (MYPlace)

This project is an ionic framework app for residents of the Bath and North East Somerset Area.   

## What is it?

In March 2014 there was a hack day run by the community Bath: Hacked group.  One idea to come out of that was an app 'My Bath', which collected lots of local info provided for B&NES addresses, using the iShare system ([http://isharemaps.bathnes.gov.uk](http://isharemaps.bathnes.gov.uk)).

This was demoed internally at The Council and eventually started as a project, with internal beta version launching in March 2016. It is designed to have regular updates and provide the following functionality:

- The ability to register the device with your address
- Live maps showing points of interest to use while out and about
- Reporting functionality using [Open 311](http://wiki.open311.org/GeoReport_v2/) GeoReport web services

## Technologies used

The following plugins/technologies are used.

| Name | Description |
| ---- | ----------- |
| Ionic Framework |  |
| Cordova |  |
| NVD3 |  |
| NVD3 Angular |  |
| Leaflet |  |
| Leaflet angular |  |
| Font Awesome |  |

## Build

To build, install cordova (see these [install instructions](http://ionicframework.com/docs/guide/installation.html) for a full list of dependencies), then run:

```
$ ionic resources
$ cordova platform add ios
$ cordova plugin add cordova-plugin-device
$ cordova plugin add cordova-plugin-geolocation
$ cordova plugin add cordova-plugin-camera
$ cordova plugin add cordova-plugin-inappbrowser
$ cordova plugin add cordova-plugin-statusbar
$ cordova plugin add cordova-plugin-whitelist
$ cordova plugin add cordova-plugin-file
$ cordova plugin add cordova-plugin-network-information
$ cordova plugin add cordova-plugin-splashscreen
$ cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
$ cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git
$ ionic browser add crosswalk
$ cordova prepare
$ cordova build ios --release
```

Substitute ios for android above for Android

### Extra iOS build tasks

The Apple build should be built on an Apple OS (we are implememting a continuous integration environment with OSX Server).



### Extra android build tasks

Android can be built on any environment that has the required prerequisites (Android SDK libraries, Java).  The build will create two APKs.  Run the commands (replace the paths with the relevant ones):

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore residentsapp.keystore C:\Development\BathApp\platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk residentsapp
zipalign -v 4 C:\Development\BathApp\platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk C:\Development\BathApp\platforms\android\build\outputs\apk\MyPlaceARM.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore residentsapp.keystore C:\Development\BathApp\platforms\android\build\outputs\apk\android-x86-release-unsigned.apk residentsapp
zipalign -v 4 C:\Development\BathApp\platforms\android\build\outputs\apk\android-x86-release-unsigned.apk C:\Development\BathApp\platforms\android\build\outputs\apk\MyPlacex86.apk
```

## Deployment

### Android deployment

Bath and North East Somerset Council have an account with Google for Android app development.

### iOS deployment

Bath and North East Somerset Council have an organisational development account for iOS apps.

## Usage

| Function | Instructions |
| -------- | ------------ |
|  |  |
|  |  |


## Third party licensing

This project relies on a number of open source products.





## Licence

Original code licensed with [MIT Licence](Licence.txt).