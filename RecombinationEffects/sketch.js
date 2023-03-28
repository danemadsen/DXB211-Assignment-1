let img;
let pixelarr = [];
let pixelsToRemove = [];
let pixelsize = 64;

function preload(){
	img = loadImage("image.jpg");
}

function setup(){
  createCanvas(512, 512);
  for(let i = 0; i < width; i += pixelsize){
    for(let j = 0; j < height; j += pixelsize){
      pixelarr.push({
        x: i,
        y: j,
        size: pixelsize,
        colour: img.get(i, j)
      });
    }
  }
}

function draw(){
  for(let i = 0; i < pixelarr.length; i++){   
    let pixel = pixelarr[i];
    if (mouseIsPressed && pixel.size > 4 &&
      (dist(pixel.x + (pixel.size / 2), pixel.y + (pixel.size / 2), pmouseX, pmouseY) < pixel.size / 2 || 
      dist(pixel.x + (pixel.size / 2), pixel.y + (pixel.size / 2), mouseX, mouseY) < pixel.size / 2)){
        pixelsToRemove.push(i);
        decimate(pixel);
    }
    else {
      fill(pixel.colour);
      noStroke();
      square(pixel.x, pixel.y, pixel.size);
    }
  }

  for(let i = 0; i < pixelsToRemove.length; i++){
    pixelarr.splice(pixelsToRemove[i], 1);
  }
  pixelsToRemove = [];
}

function decimate(pixel){
  pixelarr.push({
    x: pixel.x,           
    y: pixel.y,
    size: pixel.size / 2,
    colour: img.get(pixel.x, pixel.y)
  });
  pixelarr.push({
    x: pixel.x + (pixel.size / 2),           
    y: pixel.y,
    size: pixel.size / 2,
    colour: img.get(pixel.x + (pixel.size / 2), pixel.y)
  });
  pixelarr.push({
    x: pixel.x,           
    y: pixel.y + (pixel.size / 2),
    size: pixel.size / 2,
    colour: img.get(pixel.x, pixel.y + (pixel.size / 2))
  });
  pixelarr.push({
    x: pixel.x + (pixel.size / 2),           
    y: pixel.y + (pixel.size / 2),
    size: pixel.size / 2,
    colour: img.get(pixel.x + (pixel.size / 2), pixel.y + (pixel.size / 2))
  });
}
