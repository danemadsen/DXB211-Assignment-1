let knifeSwipes = [];
let fruits = [];
let fruitProb = 0.03; // Probability of creating a new fruit initially
let fruitProbIncrement = 0.00001; // Increment of probability over time
let started = false; // Flag for whether the game has started
let startButton;
let counter;
let fruitCounter = 0;

function setup() {
  const canvas = createCanvas(1000, 1000);
  startButton = createButton('Start');
  startButton.size(100, 50);
  startButton.position(canvas.width / 2 - startButton.width / 2, canvas.height / 2 - startButton.height / 2);
  startButton.mousePressed(startGame);
}

function draw() {
  background('#001000');
  fill('#FFFFFF');
  textSize(32);
  textAlign(CENTER, TOP);
  text(`${fruitCounter}`, canvas.width / 2, 10);
  
  if (!started) {
    startButton.show();
    return;
  }
  startButton.hide();

  // Create new fruit randomly
  if (random(1) < fruitProb) {
    fruits.push({
      x: random(width),
      y: -20,
      size: 40,
      speed: random(1, 5),
      angle: random(PI)
    });
  }

  // Increase the probability of creating a new fruit over time
  fruitProb += fruitProbIncrement;

  // Update and draw all fruits
  let fruitsToRemove = [];
  if (fruits.length > 0) {
    for (let i = 0; i < fruits.length; i++) {
      let fruit = fruits[i];

      // Draw the fruit
      fill('#00FF00');
      stroke('#000000'); // Set stroke color to black
      strokeWeight(1); // Set stroke weight to 1
      ellipse(fruit.x, fruit.y, fruit.size);

      // Update fruit position and remove if necessary
      fruit.x += fruit.speed * cos(fruit.angle);
      fruit.y += fruit.speed * sin(fruit.angle);

      if (fruit.y > height + fruit.size / 2) {
        fruitsToRemove.push(i);
      } else {
        // Check if fruit has been hit by a knife swipe
        for (let j = 0; j < knifeSwipes.length; j++) {
          let swipe = knifeSwipes[j];
          if (dist(fruit.x, fruit.y, swipe.startX, swipe.startY) < fruit.size / 2 ||
              dist(fruit.x, fruit.y, swipe.endX, swipe.endY) < fruit.size / 2) {
            // Split fruit into two smaller circles
            fruitsToRemove.push(i);
            fruits.push({
              x: fruit.x,
              y: fruit.y,
              size: fruit.size / 2,
              speed: fruit.speed,
              angle: fruit.angle + PI / 2
            });
            fruits.push({
              x: fruit.x,
              y: fruit.y,
              size: fruit.size / 2,
              speed: fruit.speed,
              angle: fruit.angle - PI / 2
            });
            fruitCounter++;
            break;
          }
        }
      }
    }
  }

  // Remove fruits that are marked for removal
  for (let i = fruitsToRemove.length - 1; i >= 0; i--) {
    fruits.splice(fruitsToRemove[i], 1);
    fruitsToRemove.splice(i, 1);
  }

  // Draw all active knife swipes
  for (let i = 0; i < knifeSwipes.length; i++) {
    let swipe = knifeSwipes[i];
    stroke('#660000');
    strokeWeight(10);
    line(swipe.startX, swipe.startY, swipe.endX, swipe.endY);

    // Update swipe opacity and remove if necessary
    swipe.opacity--;
    if (swipe.opacity <= 0) {
      knifeSwipes.splice(i, 1);
    }
  }
}

function mouseDragged() {
  // Add a new knife swipe to the array
  knifeSwipes.push({
    startX: pmouseX,
    startY: pmouseY,
    endX: mouseX,
    endY: mouseY,
    opacity: 25
  });
}

function startGame() {
  started = true;
}
