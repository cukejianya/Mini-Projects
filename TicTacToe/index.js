let game = {
  setUp() {
    console.log("Running");
    let resetButton = document.querySelector(".reset");
    this.scribleAudio = new Audio('scribleAudio.wav');;
    this.playerX = Object.assign(Object.create(player), {
      image: "x.jpg",
      cellsSum: 0,
      pos: 1
    });
    this.playerO = Object.assign(Object.create(player), {
      image: "o.png",
      cellsSum: 0,
      pos: 2
    });
    this.reset();
    resetButton.addEventListener("click", this.reset.bind(this));
  },

  reset() {
    document.querySelectorAll("div").forEach((div) => {
      if (div.className === "container") {
        return;
      }
      if (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
      }
      div.addEventListener("click", clickEvent);
    });
    this.playerX.reset();
    this.playerO.reset();
    this.turn = this.turnGenerator.call(this);
    this.turn.next();
  },
  
  end(num) {
    let str;
    if (num === 1) {
      str = "Player X wins";
    } else if (num === 2) {
      str = "Player O wins";
    } else if (num === 0) {
      str = "It's a tie";
    }
    console.log(str);
    document.querySelectorAll('div').forEach((div) => {
      if (div.className === "container") {
        return;
      }
      div.removeEventListener("click", clickEvent);
    });
  },

  * turnGenerator() {
    for (var i = 0; i < 9; i++) {
      if (this.currentPlayer && this.currentPlayer.didIWin()) {
        console.log(this.currentPlayer.getWinningCells(), this.currentPlayer.pos);
        this.end(this.currentPlayer.pos);
        this.currentPlayer = null;
        return;
      }
      this.currentPlayer = this.currentPlayer === this.playerO 
        ? this.playerX
        : this.playerO;
      yield;
    }
    this.currentPlayer = null;
    this.end(0);
    return;
  }
}

let clickEvent = (function (event) {
  event.stopPropagation();
  let elm = event.currentTarget;
  let imageElm = document.createElement('img');
  this.currentPlayer.markCell(elm);
  imageElm.src = this.currentPlayer.image;
  elm.appendChild(imageElm);
  this.scribleAudio.play();
  elm.removeEventListener("click", clickEvent);
  this.turn.next();
}).bind(game);

let player = {
  mapToBinary: [
      0b1, 0b10, 0b100, 
      0b1000, 0b10000, 0b100000, 
      0b1000000, 0b10000000, 0b100000000
  ],
  winningBinaries: [
    0b111000000,
    0b000000111,
    0b000111000,
    0b100100100,
    0b001001001,
    0b010010010,
    0b100010001,
    0b001010100,
  ],
  markCell(elm) {
    this.cellsSum += this.mapToBinary[parseInt(elm.className) - 1]; 
  },
  didIWin() {
    return !!this.getWinningBinary().length;
  },
  getWinningCells() {
    let wonBinary = this.getWinningBinary().pop();
    return this.mapToBinary.filter(binary => {
      return (binary & wonBinary) === binary;
    }).map(num => Math.log2(num) + 1);
  },
  getWinningBinary() {
    return this.winningBinaries.filter((binary) => {
      return (binary & this.cellsSum) === binary;
    });
  },
  reset() {
    this.cellsSum = 0;
  }
}

window.onload = game.setUp.bind(game);
