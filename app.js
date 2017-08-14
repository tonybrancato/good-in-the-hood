function success(position) {
  //User's coordinates
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;
  //User's coordinates for google maps API
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  map.setCenter(pos);
  map.setZoom(12);
  //Zomato API call
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://developers.zomato.com/api/v2.1/geocode",
    "method": "GET",
    "headers": {
      "user-key": "0bbf883c661fe8edf59a8624e7f92f73",
    },
    data: {
      //use longitude and latitude gained from user's location
      lat: latitude,
      lon: longitude,
    },
    dataType: 'json'
  }

  $.ajax(settings).done(function (response) {
    let places = response.nearby_restaurants;
    //used for marker
    let infoWindow;
    //used for youAreHere
    let infoWindow2 = new google.maps.InfoWindow ({
      content: 'You Are Here'
    })
    //map pin showing where the user is, infoWindow2 loads on result load
    let youAreHere = new google.maps.Marker({
      position: pos,
      title: 'You Are Here',
      icon: 'ltblu-stars.png',
      map: map,
      animation: google.maps.Animation.DROP
    });
    infoWindow2.open(map, youAreHere);
    //for each nearby restaurant result from the Zomato API, create a map marker
    for(i=0; i<places.length; i++) {
      let latLng = new google.maps.LatLng(places[i].restaurant.location.latitude, response.nearby_restaurants[i].restaurant.location.longitude);
      let marker = new google.maps.Marker({
        position: latLng,
        title: `${places[i].restaurant.name} at ${places[i].restaurant.location.address}`,
        //Displays inside of the infoWindow of each map pin/restaurant
        info:`<div class='infoWindow'><h2>${places[i].restaurant.name}</h2>
              <p>${places[i].restaurant.location.address}</p>
              <p>${places[i].restaurant.cuisines}</p>
              <p><a target="_blank" href="${places[i].restaurant.menu_url}">Menu</a></p>
              <p>User Rating: ${places[i].restaurant.user_rating.aggregate_rating} / 5 | ${places[i].restaurant.user_rating.rating_text}</p></div>`,
        animation: google.maps.Animation.DROP,
        map: map
      });
      function changeButtonText() {
        if (marker) {
          $('#clickMe').text('Search Again');
        } 
      }
      changeButtonText();
      $('.hood-name').html(`<h3>${response.location.title}</h3>`);
      $('.hood-name').show();
      //Makes each map marker from the Zomato API clickable
      marker.addListener('click', function() {
        if (infoWindow) {
          infoWindow.close();
        }
        infoWindow = new google.maps.InfoWindow({
          content: this.info
        })
        infoWindow.open(map, marker);
      });
    }
  });
} 
function error() {
  alert("Please enable location services in order to find What's Good in Your Hood!");
}

let map, infoWindow;
//Creates the map through google maps API V3
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.390954, lng: -96.1318693},
    zoom: 4,
    //Creats a 'night-time' style of google map
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
});
}

$('#clickMe').click(function () {
  navigator.geolocation.getCurrentPosition(success, error);
});

$('.landing-button').click(function () {
  $('.landing-page').fadeOut(1000);
});

$('.hood-name').hide();
