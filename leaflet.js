//Leaflet Zeugs ___________________________________________________________________________________________________________

// initialize Leaflet
var map = L.map('map').setView({ lon: 7.63, lat: 51.96 },12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({ imperial: true, metric: true }).addTo(map);

// show a marker on the map
//My Point
/*
var greenIcon = L.icon({
  iconUrl: 'marker.png',
  iconSize: [40, 40], // size of the icon  
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location   
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([51.969508, 7.595737], { icon: greenIcon }).bindPopup('This is our startingpoint').addTo(map);
//Köln
L.marker({ lon: 7.634876, lat: 51.957004 }).bindPopup('Köln').addTo(map);
//Amsterdam
L.marker({ lon: 4.9041, lat: 52.3676 }).bindPopup('Amsterdam').addTo(map);
//Kassel
L.marker({ lon: 9.4797, lat: 51.3127 }).bindPopup('Kassel').addTo(map);
//Barcelona
L.marker({ lon: 2.1686, lat: 41.3874 }).bindPopup('Barcelona').addTo(map);
//Tunis
L.marker({ lon: 10.1815, lat: 36.8065 }).bindPopup('Tunis').addTo(map);
//Kyoto
L.marker({ lon: 135.7681, lat: 35.0116 }).bindPopup('Kyoto').addTo(map);
//Bucharest
L.marker({ lon: 26.1025, lat: 44.4268 }).bindPopup('Bucharest').addTo(map);
//Graz
L.marker({ lon: 15.4395, lat: 47.0707 }).bindPopup('Graz').addTo(map);
//Kairo
L.marker({ lon: 31.2357, lat: 30.0444 }).bindPopup('Kairo').addTo(map);
//Dublin
L.marker({ lon: 6.2603, lat: 53.3498 }).bindPopup('Dublin').addTo(map);
//Oslo
L.marker({ lon: 10.7522, lat: 59.9139 }).bindPopup('Oslo').addTo(map);
*/


