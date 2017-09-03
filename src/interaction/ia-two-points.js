import IaBase from './ia-base'
import interaction from '@/interaction'

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaTwoPoints extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start(options) {
    this.options = options;
    this.mouseDownScreenPoint = null;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.firstPoint = this.getSVGPoint(event);
    this.mode = MODE_MOUSE_DOWN;
    if (this.shouldDrawRectangle()) {
      this.setRect(this.firstPoint, this.firstPoint);
      const item = {
        svg: this.rect
      }
      this.tmpItems.push(item);
    };
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.mode = MODE_NONE;
      let currentScreenPoint = this.getSVGPoint(event);
      if (this.shouldDrawRectangle()) {
        this.cleanUp();
      }
      this.dispatch(this.createPayload("onMouseUp", this.firstPoint, currentScreenPoint));
      return "stop"
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      let currentScreenPoint = this.getSVGPoint(event);
      if (this.shouldDrawRectangle()) {
        this.setRect(this.firstPoint, currentScreenPoint);
      }
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      if (this.shouldDrawRectangle()) {
        this.cleanUp();
        this.dispatch(this.createPayload("escape", null, null));
        return "stop"
      }
    }
  }

  dispatch(payload) {
    const callbackName = this.options.callbackName;
    if (callbackName) {
      interaction.dispatch(callbackName, payload);
    }
  }

  shouldDrawRectangle() {
    if (!this.options) {
      return false;
    }
    return this.options.drawRectangle;
  }

  createPayload(eventName, pt1, pt2) {
    return {
      event: eventName,
      pt1: pt1,
      pt2: pt2
    };
  }

  cleanUp() {
    this.tmpItems.splice(0);
    this.rect = null;
  }

  setRect(pt1, pt2) {
    if (!this.rect) {
      this.rect = {};
    }
    this.rect.x = Math.min(pt1.x, pt2.x);
    this.rect.y = Math.min(pt1.y, pt2.y);
    let delta = pt2.sub(pt1).abs();
    this.rect.width = delta.x;
    this.rect.height = delta.y;
  }
}
