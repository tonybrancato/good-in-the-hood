# Good-In-The-Hood -- A restaurant and nightlife locator based on neighborhoods.

## Introduction 
Good-In-The-Hood finds the closest restaurants/nightlife spots in your area by using geolocation in HTML5. It then searches the Zomato API using those coordinates for the closest resturants in the user's neighborhood.

## Use Case
Have you ever traveled to a different city and have no clue about the neighborhoods you end up in? Often when we search based on our location, the app being used brings results that are sometimes in your neighborhood but often times miles away but rank higher for other reasons. This app is useful because it focuses on a specific neighborhood, only showing you the results that are within that neighborhood.

[Screenshots](https://github.com/tonybrancato/good-in-the-hood/tree/master/screenshots) 

## Summary
Upon page load the user will be greeted with a map, zoomed out to show most of the continental USA. There is only one button on the page, which asks the user to 'Find What's Good in My [the user's] Hood'. 

After pressing the button, the user will be prompted to allow the server to find the user's location and pass that information to the Google Maps API V3 and Zomato API. Results of the first 9 restaurants that match the user's neighborhood (ascertained through geolocation and neighborhood information withing the Zomato API) as map pins. A separate pin that denotes the user's location will also be present.

The User can then select each pin to learn more about the location and ultimately, their menu.

Upon finishing the user can search again, though it is recommended that they search again once in another neighborhood.

## Technology used
This projcet utilized 
  1. HTML 5
  2. CSS 3
  3. [jQuery](https://api.jquery.com/)
  4. [Google Maps API V3](https://developers.google.com/maps/)
  5. [Zomato API](https://developers.zomato.com/api)
