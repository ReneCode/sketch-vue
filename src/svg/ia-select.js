
import store from '@/store';
import selectionList from '@/store/selectionList';

import IaBase from './ia-base'

const DELTA_LIMIT = 3;

export default class IaSelect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform)
    this.tmpItems = tmpItems;
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
      if (!selectedItem) {
        return;
      }
      selectionList.addItem(selectedItem);

      // this.onCallback(null, selectedItem);
    }
  }

}
