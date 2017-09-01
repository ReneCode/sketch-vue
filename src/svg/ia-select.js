
import store from '@/store';
import selectionList from '@/store/selectionList';

import IaBase from './ia-base'

export default class IaSelect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  onMouseDown(event) {
    const itemId = this.pickItemId(event);
    selectionList.clear();
    if (itemId) {
      let selectedItem = store.getters.graphic(itemId);
      if (!selectedItem) {
        throw new Error("can't find Item:", itemId);
      }
      selectionList.addItem(selectedItem);
    }
    this.commit(null, {
      event: "onMouseDown",
      itemId: itemId
    });
  }
}
