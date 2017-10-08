
import store from '@/store';
import selectionList from '@/store/selectionList';
import interaction from '@/interaction'
import IaBase from './ia-base'
import BoundingBox from '@/models/bounding-box';
import temporaryItemList from '@/store/temporary-item-list';

export default class IaSelect extends IaBase {
  start() {
    this.restart();
  }

  restart() {
    this.iaPickItems = interaction.start('iaPickItems', { callbackName: "iaPickItemsCallback" });
  }

  iaPickItemsCallback(payload) {
    switch (payload.eventName) {
      case 'onMouseDown':
        this.pickItemsFinished(payload);
        break;
    }
  }

  pickItemsFinished(payload) {
    const items = payload.items;

    if (items && items.length > 0) {
      if (!selectionList.contains(items)) {
        selectionList.clear();
        for (var item of items) {
          selectionList.addItem(item);
        }
      }
      this.restart();
    } else {
      selectionList.clear();
      const options = {
        callbackName: "iaSelectionCallback"
      }
      this.iaTwoPoints = interaction.start('iaTwoPoints', options);
      this.iaTwoPoints.onMouseDown(payload.event);
    }
  }

  iaSelectionCallback(payload) {
    switch (payload.eventName) {
      case "escape":
        this.cleanUp();
        this.restart();
        break;
      case "onMouseMove":
        return this.resizeSelectionBox(payload);
      case "onMouseUp":
        this.finishSelectionBox(payload);
        this.restart();
    }
  }

  resizeSelectionBox(payload) {
    if (payload.pt1.equal(payload.pt2)) {
      return;
    }

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
      temporaryItemList.add(this.selectionBox);
    }

    this.selectionBox.svg.x = Math.min(payload.pt1.x, payload.pt2.x);
    this.selectionBox.svg.y = Math.min(payload.pt1.y, payload.pt2.y);
    let delta = payload.pt2.sub(payload.pt1).abs();
    this.selectionBox.svg.width = delta.x;
    this.selectionBox.svg.height = delta.y;

    this.selectItemsInSelectionBox();
  }

  selectItemsInSelectionBox() {
    let selectedItems = [];
    let items = store.getters.loadedGraphics;
    let selBBox = BoundingBox.createFromRectangle(this.selectionBox.svg);
    for (let item of items) {
      if (item.isInSelectionBox(selBBox)) {
        selectedItems.push(item);
      }
    }

    // TODO: check if selection has changed
    selectionList.clear();
    for (let selItem of selectedItems) {
      selectionList.addItem(selItem);
    }
  }

  finishSelectionBox(payload) {
    this.resizeSelectionBox(payload);

    this.cleanUp();
  }

  cleanUp() {
    if (this.selectionBox) {
      temporaryItemList.remove(this.selectionBox);
      this.selectionBox = null;
    }
  }

}
