function plotTotal(div, total) {
  div.append("h3").text(function(){
    return "Total Population: " + total;
  })
}
