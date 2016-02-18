var initMap = require("./initMap");
var request = require("./ajax");
var plotTotal = require("./plotTotal");
var plotRace = require("./plotRace");
var plotGenderAge = require("./plotGenderAge");


var bindedCreatePlot, needToRemove;

$(window).resize(function(){
  bindedCreatePlot();
});

 console.log(typeof(initMap));
function createPlot(censusData) {
  var totalHTML = d3.select(".total");
  var raceHTML = d3.select(".race");
  var genderAgeHTML = d3.select(".genderAge");
  //console.log(censusData);
  var totalData = censusData.race.total;
  var raceData = censusData.race;
  var femaleData = censusData.femaleAge;
  var maleData = censusData.maleAge;
  console.log(maleData);

  if (needToRemove) {
    removePlot();
  } else {
    needToRemove = true;
  }

  plotTotal(totalHTML, totalData);
  plotRace(raceHTML, raceData);
  plotGenderAge(genderAgeHTML, [maleData,femaleData]);
}

function removePlot() {
  d3.select(".total").select("h3").remove();
  d3.select(".race").select("table").selectAll("tr").remove();
  d3.select(".race").select("svg").remove();
  d3.select(".genderAge").select("svg").remove();
}

$(document).ready(function()  {
  initMap()
  .then(request)
  .then(function(data) {
    console.log(data);
    bindedCreatePlot = createPlot.bind(null, data);
    createPlot(data);
  })
})
