var D = require('d.js');
var map;

function initMap() {
  var deferred = D();
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 41.850033, lng: -87.6500523},
    zoom: 4
  });
  var input = document.getElementById('searchTextField');
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var options = {
    componentRestrictions: {country: 'us'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);
  var infowindow = new google.maps.InfoWindow();

  var marker = new google.maps.Marker({
    map: map
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }
    console.log(place.address_components);

    var geolocate = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      type: place.address_components[0].types[0],
      place: place.address_components[0].long_name
    }
    console.log(geolocate.type);
    deferred.resolve(geolocate);

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);

    infowindow.setContent(
      '<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address +
      "<br><div class='race' style='height:400; display: inline-block;'><table></table></div>" +
    "<br><div class='genderAge' style='height:400; display: inline-block;'></div>" +
    "</div>");
    infowindow.open(map, marker);
  });

  console.log(infowindow);

  return deferred.promise;
}

module.exports = initMap;
