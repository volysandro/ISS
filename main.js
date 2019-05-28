let issData





fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(JSON.stringify(myJson));
    console.log(myJson)
    initMap(myJson.longitude, myJson.latitude)

  });


var satelliteIcon = L.icon({
  iconUrl: 'satellite.png',

  iconSize: [38, 38], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function initMap(long, lat) {

  mapboxgl.accessToken = 'pk.eyJ1Ijoidm9sZXJ5IiwiYSI6ImNqdzdqMXF4MjFjcTMzem1yemJ0eWtmN3cifQ.r1QFRyOcyaIXjiYSTS22eQ';

  var mymap = L.map('mapid').setView([lat, long], 2);

  if(sessionStorage.getItem('layer')){
    layer = 'mapbox.' + sessionStorage.getItem('layer')

    document.getElementById(sessionStorage.getItem('layer')).checked = true



  }else{
    layer = 'mapbox.streets'
  }


  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: layer,
    accessToken: 'pk.eyJ1Ijoidm9sZXJ5IiwiYSI6ImNqdzdqMXF4MjFjcTMzem1yemJ0eWtmN3cifQ.r1QFRyOcyaIXjiYSTS22eQ'
  }).addTo(mymap);

      


  var marker = L.marker([lat, long], {
    icon: satelliteIcon
  }).addTo(mymap);
  marker.bindPopup("<b>Current ISS Position</b><br>").openPopup();



  timeout()

  function timeout() {

    update(mymap, marker);
    setTimeout(timeout, 1000);

  }
}




function update(map, pin) {



  fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(JSON.stringify(myJson));
      console.log(myJson)

      console.log(map)






      console.log(pin)

      pin._latlng.lat = myJson.latitude
      pin._latlng.lng = myJson.longitude

      map.removeLayer(pin)
      pin.addTo(map)
    });


  // do whatever you like here






}




var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
var layerId = layer.target.id;

  sessionStorage.setItem('layer', layerId)
  window.location.reload()

}
 
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer;
}