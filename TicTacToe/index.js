let game = {
  setUp() {
    console.log("Running");
    let resetButton = document.querySelector(".reset");
    this.playerX = Object.assign(Object.create(player), {
      image: "https://www.drodd.com/images15/letter-x14.jpg",
      cellsSum: 0
    });
    this.playerO = Object.assign(Object.create(player), {
      image: "https://www.drodd.com/images15/letter-o25.png",
      cellsSum: 0
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

  * turnGenerator() {
    for (var i = 0; i < 9; i++) {
      if (this.currentPlayer && this.currentPlayer.didIWin()) {
        this.currentPlayer = null;
        this.reset();
        return;
      }
      this.currentPlayer = this.currentPlayer === this.playerO 
        ? this.playerX
        : this.playerO;
      console.log(this.currentPlayer);
      yield;
    }
    this.currentPlayer = null;
    this.reset();
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
  elm.removeEventListener("click", clickEvent);
  this.turn.next();
}).bind(game);

let player = {
  mapToBinary: [
      0b1, 0b10, 0b100, 
      0b1000, 0b10000, 0b100000, 
      0b1000000, 0b10000000, 0b100000000
  ],
  winningBinary: [
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
    return this.winningBinary.some((binary) => {
      console.log(binary & this.cellsSum, binary);
      return (binary & this.cellsSum) === binary;
    });
  },
  reset() {
    this.cellsSum = 0;
  }
}

window.onload = game.setUp.bind(game);
