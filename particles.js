window.addEventListener("load", () => {

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// 🌟 Configuración
const imageFiles = ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg","foto5.jpg", "foto6.jpg"];
const emojis = ["💖","✨","🌙","🔥","🌸","💫","🎮","🌍","🧠","😍","🥰","💞","🌹"];

const images = [];
let loaded = 0;

// Cargar imágenes
imageFiles.forEach(src=>{
  const img = new Image();
  img.src = src;
  img.onload = ()=>{
    loaded++;
    if(loaded === imageFiles.length) init();
  }
  images.push(img);
});

const particles = [];

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = 20 + Math.random()*30;

    const angle = Math.random()*Math.PI*2;
    const speed = 0.3 + Math.random()*1.2;
    this.vx = Math.cos(angle)*speed;
    this.vy = Math.sin(angle)*speed;

    this.type = Math.random() < 0.5 ? "image" : "emoji";

    if(this.type === "image"){
      this.img = images[Math.floor(Math.random()*images.length)];
    } else {
      this.emoji = emojis[Math.floor(Math.random()*emojis.length)];
    }
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;

    if(this.x < -this.size || this.x > canvas.width + this.size) this.vx *= -1;
    if(this.y < -this.size || this.y > canvas.height + this.size) this.vy *= -1;
  }

  draw(){
    if(this.type === "image"){
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    } else {
      ctx.font = this.size + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.emoji, this.x, this.y);
    }
  }
}

function init(){
  particles.length = 0;
  const amount = Math.floor((canvas.width * canvas.height) / 25000);
  for(let i=0;i<amount;i++){
    particles.push(new Particle());
  }
  animate();
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const p of particles){
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
}

});
