import IaBase from './ia-base'
import interaction from '../../interaction'

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaOnePoint extends IaBase {

  start(options) {
    this.options = options;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.firstPoint = this.getSVGPoint(event);
    this.dispatch(this.createPayload("onPoint", this.firstPoint));
    this.mode = MODE_MOUSE_DOWN;
  }

  onMouseUp(event) {
    let currentPoint = this.getSVGPoint(event);
    if (this.firstPoint && !this.firstPoint.equal(currentPoint)) {
      this.firstPoint = null;
      this.dispatch(this.createPayload("onPoint", currentPoint));
    }
  }

  onMouseMove(event) {
    let currentPoint = this.getSVGPoint(event);
    this.dispatch(this.createPayload("onPointMove", currentPoint));
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.dispatch(this.createPayload("escape", null));
      this.firstPoint = null;
      this.options = null;
      return "stop"
    }
  }

  dispatch(payload) {
    const callbackName = this.options.callbackName;
    if (callbackName) {
      interaction.dispatch(callbackName, payload);
    }
  }

  createPayload(eventName, pt) {
    return {
      event: eventName,
      pt: pt
    };
  }
}
