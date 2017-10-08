
import IaBase from './ia-base'
import ItemPolyline from '@/models/item-polyline';

import temporaryItemList from '@/store/temporary-item-list';

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaFreehand extends IaBase {
  start(options) {
    this.options = options;
    this.mode = MODE_NONE;
  }

  stop() {
    this.cleanUp();
  }

  onMouseDown(event) {
    const pt = this.getSVGPoint(event);
    this.polyline = new ItemPolyline();
    temporaryItemList.add(this.polyline);
    // fix first point
    this.polyline.addPoint(pt);
  }

  onMouseMove(event) {
    if (this.polyline) {
      const pt = this.getSVGPoint(event);
      this.polyline.addPoint(pt);
    }
  }

  onMouseUp(event) {
    if (this.polyline) {
      const pt = this.getSVGPoint(event);
      this.polyline.addPoint(pt);
      if (this.polyline.countPoints() >= 2) {
        this.savePolyline();
      } else {
        this.cleanUp();
      }
    }
  }

  savePolyline() {
    // let cnt = this.polyline.countPoints();
    this.polyline.shrink(0.8);
    // console.log(cnt, this.polyline.countPoints());
    let item = this.polyline;
    item.projectId = this.options.projectId;
    item.pageId = this.options.pageId;
    store.dispatch('createGraphic', item)
      .then(() => {
        this.cleanUp();
      });
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.cleanUp();
      return "stop"
    }
  }

  cleanUp() {
    if (this.polyline) {
      temporaryItemList.remove(this.polyline);
      this.polyline = null;
    }
  }
}
