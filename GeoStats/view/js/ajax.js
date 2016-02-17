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
