angular.module('MyBath.MapDataService', [])
/**
 * Factory: Map Data
 * 
*/
.factory('MapData', function ($http, $q) {
    var layerList = {
        libraries: 'https://isharemaps.bathnes.gov.uk/MapGetImage.aspx?Type=json&MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&ActiveLayer=Libraries&mapid=-1&axuid=1412112591177&SearchType=findMyNearest&Distance=16094&MaxResults=50&Easting=375123.8049001&Northing=164590.70835023&_=1412112591178',
        primarySchools: 'https://isharemaps.bathnes.gov.uk/MapGetImage.aspx?Type=json&MapSource=BathNES/banes&RequestType=GeoJSON&ServiceAction=ShowMyClosest&ActiveTool=MultiInfo&ActiveLayer=PrimarySchools&mapid=-1&axuid=1412504809601&SearchType=findMyNearest&Distance=16094&MaxResults=10&Easting=365765&Northing=162104.5&_=1412504809602'
    };

    var icons = {
        libraryIcon: {
            type: 'div',
            iconSize: [30, 30],
            popupAnchor: [0, 0],
            html: '<i class="icon calm ion-android-book"></i>'
        }
    }

    return {
        layerList: function () {
            return layerList;
        },
        getLayer: function (layer) {
            var url = layerList[layer];

            var layerData = [];
            var layerData_q = $q.defer();

            $http.get(url)
				.success(function (data, status, headers, config) {
				    if (data && data != []) {
				        for (i = 0; i < data[0].features.length ; i++) {
				            var northing = data[0].features[i].geometry.coordinates[0][0];
				            var easting = data[0].features[i].geometry.coordinates[0][1];
				            var titleAndUrl = data[0].features[i].properties.fields._;
				            var title = data[0].features[i].properties.fields._;
				            if (titleAndUrl.indexOf('|') != -1) {
				                title = titleAndUrl.split('|')[1];
				            }
				            var latlng = NEtoLL(northing, easting);
				            layerData.push({ lat: latlng.latitude, lng: latlng.longitude, icon: icons.libraryIcon, layer: data[0].properties.layerName, message: title });
				        }
				    }
				    else {
				        layerData = "Failed";
				    }
				    layerData_q.resolve(layerData);
				    return layerData;
				})
				.error(function (data, status, headers, config) {
				    layerData = "Failed";
				    layerData_q.resolve(layerData);
				    return "Failed";
				});
            return layerData_q.promise;
        }
    }
});