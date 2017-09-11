
export default class BoundingBox {
  constructor(left, top, right, bottom) {
    this.left = left || 0;
    this.top = top || 0;
    this.right = right || 0;
    this.bottom = bottom || 0;
  }

  static createFromRectangle(rect) {
    return new BoundingBox(
      rect.x,
      rect.y,
      rect.x + rect.width,
      rect.y + rect.height);
  }

  intersect(other) {
    return (
      this.left <= other.right &&
      other.left <= this.right &&
      this.top <= other.bottom &&
      other.top <= this.bottom);
  }
}
