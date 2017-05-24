var geoJson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [rijeka]
    },
    properties: {
      title: 'Marker One',
      'marker-color': '#bbb'
    }
  },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [rijeka]
      },
      properties: {
        title: 'Marker Two',
        'marker-color': '#bbb'
      }
    }]
};

var myLayer = L.mapbox.featureLayer().addTo(map);

myLayer.setGeoJSON(geoJson);

function resetColors() {
    for (var i = 0; i < geoJson.length; i++) {
        geoJson[i].properties['marker-color'] = geoJson[i].properties['old-color'] ||
            geoJson[i].properties['marker-color'];
    }
    myLayer.setGeoJSON(geoJson);
}

myLayer.on('click', function(e) {
    resetColors();
    e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
    e.layer.feature.properties['marker-color'] = '#ff8888';
    myLayer.setGeoJSON(geoJson);
});
map.on('click', resetColors);
