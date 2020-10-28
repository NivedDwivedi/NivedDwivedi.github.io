const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// canvas.width = document.body.clientWidth; //document.width is obsolete
// canvas.height = document.body.clientHeight; //document.height is obsolete
// canvasW = canvas.width;
// canvasH = canvas.height;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width=600;
// canvas.height=500;
console.log(canvas.width, canvas.height);

function ballParameters(){
  this.ballRadius=10;
  this.xAxis = canvas.width/2;
  this.yAxis = canvas.height-30;
  this.dx = 5.5;
  this.dy = -5.5;
}
const BALL = new ballParameters();(canvas.height/2)/20;  

function bricksParameter(){
  this.brickRowCount = parseInt((canvas.width-200)/75);
  this.brickColumnCount = parseInt((canvas.height/2-150)/20);
  this.brickWidth = 75;
  this.brickHeight = 20;
  this.brickPadding = 0.2;
  this.brickOffsetTop = 100;
  this.brickOffsetLeft = 90;
  this.brickCount= 0;
}
const BRICKS = new bricksParameter();

console.log(BRICKS.brickColumnCount,BRICKS.brickRowCount);
function paddleParameters(){
  this.paddleHeight = 10;
  this.paddleWidth =canvas.width*0.11;
  this.paddleX = (canvas.width-this.paddleWidth)/2;
  this.rightPressed = false;
  this.leftPressed = false;
}
const PADDLE = new paddleParameters();


let paddleColor="#fffeff";
function gameParameter(){
  this.score = 0;
  this.lives = 2;
  this.level = 1;
  this.temp=0;
}
const GAME = new  gameParameter();

function randomValues(){
  this.randomY=Math.floor((Math.random() * 9) + 1);
  this.randomX=Math.floor((Math.random() * 5) + 1);
}
const RANDOM = new randomValues();

function bonusLive(){
  this.xl=(canvas.width/2)-20,
  this.yl=0;
  this.xl1=(canvas.width/2)-20,
  this.yl1=0;
  this.xl2=(canvas.width/2)-20,
  this.yl2=0;
  this.statusl=0;
  this.statusl1=0;
  this.statusl2=0;
  
}
const BONUS = new bonusLive();

function asset(){
  this.extraLife=new Image();
  this.extraLife.src='asset/Extra Life.png';
  this.expandPaddle=new Image();
  this.expandPaddle.src='asset/Expand Paddle.png';
  this.shrinkPaddle=new Image();
  this.shrinkPaddle.src='asset/Shrink paddle.png';
  this.scoreImage= new Image();
  this.scoreImage.src='asset/score.png';
  this.livesImage= new Image();
  this.livesImage.src='asset/lives.png';
}
const ASSET = new asset();



function drawBrickForLive() {
  ctx.drawImage(ASSET.extraLife, BONUS.xl,BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  // ctx.fillText(GAME.score, 50, 30);
  BONUS.yl+=2;
  if(BONUS.statusl==0)
  {
    if((BONUS.xl+20>=PADDLE.paddleX && BONUS.xl<=PADDLE.paddleX+PADDLE.paddleWidth) && (BONUS.yl+40<=canvas.height && BONUS.yl+40>=canvas.height-10))
    {
      lifeupSound.play();
      GAME.lives++;
      BONUS.statusl=1;
      GAME.score+=20;
      BONUS.yl=canvas.height;
      paddleColor="#fffeff"
    }
  }
  
}

function powerUps1(){
  
    ctx.drawImage(ASSET.expandPaddle,BONUS.xl1+30,BONUS.yl1);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    // ctx.fillText(GAME.score, 50, 30);
    BONUS.yl1+=2;
    if(BONUS.statusl1==0)
    {
      if((BONUS.xl1+20>=PADDLE.paddleX && BONUS.xl1<=PADDLE.paddleX+PADDLE.paddleWidth) && (BONUS.yl1+40<=canvas.height && BONUS.yl1+40>=canvas.height-10))
      {
        lifeupSound.play();
        GAME.lives++;
        BONUS.statusl1=1;
        GAME.score+=20;
        BONUS.yl1=canvas.height;
        PADDLE.paddleWidth+=PADDLE.paddleWidth/2; 
        setTimeout(function(){ 
        PADDLE.paddleWidth-=PADDLE.paddleWidth/2;  }, 15000);
    }
  }

 
}


function powerUps2(){
  
  ctx.drawImage(ASSET.shrinkPaddle,BONUS.xl2-30,BONUS.yl2);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  // ctx.fillText(GAME.score, 50, 30);
  BONUS.yl2+=2;
  if(BONUS.statusl2==0)
  {
    if((BONUS.xl2+20>=PADDLE.paddleX && BONUS.xl2<=PADDLE.paddleX+PADDLE.paddleWidth) && (BONUS.yl2+40<=canvas.height && BONUS.yl2+40>=canvas.height-10))
    {
      lifeupSound.play();
      GAME.lives++;
      BONUS.statusl2=1;
      GAME.score+=20;
      BONUS.yl2=canvas.height;
      let width=PADDLE.paddleWidth;
      PADDLE.paddleWidth-=PADDLE.paddleWidth/2; 
      setTimeout(function(){ 
      PADDLE.paddleWidth+=PADDLE.paddleWidth/2;  }, 15000);
    }
  }


}
  


let bricks = [];
for(let c=0; c<BRICKS.brickColumnCount; c++) {
  bricks[c] = [];
  for(let r=0; r<BRICKS.brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 2 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        PADDLE.rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        PADDLE.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        PADDLE.rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        PADDLE.leftPressed = false;
    }
}

// function mouseMoveHandler(e) {
//   let relativeX = e.clientX-canvas.offsetLeft;
//   if(relativeX<0)
//   {
//     relativeX = PADDLE.paddleWidth/2;
//   }
//   else if(relativeX > canvas.width-PADDLE.paddleWidth)
//   {
//     relativeX = canvas.width-PADDLE.paddleWidth;
//   }
//   else if(relativeX > 0 && relativeX < canvas.width ) {
//     PADDLE.paddleX = relativeX-PADDLE.paddleWidth;
//   }
// }


function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    PADDLE.paddleX = relativeX - PADDLE.paddleWidth;
  }
}



let brickSound=new Audio();
brickSound.src='asset/sounds/brick.m4a';
let brickExplosionSound=new Audio();
brickExplosionSound.src='asset/explosion.wav';

let lifeupSound=new Audio();
lifeupSound.src='asset/sounds/powerup.m4a';

let paddleSound=new Audio();
paddleSound.src='asset/sounds/paddle.m4a';

let wallSound=new Audio();
wallSound.src='asset/sounds/wall.m4a';

// function increase()
// {
//   PADDLE.paddleWidth+=50;
// }





function collisionDetection() {  
    if(GAME.level==1){
      for(let column=0; column<BRICKS.brickColumnCount; column++) {
        for(let row=0; row<BRICKS.brickRowCount; row++) {
          let b = bricks[column][row];
          if(b.status == 2) {
            if(BALL.xAxis >= b.x && BALL.xAxis <= b.x+BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y+BRICKS.brickHeight) {
              brickSound.play();
              BALL.dy = -BALL.dy;
              b.status = 1;
              GAME.score++;
            }
          }else{
            if(b.status == 1) {
              if(BALL.xAxis >= b.x && BALL.xAxis <= b.x+BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y+BRICKS.brickHeight) {
                brickExplosionSound.play();
                GAME.score++;
                BALL.dy = -BALL.dy;
                b.status = 0;
                BRICKS.brickCount++;
                GAME.score++;
                if(BRICKS.brickCount == BRICKS.brickRowCount*BRICKS.brickColumnCount) {
                  alert("YOU WIN, CONGRATS!");
                  GAME.level=2;
                  // document.location.reload();
                  draw();
                  
                }
              }
            }
          }
          
        }
      }
    }



 //level 2


  if(GAME.level==2){
    for(let column=0; column<BRICKS.brickColumnCount; column++) {
      for(let row=0; row<BRICKS.brickRowCount; row++) {
        let b = bricks[column][row];
        if(b.status == 2) {
          if(BALL.xAxis >= b.x && BALL.xAxis <= b.x+BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y+BRICKS.brickHeight) {
            if(row==13)
            {
              for(let i=0;i<BRICKS.brickColumnCount;i++)
              {
                let bt = bricks[i][row];
                bt.status=0;
                let bt1 = bricks[i][row-1];
                bt.status=0;
                let bt2 = bricks[i][row+1];
                bt.status=0;

              }
              
            }
            brickSound.play();
            BALL.dy = -BALL.dy;
            if(b.status==2)
            {
              b.status = 1;
            }
            
            GAME.score++;
          }
        }else{
          if(b.status == 1) {
            if(BALL.xAxis-BALL.ballRadius >= b.x && BALL.xAxis+BALL.ballRadius <= b.x+BRICKS.brickWidth && BALL.yAxis+BALL.ballRadius>= b.y && BALL.yAxis-BALL.ballRadius <= b.y+BRICKS.brickHeight) {
              brickExplosionSound.play();
              GAME.score++;
              BALL.dy = -BALL.dy;
              b.status = 0;
              BRICKS.brickCount++;
              console.log(BRICKS.brickCount);
              GAME.score++;
              if(BRICKS.brickCount == BRICKS.brickRowCount*BRICKS.brickColumnCount) {
               
                GAME.level=3;
              }
            }
          }
        }
        
      }
    }
  }
//level 3
  if(GAME.level==3){
    for(let column=0; column<BRICKS.brickColumnCount; column++) {
        for(let row=0; row<BRICKS.brickRowCount; row++) {
          let b = bricks[column][row];
          if(b.status==3)
          {
            if(BALL.xAxis >= b.x && BALL.xAxis <= b.x+BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y+BRICKS.brickHeight) {
              brickSound.play();
              BALL.dy = -BALL.dy;
              // GAME.score++;
            }
          }
          if(b.status == 2) {
            if(BALL.xAxis >= b.x && BALL.xAxis <= b.x+BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y+BRICKS.brickHeight) {
              brickSound.play();
              BALL.dy = -BALL.dy;
              if(column==BRICKS.brickColumnCount-1)
              {

              }
              else
              {
                b.status = 1;
              }
              
              GAME.score++;
            }
          }else{
            if(b.status == 1) {
              if(BALL.xAxis >= b.x && BALL.xAxis <= b.x+BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y+BRICKS.brickHeight) {
                brickExplosionSound.play();
                GAME.score++;
                BALL.dy = -BALL.dy;
                b.status = 0;
                BRICKS.brickCount++;
                
                // if(column==randomX && row==randomY)
                // {
                //   increase();
                //   paddleColor="#177fdc";
                // }
                // if(column==BRICKS.brickColumnCount-1)
                // {
                //   increase();
                //   paddleColor="#fffeff";
                // }
                GAME.score++;
                if(BRICKS.brickCount == BRICKS.brickRowCount*BRICKS.brickColumnCount) {
                  alert("YOU WIN, CONGRATS!");
                  document.location.reload();
                }
            }
          }
        }  
      }
    }
  }
}
    





function drawBall() {
  ctx.beginPath();
  let gradient = ctx.createRadialGradient(BALL.xAxis, BALL.yAxis, 1.6, BALL.xAxis, BALL.yAxis,8.2);
  gradient.addColorStop(0, 'white');           
  gradient.addColorStop(1, 'black');
  ctx.fillStyle = gradient;
  ctx.arc(BALL.xAxis, BALL.yAxis, BALL.ballRadius, 0, Math.PI*2);
  // ctx.arc(90, 90, 60, 0, 2 * Math.PI);
  // ctx.fillStyle = "#0943d4";
  ctx.fill();
  ctx.closePath();
}



function drawPaddle() {
  ctx.beginPath();
  let gradient = ctx.createRadialGradient(PADDLE.paddleX, 570, 120, PADDLE.paddleX, 570, 9);
  gradient.addColorStop(0, '#e5d9dd');           
  gradient.addColorStop(1, 'rgba(194, 194, 192,0.5)');
  ctx.fillStyle = gradient;
  ctx.rect(PADDLE.paddleX, canvas.height-PADDLE.paddleHeight, PADDLE.paddleWidth, PADDLE.paddleHeight);
  // ctx.fillStyle =paddleColor;
  ctx.fill();
  ctx.closePath();
}



function drawBricks() {
  if(GAME.level==1)
  {
    for(let c=0; c<BRICKS.brickColumnCount; c++)
    {
      for(let r=0; r<BRICKS.brickRowCount; r++) 
      {
        if(bricks[c][r].status == 2) 
        {
          let brickX = (r*(BRICKS.brickWidth+BRICKS.brickPadding))+BRICKS.brickOffsetLeft;
          let brickY = (c*(BRICKS.brickHeight+BRICKS.brickPadding))+BRICKS.brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#8c3424');           
            gradient.addColorStop(1, '#a23c2a');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            ctx.fill();
            ctx.closePath(); 
        }
        else
        {
          if(bricks[c][r].status == 1) 
          {
            let brickX = (r*(BRICKS.brickWidth+BRICKS.brickPadding))+BRICKS.brickOffsetLeft;
            let brickY = (c*(BRICKS.brickHeight+BRICKS.brickPadding))+BRICKS.brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#cb4b34');           
            gradient.addColorStop(1, '#d05d49');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
  }

//level 2
  if(GAME.level==2){
    for(let c=0; c<BRICKS.brickColumnCount; c++) {
      for(let r=0; r<BRICKS.brickRowCount; r++) {
        if(bricks[c][r].status == 2) {
          let brickX = (r*(BRICKS.brickWidth+BRICKS.brickPadding))+BRICKS.brickOffsetLeft;
          let brickY = (c*(BRICKS.brickHeight+BRICKS.brickPadding))+BRICKS.brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          
          if(r==0 ||c==0 || r>BRICKS.brickRowCount || c+1>BRICKS.brickColumnCount)
          {
            if((r%2==0 && r!=0 )|| (c==0 && r==0) || (r == 0 && c+1>=BRICKS.brickColumnCount))
            {

            
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#8c3424');           
            gradient.addColorStop(1, '#a23c2a');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#8c3424";
            ctx.fill();
            ctx.closePath();
            } 
          }
          else if(r%2==0)
          {

          }
          else{
            if(r==13)
            {
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#ff3300');           
            gradient.addColorStop(1, '#cc2900');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#cb4b34";
            ctx.fill();
            ctx.closePath(); 
            }
            else{
              ctx.beginPath();
              let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
              gradient.addColorStop(0, '#8c3424');           
              gradient.addColorStop(1, '#a23c2a');
              ctx.fillStyle = gradient;
              ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
              // ctx.fillStyle = "#8c3424";
              ctx.fill();
              ctx.closePath();
            }
           
          }
          
        }
        else
        {
          if(bricks[c][r].status == 1) {
            let brickX = (r*(BRICKS.brickWidth+BRICKS.brickPadding))+BRICKS.brickOffsetLeft;
            let brickY = (c*(BRICKS.brickHeight+BRICKS.brickPadding))+BRICKS.brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
  
            
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#cb4b34');           
            gradient.addColorStop(1, '#d05d49');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#cb4b34";
            ctx.fill();
            ctx.closePath();
          }
        }
        
      }
    }
  }



//level 3
if(GAME.level==3)
{
    for(let c=0; c<BRICKS.brickColumnCount; c++) 
    {
      for(let r=0; r<BRICKS.brickRowCount; r++) 
      {
        if(bricks[c][r].status == 2) 
        {
          let brickX = (r*(BRICKS.brickWidth+BRICKS.brickPadding));
          let brickY = (c*(BRICKS.brickHeight+BRICKS.brickPadding))+BRICKS.brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          if(c==BRICKS.brickColumnCount-1)
          {
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#ffbf00');           
            gradient.addColorStop(1, ' #cc9900');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#8c3424";
            ctx.fill();
            ctx.closePath();
            
            // ctx.beginPath();
            // ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#d409ce";
            // ctx.fill();
            // ctx.closePath(); 
          }
          else
          {
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#8c3424');           
            gradient.addColorStop(1, '#a23c2a');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#8c3424";
            ctx.fill();
            ctx.closePath();
          }
          
        }
        else
        {
          if(bricks[c][r].status == 1) 
          {
            let brickX = (r*(BRICKS.brickWidth+BRICKS.brickPadding));
            let brickY = (c*(BRICKS.brickHeight+BRICKS.brickPadding))+BRICKS.brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
  
            if(r==7)
            {
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#cb4b34');           
            gradient.addColorStop(1, '#d05d49');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#cb4b34";
            ctx.fill();
            ctx.closePath(); 
            }
  
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(brickX, brickY, 23, brickX, brickY, 29);
            gradient.addColorStop(0, '#cb4b34');           
            gradient.addColorStop(1, '#d05d49');
            ctx.fillStyle = gradient;
            ctx.rect(brickX, brickY, BRICKS.brickWidth, BRICKS.brickHeight);
            // ctx.fillStyle = "#cb4b34";
            ctx.fill();
            ctx.closePath();
          }
        }
        
      }
    }
  }
}














 
function drawScore() {
  ctx.drawImage(ASSET.scoreImage, 5,10);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#fffeff";
  ctx.fillText(GAME.score, 50, 30);
}


function drawLives() {
  let x=canvas.width-65;
  let y=5;
  for(let i=0;i<GAME.lives;i++)
  {
    ctx.drawImage(ASSET.livesImage, x,y);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    x-=40;
  }
  
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  if(GAME.score>=3)
  {
    powerUps2();
  }
  if(GAME.score>=90)
  {
    powerUps1();
  }
  
  
  if(GAME.score>=(BRICKS.brickColumnCount*BRICKS.brickRowCount))
  {
    drawBrickForLive();
  }
  // drawBrickForLive();
  
 
  if(BALL.xAxis + BALL.dx >= canvas.width-BALL.ballRadius || BALL.xAxis + BALL.dx <= BALL.ballRadius) {
    wallSound.play();
    BALL.dx = -(BALL.dx);
  }
  if(BALL.yAxis + BALL.dy - BRICKS.brickOffsetTop/2<= BALL.ballRadius) {
    wallSound.play();
    BALL.dy = -BALL.dy;
  }
  else if(BALL.yAxis + BALL.dy >= canvas.height-BALL.ballRadius) {
    if(BALL.xAxis+BALL.ballRadius>= PADDLE.paddleX && BALL.xAxis-BALL.ballRadius < PADDLE.paddleX + PADDLE.paddleWidth/2 ) {
      paddleSound.play();
      BALL.dy = -BALL.dy;
      if(BALL.dx>0 && BALL.dy<0 )
      {
        BALL.dx= -BALL.dx;
      }
      
    }
    else if(BALL.xAxis >= PADDLE.paddleX+PADDLE.paddleWidth/2 && BALL.xAxis-BALL.ballRadius <= PADDLE.paddleX + PADDLE.paddleWidth)
    {
      paddleSound.play();
      BALL.dy = -BALL.dy; 
      if(BALL.dy<0 && BALL.dx<0)
      {
        BALL.dx= -BALL.dx;
      }
     
    }
    else {
      GAME.lives--;
     
      if(!GAME.lives) {
        alert("Game Over");
        document.location.reload();
      }
      else {
        if(GAME.lives>0)
        {
          alert("Live remaining: "+GAME.lives);
        }
        
        BALL.xAxis = canvas.width/2;
        BALL.yAxis = canvas.height-30;
        BALL.dx = 8.5;
        BALL.dy = -8.5;
        PADDLE.paddleX = (canvas.width)/2-PADDLE.paddleWidth;
      }
    }
  }

  if(PADDLE.rightPressed && PADDLE.paddleX < canvas.width-PADDLE.paddleWidth) {
    PADDLE.paddleX += 7;
  }
  else if(PADDLE.leftPressed && PADDLE.paddleX > 0) {
    PADDLE.paddleX -= 7;
  }
  
  // if(temp==0)
  // {
  //   Object.addEventListener("keypress", start());
  //   BALL.yAxis += BALL.dy;
  //   temp=-1;
  // }

//   if(GAME.temp==0)
// {
//   document.addEventListener('keypress', draw());
//   BALL.xAxis += BALL.dx;
//   BALL.yAxis += BALL.dy;
//   GAME.temp=1;
// }
// else{
//   BALL.xAxis += BALL.dx;
//   BALL.yAxis += BALL.dy;
//   requestAnimationFrame(draw);
// }

BALL.xAxis += BALL.dx;
  BALL.yAxis += BALL.dy;
  requestAnimationFrame(draw);
  
  
}

// if(GAME.temp==0)
// {
//   alert('press any key to start the game');
//   document.body.addEventListener('keypress', draw());
// }

draw();