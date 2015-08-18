
function render() {
  var table = document.getElementsByTagName('table')[0];
  console.log(table);
  var tbodyID;
  var tbody;
  for(var i = 0; i < 9; i++){
    if (i%3 === 0) {
      tbodyID = 'tbody'+Math.floor(i/3);
      var newtbody = document.createElement('tbody');
      newtbody.setAttribute('id', tbodyID);
      table.appendChild(newtbody);
      tbody = document.getElementById(tbodyID);
    }
    var newtr = document.createElement('tr');
    newtr.setAttribute('id',i+'');
    tbody.appendChild(newtr);
    var tr = document.getElementById(i+'');
    for(var j = 0; j < 9; j++) {
      var newtd = document.createElement('td');
      newtd.innerHTML = '<input type="text" name="'+i+','+j+'" />';
      tr.appendChild(newtd);
    }
  }

}

render();
