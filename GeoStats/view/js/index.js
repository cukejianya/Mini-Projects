var map;
var geolocate = {};
var place;
var bindedCreatePlot;
var needToRemove = false;

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

    serRequest(geolocate)

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

function serRequest(geolocate) {
  $.ajax({
      type: "POST",
      url: '/coords/',
      data: geolocate,
      success: function(data) {
        data = JSON.parse(data);
        bindedCreatePlot = createPlot.bind(null, data);
        createPlot(data);
      },
      error: function(jqXHR, textstatus, errorThrown) {
          alert('text status ' + textstatus + ', err ' + errorThrown);
      }
  });
}

$(window).resize(function(){
  bindedCreatePlot();
});

function createPlot(censusData) {
  var raceHTML = d3.select(".race");
  console.log(censusData);
  var raceData = censusData.race;

  if (needToRemove) {
    removePlot();
  } else {
    needToRemove = true;
  }

  plotRace(raceHTML, raceData);
}

function removePlot() {
  d3.select(".race").select("table").selectAll("tr").remove();
  d3.select(".race").select("svg").remove();
}

function plotRace(div, race) {
  var keys = Object.keys(race).splice(1);

  var data = keys.filter( function(key) {
    return (key !== "total");
  }).map( function(key){
    console.log(key);
      return race[key]
  });

  var color = d3.scale.category20();

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
      height = container.offsetWidth - 25,
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
