import IaBase from './ia-base'

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaTwoPoints extends IaBase {
  start() {
    this.mouseDownScreenPoint = null;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.firstPoint = this.getScreenPoint();
    this.mode = MODE_MOUSE_DOWN;
    this.callback("onMouseDown", this.firstPoint, null);
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      let currentScreenPoint = this.getScreenPoint();
      this.callback("onMouseUp", this.firstPoint, currentScreenPoint);
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      let currentScreenPoint = this.getScreenPoint();
      this.callback("onMouseMove", this.firstPoint, currentScreenPoint);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.commit("escape", null);
    }
  }

  callback(eventName, pt1, pt2) {
    this.commit(null, {
      event: eventName,
      first: pt1,
      second: pt2
    });
  }

}
