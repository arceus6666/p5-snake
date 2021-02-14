var rectSize = 10;
var boardSize = 500;
var speed = 20;
var snek;
var food;
var rate = 0;
var start = false;
var pause = false;

var startBtn;
var pauseBtn;

var points = 0;
// var bg;

// function preload() {
//   bg = loadImage('https://media.discordapp.net/attachments/380586339370008576/810356614161891328/bg.png?width=226&height=536')
// }

function setup() {
  var cnv = createCanvas(boardSize + 200, boardSize);

  cnv.position(100, 100)
  background(50);
  // image(bg, 0, 0)
  fill(255);
  rect(boardSize, 0, 200, boardSize);
  textSize(100);
  text('Snek', boardSize / 4, boardSize / 2)
  snek = new Snek();
  startBtn = createButton('Start');
  pauseBtn = createButton('Pause');
  startBtn.position(boardSize + 150, 150)
  startBtn.mousePressed(() => {
    if (start) {
      snek.die();
      frameRate(0);
      food = randomLocation();
      startBtn.html('Start');
      fill(50);
      rect(0, 0, boardSize, boardSize);
      fill(255);
      textSize(100);
      text('Snek', boardSize / 4, boardSize / 2)
    } else {
      frameRate(speed);
      startBtn.html('Stop');
    }
    start = !start;
  })
  pauseBtn.position(boardSize + 150, 180)
  pauseBtn.mousePressed(() => {
    if (start) {

      if (pause) {
        frameRate(speed);
        pauseBtn.html('Pause');
      } else {
        frameRate(0);
        pauseBtn.html('Resume');
      }
      pause = !pause;
    }
  })
  food = randomLocation()
  frameRate(0);
  // console.log(food)
}

function draw() {
  background(50);
  fill(255);
  rect(boardSize, 0, 200, boardSize);
  snek.move()
  fill(255, 0, 0)
  rect(food.x * rectSize, food.y * rectSize, rectSize, rectSize)
  fill(10);
  textSize(20);
  text(`Points: ${points}`, boardSize + 50, 140);
}

function randomLocation() {
  return { x: Math.floor(random(0, boardSize / rectSize)), y: Math.floor(random(0, boardSize / rectSize)) }
}

function keyPressed() {
  if (keyCode === UP_ARROW && snek.my === 0) {
    snek.changeDir(0, -1);
  } else if (keyCode === DOWN_ARROW && snek.my === 0) {
    snek.changeDir(0, 1);
  } else if (keyCode === LEFT_ARROW && snek.mx === 0) {
    snek.changeDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snek.mx === 0) {
    snek.changeDir(1, 0);
  } else if (keyCode === ENTER) {
    snek.eat();
  }
}
