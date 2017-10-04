import IaBase from './ia-base'
import ItemCircle from '@/models/item-circle';
import Point from '@/models/point';
import temporaryItemList from '@/store/temporary-item-list';

export default class IaCursor extends IaBase {

  start() {
    const pt = new Point(0, 0)
    this.cursor = new ItemCircle(pt, 10);
    temporaryItemList.addItem(this.cursor);
  }

  stop() {
    temporaryItemList.removeItem(this.cursor);
    this.cursor = null;
  }

  onMouseMove(event) {
    const pt = this.getSVGPoint(event);
    this.cursor.setPosition(pt);
  }

}
