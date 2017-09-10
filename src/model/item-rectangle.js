
import ItemBase from './item-base';
import Point from './point';

class ItemRectangle extends ItemBase {
  constructor(pt1, pt2) {
    super(0);
    pt1 = pt1 || new Point();
    pt2 = pt2 || new Point();
    let delta = pt1.sub(pt2).abs();
    let svg = {
      type: 'rect',
      x: Math.min(pt1.x, pt2.x),
      y: Math.min(pt1.y, pt2.y),
      width: delta.x,
      height: delta.y
    }
    this.svg = svg;
  }

  static createFromSvg(svg) {
    let rectangle = new ItemRectangle();
    Object.assign(rectangle.svg, svg);
    return rectangle;
  }

  clone() {
    let newRectangle = new ItemRectangle();
    const clone = JSON.parse(JSON.stringify(this));
    Object.assign(newRectangle, clone);
    return newRectangle;
  }

  setFromTwoPoints(pt1, pt2) {
    let delta = pt1.sub(pt2).abs();
    this.svg.x = Math.min(pt1.x, pt2.x);
    this.svg.y = Math.min(pt1.y, pt2.y);
    this.svg.width = delta.x;
    this.svg.height = delta.y;
  }

  move(delta) {
    this.svg.x += delta.x;
    this.svg.y += delta.y;
  }
}

export default ItemRectangle;
