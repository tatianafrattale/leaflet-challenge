// Creating initial map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });


// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Link for GeoJSON
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// The function that will determine the color of the marker based on the depth of the earthquake
function getColor(depth) {
    switch(true){
        case depth > 80:
          return "red";
        case depth > 60:
          return "orangered";
        case depth > 40:
          return "orange";
        case depth > 20:
          return "yellow";
        case depth > 10:
          return "green";
        default:
          return "lightgreen";
    }
}

// The function that will determine the size of the marker based on the magnitude of the earthquake

