function success(position) {
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
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
        let latLng = new google.maps.LatLng(places[i].restaurant.location.latitude, response.nearby_restaurants[i].restaurant.location.longitude);
        let marker = new google.maps.Marker({
          //make map markers clickable, link with info--something to inform the user of what they're looking at
          //name, address, cuisine, link to place
          position: latLng,
          title: `${places[i].restaurant.name} at ${places[i].restaurant.location.address}`,
          info:`<h1>${places[i].restaurant.name}</h1>
                <p>${places[i].restaurant.location.address}</p>
                <p><${places[i].restaurant.cuisines}/p>
                <p><a href="${places[i].restaurant.url}" </a></p>`,
          animation: google.maps.Animation.DROP,
          map: map
        })
          marker.addListener('click', function() {
            infoWindow = new google.maps.InfoWindow({
              content: this.info
            })
            currWindow = infoWindow;
            if( currWindow ) {
                currWindow.close();
            }            
            //infoWindow.getContent         
            infoWindow.open(map, marker);
            map.setCenter(marker.getPosition());  
            });
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
    zoom: 4
});
}


$('#clickMe').click(function () {
  navigator.geolocation.getCurrentPosition(success, error);
})



