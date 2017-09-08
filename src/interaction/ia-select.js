
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
        callbackName: "iaSelectionCallback"
      }
      let ia = interaction.start('iaTwoPoints', options);
      ia.onMouseDown(event);
    }
  }

  iaSelectionCallback(payload) {
    switch (payload.event) {
      case "escape":
        return this.cleanUp();
      case "onMouseMove":
        return this.resizeSelectionBox(payload);
      case "onMouseUp":
        return this.finishSelectionBox(payload);
    }
  }

  resizeSelectionBox(payload) {
    if (!this.selectionBox) {
      this.selectionBox = {
        selection: true,
        svg: {
          type: "rect",
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      };
      this.tmpItems.push(this.selectionBox);
    }

    this.selectionBox.svg.x = Math.min(payload.pt1.x, payload.pt2.x);
    this.selectionBox.svg.y = Math.min(payload.pt1.y, payload.pt2.y);
    let delta = payload.pt2.sub(payload.pt1).abs();
    this.selectionBox.svg.width = delta.x;
    this.selectionBox.svg.height = delta.y;
  }

  finishSelectionBox(payload) {
    this.resizeSelectionBox(payload);

    this.cleanUp();
  }

  cleanUp() {
    this.tmpItems.splice(0);
    this.selectionBox = null;
  }
}
