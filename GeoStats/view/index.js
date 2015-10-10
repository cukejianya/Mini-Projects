var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12
  });
  var input = document.getElementById('searchTextField');
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var options = {
    componentRestrictions: {country: 'us'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

}
