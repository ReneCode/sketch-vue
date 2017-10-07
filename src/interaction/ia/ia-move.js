import store from '@/store';
import IaBase from './ia-base'
import selectionList from '@/store/selectionList';

export default class IaMove extends IaBase {
  start() {
  }

  onMouseDown(event) {
    if (selectionList.any()) {
      this.lastSVGPoint = this.getSVGPoint(event);
    }
  }

  onMouseUp(event) {
    if (this.lastSVGPoint) {
      this.moveSelectedItems(event);
      this.lastSVGPoint = null;
      this.saveToStore();
      this.lastSVGPoint = null
    }
  }

  onMouseMove(event) {
    if (this.lastSVGPoint) {
      this.moveSelectedItems(event);
    }
  }

  saveToStore() {
    const items = selectionList.getItems();
    store.dispatch('updateGraphics', items);
  }

  moveSelectedItems(event) {
    const currentSVGPoint = this.getSVGPoint(event);
    let delta = currentSVGPoint.sub(this.lastSVGPoint);
    this.lastSVGPoint = currentSVGPoint;

    const items = selectionList.getItems();
    for (let item of items) {
      item.move(delta);
    }
  }

  cleanUp() {
    this.lastSVGPoint = null;
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.cleanUp();
    }
  }

}
