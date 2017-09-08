
import ItemBase from './item-base';
import Point from './point';

export default class ItemPolygon extends ItemBase {
  constructor(pt1, pt2) {
    super(0);
    let svg = {
      type: 'polygon',
      points: [pt1, pt2]
    }
    this.svg = svg;
  }

  addPoint(pt) {
    this.svg.points.push(pt);
  }

  updateLastPoint(pt) {
    let cnt = this.svg.points.length;
    if (cnt === 0) {
      throw new Error("ItemPolygon - updateLastPoint without Points");
    }
    if (cnt > 0) {
      // make it reactive - to not use points[idx] = newVal
      this.svg.points.splice(cnt - 1, 1, pt);
    }
  }

  removeLastPoint() {
    let cnt = this.svg.points.length;
    if (cnt === 0) {
      throw new Error("ItemPolygon - updateLastPoint without Points");
    }
    if (cnt > 0) {
      this.svg.points.splice(cnt - 1);
    }
  }

  countPoints() {
    return this.svg.points.length;
  }

  getRefPoint() {
    // return new Point(this.svg.x, this.svg.y);
    return new Point(0, 0);
  }

  setRefPoint(refPoint) {
    // this.svg.x = refPoint.x;
    // this.svg.y = refPoint.y;
  }
}
