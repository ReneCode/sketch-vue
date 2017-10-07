
import Matrix2d from './matrix-2d';

export default class Point {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  equal(otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }

  clone() {
    return new Point(this.x, this.y, this.z);
  }

  add(otherPoint) {
    return new Point(
      this.x + otherPoint.x,
      this.y + otherPoint.y,
      this.z + otherPoint.z
    );
  }

  sub(otherPoint) {
    return new Point(
      this.x - otherPoint.x,
      this.y - otherPoint.y,
      this.z - otherPoint.z
    );
  }

  scalar(otherPoint) {
    return this.x * otherPoint.x + this.y * otherPoint.y;
  }

  cross(otherPoint) {
    return this.x * otherPoint.y - this.y * otherPoint.x;
  }

  rotatedAngle(rotatedPoint) {
    return rotatedPoint.angle() - this.angle();
  }

  abs() {
    return new Point(
      Math.abs(this.x),
      Math.abs(this.y));
  }

  rotate(angle) {
    const mat = Matrix2d.rotate(angle)
    const pt = mat.transformPoint(this.x, this.y);
    return new Point(pt.x, pt.y)
  }

  scale(sx, sy) {
    const mat = Matrix2d.scale(sx, sy)
    const pt = mat.transformPoint(this.x, this.y);
    return new Point(pt.x, pt.y)
  }
}
