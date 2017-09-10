
import ItemBase from './item-base';
import Point from './point';

export default class ItemPolygon extends ItemBase {
  constructor() {
    super(0);
    let svg = {
      type: 'polygon',
      points: []
    }
    this.svg = svg;
  }

  static createFromSvg(svg) {
    let polygon = new ItemPolygon();
    for (let pt of svg.points) {
      polygon.addPoint(new Point(pt.x, pt.y));
    }
    return polygon;
  }

  clone() {
    let newPolygon = new ItemPolygon();
    const clone = JSON.parse(JSON.stringify(this));
    Object.assign(newPolygon, clone);
    // correct the points - they have to be Point classes
    newPolygon.svg.points.splice(0);
    for (let pt of this.svg.points) {
      newPolygon.addPoint(pt);
    }
    return newPolygon;
  }

  addPoint(pt) {
    this.svg.points.push(new Point(pt.x, pt.y));
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

  move(delta) {
    let cnt = this.svg.points.length;
    for (let i = 0; i < cnt; i++) {
      this.svg.points.splice(i, 1, this.svg.points[i].add(delta));
    }
  }

}
