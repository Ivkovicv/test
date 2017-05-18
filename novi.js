mapboxgl.accessToken = 'pk.eyJ1IjoiaXZrb3ZpY3YiLCJhIjoiY2oydDlnM2VhMDAyZjMybWo0enhoOHdkbyJ9.6jO65uQA1UZZ-IZ0vKGifQ';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
});
map.on('click', function(){
  var marker = new mapbox.Marker()
})
map.on('mousemove', function (e) {

new mapboxgl.Marker(el)
	.setLngLat(JSON.stringify(e.lngLat))
	.addTo(map);
});
