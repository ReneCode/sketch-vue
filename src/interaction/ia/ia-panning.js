import IaBase from './ia-base'

export default class IaPanning extends IaBase {

  start() {
    this.startScreenPoint = null;
  }
  stop() {
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

}
