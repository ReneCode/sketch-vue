
import ItemBase from './item-base';
import BoundingBox from './bounding-box';
import Point from './point';

export default class ItemPolyline extends ItemBase {
  constructor() {
    super(0);
    let svg = {
      fill: 'none',
      type: 'polyline',
      points: []
    }
    this.svg = svg;
  }

  static createFromSvg(svg) {
    let polyline = new ItemPolyline();
    Object.assign(polyline.svg, svg);
    polyline.points = [];
    for (let pt of svg.points) {
      polyline.points.push(new Point(pt.x, pt.y));
    }
    return polyline;
  }

  clone() {
    let newPolyline = new ItemPolyline();
    const clone = JSON.parse(JSON.stringify(this));
    Object.assign(newPolyline, clone);
    // correct the points - they have to be Point classes
    newPolyline.svg.points.splice(0);
    for (let pt of this.svg.points) {
      newPolyline.addPoint(pt);
    }
    return newPolyline;
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
    let cnt = this.svg.points.length;
    if (cnt > 0) {
      if (this.svg.points[cnt - 1].equal(pt)) {
        // do not add same point
        return;
      }
    }
    this.svg.points.push(new Point(pt.x, pt.y));
  }

  updateLastPoint(pt) {
    let cnt = this.svg.points.length;
    if (cnt === 0) {
      throw new Error("ItemPolyline - updateLastPoint without Points");
    }
    if (cnt > 0) {
      // make it reactive - to not use points[idx] = newVal
      this.svg.points.splice(cnt - 1, 1, pt);
    }
  }

  removeLastPoint() {
    let cnt = this.svg.points.length;
    if (cnt === 0) {
      throw new Error("ItemPolyline - updateLastPoint without Points");
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
