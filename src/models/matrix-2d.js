
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

  static translate(tx, ty) {
    return new Matrix2d(
      1, 0, 0,
      1, tx, ty
    );
  }

  static scale(sx, sy) {
    return new Matrix2d(
      sx, 0, 0,
      sy, 0, 0
    );
  }

  static rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix2d(
      cos, sin, -sin,
      cos, 0, 0
    );
  }

  // result = this * other
  multiply(other) {
    return new Matrix2d(
      other.a * this.a + other.c * this.b,
      other.b * this.a + other.d * this.b,
      other.a * this.c + other.c * this.d,
      other.b * this.c + other.d * this.d,
      other.a * this.e + other.c * this.f + other.e,
      other.b * this.e + other.d * this.f + other.f
    )
  }

  transformPoint(x, y) {
    return {
      x: x * this.a + y * this.c + this.e,
      y: x * this.b + y * this.d + this.f
    };
  }
}
