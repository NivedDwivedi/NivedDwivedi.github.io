const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");


canvas.width=600;
canvas.height=300;

// function canvasParameters(){
//     this.height=canvasHeight;
//     this.width= canvasWidth;
// }
// const Canvas = new canvasParameters(); 

function box(){
    this.dx=3;
    this.dy=3;
    this.x=0;
    this.y=0;
    this.status=0;
}
const Box = new box();

let size=0;
let i = 0;
let start = Date.now();

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Box.status=1;
    i=0;
    start = Date.now();
    size=0;
}




function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(Box.y+Box.dy+size>canvas.height || Box.y+Box.dy<0)
    {
        Box.dy= -Box.dy;
        
    }
    ctx.beginPath();
    ctx.rect(Box.x,Box.y, canvas.width, size);
    ctx.fillStyle = " #009933";
    ctx.fill();
    ctx.closePath();
    Box.y+=Box.dy;
    size+=canvas.height/1000;
}


function rafFunction() {
  do {
    i++;
  } while (i % 1e6 != 0)

  if (i === 1e9) {

    
    document.getElementById('label1').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
    Box.status=0;
  } else {
   if(Box.status==0)
   {
    reset();
   }

    draw();
    document.getElementById("label1").innerHTML = `Executing Task: ${i}`;
    requestAnimationFrame(rafFunction);
  }
}


function setTimeoutFunction() {
    do {
      i++;
    } while (i % 1e6 != 0)
  
    if (i === 1e9) {
      document.getElementById('label2').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
      Box.status=0;
    } else {
        if(Box.status==0)
        {
         reset();
        }
      draw();
      document.getElementById("label2").innerHTML = `Executing Task: ${i}`;
      setTimeout(setTimeoutFunction);
    }
  }



  function promiseFunction() {
    do {
      i++;
    } while (i % 1e6 != 0)
  
    if (i === 1e9) {
      document.getElementById('label3').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
      Box.status=0;
    } else {
        if(Box.status==0)
        {
         reset();
        }
      draw();
      document.getElementById("label3").innerHTML = `Executing Task: ${i}`;
      Promise.resolve().then(promiseFunction);
    }
  }



  function microFunction() {
    do {
      i++;
    } while (i % 1e6 != 0)
  
    if (i === 1e9) {
      document.getElementById('label4').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
      Box.status=0;
    } else {
        if(Box.status==0)
        {
         reset();
        }
      draw();
      document.getElementById("label4").innerHTML = `Executing Task: ${i}`;
      queueMicrotask(microFunction);
    }
  }


