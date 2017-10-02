import Matrix2d from './matrix-2d'
import Point from './point'

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
}
