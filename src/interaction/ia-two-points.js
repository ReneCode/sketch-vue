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
    this.emit(null, this.createPayload("onMouseDown", this.firstPoint, null));
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.mode = MODE_NONE;
      let currentScreenPoint = this.getSVGPoint(event);
      this.emit(null, this.createPayload("onMouseUp", this.firstPoint, currentScreenPoint));
      return "stop";
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      let currentScreenPoint = this.getSVGPoint(event);
      this.emit(null, this.createPayload("onMouseMove", this.firstPoint, currentScreenPoint));
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.emit("escape", null);
      return "stop";
    }
  }

  createPayload(eventName, pt1, pt2) {
    return {
      event: eventName,
      pt1: pt1,
      pt2: pt2
    };
  }
}
