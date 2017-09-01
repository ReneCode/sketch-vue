
import SvgTransform from './svg-transform';
import interaction from '@/interaction';

class Svg {
  constructor() {
    this.iaList = [];
  }

  init(svgElement, tmpItems) {
    let transform = new SvgTransform();
    transform.init(svgElement);
    interaction.init(svgElement, transform, tmpItems);
  }

  exit() {
    interaction.unregisterListener();
  }
}

export default Svg;
