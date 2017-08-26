
class SvgTransform {
  init(svgElement) {
    this.svgElement = svgElement;
    this.transformMatrix = this.svgElement.getScreenCTM().inverse();
  }
}

export default SvgTransform;
