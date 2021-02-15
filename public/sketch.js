var rectSize = 7;
var boardSize = 250;
var boardx = 112;
var boardy = 112;
var speed = 10;
var snek;
var food;
var rate = 0;
var start = false;
var pause = false;
var locked = false;
var borderx = 43 + 8;
var bordery = 162 + 8;
var ts = 13;
var imgHL;
var imgHR;
var imgHU;
var imgHD;
var imgLR;
var imgUD;
var imgCRU;
var imgCDL;
var imgCLU;
var imgCDR;
var imgTR;
var imgTL;
var imgTD;
var imgTU;
var imgF;

var startBtn;
var pauseBtn;

var points = 0;

function preload() {
  imgHL = loadImage('http://localhost/assets/hl.png');
  imgHR = loadImage('http://localhost/assets/hr.png');
  imgHU = loadImage('http://localhost/assets/hu.png');
  imgHD = loadImage('http://localhost/assets/hd.png');
  imgLR = loadImage('http://localhost/assets/lr.png');
  imgUD = loadImage('http://localhost/assets/ud.png');
  imgCRU = loadImage('http://localhost/assets/cru.png');
  imgCDL = loadImage('http://localhost/assets/cdl.png');
  imgCLU = loadImage('http://localhost/assets/clu.png');
  imgCDR = loadImage('http://localhost/assets/cdr.png');
  imgTR = loadImage('http://localhost/assets/tr.png');
  imgTL = loadImage('http://localhost/assets/tl.png');
  imgTD = loadImage('http://localhost/assets/td.png');
  imgTU = loadImage('http://localhost/assets/tu.png');
  imgF  = loadImage('http://localhost/assets/f.png');
}

function setup() {
  // textFont("FontAwesome");
  var cnv = createCanvas(boardx + 50, boardy);

  cnv.position(borderx, bordery)
  background(0);
  // fill(255);
  stroke(255);
  line(boardx, 0, boardx, boardy);
  fill(0);
  rect(0, 0, boardx, boardy);
  stroke(0);
  rect(boardx, 0, 40, boardy);
  fill(255);
  textSize(30);
  text('Snek', (boardx / 5), boardy / 5 * 3);
  snek = new Snek();
  startBtn = createButton('▶');
  pauseBtn = createButton('❚❚');
  startBtn.position(boardx + 5 + 48, bordery)
  startBtn.mousePressed(() => {
    if (start) {
      snek.die();
    } else {
      frameRate(speed);
      startBtn.html('■');
      start = true;
    }
    // start = !start;
  })
  pauseBtn.position(boardx + 5 + 48, bordery + 30)
  pauseBtn.mousePressed(() => {
    if (start) {
      if (pause) {
        frameRate(speed);
        pauseBtn.html('||');
      } else {
        frameRate(0);
        pauseBtn.html('▶');
      }
      pause = !pause;
    }
  })
  food = randomLocation()
  textSize(ts);
  fill(255);
  text(`Pts: ${points}`, boardx + 3, 70);
  frameRate(0);
  // console.log(food)
}

function draw() {
  background(0);
  stroke(255);
  fill(0);
  rect(0, 0, boardx, boardy);
  line(boardx, 0, boardx, boardy);
  stroke(0);
  rect(boardx, 0, 50, boardy);
  snek.move()
  fill(255, 0, 0)
  image(imgF,food.x * rectSize, food.y * rectSize, rectSize, rectSize)
  textSize(ts);
  fill(255);
  text(`Pts: ${points}`, boardx + 3, 70);
}

function inside(point) {
  for (let i in snek.body) {
    let p = snek.body[i]
    if (p.x === point.x && p.y === point.y) return true;
  }
  return false;
}

function randomLocation() {
  let point = { x: Math.floor(random(1, (boardx / rectSize) - 1)), y: Math.floor(random(1, (boardy / rectSize) - 1)) }
  while (snek.x === point.x && snek.y === point.y || inside(point)) {
    point = { x: Math.floor(random(1, (boardx / rectSize) - 1)), y: Math.floor(random(1, (boardy / rectSize) - 1)) }
  }
  return point;
}

function keyPressed() {
  if (start && !pause && !locked) {
    if (keyCode === UP_ARROW && snek.my === 0) {
      locked = true;
      snek.changeDir(0, -1);
    } else if (keyCode === DOWN_ARROW && snek.my === 0) {
      locked = true;
      snek.changeDir(0, 1);
    } else if (keyCode === LEFT_ARROW && snek.mx === 0) {
      locked = true;
      snek.changeDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && snek.mx === 0) {
      locked = true;
      snek.changeDir(1, 0);
    } else if (keyCode === ENTER) {
      // snek.eat();
    }
  }
}

function keyTyped() {
  if (start && !pause && !locked) {
    if (key === 'w' && snek.my === 0) {
      locked = true;
      snek.changeDir(0, -1);
    } else if (key === 's' && snek.my === 0) {
      locked = true;
      snek.changeDir(0, 1);
    } else if (key === 'a' && snek.mx === 0) {
      locked = true;
      snek.changeDir(-1, 0);
    } else if (key === 'd' && snek.mx === 0) {
      locked = true;
      snek.changeDir(1, 0);
    }
  }
}

function stopGame() {
  frameRate(0);
  food = randomLocation();
  points = 0;
  start = false;
  startBtn.html('▶');
  pause = false;
  pauseBtn.html('❚❚');
  stroke(255);
  fill(0);
  rect(0, 0, boardx, boardy);
  stroke(0);
  rect(boardx, 0, 50, boardy);
  // rect(0, 0, boardx + 80, boardy);
  fill(255);
  textSize(50);
  textSize(30);
  text('Snek', (boardx / 5), boardy / 5 * 3);
  stroke(255);
  line(boardx, 0, boardx, boardy);
  stroke(0);
  textSize(ts);
  text(`Pts: ${points}`, boardx + 3, 70);
  locked = false;
}
