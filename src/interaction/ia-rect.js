import IaBase from './ia-base'
import interaction from '@/interaction';
import ItemRectangle from '@/model/item-rectangle';
import store from '@/store';

export default class IaRect extends IaBase {

  start(options) {
    this.options = options;
    this.startTwoPoints();
  }

  startTwoPoints() {
    const options = {
      callbackName: "twoPointsCallback"
    }
    interaction.start('iaTwoPoints', options);
  }

  twoPointsCallback(payload) {
    switch (payload.event) {
      case "escape":
        this.cleanUp();
        return "stop";
      case "onMouseMove":
        return this.resizeRectangle(payload);
      case "onMouseUp":
        return this.finishRectangle(payload);
    }
  }

  resizeRectangle(payload) {
    if (!this.rectangle) {
      this.rectangle = new ItemRectangle(payload.pt1, payload.pt2);
      this.tmpItems.push(this.rectangle);
    } else {
      this.rectangle.setFromTwoPoints(payload.pt1, payload.pt2);
    }
  }

  finishRectangle(payload) {
    let delta = payload.pt1.sub(payload.pt2);
    if (delta.x === 0 || delta.y === 0) {
      return "stop";
    } else {
      let item = new ItemRectangle(payload.pt1, payload.pt2);
      item.projectId = this.options.projectId;
      item.pageId = this.options.pageId;
      store.dispatch('createGraphic', item)
        .then(() => {
          this.cleanUp();
          this.startTwoPoints();
        });
      return false
    }
  }

  cleanUp() {
    this.tmpItems.splice(0);
    this.rectangle = null;
  }
}
