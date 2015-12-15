var map;
var geolocate = {};
var place;

function initMap() {
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
    }

    $.ajax({
        type: "POST",
        url: '/coords/',
        data: geolocate,
        success: function(data) {
          plotData(data);
        },
        error: function(jqXHR, textstatus, errorThrown) {
            alert('text status ' + textstatus + ', err ' + errorThrown);
        }
    });

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

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address);
    infowindow.open(map, marker);
  });
}

$(window).resize(respondCanvas);

function respondCanvas() {
  var canvas = document.querySelector(".race");
  var context = canvas.getContext("2d");
  var container = canvas.parentElement;
  console.log("container", container);

  canvas.width = container.offsetWidth - 50; //max width

  //Call a function to redraw other content (texts, images etc)
}
respondCanvas();

function plotData(censusData) {
  var race = censusData.race;
  var keys = Object.keys(race);
  var data = keys.filter( function(key) {
    return key !== "true";
  }).map( function(key){
    console.log(key);
      return race[key]
  });
  console.log(race, keys, data);

  var canvas = document.querySelector(".race");
  var context = canvas.getContext("2d");

  var width = canvas.width,
      height = canvas.height,
      outerRadius = height / 2 - 30,
      innerRadius = outerRadius / 3;

  var arc = d3_shape.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .context(context);

  var pie = d3_shape.pie();

  var ease = d3_ease.cubicInOut,
      duration = 2500;

  d3_timer.timer(function(elapsed) {
    var t = ease(1 - Math.abs((elapsed % duration) / duration - 0.5) * 2),
        arcs = pie.padAngle(0.06 * t)(data);

    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(width / 2, height / 2);

    context.beginPath();
    arcs.forEach(arc.padAngle(0));
    context.lineWidth = 1;
    context.strokeStyle = "#777";
    context.stroke();

    context.beginPath();
    arcs.forEach(arc.padAngle(0.06 * t));
    context.fillStyle = "#ccc";
    context.fill();
    context.lineWidth = 1.5;
    context.lineJoin = "round";
    context.strokeStyle = "#000";
    context.stroke();

    context.restore();
  });
}
