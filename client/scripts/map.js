window.onload = function () {
    setupMap();
    markerLayer();
};
var latlng;
var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        properties: {
            title: 'X Canadian Dollars = 1 US Dollar',
            'marker-color': '#f86767',
            'marker-size': 'large',
            'marker-symbol': 'c'
        },
        geometry: {
            type: 'Point',
            coordinates: [-77.03201, 38.90065]
        }
    },
        {
            "type": "Feature",
            "properties": {
                title: "Chile",
                'marker-symbol': 'c'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -72.0703125,
                    -36.597889133070204
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                title: 'Euro',
                'marker-color': '#a3e46b',
                'marker-size': 'large',
                'marker-symbol': 'e'
            },
            geometry: {
                type: 'Point',
                coordinates: [9.49, 49.152969]
            }
        }
    ]
};


//
//var markerModule = angular.module('markerModule', []);
//myModule.factory('markerSvc', function() {
//    var shinyNewServiceInstance;
//    // factory function body that constructs shinyNewServiceInstance
//    return shinyNewServiceInstance;
//});
//
//myApp.controller('MapController', ['$scope', '$http', function ($scope, $http) {
//    $scope.addMarker = function () {
//
//        $http.get('https://restcountries.eu/rest/v1/currency/eur').
//            success(function (data) {
//                latlng = data[0].latlng;
//                var newFeature = {
//                    "type": "Feature",
//                    "properties": {
//                        title: from + to + " = " + lastRate,
//                        'marker-symbol': 'a'
//                    },
//                    "geometry": {
//                        "type": "Point",
//                        "coordinates": latlng
//                    }
//                };
//                geojson.features.push(newFeature);
//                markerLayer();
//                console.log(geojson);
//            });
//    };
//    $scope.addMarker();
//}]);

function setupMap() {
    // Initialize Map
    L.mapbox.accessToken = 'pk.eyJ1IjoibWxpcSIsImEiOiJUWnMzTG13In0.o1lqB-cy9XNlBrbJ3D_ATg';
    window.map = L.mapbox.map('map', 'mliq.c23716af', {maxZoom: 2, minZoom: 2, zoomControl: false});
    map.setView([32.25, 18.984], 2);
}

function markerLayer() {
    // Add geoJSON layer
    var myLayer = L.mapbox.featureLayer().addTo(map);

    myLayer.setGeoJSON(geojson);
    myLayer.on('mouseover', function (e) {
        e.layer.openPopup();
    });
    myLayer.on('mouseout', function (e) {
        e.layer.closePopup();
    });
}
