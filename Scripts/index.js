const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const mouse={
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

const n=400;
const center={
    x:canvas.width/2,
    y:canvas.height/2
}

let angle=0;

window.addEventListener('mousemove',function(event){
    mouse.x=event.x-center.x;
    mouse.y=event.y-center.y;
    angle=Math.atan2(mouse.y,mouse.x);
})
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
})

//utility functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(color_palate){
    return color_palate[Math.floor(Math.random()*color_palate.length)];
}

//Objects
function Particle(x,y,radius,color,distanceFromCenter)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.distanceFromCenter=distanceFromCenter;
    this.draw=function(){
        c.beginPath();
        c.strokeStyle=this.color;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        // c.stroke();
        c.closePath();
    };
    this.update=function(){
        this.draw();
        this.x=center.x+this.distanceFromCenter*Math.cos(angle);
        this.y=center.y+this.distanceFromCenter*Math.sin(angle);
    };
}

//Implementation
let particles;
function init(){
    particles=[];
    for(let i=0;i<n;i++)
    {
        const hueIncrement=360/n;
        const x=center.x+i*Math.cos(Math.PI);
        const y=center.y+i*Math.sin(-Math.PI);
        particles.push(new Particle(x,y,5,`hsl(${hueIncrement*i},70%,50%)`,i));
    }
}

//Animation logo
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle='rgba(0,0,0,0.1)';
    c.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();