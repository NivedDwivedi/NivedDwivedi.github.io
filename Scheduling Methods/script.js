const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");


canvas.width=600;
canvas.height=300;



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

let id;
function methodSelector(btn){
  id=btn.id;  
  console.log(btn.id);
  mainTask(id);
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



function mainTask(){
  do {
    i++;
  } while (i % 1e6 != 0)

  if (i === 1e9) {
    switch(id)
    {
      case 'btn1':
        document.getElementById('label1').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
        break;
      case 'btn2':
        document.getElementById('label2').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
        break;
      case 'btn3':
        document.getElementById('label3').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
        break;
      case 'btn4':
        document.getElementById('label4').innerHTML = `Total Time: ${(Date.now() - start)/1000} sec`;
        break;
    }
    Box.status=0;
  } else {
   if(Box.status==0)
   {
    reset();
   }
   draw();
   switch(id)
   {
     case 'btn1':
      document.getElementById("label1").innerHTML = `Executing Task: ${i}`;
      requestAnimationFrame(mainTask);
      break;
    case 'btn2':
      document.getElementById("label2").innerHTML = `Executing Task: ${i}`;
      setTimeout(mainTask);
      break;
    case 'btn3':
      document.getElementById("label3").innerHTML = `Executing Task: ${i}`;
      Promise.resolve().then(mainTask);
      break;
    case 'btn4':
      document.getElementById("label4").innerHTML = `Executing Task: ${i}`;
      queueMicrotask(mainTask);
      break;
   }

  }

}

