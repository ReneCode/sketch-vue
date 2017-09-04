
import ItemBase from './item-base';
import Point from './point';

class ItemCircle extends ItemBase {
  constructor(pt, radius) {
    super(0);
    let svg = {
      x: pt.x,
      y: pt.y,
      radius: radius
    }
    this.svg = svg;
  }

  setFromTwoPoints(pt1, pt2) {
    let radius = pt1.sub(pt2).length();
    this.svg.x = pt1.x;
    this.svg.y = pt1.y;
    this.svg.radius = radius;
  }

  getRefPoint() {
    return new Point(this.svg.x, this.svg.y);
  }

  setRefPoint(refPoint) {
    this.svg.x = refPoint.x;
    this.svg.y = refPoint.y;
  }
}

export default ItemCircle;
