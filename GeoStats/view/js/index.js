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
    console.log(place.address_components);

    var geolocate = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      type: place.address_components[0].types[0],
      place: place.address_components[0].long_name
    }
    console.log(geolocate.type);
    serRequest(geolocate);

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
  var totalHTML = d3.select(".total");
  var raceHTML = d3.select(".race");
  console.log(censusData);
  var totalData = censusData.race.total;
  var raceData = censusData.race;

  if (needToRemove) {
    removePlot();
  } else {
    needToRemove = true;
  }

  plotTotal(totalHTML, totalData);
  plotRace(raceHTML, raceData);
}

function removePlot() {
  d3.select(".total").select("h3").remove();
  d3.select(".race").select("table").selectAll("tr").remove();
  d3.select(".race").select("svg").remove();
}

function plotTotal(div, total) {
  div.append("h3").text(function(){
    return "Total Population: " + total;
  })
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
  var tr = selection.enter().append("tr");

  tr.append("td")
      .text("HH")
      .style("background", function(d, i) {
        return color(i);
      })
      .style("color", function(d, i) {
        return color(i);
      });

  tr.append("td").text( function(d, i) {
    var str = d.split(" ").map(function(elm) {
      return elm[0].toUpperCase() + elm.slice(1);
    }).join(" ");

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

function plotGenderAge() {
  var n = 4, // number of layers
      m = 58, // number of samples per layer
      stack = d3.layout.stack(),
      layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
      yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
      yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

  var margin = {top: 40, right: 10, bottom: 20, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangeRoundBands([0, width], .08);

  var y = d3.scale.linear()
      .domain([0, yStackMax])
      .range([height, 0]);

  var color = d3.scale.linear()
      .domain([0, n - 1])
      .range(["#aad", "#556"]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(0)
      .tickPadding(6)
      .orient("bottom");

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var layer = svg.selectAll(".layer")
      .data(layers)
    .enter().append("g")
      .attr("class", "layer")
      .style("fill", function(d, i) { return color(i); });

  var rect = layer.selectAll("rect")
      .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", height)
      .attr("width", x.rangeBand())
      .attr("height", 0);

  rect.transition()
      .delay(function(d, i) { return i * 10; })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  d3.selectAll("input").on("change", change);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(timeout);
    if (this.value === "grouped") transitionGrouped();
    else transitionStacked();
  }

  function transitionGrouped() {
    y.domain([0, yGroupMax]);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
        .attr("width", x.rangeBand() / n)
      .transition()
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); });
  }

  function transitionStacked() {
    y.domain([0, yStackMax]);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .transition()
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand());
  }

  // Inspired by Lee Byron's test data generator.
  function bumpLayer(n, o) {

    function bump(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }
}
