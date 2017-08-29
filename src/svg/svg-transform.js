
class SvgTransform {
  init(svgElement) {
    this.svgElement = svgElement;
    this.transformMatrix = this.svgElement.getScreenCTM().inverse();
  }

  getScreenPoint(event) {
    if (!event) {
      throw new Error("getScreenPoint: event missing");
    }
    return {
      x: event.clientX,
      y: event.clientY
    };
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
    let svgPt = {
      x: pt.x,
      y: pt.y
    }
    return svgPt;
  }
}

export default SvgTransform;
