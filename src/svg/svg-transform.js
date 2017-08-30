import Point from '@/model/point'

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
    const svg = this.svgElement;
    let pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return new Point(
      pt.x,
      pt.y);
  }
}

export default SvgTransform;
