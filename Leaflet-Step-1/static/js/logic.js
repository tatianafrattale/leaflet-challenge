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
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
// The function that will determine the color of the marker based on the depth of the earthquake
function getColor(depth) {
    switch(true){
        case depth > 90:
          return "red";
        case depth > 70:
          return "orangered";
        case depth > 50:
          return "orange";
        case depth > 30:
          return "yellow";
        case depth > 10:
          return "green";
        default:
          return "lightgreen";
    }
}

// The function that will determine the size of the marker based on the magnitude of the earthquake
function getRadius(magnitude) {
    // If the magnitude is 0, we need the Radius size to be one so that the marker will still show up
    if (magnitude == 0) {
        var mag = 1;
        return mag;
    }
    var mag = magnitude * 4;
    return mag;
}

// Get GeoJSON data
d3.json(link).then(function(data) {
    // GeoJSON layer
    L.geoJson(data, {
        // Add markers
        pointToLayer: function(feauture, coordinates) {
            return L.circleMarker(coordinates);
        },
        // Style markers
        style: function(feature) {
            return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
            };
        },
        // Pop up with earthquake info
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Location: " + feature.properties.place + "<br>Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2]);
        }

}).addTo(myMap);
})