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
      drawRectangle: true,
      callbackName: "twoPointsCallback"
    }
    interaction.start('iaTwoPoints', options);
  }

  twoPointsCallback(payload) {
    switch (payload.event) {
      case "escape":
        return "stop";
      case "onMouseUp":
        return this.finishRectangle(payload);
    }
  }

  finishRectangle(payload) {
    let delta = payload.pt1.sub(payload.pt2);
    if (delta.x === 0 || delta.y === 0) {
      return "stop";
    } else {
      let item = new ItemRectangle(payload.pt1, payload.pt2);
      item.svg.type = "rect";
      item.projectId = this.options.projectId;
      item.pageId = this.options.pageId;
      store.dispatch('createGraphic', item);

      this.startTwoPoints();
      return false
    }
  }
}
