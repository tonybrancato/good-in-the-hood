
function success(position) {
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  infoWindow.setPosition(pos);
  infoWindow.setContent('You are here');
  infoWindow.open(map);
  map.setCenter(pos);
  map.setZoom(11);
//Zomato API
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
    dataType: 'json',
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      let places = response.nearby_restaurants;
      //for each nearby restaurant, create a map marker
      for(i=0; i<places.length; i++) {
        writeResults(places);
        let latLng = new google.maps.LatLng(places[i].restaurant.location.latitude, response.nearby_restaurants[i].restaurant.location.longitude);
        let marker = new google.maps.Marker({
          position: latLng,
          title: places[i].restaurant.name,
          animation: google.maps.Animation.DROP,
          map: map
        })
      }
  });
} 
function error() {
  alert('sometthing went wrong')
}

let map, infoWindow;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.390954, lng: -96.1318693},
    zoom: 5
});
}

function writeResults(array) {
  $('#api-results').html();
  return `<h1>${array[i].restaurant.name}</h1>`
}

$('#clickMe').click(function () {
  infoWindow = new google.maps.InfoWindow;
  navigator.geolocation.getCurrentPosition(success, error);
})



