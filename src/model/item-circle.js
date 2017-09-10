
import ItemBase from './item-base';
import Point from './point';

class ItemCircle extends ItemBase {
  constructor(pt, radius) {
    super(0);
    pt = pt || new Point();
    radius = radius || 0;
    let svg = {
      type: 'circle',
      x: pt.x,
      y: pt.y,
      radius: radius
    }
    this.svg = svg;
  }

  static createFromSvg(svg) {
    let circle = new ItemCircle();
    Object.assign(circle.svg, svg);
    return circle;
  }

  clone() {
    let newCircle = new ItemCircle();
    const clone = JSON.parse(JSON.stringify(this));
    Object.assign(newCircle, clone);
    return newCircle;
  }

  setRadius(radius) {
    this.svg.radius = radius;
  }
/*
  setFromTwoPoints(pt1, pt2) {
    let radius = pt1.sub(pt2).length();
    this.svg.x = pt1.x;
    this.svg.y = pt1.y;
    this.svg.radius = radius;
  }
*/
  move(delta) {
    this.svg.x += delta.x;
    this.svg.y += delta.y;
  }
}

export default ItemCircle;
