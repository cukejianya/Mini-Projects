
var submit = document.getElementById('submit');

var sudokuGrid = [];
var emptyCellsGrid = [];
//Initialize various groups
var group = [];
var row = [];
var col = [];
var arrayInput;

function getInput() {
  arrayInput = document.getElementsByTagName('input');
  //Just was too lazy
  var numberArray = [];
  for (var j = 0; j < 9; j++) {
    numberArray[j] = j+1;
  }

  for (var i = 0; i < arrayInput.length; i++) {
    var cell = arrayInput[i];
    var coord = cell.name.split(',').map( function(a){return parseInt(a)} );

    var cellInfoMap = {
      'val': parseInt(cell.value),
      'coord': coord,
      'group': groupPlacemant(coord),
    };
    if (!cell.value) {
      cellInfoMap['possibles'] = numberArray;
      emptyCellsGrid.push(i);
    }
    sudokuGrid[i] = cellInfoMap;

    //--Put in rightful place--
    var groupNumber = cellInfoMap.group;
    var rowNumber = cellInfoMap['coord'][0];
    var colNumber = cellInfoMap['coord'][1];
    var valIdx = cellInfoMap.val;
    //If group-row-col idx does not exist, then init
    if (!group[groupNumber])
      group[groupNumber] = Array(9);
    if (!row[rowNumber])
      row[rowNumber] = Array(9);
    if (!col[colNumber])
      col[colNumber] = Array(9);
    //Check to see if value actually exist, than assign true to val-idx in groups-rows-cols
    if (!!valIdx) {
      group[groupNumber][valIdx-1] = true;
      row[rowNumber][valIdx-1] = true;
      col[colNumber][valIdx-1] = true;
    }
  }
}

function groupPlacemant(array) {
  var row = array[0];
  var col = array[1];
  row = Math.floor(row/3)+1;
  col = Math.floor(col/3);

  var groupNumber = col*3+row;

  return groupNumber;
}

function solve(array) {
  for (var m = 0; m < 2; m++) {
    for (var i = 0; i < array.length; i++) {
      var idx = array[i];
      var possibles = sudokuGrid[idx].possibles;
      var coord = sudokuGrid[idx].coord;
      var groupNum = sudokuGrid[idx].group;
      console.log(
        '\nRound: '+m+
        '\n i:'+i+
        '\n idx: '+idx+
        '\n coord: '+coord+
        '\n possibles: '+possibles+
        '\n groupNum: '+groupNum
      );
      for (var j = 0; j < possibles.length; j++ ) {
        var possible = possibles[j];
        if (group[groupNum][possible-1] || row[coord[0]][possible-1] || col[coord[1]][possible-1]) {
          //Always wanted to do the ++/-- afterwards effect

          console.log('\nPossible Removed: ',possibles.splice(j--, 1));
          console.log(possibles);
          if (possibles.length === 1) {
            sudokuGrid[idx].value = possibles[0];
            group[groupNum][possibles[0]-1] = true;
            row[coord[0]][possibles[0]-1] = true;
            col[coord[1]][possibles[0]-1] = true;
            array.splice(i--,1);
            arrayInput[idx].value = possibles[0];
          }
        }
        sudokuGrid[idx].possibles = possibles;
      }
    }
  }
}


submit.addEventListener('click', getInput);
