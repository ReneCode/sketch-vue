import IaBase from './ia-base'
import ItemCircle from '@/models/item-circle';
import Point from '@/models/point';

import store from '@/store';
import selectionList from '@/store/selectionList';

import temporaryItemList from '@/store/temporary-item-list';

export default class IaCursor extends IaBase {
  circleScreenRadius = 20;
  circleStrokeWith = 2;

  start() {
    this.createCursor();
  }

  stop() {
    temporaryItemList.removeItem(this.cursor);
    this.cursor = null;
  }

  onMouseMove(event) {
    const pt = this.getSVGPoint(event);
    this.cursor.setPosition(pt);
  }

  onMouseWheel() {
    this.updateCircleRadius();
  }

  onMouseDown(event) {
    const point = this.getSVGPoint(event);

    const selectedItems = [];
    let items = store.getters.loadedGraphics;
    for (let item of items) {
      if (item.nearPoint(point, this.circleRadius)) {
        selectedItems.push(item);
      }
    }

    selectionList.clear();
    for (let selItem of selectedItems) {
      selectionList.addItem(selItem);
    }
  }

  createCursor() {
    if (!this.cursor) {
      const pt = new Point(0, 0)
      this.cursor = new ItemCircle(pt, this.circleScreenRadius);
      this.cursor.svg.stroke = "red";
      this.cursor.svg.strokeWidth = this.circleStrokeWith;
      this.cursor.svg.fill = "none";
      temporaryItemList.addItem(this.cursor);
    }
  }

  updateCircleRadius() {
    this.circleRadius = this.screenDistanceToSVGDistance(this.circleScreenRadius);
    this.cursor.setRadius(this.circleRadius);
    this.cursor.svg.strokeWidth = this.screenDistanceToSVGDistance(this.circleStrokeWith);
  }
}
