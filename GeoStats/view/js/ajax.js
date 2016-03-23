var D = require('d.js');

function serRequest(geolocate) {
  var deferred = D();
  $.ajax({
      type: "POST",
      url: '/coords/',
      data: geolocate,
      success: function(data) {
        data = JSON.parse(data);
        deferred.resolve(data);
      },
      error: function(jqXHR, textstatus, errorThrown) {
          console.log('text status ' + textstatus + ', err ' + errorThrown);
      }
  });

  return deferred.promise;
}

module.exports = serRequest;
