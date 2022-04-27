////////////////////////////////////////////
//Berechnung der Entfernungen 
//////////////////////////////////////

//Point in lon und lat aufteilen um später damit einfacher arbeiten zukönnen
var lon1 = point[0]
var lat1 = point[1]

var distanzen = [];
var neueOrte = [];


    orte.features.forEach(element => {
        neueOrte.push(element.geometry.coordinates)
    });

    neueOrte.forEach(item => {
        distanzen.push(distanzRechner(lon1, lat1, item[0], item[1]));
    });


//Funktion zur Distanzberechnung www.movable-type.co.uk/scripts/latlong.html
function distanzRechner(lon1, lat1, lon2, lat2) {

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c / 1000; // in km

    return d;

}


//Sortieren Des Arrays 
distanzen.sort()
//Ausgabe zur Überprüfung 
console.log(distanzen)

//Standorte aus poi anzeigen 
neueOrte.forEach(element => {
    L.marker({ lon: element[0], lat: element[1] }).bindPopup('alles').addTo(map);
});


//Automatische Abfrage des Browsers (Standort)
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    //L.marker({ lon: position.coords.longitude, lat: position.coords.latitude }).bindPopup('posi').addTo(map);
    var greenIcon = L.icon({
        iconUrl: 'marker.png',
        iconSize: [100, 100], // size of the icon  
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location   
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker({ lon: position.coords.longitude, lat: position.coords.latitude }, { icon: greenIcon }).bindPopup('Aktuelle Position').addTo(map);
}


//Texteingabefeld 
let texteingabe = document.getElementById("justtext")
var leange = []
var neuedistanzen = []

function auswerten() {
    var inGeoJs = JSON.parse(texteingabe.value)
    console.log(inGeoJs)
    //Coordnianten auslesen
    leange = inGeoJs.geometry.coordinates;
    //Entfernungen erneut mit neuem Stanort berechnen
    //array für die neuen Distanzen
    orte.features.forEach(element => {
        neueOrte.push(element.geometry.coordinates)
    });

    neueOrte.forEach(item => {
        neuedistanzen.push(distanzRechner(leange[0], leange[1], item[0], item[1]));
    });

    console.log(neuedistanzen)
    console.log(neuedistanzen[12])
    
    //ergebnisse in die Tabelle neu eintragen
    var inhalt = document.getElementsByTagName('td')[1].innerHTML = neuedistanzen[0];
    console.log(neuedistanzen)
    var inhalt = document.getElementsByTagName('td')[3].innerHTML = neuedistanzen[1];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[5].innerHTML = neuedistanzen[2];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[7].innerHTML = neuedistanzen[3];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[9].innerHTML = neuedistanzen[4];
    console.log(inhalt);
    
    var inhalt = document.getElementsByTagName('td')[11].innerHTML = neuedistanzen[5];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[13].innerHTML = neuedistanzen[6];
    console.log(inhalt);
    /*
    var inhalt = document.getElementsByTagName('td')[15].innerHTML = neuedistanzenn[7];
    console.log(inhalt);
    
    var inhalt = document.getElementsByTagName('td')[17].innerHTML = neuedistanzen[8];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[19].innerHTML = neuedistanzen[9];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[21].innerHTML = neuedistanzen[10];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[23].innerHTML = distanzen[11];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[25].innerHTML = distanzen[12];
    console.log(inhalt);
    var inhalt = document.getElementsByTagName('td')[27].innerHTML = distanzen[13];
    */
    

    //Standort anzeigen 
    var greenIcon = L.icon({
        iconUrl: 'ritter.png',
        iconSize: [50, 50], // size of the icon  
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location   
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker({ lon: leange[0], lat: leange[1] }, { icon: greenIcon }).bindPopup('GeoJSON Point').addTo(map);
}
