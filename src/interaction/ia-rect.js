import IaBase from './ia-base'
import selectionList from '@/store/selectionList';
import ItemRectangle from '@/model/item-rectangle';
// import store from '@/store';

export default class IaRect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start() {
    this.startPoint = null;
  }

  onMouseDown(event) {
    selectionList.clear();
    this.startPoint = this.getSVGPoint(event);
    this.item = new ItemRectangle(this.startPoint, this.startPoint);
    this.tmpItems.push(this.item);
    return false;
  }

  onMouseUp(event) {
    this.setPoint2(event);
    this.startPoint = null;
    this.clearTempItems();
    // resolve ia
    this.commit(null, this.item);
  }

  onMouseMove(event) {
    if (this.startPoint) {
      this.setPoint2(event);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.clearTempItems();
      // reject ia
      this.commit("escape", null);
    }
  }

  save() {
  }

  clearTempItems() {
    this.tmpItems.splice(0);
  }

  setPoint2(event) {
    if (this.item) {
      const p2 = this.getSVGPoint(event);
      this.item.setFromTwoPoints(this.startPoint, p2);
    }
  }

}
