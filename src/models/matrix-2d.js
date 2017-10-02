
/*
  a c e
  b d f
  0 0 1
*/

export default class Matrix2d {
  constructor(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  static identity() {
    return new Matrix2d(1, 0, 0, 1, 0, 0);
  }

  flipX() {
  }

  translate(tx, ty) {
    return this.transform(
      1, 0, 0,
      1, tx, ty
    );
  }

  scale(sx, sy) {
    return this.transform(
      sx, 0, 0,
      sy, 0, 0
    );
  }

  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix2d(
      cos, sin, -sin,
      cos, 0, 0
    );
  }

/*  multiply(matrix) {
    return new Matrix2d(
      this.a * a2 + this.c * b2,
      this.b * a2 + this.d * b2,
      this.a * c2 + this.c * d2,
      this.b * c2 + this.d * d2,
      this.a * e2 + this.c * f2 + this.e,
      this.b * e2 + this.d * f2 + this.f
    )
  }
  */

  transform(a2, b2, c2, d2, e2, f2) {
    return new Matrix2d(
      this.a * a2 + this.c * b2,
      this.b * a2 + this.d * b2,
      this.a * c2 + this.c * d2,
      this.b * c2 + this.d * d2,
      this.a * e2 + this.c * f2 + this.e,
      this.b * e2 + this.d * f2 + this.f
    )
  }

  transformPoint(x, y) {
    return {
      x: x * this.a + y * this.c + this.e,
      y: x * this.b + y * this.d + this.f
    };
  }
}
