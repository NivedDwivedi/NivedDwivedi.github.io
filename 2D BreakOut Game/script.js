const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// canvas.width = document.body.clientWidth; //document.width is obsolete
// canvas.height = document.body.clientHeight; //document.height is obsolete
// canvasW = canvas.width;
// canvasH = canvas.height;

// if("orientation" in screen) {
//   if(document.documentElement.requestFullscreen) 
//   {
//     document.documentElement.requestFullscreen();
//   } 
//   else if( document.documentElement.mozRequestFullscreen ) 
//   {
//     document.documentElement.mozRequestFullscreen();
//   } 
//   else if( document.documentElement.webkitRequestFullscreen ) {
//     document.documentElement.webkitRequestFullscreen();
//   } 
//   else {
//     document.documentElement.msRequestFullscreen();
//   } 

//   screen.orientation.lock('landscape-primary');
// }

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width=600;
// canvas.height=500;
  

function ballParameters() {
  this.ballRadius = 10;
  this.xAxis = canvas.width / 2;
  this.yAxis = canvas.height - 10 - this.ballRadius;
  this.dx = 7.5;
  this.dy = -7.5;
}
const BALL = new ballParameters(); (canvas.height / 2) / 20;

function bricksParameter() {
  this.brickRowCount = parseInt((canvas.width - 180) / 75);
  this.brickColumnCount = parseInt((canvas.height / 2 - 150) / 25);
  if (canvas.width <= 360 || canvas.height <= 660) {

    this.brickRowCount = parseInt((canvas.width - 180) / 75);
    this.brickColumnCount = parseInt((canvas.height / 2 - 150) / 25);
  }
  // this.brickRowCount = 1;
  // this.brickColumnCount = 1;
  this.brickWidth = 75;
  this.brickHeight = 25;
  this.brickPadding = 0.5;
  this.brickOffsetTop = 100;
  this.brickOffsetLeft = 90;
  this.brickCount = 0;
}
const BRICKS = new bricksParameter();

function paddleParameters() {
  this.paddleHeight = 10;
  this.paddleWidth = canvas.width * 0.11;
  this.paddleX = (canvas.width - this.paddleWidth) / 2;
  this.rightPressed = false;
  this.leftPressed = false;
}
const PADDLE = new paddleParameters();


let paddleColor = "#fffeff";
function gameParameter() {
  this.score = 0;
  this.lives = 2;
  this.level = 1;
  this.temp = 0;
  this.timer;
  this.powerupFunction = 0;
  this.point = 1;

}
const GAME = new gameParameter();

function randomValues() {
  this.randomY = Math.floor((Math.random() * 9) + 1);
  this.randomX = Math.floor((Math.random() * 5) + 1);
  this.timer = 0;
  this.temp = 0;
}
const RANDOM = new randomValues();

function bonusLive() {
  this.xl = (canvas.width / 2) - 20,
    this.yl = 0;
  this.xl1 = (canvas.width / 2) - 20,
    this.yl1 = 0;
  this.xl2 = (canvas.width / 2) - 20,
    this.yl2 = 0;
  this.statusl = 0;
  this.statusl1 = 0;
  this.statusl2 = 0;

}
const BONUS = new bonusLive();

function asset() {
  this.extraLife = new Image();
  this.extraLife.src = 'asset/Extra Life.png';
  this.expandPaddle = new Image();
  this.expandPaddle.src = 'asset/Expand Paddle.png';
  this.shrinkPaddle = new Image();
  this.shrinkPaddle.src = 'asset/Shrink paddle.png';
  this.scoreImage = new Image();
  this.scoreImage.src = 'asset/score.png';
  this.livesImage = new Image();
  this.livesImage.src = 'asset/lives.png';
  this.doublePointImage = new Image();
  this.doublePointImage.src = 'asset/Double Point.png';
  this.killPaddleImage = new Image();
  this.killPaddleImage.src = 'asset/kill Paddle.png';
  this.fireBallImage = new Image();
  this.fireBallImage.src = 'asset/Fire Ball.png';
  this.levelWrapImage = new Image();
  this.levelWrapImage.src = "asset/level wrap.png";
  this.ExplosionAnimation = new Image();
  this.ExplosionAnimation.src = 'asset/explosion_animation.gif';
}
const ASSET = new asset();


let color = 'black';
let isfireballActive = false;
function reset() {
  GAME.timer = undefined;
  bricks = [];
  createBricks();
  BRICKS.brickCount = 0;
  BALL.xAxis = canvas.width / 2;
  BALL.yAxis = canvas.height - 10 - BALL.ballRadius;
  PADDLE.paddleWidth = canvas.width * 0.11;
  PADDLE.paddleX = (canvas.width - PADDLE.paddleWidth) / 2;
}

function powerupReset() {
  BONUS.xl = (canvas.width / 2) - 20;
  BONUS.yl = canvas.height;
  BONUS.statusl = 0;
  GAME.timer = undefined;
  GAME.powerupFunction = 0;
}


function Powerups(x, y) {
  
  if (GAME.timer) {
   
    return;
  }
  
  GAME.timer = setTimeout(() => {}, 9000);
  
  switch (Math.floor(Math.random() * 7) + 1) {

    case 1:
      BONUS.xl = x, BONUS.yl = y;
      GAME.powerupFunction = 1;
      break;
    case 2:
      GAME.powerupFunction = 2;
      BONUS.xl = x, BONUS.yl = y;
      break;
    case 3:
      GAME.powerupFunction = 3;
      BONUS.xl = x, BONUS.yl = y;
      break;
    case 4:
      GAME.powerupFunction = 4;
      BONUS.xl = x, BONUS.yl = y;
      break;
    case 5:
      GAME.powerupFunction = 5;
      BONUS.xl = x, BONUS.yl = y;
      break;
    case 6:
      GAME.powerupFunction = 6;
      BONUS.xl = x, BONUS.yl = y;
      break;
    case 7:
      GAME.powerupFunction = 7;
      BONUS.xl = x, BONUS.yl = y;
      break;
  }

}

//powerup 1
function extraLive() {
  ctx.drawImage(ASSET.extraLife, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";

  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      GAME.lives++;
      PADDLE.width += PADDLE.width / 2;
      GAME.score += 110;
      powerupReset();
    }
    if (BONUS.yl + 40 >= canvas.height) {
      powerupReset();
    }
  }
}
//powerup 2
function expandPaddle() {
  ctx.drawImage(ASSET.expandPaddle, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      GAME.score += 20;
      PADDLE.paddleWidth += PADDLE.paddleWidth / 2;
      powerupReset();
    }
    if (BONUS.yl + 40 >= canvas.height) {
      powerupReset();
    }
  }
}

//powerup 3
function shrinkPaddle() {
  ctx.drawImage(ASSET.shrinkPaddle, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      if (GAME.score - 20 > 0) {
        GAME.score2 -= 20;
      }
      else {
        GAME.score = 0;
      }

      PADDLE.paddleWidth -= PADDLE.paddleWidth / 2;
      powerupReset();
    }
    if (BONUS.yl + 40 >= canvas.height) {
      powerupReset();
    }
  }
}

//powerup 4
function doublePoint() {
  ctx.drawImage(ASSET.doublePointImage, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      GAME.score += 20;
      GAME.point = 2;
      setTimeout(() => {
        GAME.point = 1;
      }, 10000);
      powerupReset();
    }
    if (BONUS.yl + 40 >= canvas.height) {
      powerupReset();
    }
  }
}

//powerup 5
function levelWrap() {
  ctx.drawImage(ASSET.levelWrapImage, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      GAME.score += 100;
      if (GAME.level + 1 < 4) {
        GAME.level += 1;
        reset();
      }
      else {
        alert("Congrats! You won!!");
        document.location.reload();
      }
      powerupReset();
    }
    if (BONUS.yl + 40 >= canvas.height) {
      powerupReset();
    }
  }
}

//powerup 6
function killLives() {
  ctx.drawImage(ASSET.killPaddleImage, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      if (GAME.score - 100 > 0) {
        GAME.score2 -= 100;
      }
      else {
        GAME.score = 0;
      }
      if (GAME.lives - 1 <= 0) {
        alert("Sorry, You lost");
        document.location.reload();
      }
      else {
        GAME.lives -= 1;
      }

      powerupReset();
    }
  }
  if (BONUS.yl + 40 >= canvas.height) {
    powerupReset();
  }
}

//powerup 7
function fireBall() {
  ctx.drawImage(ASSET.fireBallImage, BONUS.xl, BONUS.yl);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  BONUS.yl += 2;
  if (BONUS.statusl == 0) {
    if ((BONUS.xl + 20 >= PADDLE.paddleX && BONUS.xl <= PADDLE.paddleX + PADDLE.paddleWidth) && (BONUS.yl + 40 <= canvas.height && BONUS.yl + 40 >= canvas.height - 10)) {
      lifeupSound.play();
      GAME.score += 30;
      isfireballActive = true;
      color = 'red';
      setTimeout(() => {
        isfireballActive = false;
        color = ' black';
      }, 10000);
      powerupReset();
    }
  }
  if (BONUS.yl + 40 >= canvas.height) {
    powerupReset();
  }
}


let bricks = [];
function createBricks() {
  for (let c = 0; c < BRICKS.brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < BRICKS.brickRowCount; r++) {
      let random = Math.floor((Math.random() * 6) + 0);
      bricks[c][r] = { x: 0, y: 0, status: 2, isPowerup: false };
      if (random == 2) {
        bricks[c][r]["isPowerup"] = true;
      }
    }
  }
}
createBricks();


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove", touchHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    PADDLE.rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    PADDLE.leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    PADDLE.rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
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
  if (relativeX > 0 && relativeX < canvas.width) {
    PADDLE.paddleX = relativeX - PADDLE.paddleWidth;
  }
}

function touchHandler(e) {
  if (e.touches) {
    let relativeX = e.touches[0].clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      PADDLE.paddleX = e.touches[0].clientX - canvas.offsetLeft - PADDLE.paddleWidth / 2;
      e.preventDefault();
    }
  }
}



let brickSound = new Audio();
brickSound.src = 'asset/sounds/brick.m4a';
let brickExplosionSound = new Audio();
brickExplosionSound.src = 'asset/explosion.wav';

let lifeupSound = new Audio();
lifeupSound.src = 'asset/sounds/powerup.m4a';

let paddleSound = new Audio();
paddleSound.src = 'asset/sounds/paddle.m4a';

let wallSound = new Audio();
wallSound.src = 'asset/sounds/wall.m4a';







function collisionDetection() {
  if (GAME.level == 1) {
    for (let column = 0; column < BRICKS.brickColumnCount; column++) {
      for (let row = 0; row < BRICKS.brickRowCount; row++) {
        let b = bricks[column][row];
        if (b.status == 2) {
          if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
            brickSound.play();
            BALL.dy = -BALL.dy;
            if (isfireballActive) {
              b.status = 0;
              ctx.drawImage(ASSET.ExplosionAnimation, b.x, b.y);
              ctx.font = "24px Arial";
              ctx.fillStyle = "#0095DD";
            }
            else {
              b.status = 1;
            }

            GAME.score += GAME.point;
            
          }
        } else {
          if (b.status == 1) {
            if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
              brickExplosionSound.play();
              GAME.score += GAME.point;
              BALL.dy = -BALL.dy;
              b.status = 0;
              
              if (b.isPowerup) {
                Powerups(b.x, b.y);
                
              }

              BRICKS.brickCount++;
              GAME.score += GAME.point;
              if (BRICKS.brickCount == BRICKS.brickRowCount * BRICKS.brickColumnCount) {
                reset();
                GAME.level = 2;
                
              }
            }
          }
        }

      }
    }
  }

  //level 2
  if (GAME.level == 2) {
    for (let column = 0; column < BRICKS.brickColumnCount; column++) {
      for (let row = 0; row < BRICKS.brickRowCount; row++) {
        let b = bricks[column][row];
        if (b.status == 2) {
          if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
            brickSound.play();
            BALL.dy = -BALL.dy;
            let temp = 0;
            if (row == 13) {
              for (let i = 0; i < BRICKS.brickColumnCount; i++) {
                let bt = bricks[i][row];
                bt.status = 0;
                ctx.drawImage(ASSET.ExplosionAnimation, b.x, b.y);
              ctx.font = "24px Arial";
              ctx.fillStyle = "#0095DD";
              }
              temp = 1;
            }
            if (temp == 0) {
              if (isfireballActive) {
                b.status = 0;
              ctx.drawImage(ASSET.ExplosionAnimation, b.x, b.y);
              ctx.font = "24px Arial";
              ctx.fillStyle = "#0095DD"
              }
              else {
                b.status = 1;
              }
            }

            GAME.score += GAME.point;
          }
        } else {
          if (b.status == 1) {
            if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
              brickExplosionSound.play();
              GAME.score += GAME.point;
              BALL.dy = -BALL.dy;
              b.status = 0;
              BRICKS.brickCount++;
              if (b.isPowerup) {
                Powerups(b.x, b.y);
                
              }
              if (BRICKS.brickCount == BRICKS.brickRowCount * BRICKS.brickColumnCount) {
                reset();
                GAME.level = 3;
                
              }
            }
          }
        }

      }
    }
  }


  //level 3
  if (GAME.level == 3) {
    for (let column = 0; column < BRICKS.brickColumnCount; column++) {
      for (let row = 0; row < BRICKS.brickRowCount; row++) {
        let b = bricks[column][row];
        if (b.status == 3) {
          if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
            brickSound.play();
            BALL.dy = -BALL.dy;
          }
          if (isfireballActive) {
            b.status = 0;
          }

        }
        if (b.status == 2) {
          if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
            brickSound.play();
            BALL.dy = -BALL.dy;
            if (column == BRICKS.brickColumnCount - 1) { }
            else {
              b.status = 1;
            }

            GAME.score += GAME.point;
          }
        } else {
          if (b.status == 1) {
            if (BALL.xAxis >= b.x && BALL.xAxis <= b.x + BRICKS.brickWidth && BALL.yAxis >= b.y && BALL.yAxis <= b.y + BRICKS.brickHeight) {
              brickExplosionSound.play();
              GAME.score += GAME.point;
              BALL.dy = -BALL.dy;
              b.status = 0;
              BRICKS.brickCount++;
              if (b.isPowerup) {
                Powerups(b.x, b.y);
                
              }
              GAME.score += GAME.point;
              if (BRICKS.brickCount == BRICKS.brickRowCount * BRICKS.brickColumnCount) {
                alert("YOU WIN, CONGRATS! level 3");
                document.location.reload();
              }
            }
          }
        }
      }
    }
  }
}


//drawBall Function
function drawBall() {
  ctx.beginPath();
  let gradient = ctx.createRadialGradient(BALL.xAxis, BALL.yAxis, 1.6, BALL.xAxis, BALL.yAxis, 8.2);
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(1, color);
  ctx.fillStyle = gradient;
  ctx.arc(BALL.xAxis, BALL.yAxis, BALL.ballRadius, 0, Math.PI * 2);
  // ctx.arc(90, 90, 60, 0, 2 * Math.PI);
  // ctx.fillStyle = "#0943d4";
  ctx.fill();
  ctx.closePath();
}


//drawPaddle Function
function drawPaddle() {
  ctx.beginPath();
  let gradient = ctx.createRadialGradient(PADDLE.paddleX, 570, 120, PADDLE.paddleX, 570, 9);
  gradient.addColorStop(0, '#e5d9dd');
  gradient.addColorStop(1, 'rgba(194, 194, 192,0.5)');
  ctx.fillStyle = gradient;
  ctx.rect(PADDLE.paddleX, canvas.height - PADDLE.paddleHeight, PADDLE.paddleWidth, PADDLE.paddleHeight);
  // ctx.fillStyle =paddleColor;
  ctx.fill();
  ctx.closePath();
}



function drawBricks() {
  if (GAME.level == 1) {
    for (let c = 0; c < BRICKS.brickColumnCount; c++) {
      for (let r = 0; r < BRICKS.brickRowCount; r++) {
        if (bricks[c][r].status == 2) {
          let brickX = (r * (BRICKS.brickWidth + BRICKS.brickPadding)) + BRICKS.brickOffsetLeft;
          let brickY = (c * (BRICKS.brickHeight + BRICKS.brickPadding)) + BRICKS.brickOffsetTop;
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
        else {
          if (bricks[c][r].status == 1) {
            let brickX = (r * (BRICKS.brickWidth + BRICKS.brickPadding)) + BRICKS.brickOffsetLeft;
            let brickY = (c * (BRICKS.brickHeight + BRICKS.brickPadding)) + BRICKS.brickOffsetTop;
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
  if (GAME.level == 2) {
    for (let c = 0; c < BRICKS.brickColumnCount; c++) {
      for (let r = 0; r < BRICKS.brickRowCount; r++) {
        if (bricks[c][r].status == 2) {
          let brickX = (r * (BRICKS.brickWidth + BRICKS.brickPadding)) + BRICKS.brickOffsetLeft;
          let brickY = (c * (BRICKS.brickHeight + BRICKS.brickPadding)) + BRICKS.brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          if (r == 0 || c == 0 || r + 1 > BRICKS.brickRowCount || c + 1 >= BRICKS.brickColumnCount) {
            if ((r % 2 == 0 && r != 0) || (c == 0 && r == 0) || (r == 0 && c + 1 == BRICKS.brickColumnCount) || (r % 2 == 0 && c + 1 >= BRICKS.brickColumnCount)) {


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
          else if (r % 2 == 0) {

          }
          else {
            if (r == 13) {
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
            else {
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
        else {
          if (bricks[c][r].status == 1) {
            let brickX = (r * (BRICKS.brickWidth + BRICKS.brickPadding)) + BRICKS.brickOffsetLeft;
            let brickY = (c * (BRICKS.brickHeight + BRICKS.brickPadding)) + BRICKS.brickOffsetTop;
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
  if (GAME.level == 3) {
    for (let c = 0; c < BRICKS.brickColumnCount; c++) {
      for (let r = 0; r < BRICKS.brickRowCount; r++) {
        if (bricks[c][r].status == 2) {
          let brickX = (r * (BRICKS.brickWidth + BRICKS.brickPadding));
          let brickY = (c * (BRICKS.brickHeight + BRICKS.brickPadding)) + BRICKS.brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          if (c == BRICKS.brickColumnCount - 1) {
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
          else {
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
        else {
          if (bricks[c][r].status == 1) {
            let brickX = (r * (BRICKS.brickWidth + BRICKS.brickPadding));
            let brickY = (c * (BRICKS.brickHeight + BRICKS.brickPadding)) + BRICKS.brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;

            if (r == 7) {
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
  ctx.drawImage(ASSET.scoreImage, 5, 10);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#fffeff";
  ctx.fillText(GAME.score, 50, 30);
}


function drawLives() {
  let x = canvas.width - 65;
  let y = 5;
  for (let i = 0; i < GAME.lives; i++) {
    ctx.drawImage(ASSET.livesImage, x, y);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    x -= 40;
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
  if (GAME.powerupFunction == 1) {
    extraLive();
  }
  if (GAME.powerupFunction == 2) {
    expandPaddle();
  }
  if (GAME.powerupFunction == 3) {
    shrinkPaddle();
  }
  if (GAME.powerupFunction == 4) {
    doublePoint();
  }
  if (GAME.powerupFunction == 5) {
    killLives();
  }
  if (GAME.powerupFunction == 6) {
    levelWrap();
  }
  if (GAME.powerupFunction == 7) {
    fireBall();
  }
 

  if (BALL.xAxis + BALL.dx >= canvas.width - BALL.ballRadius || BALL.xAxis + BALL.dx <= BALL.ballRadius) {
    wallSound.play();
    BALL.dx = -(BALL.dx);
  }
  if (BALL.yAxis + BALL.dy - BRICKS.brickOffsetTop / 2 <= BALL.ballRadius) {
    wallSound.play();
    BALL.dy = -BALL.dy;
  }
  else if (BALL.yAxis + BALL.dy >= canvas.height - BALL.ballRadius) {
    // if(BALL.xAxis+BALL.ballRadius>= PADDLE.paddleX && BALL.xAxis-BALL.ballRadius < PADDLE.paddleX + PADDLE.paddleWidth/2 ) 
    // {
    //   paddleSound.play();
    //   BALL.dy = -BALL.dy;
    //   if(BALL.dx>0 && BALL.dy<0 )
    //   {
    //     BALL.dx= -BALL.dx;
    //   }

    // }
    // else if(BALL.xAxis >= PADDLE.paddleX+PADDLE.paddleWidth/2 && BALL.xAxis-BALL.ballRadius <= PADDLE.paddleX + PADDLE.paddleWidth)
    // {
    //   paddleSound.play();
    //   BALL.dy = -BALL.dy; 
    //   if(BALL.dy<0 && BALL.dx<0)
    //   {
    //     BALL.dx= -BALL.dx;
    //   }
    // }

    if (BALL.xAxis + BALL.ballRadius >= PADDLE.paddleX && BALL.xAxis - BALL.ballRadius < PADDLE.paddleX + PADDLE.paddleWidth) {
      paddleSound.play();
      let collidePoint = BALL.xAxis - (PADDLE.paddleX + PADDLE.paddleWidth / 2);
      collidePoint /= PADDLE.paddleWidth / 2;

      let angle = collidePoint * Math.PI / 3;

      BALL.dx = 8 * Math.sin(angle);
      BALL.dy = -BALL.dy

    }
    else {
      GAME.lives--;

      if (!GAME.lives) {
        alert("Game Over");
        document.location.reload();
      }
      else {
        if (GAME.lives > 0) {
          alert("Live remaining: " + GAME.lives);
          PADDLE.paddleWidth = canvas.width * 0.11;
        }

        BALL.xAxis = canvas.width / 2;
        BALL.yAxis = canvas.height - 30;
        BALL.dx = 7.5;
        BALL.dy = -7.5;
        PADDLE.paddleX = (canvas.width) / 2 - PADDLE.paddleWidth;
      }
    }
  }

  if (PADDLE.rightPressed && PADDLE.paddleX < canvas.width - PADDLE.paddleWidth) {
    PADDLE.paddleX += 7;
  }
  else if (PADDLE.leftPressed && PADDLE.paddleX > 0) {
    PADDLE.paddleX -= 7;
  }
  // if(GAME.temp==1){
  //   BALL.xAxis += BALL.dx;
  //   BALL.yAxis += BALL.dy;
  //   // requestAnimationFrame(draw);
  // }
  requestAnimationFrame(draw);
  BALL.xAxis += BALL.dx;
  BALL.yAxis += BALL.dy;
}


draw();