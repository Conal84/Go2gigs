var map;
var bounds;
var loc;
// Initialize and add the map, centre it and add a marker at the default position of central europe
function initMap() {
    // The map, centered at central europe lat and long
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
}

// Adds markers to the map then sets to map zoom to fit the bounds of all markers
function addMarker(locations, map) {
    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i < locations.length; i++){
        var marker = new google.maps.Marker({
            position: locations[i],
            map: map
        });
        
        loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
        bounds.extend(loc);
    }
    // Fit all markers inside map zoom level and pan to center all markers
    map.fitBounds(bounds, {top:50}); // top padding of 50px
    map.panToBounds(bounds);
}

