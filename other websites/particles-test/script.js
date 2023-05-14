
function canvasAnimation(){
  /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("myCanvas");
  /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");   

  class Particle{
    constructor(x, y, connectionArea, movX, movY, width, color, alpha, number){
      this.x = x;
      this.y = y;
      this.movX = movX;
      this.movY = movY;
      this.width = width;
      this.originalWidth = width;
      this.color = color;
      this.alpha = alpha;
      this.connectionArea = connectionArea
      this.number = number;
    }

    move(){
      this.x+= this.movX;
      this.y+= this.movY;
    }

    getX(){
      return this.x;
    }

    getY(){
      return this.y;
    }

    changeParticle(canvasWidth, canvasHeight, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha){
      this.x = getRandomNumber(0, canvasWidth);
      this.y = getRandomNumber (0, canvasHeight);
      this.movX = getRandomNumber (-maxIntervalX, maxIntervalX);
      this.movY = getRandomNumber (-maxIntervalY, maxIntervalY);
      this.width = getRandomNumber (0.5,maxWidth);
      this.originalWidth = this.width;
      this.alpha = getRandomNumber (minAlpha,1);
    }

    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,(this.width/2),0,(2*Math.PI))
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }

    onConnectionArea(distanceToOther){
      return (distanceToOther <= this.connectionArea);
    } 
    

    connect(otherParticle, distance){
      ctx.strokeStyle = this.color;
      ctx.globalAlpha= (Math.abs((distance/this.connectionArea) - 1));
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(otherParticle.x, otherParticle.y)
      ctx.stroke()
    }


  }

  function getRandomNumber (min, max){
    return (Math.random() * (max-min) + min);
  }

  function createParticle(canvasWidth, canvasHeight, connectionArea, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha,number){
    let x = getRandomNumber(0, canvasWidth);
    let y = getRandomNumber (0, canvasHeight);
    let movX = getRandomNumber (-maxIntervalX, maxIntervalX);
    let movY = getRandomNumber (-maxIntervalY, maxIntervalY);
    let width = getRandomNumber (0.5,maxWidth);
    let alpha = getRandomNumber (minAlpha,1);
    return (new Particle(x,y,connectionArea,movX,movY,width,color,alpha,number))
  }

  function setParticles (particleQuantity, canvasWidth, canvasHeight, connectionArea, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha){
    let particles = [];
    for (i=0; i<particleQuantity;i++){
      let particle = createParticle(canvasWidth, canvasHeight, connectionArea, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha,i);
      particles.push(particle);
    }
    return particles;
  }

  function particleMovementAnimation(particles, canvasWidth, canvasHeight, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    for (i=0; i<particles.length; i++){
      let particle = particles[i];
      particle.draw();
      particle.move();
      if ((particle.getX()>=canvasWidth || particle.getX()<=0) || (particle.getY()>=canvasHeight || particle.getY()<=0)){
        particle.changeParticle(canvasWidth, canvasHeight, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha);
      }
      for (j=i+1; j<particles.length; j++){
        otherParticle = particles[j];
        let xDif = particle.x - otherParticle.x;
        let yDif = particle.y - otherParticle.y
        let distance = Math.sqrt((xDif**2)+(yDif**2));
        if (particle.onConnectionArea(distance)){
          particle.connect(otherParticle, distance);
        }
      }
    }
    requestAnimationFrame(() => particleMovementAnimation(particles,canvasWidth, canvasHeight, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha));
  }

  function startAnimation 
  (
    particleQuantity,
    canvasWidth, // TODO: Add default value
    canvasHeight, // TODO: Add default value
    connectionArea, // Width of the square area around the particle
    maxIntervalX,
    maxIntervalY,
    maxWidth,
    color,
    minAlpha
  )
  {
    const Particles = setParticles (particleQuantity, canvasWidth, canvasHeight, connectionArea, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha);
    particleMovementAnimation(Particles, canvasWidth, canvasHeight, maxIntervalX, maxIntervalY, maxWidth, color, minAlpha);
  }

  function chargeAnimation (){
    startAnimation(80,700,700,80,0.2,0.2,4,"#555555",0.5);
  }

  chargeAnimation();
}





