let woman;
let beach;
let pixelsize = 5;

function preload(){
	woman = loadImage("woman.png");
  beach = loadImage("beach.png");
}

function setup(){
  createCanvas(756, 512);
  background(0);
}

function draw(){
  // if left mouse button is pressed, increase pixel size
  // if left mouse button + ctrl is pressed, decrease pixel size
  if(mouseIsPressed){
    if(keyIsDown(CONTROL)){
      pixelsize -= 1;
    } else {
      pixelsize += 1;
    }
  }
  
  for(let i = 0; i < width; i += pixelsize){
    for(let j = 0; j < height; j += pixelsize){
      let pixColor = beach.get(i, j);   
      fill(pixColor);
      noStroke();
      circle(i, j, pixelsize);
    }
  }

  // display img on top with 50% opacity
  //tint(255, 127);
  //image(beach, 0, 0);

  //return the opacity to 100%
  tint(255, 255);
  image(woman, 255, 0);
}
