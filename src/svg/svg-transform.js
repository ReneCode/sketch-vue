
class SvgTransform {
  init(svgElement) {
    this.svgElement = svgElement;
    this.transformMatrix = this.svgElement.getScreenCTM().inverse();
  }

  getScreenPoint(event) {
    if (!event) {
      throw new Error("getScreenPoint: event missing");
    }
    const svg = this.svgElement;
    let pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return pt;
  }

  getSVGPoint(event) {
    if (!event) {
      throw new Error("getSVGPoint: event missing");
    }
    let pt = this.getScreenPoint(event);
    let svgPt = {
      x: pt.x,
      y: pt.y
    }
    return svgPt;
  }
}

export default SvgTransform;
