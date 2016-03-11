var D = require('d.js');
var map;

function offsetMap(latlng,offsetx,offsety) {
  var scale = Math.pow(2, map.getZoom());
  var nw = new google.maps.LatLng(
      map.getBounds().getNorthEast().lat(),
      map.getBounds().getSouthWest().lng()
  );

  var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
  var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0);

  var worldCoordinateNewCenter = new google.maps.Point(
      worldCoordinateCenter.x - pixelOffset.x,
      worldCoordinateCenter.y + pixelOffset.y
  );

  var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

  map.setCenter(newCenter);
}

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
  var infowindow = new google.maps.InfoWindow({
        maxWidth: 700
  });
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
    };
    console.log(geolocate.type, "Place Geometry",place.geometry.location);
    deferred.resolve(geolocate);

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      offsetMap(place.geometry.location,0,700);
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
      '<br><br><strong>Race</strong><br>' +
      "<div class='race' style='height:350; width:900 ; display: inline-block;'><table class='left'></table></div>" +
      '<br><br><strong>Gender and Age</strong><br>' +
      "<br><div class='genderAge' style='height:350; display: inline-block;'><table class='left'></table></div>" +
      "</div>");

    infowindow.open(map, marker);
  });

  console.log(infowindow);

  return deferred.promise;
}

module.exports = initMap;
