
import store from '@/store';
import selectionList from '@/store/selectionList';

import IaBase from './ia-base'

const DELTA_LIMIT = 3;

export default class IaSelect extends IaBase {
  onMouseDown(event) {
    this.mouseDownPoint = this.getScreenPoint(event);
  }

  onMouseUp(event) {
    if (this.mouseDownPoint && this.getMouseDelta(event, this.mouseDownPoint) <= DELTA_LIMIT) {
      this.mouseDownPoint = null;
      selectionList.clear();
      const iid = this.pickItemId(event);
      if (!iid) {
        return;
      }
      let selectedItem = store.getters.graphic(iid);
      if (!selectedItem) {
        throw new Error("can't find Item:", iid);
      }
      selectionList.addItem(selectedItem);
    }
  }

  onKeyDown(event) {
    if (event.key === "Backspace") {
      let items = selectionList.getItems();
      store.dispatch('deleteGraphics', items);
    }
  }

}
