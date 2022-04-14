//Berechnung der Entfernungen 

//Point in lon und lat aufteilen um später damit einfacher arbeiten zukönnen
var lon1 = point[0]
var lat1 = point[1]
console.log(lon1)
console.log(lat1)

var distanzen = [];
//Hier wird ein Array erstellt in den für jedes Ergebnis ein neuer Eintrag erzeugt wird.
cities.forEach(item => {
    distanzen.push(distanzRechner(lon1, lat1, item[0], item[1]));
})


//Funktion zur Distanzberechnung www.movable-type.co.uk/scripts/latlong.html
function distanzRechner(lon1, lat1, lon2, lat2){

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c/1000; // in km

    return d;

}

//Sortieren Des Arrays 
distanzen.sort()
//Ausgabe zur Überprüfung 
console.log(distanzen)