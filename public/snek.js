function Snek() {
  this.x = 1;
  this.y = 0;

  this.mx = 1;
  this.my = 0;

  this.body = [{ x: 0, y: 0 }];
  this.bodySize = 1;

  this.move = () => {

    if (this.x === food.x && this.y === food.y) {
      this.eat();
    }

    if (this.body.length !== this.bodySize) {
      // console.log('push')
      this.body.push({ x: this.x, y: this.y })
    } else {
      for (let i = 0; i < this.bodySize - 1; i++) {
        this.body[i] = this.body[i + 1]
      }
      if (this.bodySize > 0)
        this.body[this.body.length - 1] = { x: this.x, y: this.y }
    }

    this.x += this.mx;
    this.y += this.my;

    for (let i = 0; i < this.bodySize; i++) {
      let p = this.body[i]
      if (p.x === this.x && p.y === this.y) {
        this.die();
      }
    }

    // console.log('-1', this.x, this.y)

    if (this.x * rectSize < 0 || this.x * rectSize > boardx - rectSize) {
      // console.log(this.x * rectSize, 'x')
      this.die();
    }

    if (this.y * rectSize < 0 || this.y * rectSize > boardy - rectSize) {
      // console.log(this.y * rectSize, 'y')
      this.die();
    }

    for (let i = 0; i < this.bodySize; i++) {
      let p = this.body[i]
      let img = imgUD;
      // console.log('draw', i, p)
      if (i == 0) {
        // tail
        // fill(0, 0, 200)
        // rect(p.x * rectSize, p.y * rectSize, rectSize, rectSize);
        let a;
        if (this.bodySize > 1) {
          a = this.body[1];
          // console.log('t', this.bodySize)
        } else {
          a = { x: this.x, y: this.y }
        }
        img = getTail(p, a);
      } else if (i == this.bodySize - 1) {
        // prehead
        // fill(200, 0, 200)
        // rect(p.x * rectSize, p.y * rectSize, rectSize, rectSize);
        let a = { x: this.x, y: this.y }
        let b = this.body[i - 1]
        // console.log(a, b)
        img = getSide(p, a, b);
      } else {
        // fill(0, 200, 0)
        // rect(p.x * rectSize, p.y * rectSize, rectSize, rectSize);
        let a = this.body[i + 1]
        let b = this.body[i - 1]
        // console.log(i, this.bodySize, a, b, this.body[0], this.body[1], this.body[2])
        // console.log(img)
        img = getSide(p, a, b);
      }
      try {
        image(img, p.x * rectSize, p.y * rectSize, rectSize, rectSize);
      } catch (error) {
        console.log(img)
        image(imgLR, p.x * rectSize, p.y * rectSize, rectSize, rectSize);
      }
    }

    fill(0, 200, 0)
    if (this.mx > 0) {
      // x1, y1, x2, y2, x3, y3
      // x1, y1, x1, y1 + rs, x1 + rs, (y1 + rs)/2
      // triangle(
      //   this.x * rectSize,
      //   this.y * rectSize,

      //   this.x * rectSize,
      //   (this.y * rectSize) + rectSize,

      //   (this.x * rectSize) + rectSize,
      //   ((this.y * rectSize) + (rectSize / 2))
      // )
      image(imgHR, this.x * rectSize, this.y * rectSize, rectSize, rectSize);
    } else if (this.mx < 0) {
      // triangle(
      //   (this.x * rectSize) + rectSize,
      //   this.y * rectSize,

      //   (this.x * rectSize) + rectSize,
      //   (this.y * rectSize) + rectSize,

      //   this.x * rectSize,
      //   ((this.y * rectSize) + (rectSize / 2))
      // )
      image(imgHL, this.x * rectSize, this.y * rectSize, rectSize, rectSize);
    } else if (this.my > 0) {
      // triangle(
      //   this.x * rectSize,
      //   this.y * rectSize,

      //   (this.x * rectSize) + rectSize,
      //   this.y * rectSize,

      //   ((this.x * rectSize) + (rectSize / 2)),
      //   (this.y * rectSize) + rectSize
      // )
      image(imgHD, this.x * rectSize, this.y * rectSize, rectSize, rectSize);
    } else if (this.my < 0) {
      // triangle(
      //   this.x * rectSize,
      //   (this.y * rectSize) + rectSize,

      //   (this.x * rectSize) + rectSize,
      //   (this.y * rectSize) + rectSize,

      //   ((this.x * rectSize) + (rectSize / 2)),
      //   this.y * rectSize
      // )
      image(imgHU, this.x * rectSize, this.y * rectSize, rectSize, rectSize);
    }
    locked = false;
  }

  this.changeDir = (x, y) => {
    this.mx = x;
    this.my = y;
  }

  this.die = () => {
    stopGame();
    this.x = 1;
    this.y = 0;

    this.mx = 1;
    this.my = 0;

    this.body = [{ x: 0, y: 0 }];
    this.bodySize = 1;
  }

  this.eat = () => {
    this.bodySize++;
    points++;
    food = randomLocation();
  }
}

function getSide(p, a, b/* = null*/) {
  if (a.x == b.x) {
    return imgUD;
  } else if (a.y === b.y) {
    return imgLR;
  } else {

    if (
      (p.x == a.x && p.x + 1 == b.x && p.y + 1 == a.y && p.y == b.y) ||
      (p.x + 1 == a.x && p.x == b.x && p.y == a.y && p.y + 1 == b.y)
    ) {
      return imgCDR;
    } else if (
      (p.x == a.x && p.x + 1 == b.x && p.y - 1 == a.y && p.y == b.y) ||
      (p.x + 1 == a.x && p.x == b.x && p.y == a.y && p.y - 1 == b.y)
    ) {
      return imgCRU;
    } else if (
      (p.x - 1 == a.x && p.x == b.x && p.y == a.y && p.y - 1 == b.y) ||
      (p.x == a.x && p.x - 1 == b.x && p.y - 1 == a.y && p.y == b.y)
    ) {
      return imgCLU;
    }
    return imgCDL;
  }
}

function getTail(p, a) {
  if (p.x == a.x) {
    if (a.y > p.y) {
      return imgTD;
    } else {
      return imgTU;
    }
  } else {
    if (a.x > p.x) {
      return imgTR;
    } else {
      return imgTL;
    }
  }
}
