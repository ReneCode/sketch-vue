import IaBase from './ia-base'
import interaction from '@/interaction';
import ItemCircle from '@/model/item-circle';
import store from '@/store';

export default class IaCircle extends IaBase {

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
        return this.resizeCircle(payload);
      case "onMouseUp":
        return this.finishCircle(payload);
    }
  }

  resizeCircle(payload) {
    if (!this.circle) {
      this.circle = new ItemCircle(payload.pt1, payload.pt2);
      this.tmpItems.push(this.circle);
    } else {
      this.circle.setFromTwoPoints(payload.pt1, payload.pt2);
    }
  }

  finishCircle(payload) {
    let delta = payload.pt1.sub(payload.pt2);
    if (delta.x === 0 || delta.y === 0) {
      return "stop";
    } else {
      let item = this.circle;
      item.projectId = this.options.projectId;
      item.pageId = this.options.pageId;
      store.dispatch('createGraphic', item);

      this.startTwoPoints();
      return false
    }
  }

  cleanUp() {
    this.circle = null;
    this.tmpItems.splice(0);
  }
}
