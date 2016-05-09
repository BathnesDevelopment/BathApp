# Bath and North East Somerset Council Residents App (MYPlace)

This project is an Ionic Framework cross platform app for residents of the Bath and North East Somerset Area.   

## What is it?

In March 2014 there was a hack day run by the community Bath: Hacked group.  One idea to come out of that was an app 'My Bath', which collected lots of local info for a B&NES addresses, primarily using ([the iShare system](http://isharemaps.bathnes.gov.uk)).

This was demoed internally at The Council and eventually started as a project, with internal beta version launching in March 2016. It is designed to have regular updates, and initially provide the following functionality:

- The ability to register the device with your address.
- MyHouse details such as bin collection dates, listed building status.
- MyCouncil details such as councillor contact details, nearest Council offices.
- MyNearest details such as nearest library, GP, allotment.
- Live maps showing points of interest to use while out and about.
- Reporting functionality using [Open 311](http://wiki.open311.org/GeoReport_v2/) GeoReport web services

## Technologies used

The following key plugins/technologies are used - more specific details in third party licensing section.

| Name | Description |
| ---- | ----------- |
| Ionic Framework | Ionic Framework is an open source mobile SDK for building web apps. |
| Apache Cordova | Open source platform for building mobile apps with HTML, JavaScript and CSS.  |
| NVD3 | Re-usable charts and chart components. |
| Leaflet | JavaScript library for interactive maps. |
| Font Awesome | Font and CSS toolkit. |

## Build

To build, install cordova (see these [install instructions](http://ionicframework.com/docs/guide/installation.html) for a full list of dependencies), then run:

```
$ ionic resources
$ ionic setup sass
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

Substitute **ios** for **android** to build for Android

### Extra iOS build tasks

The Apple build should be built on an Apple OS (we are implementing a continuous integration environment with OSX Server).

This machine will be setup to automatically build once source code has changed.

### Extra android build tasks

Android can be built on any environment that has the required prerequisites (Android SDK libraries, Java).  The build will create two APKs.  Run the commands (replace the paths with the relevant ones):

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore residentsapp.keystore C:\Development\BathApp\platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk residentsapp
zipalign -v 4 C:\Development\BathApp\platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk C:\Development\BathApp\platforms\android\build\outputs\apk\MyPlaceARM.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore residentsapp.keystore C:\Development\BathApp\platforms\android\build\outputs\apk\android-x86-release-unsigned.apk residentsapp
zipalign -v 4 C:\Development\BathApp\platforms\android\build\outputs\apk\android-x86-release-unsigned.apk C:\Development\BathApp\platforms\android\build\outputs\apk\MyPlacex86.apk
```

(Above paths for reference only and will change depending on the build environment).

## Deployment

### Android deployment

Bath and North East Somerset Council have an account with Google for Android app development.  [Play Developer Console](https://play.google.com/apps/publish) is used to upload the APK files and manage availability of the app.

### iOS deployment

Bath and North East Somerset Council have an organisational development account for iOS apps.  The built app can be uploaded to the App Store using XCode.

## Third party licensing

This project relies on a number of open source products.

| Name | Description | Link | Licence |
| ---- | ----------- | ---- | ------- |
| Ionic Framework | Mobile SDK for building web apps. | [Ionic on GitHub](https://github.com/driftyco/ionic) | [MIT](https://github.com/driftyco/ionic/blob/master/LICENSE) |
| Angular | javaScript framework used by Ionic | [Angular on GitHub](https://github.com/angular/angular) | [MIT](https://github.com/angular/angular/blob/master/LICENSE) |
| Apache Cordova | Mobile apps with HTML, JavaScript and CSS. | [Cordova on Apache](https://cordova.apache.org/) | [Apache](http://www.apache.org/licenses/LICENSE-2.0) |
| D3 | Data driven charting | [D3 on GitHub.](https://github.com/mbostock/d3) | [BSD](https://github.com/mbostock/d3/blob/master/LICENSE) |
| NVD3 | Re-usable charts and chart components. | [NVD3 on GitHub](https://github.com/novus/nvd3) | [Apache](https://github.com/novus/nvd3/blob/master/LICENSE.md) |
| NVD3 Angular | Angular directive for NVD3 | [NVD3 Angular on GitHub](https://github.com/krispo/angular-nvd3) | [MIT](https://github.com/krispo/angular-nvd3/blob/master/LICENSE) |
| Leaflet | JavaScript library for interactive maps. | [Leaflet on GitHub](https://github.com/Leaflet/Leaflet) | [BSD](https://github.com/Leaflet/Leaflet/blob/master/LICENSE) |
| Leaflet Angular | Angular directive for leaflet. | [Leaflet Angular on GitHub](https://github.com/tombatossals/angular-leaflet-directive/) | [MIT](https://github.com/tombatossals/angular-leaflet-directive/blob/master/LICENSE) |
| Font Awesome | Font and CSS toolkit. | [Font Awesome on GitHub](https://github.com/FortAwesome/Font-Awesome) | [Fonts SIL OFL 1.1/Code MIT](https://fortawesome.github.io/Font-Awesome/license/) |
| Moment JS | javaScript library for managing dates. | [Moment on GitHub](https://github.com/moment/moment/) | [MIT](https://github.com/moment/moment/blob/develop/LICENSE) |

## Licence

Original code licensed with [MIT Licence](Licence.txt).