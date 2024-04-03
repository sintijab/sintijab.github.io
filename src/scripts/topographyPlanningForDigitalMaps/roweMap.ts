google.maps.event.addDomListener(window, 'scroll', init);

function init() {
var mapOptions = {
zoom: 13,
center: new google.maps.LatLng(54.456794, 12.561301), // New York
styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ee3424"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
]
};
var mapElement = document.getElementById('rowe-map-map');
var offTop = mapElement.offsetTop;
var map;
var scrollPos = window.scrollY;
if (scrollPos + 600 > offTop && mapElement.innerHTML.length === 0) {
  map = new google.maps.Map(mapElement, mapOptions);
}
}