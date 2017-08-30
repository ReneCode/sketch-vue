
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sub(otherPoint) {
    return new Point(
      this.x - otherPoint.x,
      this.y - otherPoint.y
    );
  }

}
