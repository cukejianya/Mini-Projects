var testarray = [[4,3,5,2,6,1,3,0], [6,7,2,1,3,null],[9,0,1,4,9,0,0], [3,2,0,2,1,0,0], [5,6,4,5,0,3], [0,9,1,0,0,1] ];


//var numbersInGroup = {1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false}

function Group(groupNumber, array) {
  var groupNumber = groupNumber; //To identify the group
  var i = ((groupNumber - 1) % 3) *3; //row idx
  var j = Math.floor((groupNumber-1)/3); //column idx
  var numbersInGroup = {}; //init dict for all the numbers currently in dict
  var cell = {};
  var cellofNumbers = [0,1,2,3,4,5,6,7,8,9];

//To use this in functions
  var _this = this;
//Map the array values to the assign coordinates in particular group
  for (var n = i; n < i+3; n++) {
    cell[n] = {};
    for (var m = j; m < j+3; m++) {
      console.log(array[n][m]);
      if (array[n][m]) {
        numbersInGroup[array[n][m]] = [true, [n, m]];
        cellofNumbers[array[n][m]] = 0;
        cell[n][m] = array[n][m];
      } else {
        cell[n][m] = 0;
      }
    }
  }
//Get functions
  this.idx = function(value) {
    if (value in numbersInGroup) {
      return numbersInGroup[value][1];
    } else {
      return false;
    }
  };
  this.numbersLeft = function() {
    //Creates new array without 0s in it | [0,1,0,3,0] -> [1,3]
    return cellofNumbers.filter(
      function (a) {
        if(a) {return a;}
      }
    );
  };
  console.log(numbersInGroup);
  this.toString = function() {
    var cellPrint = '';
    for (var key in cell) {
      for (var valKey in cell[key]) {
        cellPrint += key+','+valKey+': '+cell[key][valKey] + '| ';
      }
      cellPrint += '\n';
    }
    var info =
    'Group Number: '+ groupNumber +
    '\nCells: \n'+ cellPrint+
    '\nThe numbers left in group is: '+ _this.numbersLeft().join(' ');
    return info;
  };
}

function BigGroup(array) {
  var groupCollection = [];
  for (var i = 0; i < 3; i++) {
      var row = [];
    for (var j = 0; j < 3; j++) {
      var groupNumber = 3*i + j + 1;
      row.push(new Group(groupNumber));
    }
  groupCollection.push(row);
  }

}

var Group1 = new Group(2, testarray);

console.log(Group1.idx(7));
