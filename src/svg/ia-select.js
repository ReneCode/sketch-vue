
import store from '@/store';
import selectionList from '@/store/selectionList';

import IaBase from './ia-base'

const DELTA_LIMIT = 3;

export default class IaSelect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform)
    this.tmpItems = tmpItems;
  }

  start() {
  }

  onMouseDown(event) {
    this.mouseDownPoint = this.getScreenPoint(event);
  }

  onMouseUp(event) {
    if (this.getMouseDelta(event, this.mouseDownPoint) <= DELTA_LIMIT) {
      selectionList.clear();
      const iid = this.pickItemId(event);
      if (!iid) {
        return;
      }
      let selectedItem = store.getters.graphic(iid);
      console.log(selectedItem)
      if (!selectedItem) {
        return;
      }
      selectionList.addItem(selectedItem);
    }
  }

  on(callback) {
    this.onCallback = callback;
  }

}
