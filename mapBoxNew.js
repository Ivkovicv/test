L.mapbox.accessToken = 'pk.eyJ1IjoiaXZrb3ZpY3YiLCJhIjoiY2oydDlnM2VhMDAyZjMybWo0enhoOHdkbyJ9.6jO65uQA1UZZ-IZ0vKGifQ';
var rijeka = [ 14.446383,45.328343];
var zagreb = {lat: 45.815399,lng: 15.966568};



var map = L.mapbox.map('map', 'mapbox.streets').setView([0,0], 1);

map.on("click",function(){
  var marker = L.marker([0, 0], {
        icon: L.mapbox.marker.icon({'marker-color': '#f86767'})
  }).addTo(map);
});
/*map.on('mousemove', function (e) {

new mapboxgl.Marker()
	.setLngLat(JSON.stringify(e.lngLat))
	.addTo(map);
});

/*
var geojson = { type: 'LineString', coordinates: [] };
var start = [10, 20];
var momentum = [3, 3];

for (var i = 0; i < 300; i++) {
    start[0] += momentum[0];
    start[1] += momentum[1];
    if (start[1] > 60 || start[1] < -60) momentum[1] *= -1;
    if (start[0] > 170 || start[0] < -170) momentum[0] *= -1;
    geojson.coordinates.push(start.slice());
}

// Add this generated geojson object to the map.
L.geoJson(geojson).addTo(map);

// Create a counter with a value of 0.
var j = 0;

// Create a marker and add it to the map.
var marker = L.marker([0, 0], {
  icon: L.mapbox.marker.icon({
    'marker-color': '#f86767'
  })
}).addTo(map);

tick();
function tick() {
    // Set the marker to be at the same point as one
    // of the segments or the line.
    marker.setLatLng(L.latLng(
        geojson.coordinates[j][1],
        geojson.coordinates[j][0]));

    // Move to the next point of the line
    // until `j` reaches the length of the array.
    if (++j < geojson.coordinates.length) setTimeout(tick, 100);
}
*/
