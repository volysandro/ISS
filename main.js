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

function initMap(long, lat) {

  var mymap = L.map('mapid').setView([lat, long], 2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoidm9sZXJ5IiwiYSI6ImNqdzdqMXF4MjFjcTMzem1yemJ0eWtmN3cifQ.r1QFRyOcyaIXjiYSTS22eQ'
  }).addTo(mymap);

  var marker = L.marker([lat, long]).addTo(mymap);
  marker.bindPopup("<b>Current ISS Position</b><br>").openPopup();
}