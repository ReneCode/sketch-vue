import IaBase from './ia-base'
import interaction from '@/interaction'

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaTwoPoints extends IaBase {

  start(options) {
    this.options = options;
    this.firstPoint = null;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.firstPoint = this.getSVGPoint(event);
    this.mode = MODE_MOUSE_DOWN;
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.mode = MODE_NONE;
      let currentScreenPoint = this.getSVGPoint(event);
      this.dispatch(this.createPayload("onMouseUp", this.firstPoint, currentScreenPoint));
      return "stop"
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      let currentScreenPoint = this.getSVGPoint(event);
      this.dispatch(this.createPayload("onMouseMove", this.firstPoint, currentScreenPoint));
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.dispatch(this.createPayload("escape", null, null));
      return "stop"
    }
  }

  dispatch(payload) {
    const callbackName = this.options.callbackName;
    if (callbackName) {
      interaction.dispatch(callbackName, payload);
    }
  }

  createPayload(eventName, pt1, pt2) {
    return {
      eventName: eventName,
      pt1: pt1,
      pt2: pt2
    };
  }
}
