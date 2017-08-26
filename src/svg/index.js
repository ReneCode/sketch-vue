
import SvgTransform from './svg-transform';

class Svg {
  constructor() {
    this.iaList = [];
    this.transform = new SvgTransform();
    console.log("svg-create")
  }

  init(svgElement) {
    this.transform.init(svgElement);
    console.log("svg-init", svgElement)
  }

  exit() {
    console.log("svg-exit")
  }
}

export default Svg;
