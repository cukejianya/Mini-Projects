function plotRace(div, race) {
  var keys = Object.keys(race).splice(1);

  var data = keys.filter( function(key) {
    return (key !== "total");
  }).map( function(key){
    //console.log(key);
      return race[key];
  });

  var color = d3.scale.category20();

  var selection = div.select("table").selectAll("tr")
      .data(keys);
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
  var width = 200 - 25,
      height = 200 - 25,
      outerRadius = height / 2 - 30,
      innerRadius = outerRadius / 3;

  var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

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
      .style("fill", function(d, i) {
        //console.log(color.domain[i], color(i));
        return color(i);
      });

  d3.timer(function(elapsed) {
    var t = ease(1 - Math.abs((elapsed % duration) / duration - 0.5) * 2);
    var arcs = pie.padAngle(0.06 * t)(data);

    path
        .data(arcs)
        .attr("d", arc);
  });
}

module.exports = plotRace;
