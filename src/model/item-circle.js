
import ItemBase from './item-base';
import Point from './point';

class ItemCircle extends ItemBase {
  constructor(pt1, pt2) {
    super(0);
    pt1 = pt1 || new Point();
    pt2 = pt2 || new Point();
    let radius = pt1.sub(pt2).length();
    let svg = {
      type: 'circle',
      x: pt1.x,
      y: pt1.y,
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
    Object.assign(newCircle, this);
    Object.assign(newCircle.svg, this.svg);
    return newCircle;
  }

  setFromTwoPoints(pt1, pt2) {
    let radius = pt1.sub(pt2).length();
    this.svg.x = pt1.x;
    this.svg.y = pt1.y;
    this.svg.radius = radius;
  }

  move(delta) {
    this.svg.x += delta.x;
    this.svg.y += delta.y;
  }
}

export default ItemCircle;
