import store from '@/store';
import IaBase from './ia-base'
import selectionList from '@/store/selectionList';

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;
const MODE_MOVE = 3;

export default class IaMove extends IaBase {
  start() {
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.iid = this.pickItemId(event);
    if (!this.iid) {
      return;
    }
    this.lastSVGPoint = this.getSVGPoint(event);
    this.mode = MODE_MOUSE_DOWN;
  }

  onMouseUp(event) {
    switch (this.mode) {
      case MODE_MOVE:
        this.moveSelectedItems(event);
        this.lastSVGPoint = null;
        this.saveToStore()
        break;
    }
    this.mode = MODE_NONE
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.updateSelection();
      this.mode = MODE_MOVE;
    }
    if (this.mode === MODE_MOVE) {
      this.moveSelectedItems(event);
    }
  }

  saveToStore() {
    const items = selectionList.getItems();
    store.dispatch('updateGraphics', items);
  }

  updateSelection() {
    if (!selectionList.containsItemWithId(this.iid)) {
      const item = store.getters.graphic(this.iid);
      if (item) {
        selectionList.setItem(item);
      }
    }
  }

  moveSelectedItems(event) {
    if (this.mode !== MODE_MOVE) {
      return;
    }
    const currentSVGPoint = this.getSVGPoint(event);
    let delta = currentSVGPoint.sub(this.lastSVGPoint);
    this.lastSVGPoint = currentSVGPoint;

    const items = selectionList.getItems();
    for (let item of items) {
      item.move(delta);
    }
  }

  cleanUp() {
    this.mode = MODE_NONE;
    selectionList.clear();
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.cleanUp();
    }
  }

}
