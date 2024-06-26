google.maps.event.addDomListener(window, 'scroll', init);

function init() {
var mapOptions = {
zoom: 13,
center: new google.maps.LatLng(54.456794, 12.561301), // New York
styles: [
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#0072B2"
          },
          {
              "saturation": 100
          },
          {
              "lightness": -54
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#E69F00"
          },
          {
              "saturation": 100
          },
          {
              "lightness": -49
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#D55E00"
          },
          {
              "saturation": 100
          },
          {
              "lightness": -46
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#CC79A7"
          },
          {
              "saturation": -55
          },
          {
              "lightness": -36
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#F0E442"
          },
          {
              "saturation": -15
          },
          {
              "lightness": -22
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#56B4E9"
          },
          {
              "saturation": -23
          },
          {
              "lightness": -2
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
          {
              "hue": "#000000"
          },
          {
              "saturation": 0
          },
          {
              "lightness": -100
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#009E73"
          },
          {
              "saturation": 100
          },
          {
              "lightness": -59
          },
          {
              "visibility": "on"
          }
      ]
  }
]
};
var mapElement = document.getElementById('colorblind-friendly-map');
var offTop = mapElement.offsetTop;
var map;
var scrollPos = window.scrollY;
if (scrollPos + 600 > offTop && mapElement.innerHTML.length === 0) {
  map = new google.maps.Map(mapElement, mapOptions);
}
}