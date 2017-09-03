
import store from '@/store';
import selectionList from '@/store/selectionList';
import interaction from '@/interaction'
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
    } else {
      const options = {
        tmpItems: this.tmpItems,
        drawRectangle: true,
        callbackName: "iaSelectionCallback"
      }
      let ia = interaction.start('iaTwoPoints', options);
      ia.onMouseDown(event);
    }
  }

  iaSelectionCallback(payload) {
    switch (payload.event) {
      case "escape":
        return "stop";
      case "onMouseUp":
        return this.finishSelectionBox(payload);
    }
  }

  finishSelectionBox(payload) {
  }
}
