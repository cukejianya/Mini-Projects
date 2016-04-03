var submit = document.getElementById('submit');

var sudokuGrid;
var potentialCells;
var row;
var col;
//Initialize various groups
var group;
var arrayInput;


function groupPlacemant(array) {
  var row = array[0];
  var col = array[1];
  row = Math.floor(row/3)+1;
  col = Math.floor(col/3);

  var groupNumber = col*3+row;

  return groupNumber - 1;
}

function init() {
  sudokuGrid = [];
  potentialCells = [];
  row = [[],[],[],[],[],[],[],[],[]];
  col = [[],[],[],[],[],[],[],[],[]];
  //Initialize various groups
  group = [[],[],[],[],[],[],[],[],[]];
}


function getInput() {
  init();
  arrayInput = [].slice.call(document.getElementsByTagName('input'));
  //console.log('row',row,'col',col);
  //Just was too lazy


  var numberArray = [];
  for (var j = 0; j < 9; j++) {
    numberArray[j] = j+1;
  }
  //console.log(arrayInput);

  arrayInput.forEach( (cell, idx) => {
    var coord = cell.name.split(',').map( (a) => parseInt(a) );
    var value = parseInt(cell.value);
    //console.log(value);
    if (!value) {
      var cellInfoMap = {
        'val': value,
        'row': coord[0],
        'col': coord[1],
        'group': groupPlacemant(coord),
      };

      potentialCells.push(cellInfoMap);
    } else {
      console.log("row",coord[0],"col",coord[1]);
      row[coord[0]].push(parseInt(cell.value));
      col[coord[1]].push(parseInt(cell.value));
      group[groupPlacemant(coord)].push(parseInt(cell.value));
    }

  });

  //console.log("Length:", potentialCells.length);
  solve(potentialCells, 0);

  arrayInput.forEach( (cell, idx) => {
    var value = parseInt(cell.value);

    if (!value) {
      var pCell = potentialCells.shift();
      cell.value = pCell.val;
    }
  });

}

function solve(arr, idx) {
  //console.log("idx", idx);
  if (idx === arr.length) return true;
  var cellObj = arr[idx];
  var cellRow = cellObj.row;
  var cellCol = cellObj.col;
  var cellGroup = cellObj.group;
  var rowBool, colBool, groupBool;

  for (var k = 1; k <= 9; k++) {
    rowBool = (-1 === row[cellRow].indexOf(k));
    colBool = (-1 === col[cellCol].indexOf(k));
    groupBool = (-1 === group[cellGroup].indexOf(k));

    if (rowBool && colBool && groupBool) {
      cellObj.val = k;
      row[cellRow].push(k);
      col[cellCol].push(k);
      group[cellGroup].push(k);

      if (solve(arr, idx+1)) {

        return true;
      }

      row[cellRow].pop();
      col[cellCol].pop();
      group[cellGroup].pop();
    }
  }

  return false;
}

//debug


submit.addEventListener('click', getInput);
