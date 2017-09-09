
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

  static createFromSvg(svg) {
    let polygon = new ItemPolygon();
    polygon.svg.points.splice(0);
    for (let pt of svg.points) {
      polygon.addPoint(new Point(pt.x, pt.y));
    }
    return polygon;
  }

  clone() {
    let newPolygon = new ItemPolygon();
    Object.assign(newPolygon, this);
    Object.assign(newPolygon.svg, this.svg);
    return newPolygon;
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

  move(delta) {
    let cnt = this.svg.points.length;
    if (cnt === 0) {
      return;
    }
    for (let i = 0; i < cnt; i++) {
      this.svg.points.splice(i, 1, this.svg.points[i].add(delta));
    }
  }

}
