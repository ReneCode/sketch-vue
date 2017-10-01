
import IaBase from './ia-base'
import ItemPolyline from '@/models/item-polyline';

import store from '@/store';

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaFreehand extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start(options) {
    this.options = options;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.mode = MODE_MOUSE_DOWN;
    const pt = this.getSVGPoint(event);
    this.polyline = new ItemPolyline();
    this.polyline.svg.strokeWidth = "3px";
    this.polyline.svg.stroke = "#227";
    this.tmpItems.push(this.polyline);
    this.polyline.addPoint(pt);
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      const pt = this.getSVGPoint(event);
      this.polyline.addPoint(pt);
    }
  }

  onMouseUp(event) {
    this.mode = MODE_NONE;
    if (this.polyline) {
      const pt = this.getSVGPoint(event);
      this.polyline.addPoint(pt);
      this.finishPolyline();
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.cleanUp();
      return "stop"
    }
  }

  cleanUp() {
    this.polyline = null;
    this.tmpItems.splice(0);
  }
}
