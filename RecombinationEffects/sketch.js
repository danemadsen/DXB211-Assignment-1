let img;
let pixelsize = 80;

function preload(){
	img = loadImage("image.jpg");
}

function setup(){
  pixelDensity(1); // set pixel density to 1
  createCanvas(img.width, img.height);
  background(0);

  for(let i = 0; i < width; i += pixelsize){
    for(let j = 0; j < height; j += pixelsize){
      let pixColor = img.get(i, j);   
      fill(pixColor);
      noStroke();
      square(i, j, pixelsize);
    }
  }
}
