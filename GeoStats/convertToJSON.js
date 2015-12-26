var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'data/national_places.txt');

var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, function(error) {console.log(error);});

f = f.split('\n');

var category = f.shift().split('|').map(function(elm) {
  return elm.toLowerCase();
});

f.pop();

var json = [];

f.forEach(function(elm) {
  elm = elm.split('|');
  //console.log(elm);
  var idx = parseInt(elm[1]) - 1;
  console.log(idx);
  if ( !(json[idx]) ) {
    json[idx] = {state: elm[0]};
  };

  json[idx][elm[3]] = {};
  category.forEach( function(cat, jdx) {
    json[idx][elm[3]][cat] = elm[jdx];
  });
});

var outPath = path.join(__dirname, 'data/national_place.json');
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', function(err) { console.log(err); });
