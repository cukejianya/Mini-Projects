var submit = document.getElementById('submit');

var sudokuGrid = [];
var potentialCells = [];
var row = [[],[],[],[],[],[],[],[],[]];
var col = [[],[],[],[],[],[],[],[],[]];
//Initialize various groups
var group = [[],[],[],[],[],[],[],[],[]];
var banned = [];
var arrayInput;


function groupPlacemant(array) {
  var row = array[0];
  var col = array[1];
  row = Math.floor(row/3)+1;
  col = Math.floor(col/3);

  var groupNumber = col*3+row;

  return groupNumber;
}


function getInput() {

  arrayInput = document.getElementsByTagName('input');
  console.log(arrayInput);
  //Just was too lazy


  var numberArray = [];
  for (var j = 0; j < 9; j++) {
    numberArray[j] = j+1;
  }


  arrayInput.forEach( (cell, idx) => {
    var coord = cell.name.split(',').map( (a) => parseInt(a) );

    if (!cell.value) {
      var cellInfoMap = {
        'val': parseInt(cell.value),
        'row': coord[0],
        'col': coord[1],
        'group': groupPlacemant(coord),
      };

      potentialCells.push(cellInfoMap);
    } else {
      row[coord[0]].push(cell.value);
      cell[coord[1]].push(cell.value);
      group[groupPlacemant(coord)].push(cell.value);
    }

  });

  solve(potentialCells);
  
}


function solve(arr) {
  for (var i = 0; i < arr.length; i++) {
    cellObj = arr[i];
    var cellRow = cellObj.row;
    var cellCol = cellObj.col;
    var cellGroup = cellObj.group;
    var rowBool, colBool, groupBool, bannedBool;
    if (!banned[i]) banned.push([]);

    for (var k = 1; k <= 9; k++) {
      rowBool = (-1 === row[cellRow].indexOf(k));
      colBool = (-1 === col[cellCol].indexOf(k));
      groupBool = (-1 === group[cellGroup].indexOf(k));
      bannedBool = (-1 === banned[i].indexOf(k));

      if (rowBool && colBool && groupBool && bannedBool) {
        cellObj.val = k;
        row[cellRow].push(k);
        col[cellCol].push(k);
        group[cellGroup].push(k);
        banned[i].push(k);
        break;
      }
    }
    if (rowBool && colBool && groupBool && bannedBool) continue;

    i -= 2;
  }

    //   console.log(
    //     '\nRound: '+m+
    //     '\n i: '+i+
    //     '\n idx: '+idx+
    //     '\n coord: '+coord+
    //     '\n possibles: '+possibles+
    //     '\n groupNum: '+groupNum
    //   );

}

submit.addEventListener('click', getInput);
