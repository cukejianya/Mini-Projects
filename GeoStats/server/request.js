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

function getGeoInfo(fips) {
  fips = fips.split('');
  var stateFIPS = fips.splice(0,2).join('');
  var countyFIPS = fips.splice(0,3).join('');
  var tractFIPS = fips.splice(0,6).join('')
  var query = {
    key: '9690f87a492f7f74100be910a9dc9ce10b598f93',
    for:'tract:'+tractFIPS,
    in: 'state:'+stateFIPS+'+county:'+countyFIPS
  }
  var queryRace = query.clone();
  var queryMaleAge = query.clone();
  var queryFemaleAge = query.clone();

  var race = Object.keys(variables.race);
  var raceVariables = race.reduce(function(arr, variable){
    arr.push(variables.race[variable]);
    return arr;
  },[]);

  var maleAge = Object.keys(variables.maleAge);
  var maleAgeVariables = maleAge.reduce(function(arr, variable){
    arr.push(variables.maleAge[variable]);
    return arr;
  },[]);

  var femaleAge = Object.keys(variables.femaleAge);
  var femaleAgeVariables = femaleAge.reduce(function(arr, variable){
    arr.push(variables.femaleAge[variable]);
    return arr;
  },[]);

  queryRace.get = raceVariables.sort().join();
  queryMaleAge.get = maleAgeVariables.sort().join();
  queryFemaleAge.get = femaleAgeVariables.sort().join();

  var urlRace = formatURL('http','api.census.gov','/data/2010/sf1', queryRace);
  var urlMaleAge = formatURL('http','api.census.gov','/data/2010/sf1', queryMaleAge);
  var urlFemaleAge = formatURL('http','api.census.gov','/data/2010/sf1', queryFemaleAge);
  console.log(urlRace);
  request(urlRace, function getRacePop(error, response, body){
    if (!error && response.statusCode == 200)
      console.log(body);
  });
  request(urlMaleAge, function getMalePop(error, response, body){
    if (!error && response.statusCode == 200)
      console.log(body);
  });
  request(urlFemaleAge, function getFemalePop(error, response, body){
    if (!error && response.statusCode == 200)
      console.log(body);
  });
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
