
import ItemBase from './item-base';
import BoundingBox from './bounding-box';
import Point from './point';
import Line from './line';

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
    let tmpSvg = {};
    Object.assign(tmpSvg, svg);
    delete tmpSvg.points;
    Object.assign(polygon.svg, tmpSvg);
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

  createBoundingBox() {
    let count = this.svg.points.length;
    if (count === 0) {
      return null;
    }
    let pt = this.svg.points[0];
    let bbox = new BoundingBox(pt.x, pt.y, pt.x, pt.y);
    for (let i = 1; i < count; i++) {
      bbox.expand(this.svg.points[i])
    }
    return bbox;
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

  nearPoint(point, radius) {
    let cnt = this.svg.points.length;
    for (let i = 0; i < cnt; i++) {
      let line;
      if (i === 0) {
        // connect last with first point
        line = new Line(this.svg.points[cnt - 1], this.svg.points[i]);
      } else {
        line = new Line(this.svg.points[i - 1], this.svg.points[i]);
      }
      if (line.nearPoint(point, radius)) {
        return true;
      }
    }
    return false;
  }

}
