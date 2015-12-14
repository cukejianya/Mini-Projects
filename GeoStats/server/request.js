var request = require('request');
var path = require('path');
var urlApi = require('url');
var variables = require('./data/censusVariables.json');

function formatURL(protocol, host, path, queryObj){
  var url = urlApi.format({
    protocol: protocol,
    hostname: host,
    pathname: path,
    query: queryObj,
  });
  return url;
}

function convertCoords(latitude, longitude) {
  var query = {
    format: 'json',
    latitude: latitude,
    longitude: longitude,
    showall: false
  }
  var url = formatURL('http','data.fcc.gov', '/api/block/find', query);
  request(url, function getFIPS(error, response, body){
    if (!error && response.statusCode == 200)
      getGeoInfo(JSON.parse(body).Block.FIPS);

  })
}

function getCode(dict) {
  var keys = Object.keys(dict);
  return keys.reduce(function(arr, variable) {
    arr.push(dict[variable]);
    return arr;
  }, []);
}

function reformatData(dict, data) {
  var keys = Object.keys(dict);
  keys.forEach(function(key) {
    dict[key].forEach(function(code, idx) {
      var data_idx = data[0].indexOf(code);
      dict[key][idx] = parseInt(data[1][data_idx]);

      if(dict[key].length === (idx + 1)){
        dict[key] = dict[key].reduce(function(prev, current) {
          console.log(current)
          return prev + current;
        }, 0);
      }
    });
  });
  console.log(variables)
}

function getCensusData(type, query){
  var typeDict = variables[type];
  var typeCode = getCode(typeDict);
  console.log(typeCode);
  query.get = typeCode.sort().join();
  var url = formatURL('http','api.census.gov','/data/2010/sf1', query);

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200)
      reformatData(typeDict, JSON.parse(body));
  });

}

function getGeoInfo(fips) {
  fips = fips.split('');
  var stateFIPS = fips.splice(0,2).join('');
  var countyFIPS = fips.splice(0,3).join('');
  var tractFIPS = fips.splice(0,6).join('');
  var query = {
    key: '9690f87a492f7f74100be910a9dc9ce10b598f93',
    for:'tract:'+tractFIPS,
    in: 'state:'+stateFIPS+'+county:'+countyFIPS
  }

  var categories = Object.keys(variables);
  categories.forEach(function(elm, idx) {
    if (elm === "econ")
      return;

    getCensusData(elm, query.clone());
  })
}

module.exports = {
  convertCoords: convertCoords,
}

Object.prototype.clone = function() {
  var that = this;
  var keys = Object.keys(that);
  var copy = keys.reduce(function(prev, elm){
    prev[elm] = that[elm];
    return prev;
  }, {});
  return copy;
}
