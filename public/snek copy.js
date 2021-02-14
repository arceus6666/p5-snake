function Snek() {
  this.x = 0;
  this.y = 0;

  this.mx = 1;
  this.my = 0;

  this.body = [];
  this.bodySize = 0;

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

    if (this.x * rectSize < 0 || this.x * rectSize > boardSize - rectSize) {
      this.die();
    }

    if (this.y * rectSize < 0 || this.y * rectSize > boardSize - rectSize) {
      this.die();
    }

    for (let i in this.body) {
      let p = this.body[i]
      // console.log('draw', i, p)
      fill(0, 200, 0)
      rect(p.x * rectSize, p.y * rectSize, rectSize, rectSize);
    }

    fill(0, 200, 0)
    if (this.mx > 0) {
      // x1, y1, x2, y2, x3, y3
      // x1, y1, x1, y1 + rs, x1 + rs, (y1 + rs)/2
      triangle(
        this.x * rectSize,
        this.y * rectSize,

        this.x * rectSize,
        (this.y * rectSize) + rectSize,

        (this.x * rectSize) + rectSize,
        ((this.y * rectSize) + (rectSize / 2))
      )
    } else if (this.mx < 0) {
      triangle(
        (this.x * rectSize) + rectSize,
        this.y * rectSize,

        (this.x * rectSize) + rectSize,
        (this.y * rectSize) + rectSize,

        this.x * rectSize,
        ((this.y * rectSize) + (rectSize / 2))
      )
    } else if (this.my > 0) {
      triangle(
        this.x * rectSize,
        this.y * rectSize,

        (this.x * rectSize) + rectSize,
        this.y * rectSize,

        ((this.x * rectSize) + (rectSize / 2)),
        (this.y * rectSize) + rectSize
      )
    } else if (this.my < 0) {
      triangle(
        this.x * rectSize,
        (this.y * rectSize) + rectSize,

        (this.x * rectSize) + rectSize,
        (this.y * rectSize) + rectSize,

        ((this.x * rectSize) + (rectSize / 2)),
        this.y * rectSize
      )
    }

  }

  this.changeDir = (x, y) => {
    this.mx = x;
    this.my = y;
  }

  this.die = () => {
    this.x = 0;
    this.y = 0;

    this.mx = 1;
    this.my = 0;

    this.body = [];
    this.bodySize = 0;

    food = randomLocation();
    points = 0;
  }

  this.eat = () => {
    this.bodySize++;
    points++;
    food = randomLocation();
  }
}
