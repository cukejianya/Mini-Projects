var submit = document.getElementById('submit');

var sudokuGrid;
var potentialCells;
var row;
var col;
//Initialize various groups
var group;
var banned;
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
  banned = [];
}


function getInput() {
  init();
  arrayInput = [].slice.call(document.getElementsByTagName('input'));
  console.log('row',row,'col',col);
  //Just was too lazy


  var numberArray = [];
  for (var j = 0; j < 9; j++) {
    numberArray[j] = j+1;
  }
  console.log(arrayInput);

  arrayInput.forEach( (cell, idx) => {
    var coord = cell.name.split(',').map( (a) => parseInt(a) );
    var value = parseInt(cell.value);
    console.log(value);
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

  solve(potentialCells);

  arrayInput.forEach( (cell, idx) => {
    var coord = cell.name.split(',').map( (a) => parseInt(a) );
    var value = parseInt(cell.value);

    if (!value) {
      var pCell = potentialCells.shift();
      cell.value = value;
    }
  });

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
    row.pop();
    col.pop();
    group.pop();
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
