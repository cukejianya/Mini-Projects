const oPic = "https://www.drodd.com/images15/letter-o25.png";
const xPic = "https://www.drodd.com/images15/letter-x14.jpg";
let turn = 0;

window.onload = () => {
  let divList = document.querySelectorAll("div");;
  divList.forEach((div) => {
    if (div.className === "container") {
      return;
    }
    div.addEventListener("click", clickEvent);
  });
}

function clickEvent(event) {
  let elm = event.currentTarget;
  let picURL = turn % 2 === 0 ? oPic : xPic;
  let imageElm = document.createElement('img')
  imageElm.src = picURL;
  turn++;
  elm.appendChild(imageElm);
  elm.removeEventListener("click", clickEvent);
}
