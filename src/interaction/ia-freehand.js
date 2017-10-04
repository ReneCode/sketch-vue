
import IaBase from './ia-base'
import ItemPolyline from '@/models/item-polyline';

import temporaryItemList from '@/store/temporary-item-list';

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaFreehand extends IaBase {
  mode = MODE_NONE;

  start(options) {
    this.options = options;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.mode = MODE_MOUSE_DOWN;
    const pt = this.getSVGPoint(event);
    this.polyline = new ItemPolyline();
    temporaryItemList.addItem(this.polyline);
    // fix first point
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
    this.mode = MODE_NONE;
    if (this.polyline) {
      temporaryItemList.removeItem(this.polyline);
      this.polyline = null;
    }
  }
}
