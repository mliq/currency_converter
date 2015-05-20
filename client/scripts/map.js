window.onload = function () {
    setupMap();
};
function setupMap() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibWxpcSIsImEiOiJUWnMzTG13In0.o1lqB-cy9XNlBrbJ3D_ATg';
    window.map = L.mapbox.map('map', 'mliq.c23716af', {maxZoom: 2, minZoom: 2, zoomControl: false});
    map.setView([32.25, 18.984], 2);

    var myLayer = L.mapbox.featureLayer().addTo(map);

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
                type: 'Feature',
                properties: {
                    title: 'Euro',
                    'marker-color': '#a3e46b',
                    'marker-size': 'large',
                    'marker-symbol': 'e'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [9.49,49.152969]
                }
            }]
    };

    myLayer.setGeoJSON(geojson);
    myLayer.on('mouseover', function (e) {
        e.layer.openPopup();
    });
    myLayer.on('mouseout', function (e) {
        e.layer.closePopup();
    });
}