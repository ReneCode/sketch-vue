import Point from '../models/point'

const ZOOM_FACTOR = 0.05;

class SvgTransform {
  constructor() {
    this.tx = 0;
    this.ty = 0;
    this.sc = 1.0;
  }

  init(svgElement) {
    this.svgElement = svgElement;
  }

  getScreenPoint(event) {
    if (!event) {
      throw new Error("getScreenPoint: event missing");
    }
    return new Point(
      event.clientX,
      event.clientY
    );
  }

  getSVGPoint(event) {
    if (!event) {
      throw new Error("getSVGPoint: event missing");
    }
    let pt = this.svgElement.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const transformMatrix = this.svgElement.getScreenCTM().inverse();
    pt = pt.matrixTransform(transformMatrix);
    return new Point(
      (pt.x - this.tx) / this.sc,
      (pt.y - this.ty) / this.sc
    );
  }

  screenDistanceToSVGDistance(distance) {
    return distance / this.sc;
  }

  getSvgTransformString() {
    return `translate(${this.tx},${this.ty})scale(${this.sc})`;
  }

  zoomIn(event) {
    const scale = this.sc * (1 + ZOOM_FACTOR);
    const pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  zoomOut(event) {
    const scale = this.sc * (1 - ZOOM_FACTOR);
    const pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  setTranslate(newTranslate) {
    this.tx = newTranslate.x;
    this.ty = newTranslate.y;
  }

  getTranslate() {
    return {
      x: this.tx,
      y: this.ty
    };
  }
  // -----------

  zoom(pt, scale) {
    const MAX_SCALE = 20;
    if (scale > MAX_SCALE || scale < (1 / MAX_SCALE)) {
      return;
    }
    const deltaScale = scale - this.sc;
    this.sc = scale;
    this.tx -= deltaScale * pt.x;
    this.ty -= deltaScale * pt.y;
    // this.updateTransform();
  }
}

export default SvgTransform;
