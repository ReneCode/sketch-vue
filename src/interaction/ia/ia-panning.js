import IaBase from './ia-base'
import interaction from '@/interaction';

export default class IaPanning extends IaBase {

  start() {
    this.startScreenPoint = null;
    this.iaZoom = interaction.start('iaZoom');
  }
  stop() {
    interaction.stop(this.iaZoom);
    this.startScreenPoint = null;
  }

  onMouseDown(event) {
    this.startScreenPoint = this.getScreenPoint(event);
    this.currentTranslate = this._transform.getTranslate();
  }

  onMouseUp(event) {
    if (this.startScreenPoint) {
      this.startScreenPoint = null;
    }
  }

  onMouseMove(event) {
    if (this.startScreenPoint) {
      const currentScreenPoint = this.getScreenPoint(event);
      const translation = {
        x: currentScreenPoint.x - this.startScreenPoint.x + this.currentTranslate.x,
        y: currentScreenPoint.y - this.startScreenPoint.y + this.currentTranslate.y
      }
      this._transform.setTranslate(translation);
    }
  }

  onKeyDown(event) {
    return "stop"
  }

}
