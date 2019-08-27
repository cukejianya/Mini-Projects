let game = {
  setUp() {
    console.log("Running");
    let resetButton = document.querySelector(".reset")
    this.playerX = Object.assign(Object.create(player), {
      image: "https://www.drodd.com/images15/letter-x14.jpg",
      cellsMarked: []
    });
    this.playerO = Object.assign(Object.create(player), {
      image: "https://www.drodd.com/images15/letter-o25.png",
      cellsMarked: []
    });
    this.reset();
    resetButton.addEventListener("click", this.reset.bind(this));
  },

  reset() {
    this.turn = 0;
    document.querySelectorAll("div").forEach((div) => {
      if (div.className === "container") {
        return;
      }
      if (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
      }
      div.addEventListener("click", clickEvent);
    });
    this.playerO.cellsMarked = [];
    this.playerX.cellsMarked = [];
  },
}

let clickEvent = (function (event) {
  let elm = event.currentTarget;
  let player = this.turn % 2 === 0 ? this.playerO : this.playerX;
  let imageElm = document.createElement('img');
  player.markCell(elm);
  imageElm.src = player.image;
  this.turn++;
  elm.appendChild(imageElm);
  elm.removeEventListener("click", clickEvent);
}).bind(game);

let player = {
  markCell(elm) {
    this.cellsMarked.push(parseInt(elm.className)); 
  },
}

window.onload = game.setUp.bind(game)
