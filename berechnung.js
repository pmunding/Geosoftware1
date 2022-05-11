////////////////////////////////////////////
//Berechnung der Entfernungen 
//////////////////////////////////////

//Point in lon und lat aufteilen um später damit einfacher arbeiten zukönnen

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}

var lon1;
    var lat1;
function standort(position){
    lon1 = position.coords.longitude
    lat1 = position.coords.latitude
}

//51.95773833435261, 7.6357764639377175

var distanzen = [];
var neueOrte = [];


//Orte von Poi

orte.features.forEach(element => {
    neueOrte.push(element.geometry.coordinates)
});
/*
neueOrte.forEach(item => {
    distanzen.push(distanzRechner(lon1, lat1, item[0], item[1]));
});
*/

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
var Bushaltestellen = []; //Bushaltestellen Objekte

function auswerten() {
    var inGeoJs = JSON.parse(texteingabe.value)
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

    var inhalt = document.getElementsByTagName('td')[3].innerHTML = neuedistanzen[1];

    var inhalt = document.getElementsByTagName('td')[5].innerHTML = neuedistanzen[2];

    var inhalt = document.getElementsByTagName('td')[7].innerHTML = neuedistanzen[3];

    var inhalt = document.getElementsByTagName('td')[9].innerHTML = neuedistanzen[4];


    var inhalt = document.getElementsByTagName('td')[11].innerHTML = neuedistanzen[5];

    var inhalt = document.getElementsByTagName('td')[13].innerHTML = neuedistanzen[6];

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


//Bushaltestellen 

//AbfahrtsstationenNummer 


//Datensatz einladen 
var geodaten = []   //Koordinaten der Bushaltestellen
var nameBushalte = []   //Name der Bushaltestellen
var nachste = []    //Entfernung der Bushaltestellen

//GeoJson Haltestellen einladen
var geo;
var x = new XMLHttpRequest()
x.open("GET", "https://rest.busradar.conterra.de/prod/haltestellen", true)
x.send();
x.onreadystatechange = function () {
    if (x.status == "200" && x.readyState == 4) {

        geo = JSON.parse(x.responseText)
        console.log(geo)
        custom(geo)
    }
}

//Klasse für die Haltestellen 
class Haltestellen {
    /**
     * 
     * @param {int} entfernung - Die Entfernung meines Standorts zu den Haltestellen
     * @param {String} name - Name der Bushaltestelle
     * @param {Array} stationenNummer - gibt die AbfahrtsstationenNummer des Busses 
     */
    constructor(entfernung, name, stationenNummer) {
        this.entfernung = entfernung;
        this.name = name;
        this.stationenNummer = stationenNummer;
    }

    abstand(lat1, lon1) {
        neueOrte.forEach(item => {
            distanzen.push(distanzRechner(lon1, lat1, item[0], item[1]));
        })
        console.log(distanzen)
        return distanzen;
    }
}


function custom(geo) {


    //Koordinaten der Bushaltestellen 
    geo.features.forEach(element => {
        geodaten.push(element.geometry.coordinates)
    });
    console.log(geodaten)

    //Namen für jede Bushaltestelle
    geo.features.forEach(item => {
        nameBushalte.push(item.properties.lbez)
    })
    console.log(nameBushalte)

    //Entfernung der Bushaltestellen zu meinem Punkt 
    geodaten.forEach(item => {
        nachste.push(distanzRechner(lon1, lat1, item[0], item[1]))
    })
    console.log(nachste)

    //Typ
    var station = [];
    geo.features.forEach(element => {
        station.push(element.properties.nr)
    })
    console.log(station)

    //Objekte der Klasse Bushaltestelle erzeugen

    var bus //Bus Objekt
    var k = 0;
    var i = 0;
    var j = 0;
    while (station.length != k) {
        while (nachste.length != i) {
            while (nameBushalte.length != j) {
                bus = new Haltestellen(
                    nachste[i],
                    nameBushalte[j],
                    station[k]
                )
                i++;
                j++;
                k++
                Bushaltestellen.push(bus)
            }
        }
    }
    //Sortieren Des Arrays
    Bushaltestellen.sort(function (a, b) {
        return a.entfernung > b.entfernung;
    });
    console.log(Bushaltestellen)



    // Leaflet Marker setzen 

    var punkt = L.icon({
        iconUrl: 'punkt.png',
        iconSize: [10, 10], // size of the icon  
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location   
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    geodaten.forEach(element => {
        L.marker({ lon: element[0], lat: element[1] }, { icon: punkt }).bindPopup('Haltestelle').addTo(map);
    });

    //Nächste Bushaltestelle
    console.log(Bushaltestellen[0].stationenNummer)

    /*
    geo.features.forEach(element => {
        if (Bushaltestellen[0].stationenNummer == element.properties.nr) {
            L.marker({ lon: element.geometry[0], lat: element.geometry[1] }).bindPopup('Das ist die Nächste').addTo(map);
            console.log("Hallo")
        }
    })

    */

    var abfahrt;
    var y = new XMLHttpRequest()
    y.onreadystatechange = function () {
        if (y.status == "200" && y.readyState == 4) {

            console.log(y.responseText)
            abfahrt = JSON.parse(y.responseText)
            document.getElementById("Datenbereich").innerHTML=unixINTOdate(abfahrt[0].abfahrtszeit)
            console.log(abfahrt)
        }
    }
    //AbfahrtsstationenNummer einladen 


    y.open("GET", "https://rest.busradar.conterra.de/prod/haltestellen/" + Bushaltestellen[0].stationenNummer + "/abfahrten?sekunden=3000", true)
    y.send();


}


    function unixINTOdate(unix) {
        let unix_timestamp = unix
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }








