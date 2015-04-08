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

var canvas, ctx, dhImage, dogSx, dogX, sniffNum, sniff, bg, move, fps, dogMove, dogSniff, frame, dogY, i;


initDraw();


function begin() {
  if (move) {
    dogMove();
  } else if(sniff) {
    dogSniff();
  } else {
    dogJump();
  }
}

function game(){

}



function initDraw() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = "#87CEEB";
  ctx.fillStyle = "#C96A1B";
  dhImage = new Image();
  dhImage.src = 'assets/duckhunt.png';

  fps = 15;
  dogSx = 5;
  dogX = 20;
  sniffNum = 0;
  bg = function(){
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0,0,800,600);
    ctx.fillStyle = "#C96A1B";
    ctx.fillRect(0,500,800,100);
    ctx.drawImage(dhImage,0,272,75,125,50,130,200,333);
    ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
  };
}

function animateMove() {
    setTimeout(function(){
        requestAnimFrame( animateMove );
        begin();
    }, 1000/fps);
}

function play() {
  setTimeout(function(){
      requestAnimFrame( play );
      game();
  }, 1000/fps)
}




function dogMove() {
   ctx.clearRect(dogX, 460, 130, 105);
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
   ctx.drawImage(dhImage,dogSx,1,59,43,dogX,440,130,105);

   if ((dogX)%60===0) {
       // ctx.drawImage(dhImage,0,272,75,125,50,225,500,600);
       move = false;
       dogSx = 185;
       sniffNum = 0;
       // move = false;
   } else if (dogX > 300) {
      move = false;
      sniff = false;
      i = 0;
   }
}

function dogSniff() {
    if (dogSx === 185) {
        dogSx = 245;
        sniffNum++;
        bg();
        ctx.drawImage(dhImage,dogSx,1,59,43,dogX,440,130,105);
    } else if (sniffNum === 3) {
        move = true;
    } else if (dogSx === 245) {
        dogSx = 185;
        bg();
        ctx.drawImage(dhImage,dogSx,1,59,43,dogX,440,130,105);
    }
}

function dogJump(){
  bg();

  switch(frame) {
    case 0:
      dogSx = 5;
      dogY = 440;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,130,105);
      dogSx=65
      break;
    case 1:
      dogY-=20;
      dogX+=5;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,130,105);
      break;
    case 2:
      dogY-=20;
      dogX+=5;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,130,105);
      break;
    case 3:
      dogY-=20;
      dogX+=5;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,130,105);
      break;
    case 4:
      dogY-=20;
      dogX+=5;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,130,105);
      break;
    case 5:
      dogSx = 130;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,130,105);
      ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
      break;
    case 6:
      dogY+=20;
      dogX+=5;
      ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,124,100);
      ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
      break;
    // case 7:
    //   dogY+=20;
    //   dogX+=5;
    //   ctx.drawImage(dhImage,dogSx,59,55,50,dogX,dogY,120,97);
    //   ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
    //   break;
    default:
      window.cancelAnimationFrame(requestAnimFrame( animateMove ));
      break;
  }
  if (i<10) {
      i++;
  } else {
      frame++;
  }
}

function flyingbird() {

}


dhImage.onload = function() {
    bg();
    sniff = true;
    move = true;
    frame = 0;
    animateMove();
    // playGame();

};
