var request = require('request');
var path = require('path');
var urlApi = require('url');

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
      console.log(body);
  })
}

function getGeoInfo(fips) {
  fips = fips.split('');
  var stateFIPS = fips.splice(0,2).join('');
  var countyFIPS = fips.splice(0,3).join('');
  var tractFIPS = fips.splice(0,6).join('');
  // var query = {
  //   key:,
  //   get: 'P0010001,P0030002,P0030003,P0030004,P0030005,P0030006,P0030007',
  //   for:'tract:'+tractFIPS,
  //   in: 'state:'+stateFIPS+'+county:'+countyFIPS
  // }
  // request('http://api.census.gov/data/2010/sf1?key=9690f87a492f7f74100be910a9dc9ce10b598f93&get=PCT0120125&for=tract:*&in=state:02+county:170', )
}

module.exports = {
  convertCoords: convertCoords,
}
