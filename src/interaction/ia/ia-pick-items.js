import IaBase from './ia-base'
import ItemCircle from '@/models/item-circle';
import Point from '@/models/point';
import interaction from '@/interaction';

// import selectionList from '@/store/selectionList';

import temporaryItemList from '@/store/temporary-item-list';

export default class IaPickItems extends IaBase {
  circleScreenRadius = 15;
  circleScreenStrokeWith = 2;

  start(options) {
    this.options = options;
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
    const pickedItems = this.pickItems(point, this.circleRadius);
    if (this.options && this.options.callbackName) {
      const payload = {
        event: event,
        items: pickedItems
      };
      interaction.dispatch(this.options.callbackName, payload);
    }
    return "stop";
  }

  createCursor() {
    if (!this.cursor) {
      const pt = new Point(0, 0)
      this.circleRadius = this.screenDistanceToSVGDistance(this.circleScreenRadius);
      this.cursor = new ItemCircle(pt, this.circleRadius);
      this.cursor.svg.stroke = "red";
      this.cursor.svg.strokeWidth = this.screenDistanceToSVGDistance(this.circleScreenStrokeWith);
      this.cursor.svg.fill = "none";
      temporaryItemList.addItem(this.cursor);
    }
  }

  updateCircleRadius() {
    this.circleRadius = this.screenDistanceToSVGDistance(this.circleScreenRadius);
    this.cursor.setRadius(this.circleRadius);
    this.cursor.svg.strokeWidth = this.screenDistanceToSVGDistance(this.circleScreenStrokeWith);
  }
}
