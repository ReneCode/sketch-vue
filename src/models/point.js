
export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  equal(otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  add(otherPoint) {
    return new Point(
      this.x + otherPoint.x,
      this.y + otherPoint.y
    );
  }

  sub(otherPoint) {
    return new Point(
      this.x - otherPoint.x,
      this.y - otherPoint.y
    );
  }

  abs() {
    return new Point(
      Math.abs(this.x),
      Math.abs(this.y));
  }

}
