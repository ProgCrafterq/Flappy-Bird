// Get canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// Canvas size
canvas.width = 256;
canvas.height = 512;


// Image
let bird = new Image();
bird.src = "img/bird.png";
let back = new Image();
back.src = "img/back.png";
let pipeBot = new Image();
pipeBot.src = "img/pipeBottom.png";
let pipeTop = new Image();
pipeTop.src = "img/pipeUp.png";
let road = new Image();
road.src = "img/road.png";
// Sound
let sound_fly = new Audio();
sound_fly.src = "audio/fly.mp3";
let sound_score = new Audio();
sound_score.src = "audio/score.mp3";

let score_text = document.getElementById("score");
let best_score_text = document.getElementById("best_score");
// Variables for bird
let score = 0;
let best_score = 0;
let gap = 120;
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: Math.floor(Math.random()* pipeTop.height) - pipeTop.height


}

let posX = 10;
let posY = 150;
let gravity = 0.2;
let velY = 1;
// Main Function
function draw()
{

    ctx.drawImage(back,0,0);
    ctx.drawImage(bird,posX,posY);
    if(posY + bird.height >= canvas.height - road.height) {
        reload();
    }

    velY += gravity;
    posY += velY;
    
    for( let i = 0; i<pipe.length; i++)

    {
        if(pipe[i].x < -pipeTop.width)
        {
            pipe.shift()
        }else {
            ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y );
            ctx.drawImage(pipeBot,pipe[i].x, pipe[i].y + pipeTop.height + gap);
            pipe[i].x -= 2;
            if(pipe[i].x == 80)
            {
                pipe.push({
                    x: canvas.width,
                    y: Math.floor(Math.random()* pipeTop.height) - pipeTop.height
                });
            }
    
        }
        if(posX + bird.width >= pipe[i].x && 
            posX <= pipe[i].x + pipeTop.width &&
            (posY <= pipe[i].y + pipeTop.height ||
             posY + bird.height >= pipe[i].y + pipeTop.height + gap ))
             {
                
                reload()

             }
             if(pipe[i].x == 0){
                score++;
                sound_score.play();
            }

    }
    ctx.drawImage(road,0,canvas.height - road.height);
    score_text.innerText = "SCORE:" + score;
    best_score_text.innerText = "BEST_SCORE:" + best_score;

}
document.addEventListener("keydown", 
function (event)
{
    if(event.code == "Space" )
    {
        moveUp()
    }
});




//Fly function
function moveUp()
{
    velY = -4;
    sound_fly.play();

}
function reload()
{
    if(score > best_score)
    {
        best_score = score;
    }
    posX = 10;
    posY = 150;
    velY = 1;
    score = 0;
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: Math.floor(Math.random()* pipeTop.height) - pipeTop.height
    
    
    }

}
setInterval(draw, 20);
