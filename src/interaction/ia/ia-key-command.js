
import store from '../../store';
import selectionList from '../../store/selection-list';

import IaBase from './ia-base'

export default class IaKeyCommand extends IaBase {

  onKeyDown(event) {
    if (event.key === "Backspace") {
      let items = selectionList.getItems();
      store.dispatch('deleteGraphics', items);
    }
  }

}
