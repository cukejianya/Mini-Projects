function plotGenderAge(div, genderAge) {
  var keys = Object.keys(genderAge[0]);
  keys.shift();
  console.log(keys);
  console.log("Age", genderAge[0][keys[3]]);
  console.log("MaleTotal", genderAge[0].total, genderAge[0]["total"]);
  var n = 2, // number of layers
      m = 9, // number of samples per layer
      stack = d3.layout.stack(),
      layers = stack( d3.range(n).map( function(idx) {
        return keys.map( function(d, i) {
          //console.log(genderAge[idx][d])
          return { x: i, y: Math.max(0, parseInt(genderAge[idx][d])) };
        });
      })),
      yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
      yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

  var container = div.node().parentElement;

  var color = d3.scale.linear()
      .domain([0, n - 1])
      .range(["#aad", "#556"]);

  //Organizing the data for table.
  var tableCategories = keys.slice();
  tableCategories.unshift("header");
  tableCategories.push("Total");

  var mainSelection = div.select("table").selectAll("tr")
      .data(tableCategories);

  var tr = mainSelection.enter().append("tr");

  var selection = tr.selectAll("td")
      .data(function(d, i) {
        if (!i) {

          return [
            "Ages",
            "Males",
            "Females",
            "Total",
          ];
        } else if (d === "Total") {

          return [
            d,
            genderAge[0].total,
            genderAge[1].total,
            genderAge[0].total + genderAge[1].total,
          ];
        }

        return [
          d,
          genderAge[0][d],
          genderAge[1][d],
          genderAge[0][d]+genderAge[1][d],
        ];
      });
  selection.enter().append("td")
      .text(function(d, i) {
        console.log(d);
        return d;
      });

  div.node().type = "stack";
  console.log(div, div.node().type);
  var margin = {top: 40, right: 40, bottom: 70, left: 10},
      width = 200 - margin.left - margin.right,
      height = (200) - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(keys)
      .rangeRoundBands([0, width], 0.08);

  var y = d3.scale.linear()
      .domain([0, yStackMax])
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(1)
      .tickPadding(6)
      .orient("bottom");


  var svg = div.append("svg")
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
      .attr("x", function(d) {
        console.log(x, x(keys[d.x]), d.x, d);
        return x(keys[d.x]);
      })
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
      .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(60)")
      .style("text-anchor", "start");

  var timeout = setTimeout(function() {
    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
  }, 2000);

  function change(transitionStacked, transitionGrouped) {
    //clearTimeout(timeout);
    if (this.type === "stack") {
      transitionGrouped();
      this.type = "group";
    }
    else {
      transitionStacked();
      this.type = "stack";
    }
  }

  function transitionGrouped(y, yGroupMax, x, rect, height, keys) {
    y.domain([0, yGroupMax]);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i, j) { return x(keys[d.x]) + x.rangeBand() / n * j; })
        .attr("width", x.rangeBand() / n)
      .transition()
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); });
  }

  function transitionStacked(y, yStackMax, x, rect, keys) {
    y.domain([0, yStackMax]);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .transition()
        .attr("x", function(d) { return x(keys[d.x]); })
        .attr("width", x.rangeBand());
  }

  div.on("click", change.bind(div.node(),
    transitionStacked.bind(null, y, yStackMax, x, rect, keys),
    transitionGrouped.bind(null, y, yGroupMax, x, rect, height, keys)
  ));
  // Inspired by Lee Byron's test data generator.
  function bumpLayer(n, o) {

    function bump(a) {
      var x = 1 / (0.1 + Math.random()),
          y = 2 * Math.random() - 0.5,
          z = 10 / (0.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
    for (i = 0; i < 5; ++i) bump(a);
    return arr.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }

}
module.exports = plotGenderAge;
