import IaBase from './ia-base'
import ItemCircle from '@/models/item-circle';
import Point from '@/models/point';

export default class IaCursor extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
    this.cursor = undefined;
  }

  start() {
    const pt = new Point(0, 0)
    this.cursor = new ItemCircle(pt, 10);
    this.cursor.pickable = false;
    this.tmpItems.push(this.cursor);
  }

  stop() {
    this.tmpItems.splice(0);
    this.cursor = undefined;
  }

  onMouseMove(event) {
    const pt = this.getSVGPoint(event);
    this.cursor.setPosition(pt);
  }

}
