var testarray = [[4,3,5,2,6,1,3,0], [6,7,2,1,3,null],[9,0,1,4,9,0,0], [3,2,0,2,1,0,0], [5,6,4,5,0,3], [0,9,1,0,0,1] ];


//var numbersInGroup = {1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false}
var submit = document.getElementById('submit');


sudokuGrid = [];

function getInput() {
  var arrayInput = document.getElementsByTagName('input');
  for (var i = 0; i < arrayInput.length; i++){
    var cell = document.getElementsByTagName('input')[i];
    var coord = cell.name.split(',').map(function(a){return parseInt(a)});

    var cellInfoMap = {
      'value': parseInt(cell.value),
      'coord': coord,
      'group': groupPlacemant(coord)
    };

    sudokuGrid[i] = cellInfoMap;
  }
}

function groupPlacemant(array) {
  var row = array[0];
  var col = array[1];
  row %= 3;
  col %= 3;

  var groupNumber = 3*row+(++col);

  return groupNumber;
}

submit.addEventListener('click', getInput);

console.log(sudokuGrid);
