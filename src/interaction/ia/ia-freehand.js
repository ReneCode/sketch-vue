
import IaBase from './ia-base'
import ItemPolyline from '../../models/item-polyline';
import store from '../../store'
import temporaryItemList from '../../store/temporary-item-list';

export default class IaFreehand extends IaBase {
  start(options) {
    this.options = options;
  }

  stop() {
    this.cleanUp();
  }

  onMouseDown(event) {
    const pt = this.getSVGPoint(event);
    this.polyline = new ItemPolyline();
    this.polyline.svg.stroke = store.getters.color;
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
    this.polyline.simplify(1.7);
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
