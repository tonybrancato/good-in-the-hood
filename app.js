function randomString(length, chars) {
    let mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    let result = '';
    for (let i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}
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
      console.log(response.nearby_restaurants.length);
      console.log(response.nearby_restaurants["0"].restaurant.location.latitude);
      console.log(response.nearby_restaurants["0"].restaurant.location.longitude);
      //for each nearby restaurant, create a map marker
      for(i=0; i<response.nearby_restaurants.length; i++) {
        let latLng = new google.maps.LatLng(response.nearby_restaurants[i].restaurant.location.latitude, response.nearby_restaurants[i].restaurant.location.longitude);
        let marker = new google.maps.Marker({
          position: latLng,
          title: response.nearby_restaurants[i].restaurant.name,
          animation: google.maps.Animation.DROP,
          map: map
        })
      }
   //add numbers to the map markers
    response.nearby_restaurants.findIndex(response.nearby_restaurants[i].restaurant.name)
  });
  function makeMapMarkers(data) {

  }
  var tweets = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.twitter.com/1.1/search/tweets.json",
    "method": "GET",
    "headers": {
      "authorization": "OAuth oauth_consumer_key=\\\"U4HQaW7XwK24qtpwgCo3hUTD3\\\",oauth_token=\\\"1277210768-MXEBRvZsTG9bDlhsE0ejQQ885F2g07lUPFzNrhR\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1502036865\\\",oauth_nonce=c8550qm7x6GMSE0m5tdiexQ3P6U9U3dV\\\"\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"mgP9Q%2Fcb68Rz78U6V3ReZFnp8F0%3D\\\"",
      "cache-control": "no-cache",
      "postman-token": "e2df5b06-2c36-df96-423e-a79c38972a39",
      "Access-Control-Allow-Origin": "*"
    },
    data: {
      count: '2',
      geocode: `${latitude},${longitude},1mi`
    },
    dataType: 'json',
  }

  $.ajax(tweets).done(function (response) {
    console.log(response);
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

$('#clickMe').click(function () {
  infoWindow = new google.maps.InfoWindow;
  navigator.geolocation.getCurrentPosition(success, error);
})

function getTweets () {
  var tweets = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.twitter.com/1.1/search/tweets.json?geocode=37.781157%2C-122.398720%2C1mi",
    "method": "GET",
    "headers": {
      "authorization": "OAuth oauth_consumer_key=\\\"U4HQaW7XwK24qtpwgCo3hUTD3\\\",oauth_token=\\\"1277210768-MXEBRvZsTG9bDlhsE0ejQQ885F2g07lUPFzNrhR\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1502036865\\\",oauth_nonce=\\\"DmvkLhuGTBI\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"mgP9Q%2Fcb68Rz78U6V3ReZFnp8F0%3D\\\"",
      "cache-control": "no-cache",
      "postman-token": "e2df5b06-2c36-df96-423e-a79c38972a39"
    },
    data: {
      count: '2',
      geocode: (latitude, longitude, "1mi")
    }
  }
  $.ajax(tweets).done(function (response) {
    console.log(response);
  });
}


