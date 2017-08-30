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
    this.startPoint = null;
    this.move = false;
  }

  onMouseMove(event) {
    if (this.startPoint) {
      if (this.getMouseDelta(event, this.startPoint) > DELTA_LIMIT) {
        this.move = true;
      }
    }
    if (this.move) {
      const currentPoint = this.getSVGPoint(event);
      let delta = currentPoint.sub(this.startPoint);
      let item = this.getFirstItem();
      if (item) {
        let newRefPoint = this.firstItemRefPoint.add(delta);
        item.svg.x = newRefPoint.x;
        item.svg.y = newRefPoint.y;
      }
    }
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
    if (!firstItem.svg) {
      return null;
    }
    return new Point(
      firstItem.svg.x,
      firstItem.svg.y);
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.clearTempItems();
    }
  }

}
