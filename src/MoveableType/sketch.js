let font;
let timeText;

function preload() {
  font = loadFont('Roboto-Thin.ttf');
}

function setup() {
  createCanvas(400, 200);
  textFont(font);
  textSize(64);
}

function draw() {
  background(220);
  let hours = hour();
  let minutes = minute();
  let seconds = second();

  randomSeed(seconds);

  for(let i = 10; i < width; i += 20){
    for(let j = 10; j < height; j += 20){
      if(i < 70 || j < 70 || i > 330 || j > 130){
        let pixColor  = color(random(255), random(255), random(255)) ; 
        fill(pixColor);
        noStroke();
        circle(i, j, 20);
      }
    }
  }

  timeText = nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2);

  let tWidth = textWidth(timeText);
  let tHeight = textSize();
  let x = (width - tWidth) / 2;
  let y = (height + tHeight) / 2 - 10;
  
  fill(0);
  text(timeText, x, y);
}
