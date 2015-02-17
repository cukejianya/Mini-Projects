// Your work goes here...
var my_canvas = document.getElementById('game');
var ctx = my_canvas.getContext('2d');
ctx.beginPath();
ctx.fillStyle = "#C96A1B";
ctx.fillRect(0,500,800,100);
var dhImage = new Image();
dhImage.src = 'assets/duckhunt.png';
var dogSx = 5;
var dogX = 20;
var sniff = 0;
var loopMove, loopSniff;
/*dhImage.onload = function() {
    ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
    do {
        var dogMove = function() {
            ctx.clearRect(dogX, 460, 100, 81);
            if (dogSx >= 240) {
                dogSx = 5;
            }
            else {
                dogSx += 60;
            }
            dogX += 20;
            //Redraw Background
            ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
            //Dog Image
            ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
        };
        var looptimer = setTimeout(dogMove(),20000);
    } while (dogX <= 400);
};
ctx.drawimage();*/

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
dhImage.onload = function() {
    ctx.drawImage(dhImage,0,272,75,125,50,225,200,333);
    ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
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
        ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
        //Dog Image
        ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
        if () {
            ctx.drawImage(dhImage,0,272,75,125,50,225,500,600);
            window.clearTimeout(loopMove);
            /*dogSniff();*/
        }
        else if (dogX < 360) {
            loopMove = setTimeout(dogMove,100);
        }
        
    }
    dogMove();
    /*function dogSniff() {
        if (dogSx === 185) {
            dogSx = 245;
            sniff += 1;
            ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
            ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
            
        } else if (sniff === 3) {
            window.clearTimeout(loopSniff);
            dogMove();
        } else if (dogSx === 245) {
            dogSx = 185;
            ctx.drawImage(dhImage,0,720,800,180,0,380,800,180);
            ctx.drawImage(dhImage,dogSx,1,59,43,dogX,460,100,81);
        }
    loopSniff = setTimeout(dogSniff, 100);
    }*/
};
