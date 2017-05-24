L.mapbox.accessToken = 'pk.eyJ1IjoiaXZrb3ZpY3YiLCJhIjoiY2oydDlnM2VhMDAyZjMybWo0enhoOHdkbyJ9.6jO65uQA1UZZ-IZ0vKGifQ';
 // access token for online mapbox js library
if(localStorage.markers === undefined){
    markers = []; //ako je localStorage undefined pravi novo polje.
} // else stavi makere iz lokala u array "markers"
else markers = JSON.parse(localStorage.getItem("markers"));

var rijeka = [45.328343, 14.446383];//Lat Lng
var zagreb = [45.815399, 15.966568];//pozicije na mapi

var map = L.mapbox.map('map', 'mapbox.dark', {
  tileLayer: {
    continuousWorld: false,
  }// This map option disables world wrapping. by default, it is false.
}).setView(rijeka, 15)
.addControl(L.mapbox.geocoderControl('mapbox.places'));//dodajae serach na mapu
//.addControl(L.mapbox.shareControl()); // dodaje share na fejs i tviter ali kada je upaljena onda ne radi place marker

function loadLocalStorage(){
  for (var i = 0; i<markers.length;i++){
    var loadMarker = L.marker(markers[i].position,{
        icon: L.mapbox.marker.icon({    // funkcija koja postavlja ucitane markere
            'marker-size': 'large',
            'marker-symbol': markers[i].icon,
            'marker-color': markers[i].color
          }),
          title: markers[i].title
        }
      ).addTo(map);
  }
}
          // LATLNG varijabla je lokalna jer kada je u onClick funkciji cuva svaki klik
var latlng;  // i onda ako tri puta stisnemo cancel a cetvrti put save stavice nam markere na sve klikove
map.on("click",function(e){
    latlng = e.latlng;
    callModal(); // calling bootsrap modal on click.
});

function colorSwitch(clicked_id){
  var color = '#222b30'; //default
  if (clicked_id == "white"){
    color = '#fff';
  }
  else if(clicked_id == "red"){
    color = '#e55e5e';
  }
  else if(clicked_id == "blue"){
    color = '#3bb2d0';
  }
  else if(clicked_id == "yellow"){
    color = '#f1f075';
  }
  else if(clicked_id == "purple"){
    color = '#c091e6';
  }
  else if(clicked_id == "orange"){
    color = '#fa946e';
  }
  else if(clicked_id == "green"){
    color = '#56b881';
  }
  else if(clicked_id == pink){
    color = '#ed6498';
  }
  return color;
} // nedovrseno // nedovrseno

function callModal(){
  $("#myModal").modal();  // function opens bootsrap modal.
}
$("#buttonSave").click(function(){
  var description = $("#description").val();
  var title = $("#title").val();
  var color = '#e55e5e'; // default crvena
  //var privat = document.getElementById('privat').checked; //returns true or false
  var privat = $("#privat:checked").val();
  if ( privat == "on" ){
      privatemode = true;// ako je true stavlja se crna kao private boja..
    }
  else if ( privat == undefined ){
      privatemode = false;
    }

    color = setNewColor(color,num);
    var data = {
    position: latlng,
    title: title,
    description: description,
    color: color,
    private: privatemode
    //icon: ikona
  };
    placeMarker(latlng,title,description,color);
    markers.push(data);
  });
function setNewColor(clr,value){
    if(value == 1){
      clr = "#e55e5e";
    }else if(value == 2){
        clr = "#3bb2d0";
    }else if(value == 3){
        clr = "#ed6498";
    }else if(value == 4){
        clr = "#c091e6";
    }else if(value == 5){
        clr = "#56b881";
    }else if(value == 6){
        clr = "#fff";
    }else if(value == 7){
        clr = "#fa946e";
    }else if(value == 8){
        clr = "#f1f075";
    }else if(value == 9){
      clr = "#222b30";
    }
    return clr;
  }

  var num = null;
  var colors = document.querySelectorAll(".btn-group > button.btn");
  for(var i=0; i<colors.length; i++){
      colors[i].addEventListener("click", function(){
          num = this.value;
          //          alert("Value is " + num);
      });
  }

function placeMarker(latlng,title,description,color){
  var point = L.marker(latlng,{
        icon: L.mapbox.marker.icon({
            'marker-size': 'large',
            'marker-symbol': 'beer',
            'marker-color': color
          })
      }).bindPopup(title).addTo(map);
    map.setView(latlng);
    point.on('click',function(){
        map.setView(latlng);
        });
    point.on('click',function(){
        callModal();
          //var header = document.getElementById("naslov");
          //header.innerHTML = title;
        $("#naslov").html(title);
        $("#title").val(title);
        $("#description").val(description);
          });
}

var data = [{
    lon: 14.44543,
    lat: 45.32575,
    name: 'Rome',
    size: 'large',
    color: '#c091e6'
}, {
    lon: 14.44822,
    lat: 45.32445,
    size: 'small',
    name: 'Istanbul',
    color: '#fa946e'
}];   //  Data for editable markers .. just trying
var dataLayer = L.mapbox.featureLayer().addTo(map);
$("#table").handsontable({
  data: data,
  startRows: 7,
  startCols: 4,
  colHeaders: ['Lon', 'Lat', 'Name', 'Size', 'Color'],
  columnSorting: true,
  columns: [
    {
      data: 'lon',
      type: 'numeric'
    },
    {
      data: 'lat',
      type: 'numeric'
    },
    {
      data: 'name'
    },
    {
      data: 'size',
      editor: 'select',
      selectOptions: ['small', 'medium', 'large']
    },
    {
      data: 'color'
    }
  ],
  minSpareRows: 1,
  // Everytime the table is changed, update the markers on the map.
  afterChange: dataToMarkers
});


function dataToMarkers() {
  // Create a new geojson object that'll represent the table values.
  var geojson = { type: 'FeatureCollection', features: [] };
  // For each table row, create a marker.
  for (var i = 0; i < data.length; i++) {
    // Blank rows shouldn't be included - they're easy to detect and skip.
    if (data[i].lon === null || data[i].lat === null) continue;
    geojson.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [ data[i].lon, data[i].lat]
      },
      properties: {
        'marker-size': data[i].size,
        'marker-color': data[i].color,
        'title': data[i].name
      }
    });
  }
  dataLayer.setGeoJSON(geojson);
}
function saveMarkers(){
    localStorage.setItem("markers", JSON.stringify(markers));//sprema array u lokalStorage
}
function deleteMarkers(){
    localStorage.removeItem("markers");
}

var mousemove = document.getElementById('mousemove'); // mousemovement value
map.on('mousemove',function(e){
  window[e.type].innerHTML = e.latlng.toString();
});
