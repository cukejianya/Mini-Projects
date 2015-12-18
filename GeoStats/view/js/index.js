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
    //console.log(place.address_components);
    var geolocate = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }

    $.ajax({
        type: "POST",
        url: '/coords/',
        data: geolocate,
        success: function(data) {
          plotData(JSON.parse(data));
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
  var container = canvas.parentElement;
  //console.log("container", container);

  canvas.width = container.offsetWidth - 50; //max width

  //Call a function to redraw other content (texts, images etc)
}
respondCanvas();
function plotData(censusData){
  plotRace(censusData);
}

function arcTween(outerRadius, delay) {
  return function() {
    d3.select(this).transition().delay(delay).attrTween("d", function(d) {
      var i = d3.interpolate(d.outerRadius, outerRadius);
      return function(t) { d.outerRadius = i(t); return arc(d); };
    });
  };
};

function plotRace(censusData) {
  var race = censusData.race;
  var keys = Object.keys(race).splice(1);
  var needToRemove = false;

  var data = keys.filter( function(key) {
    return (key !== "total");
  }).map( function(key){
    console.log(key);
      return race[key]
  });
  //console.log(race, keys, data);

  var div =  d3.select(".race");

  var color = d3.scale.category20();

  if (needToRemove) {
    div.select("table").selectAll("tr").remove();
    div.select("svg").remove();
  }
  var selection = div.select("table").selectAll("tr")
      .data(keys)
  var tr = selection.enter().append("tr")

  tr.append("td")
      .text("HH")
      .style("background", function(d, i){
        return color(i);
      })
      .style("color", function(d, i){
        return color(i);
      });

  tr.append("td").text( function(d, i) {
    var str = d.split(" ").map(function(elm) {
      return elm[0].toUpperCase() + elm.slice(1);
    }) .join(" ");

    return " "+ str + ": " + race[d];
  });

  var container = div.node().parentElement;
  var width = container.offsetWidth - 25,
      height = 300,
      outerRadius = height / 2 - 30,
      innerRadius = outerRadius / 3;

  var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

  var pie = d3.layout.pie();

  var ease = d3.ease('cubic-in-out'),
      duration = 2500;

  var svg = div.append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  var path = svg.selectAll("path")
      .data(data)
    .enter().append("path")
      .style("fill", function(d, i) { console.log(color.domain[i], color(i)); return color(i); })

  d3.timer(function(elapsed) {
    var t = ease(1 - Math.abs((elapsed % duration) / duration - 0.5) * 2);
    var arcs = pie.padAngle(0.06 * t)(data);

    path
        .data(arcs)
        .attr("d", arc);
  });


}
