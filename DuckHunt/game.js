// Your work goes here...
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000/60);
          };
})();

var canvas, ctx, dhImage, dogSx, dogX, sniff, bg, move, fps, dogMove, dogSniff;


initDraw();

function initDraw() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = "#C96A1B";
  ctx.fillRect(0,500,800,100);
  dhImage = new Image();
  dhImage.src = 'assets/duckhunt.png';

  fps = 15;
  dogSx = 5;
  dogX = 20;
  sniff = 0;
  bg = function(){
    ctx.drawImage(dhImage,0,272,75,125,50,225,200,333);
    ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
  };
  var loopMove, loopSniff;
}

function animateMove() {
    setTimeout(function(){
        requestAnimFrame( animateMove );
        game();
    }, 1000/fps);
}

function game() {
  if (move) {
    dogMove();
  } else {
    dogSniff();
  }
}


function dogMove() {
   ctx.clearRect(dogX, 460, 100, 81);
   if (dogSx >= 245) {
       dogSx = 5;
   }
   else {
       dogSx += 60;
   }
   dogX += 20;
   //Redraw Background
   bg();
   //Dog Image
   ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);

   if ((dogX)%60===0) {
       // ctx.drawImage(dhImage,0,272,75,125,50,225,500,600);
       sniff = 0;
       move = false;
   } else if (dogX > 360) {

   }
}

function dogSniff() {
    if (dogSx === 185) {
        dogSx = 245;
        sniff++;
        bg();
        ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
    } else if (sniff === 3) {
        move = true;
    } else if (dogSx === 245) {
        dogSx = 185;
        bg();
        ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
    }
}

// dhImage.onload = function() {
//     ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
//     do {
//         var dogMove = function() {
//             ctx.clearRect(dogX, 460, 100, 81);
//             if (dogSx >= 240) {
//                 dogSx = 5;
//             }
//             else {
//                 dogSx += 60;
//             }
//             dogX += 20;
//             //Redraw Background
//             ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
//             //Dog Image
//             ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
//         };
//         var looptimer = setTimeout(dogMove(),20000);
//     } while (dogX <= 400);
// };
// ctx.drawimage();


dhImage.onload = function() {
    bg();
    move = true;
    animateMove();


};
