import Matrix2d from './matrix-2d'
import Point from './point'
import distanceLineToPoint from './distance-line-point';

export default class Line {
  constructor(p1, p2) {
    this.p1 = p1.clone();
    this.p2 = p2.clone();
  }

  length() {
    const delta = this.p2.sub(this.p1);
    return delta.length();
  }

  angle() {
    const delta = this.p2.sub(this.p1);
    return delta.angle();
  }

  // rotate around this.p1
  rotate(angle) {
    const matrix = Matrix2d.translate(-this.p1.x, -this.p1.y)
      .multiply(Matrix2d.rotate(angle))
      .multiply(Matrix2d.translate(this.p1.x, this.p1.y));

    const pt = matrix.transformPoint(this.p2.x, this.p2.y);
    return new Line(
      this.p1,
      new Point(pt.x, pt.y)
    )
  }

  nearPoint(point, radius) {
    const result = distanceLineToPoint(this, point);
    if (result.lamda >= 0 && result.lamda <= 1) {
      if (result.distance <= radius) {
        return true;
      }
      return false;
    } else {
      if (result.lamda < 0) {
        const deltaP1Point = this.p1.sub(point);
        if (deltaP1Point.length() <= radius) {
          return true;
        }
      } else {
        const deltaP2Point = this.p2.sub(point);
        if (deltaP2Point.length() <= radius) {
          return true;
        }
      }
      return false;
    }
  }
}
