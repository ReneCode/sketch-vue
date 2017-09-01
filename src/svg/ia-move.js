import store from '@/store';
import IaBase from './ia-base'
import selectionList from '@/store/selectionList';
import Point from '@/model/point'

const DELTA_LIMIT = 3;

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;
const MODE_MOVE = 3;

export default class IaMove extends IaBase {
  start() {
    this.mouseDownScreenPoint = null;
    this.mode = MODE_NONE;
  }

  onMouseDown(event) {
    this.iid = this.pickItemId(event);
    if (!this.iid) {
      return;
    }
    this.mouseDownScreenPoint = this.getScreenPoint(event);
    this.startSVGPoint = this.getSVGPoint(event);
    this.mode = MODE_MOUSE_DOWN;

    // this.firstItemRefPoint = this.getFirstItemRefPoint();
    // if (this.firstItemRefPoint) {
    //   this.itemDelta = this.startPoint.sub(this.firstItemRefPoint);
    // }
  }

  onMouseUp(event) {
    switch (this.mode) {
      case MODE_MOVE:
        this.moveSelectedItems(event);
        this.mouseDownScreenPoint = null;
        this.mode = MODE_NONE;
        this.saveToStore()
        break;
      case MODE_MOUSE_DOWN:
        this.mode = MODE_NONE
        break;
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      if (this.getMouseDelta(event, this.mouseDownScreenPoint) > DELTA_LIMIT) {
        this.updateSelection();
        this.itemStartRefPoint = this.getSelectionRefPoint();
        if (this.itemStartRefPoint) {
          this.mode = MODE_MOVE;
        } else {
          this.mode = MODE_NONE;
        }
      }
    }
    this.moveSelectedItems(event);
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
      return null;
    }

    const currentSVGPoint = this.getSVGPoint(event);
    let delta = currentSVGPoint.sub(this.startSVGPoint);

    let newRefPoint = this.itemStartRefPoint.add(delta);
    this.setSelectionRefPoint(newRefPoint);
  }

  setSelectionRefPoint(pt) {
    const items = selectionList.getItems();
    if (!items || items.length === 0) {
      return null;
    }
    const item = items[0];
    item.svg.x = pt.x;
    item.svg.y = pt.y;
  }

  getSelectionRefPoint() {
    const items = selectionList.getItems();
    if (!items || items.length === 0) {
      return null;
    }
    return this.getRefPoint(items[0]);
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
      selectionList.clear();
    }
  }

}
