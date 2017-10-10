
import SvgTransform from './svg-transform';
import interaction from '@/interaction';

class Svg {
  constructor() {
    this.iaList = [];
    this.transform = new SvgTransform();
  }

  init(svgElement, tmpItems) {
    // let transform = new SvgTransform();
    this.transform.init(svgElement);
    interaction.init(svgElement, this.transform, tmpItems);
  }

  exit() {
    interaction.unregisterListener();
  }

  getSvgTransformString() {
    return this.transform.getSvgTransformString();
  }
}

export default Svg;
