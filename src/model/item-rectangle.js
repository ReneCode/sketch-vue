
import ItemBase from './item-base';
import Point from './point';

class ItemRectangle extends ItemBase {
  constructor(pt1, pt2) {
    super(0);
    let delta = pt1.sub(pt2).abs();
    let svg = {
      x: Math.min(pt1.x, pt2.x),
      y: Math.min(pt1.y, pt2.y),
      width: delta.x,
      height: delta.y
    }
    this.svg = svg;
  }

  setFromTwoPoints(pt1, pt2) {
    let delta = pt1.sub(pt2).abs();
    this.svg.x = Math.min(pt1.x, pt2.x);
    this.svg.y = Math.min(pt1.y, pt2.y);
    this.svg.width = delta.x;
    this.svg.height = delta.y;
  }

  getRefPoint() {
    return new Point(this.svg.x, this.svg.y);
  }

  setRefPoint(refPoint) {
    this.svg.x = refPoint.x;
    this.svg.y = refPoint.y;
  }
}

export default ItemRectangle;
