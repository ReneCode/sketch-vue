import store from '@/store';
import IaBase from './ia-base'
import selectionList from '@/store/selectionList';
import Point from '@/model/point'

const DELTA_LIMIT = 3;

export default class IaMove extends IaBase {
  start() {
    this.startPoint = null;
    this.move = false;
  }

  onMouseDown(event) {
    this.firstItemRefPoint = this.getFirstItemRefPoint();
    if (this.firstItemRefPoint) {
      this.startPoint = this.getSVGPoint(event);
      this.itemDelta = this.startPoint.sub(this.firstItemRefPoint);
    }
  }

  onMouseUp(event) {
    if (this.move) {
      let item = this.updateItem(event);
      this.startPoint = null;
      this.move = false;
      if (item) {
        store.dispatch('updateGraphic', item);
      }
    }
  }

  onMouseMove(event) {
    if (this.startPoint) {
      if (this.getMouseDelta(event, this.startPoint) > DELTA_LIMIT) {
        this.move = true;
      }
    }
    this.updateItem(event);
  }

  updateItem(event) {
    if (this.move) {
      const currentPoint = this.getSVGPoint(event);
      // let delta = currentPoint.sub(this.startPoint);
      let item = this.getFirstItem();
      if (item) {
        let itemRefPoint = this.getRefPoint(item);
        if (itemRefPoint) {
          // let newRefPoint = itemRefPoint.add(delta);
          let newRefPoint = currentPoint.sub(this.itemDelta);
          item.svg.x = newRefPoint.x;
          item.svg.y = newRefPoint.y;
          return item;
        }
      }
    }
    return null;
  }

  getFirstItem() {
    const items = selectionList.getItems();
    if (!items || items.length === 0) {
      return null;
    }
    return items[0];
  }

  getFirstItemRefPoint() {
    const firstItem = this.getFirstItem();
    return this.getRefPoint(firstItem);
  }

  getRefPoint(item) {
    if (!item || !item.svg) {
      return null;
    }
    return new Point(
      item.svg.x,
      item.svg.y);
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.clearTempItems();
    }
  }

}
