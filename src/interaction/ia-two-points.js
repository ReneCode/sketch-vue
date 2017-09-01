import IaBase from './ia-base'

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaTwoPoints extends IaBase {
  start() {
    this.mouseDownScreenPoint = null;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.firstPoint = this.getSVGPoint(event);
    this.mode = MODE_MOUSE_DOWN;
    this.emit("onMouseDown", this.firstPoint, null);
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.mode = MODE_NONE;
      let currentScreenPoint = this.getSVGPoint(event);
      this.emit("onMouseUp", this.firstPoint, currentScreenPoint);
      return "stop";
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      let currentScreenPoint = this.getSVGPoint(event);
      this.emit("onMouseMove", this.firstPoint, currentScreenPoint);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.commit("escape", null);
    }
  }

  emit(eventName, pt1, pt2) {
    this.commit(null, {
      event: eventName,
      pt1: pt1,
      pt2: pt2
    });
  }

}
