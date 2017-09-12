import Point from '@/models/point'

class SvgTransform {
  init(svgElement) {
    this.svgElement = svgElement;
    this.transformMatrix = this.svgElement.getScreenCTM().inverse();
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
    pt = pt.matrixTransform(this.transformMatrix);
    return new Point(
      pt.x,
      pt.y);
  }
}

export default SvgTransform;
