import IaBase from './ia-base'
import interaction from '../../interaction';
import ItemCircle from '../../models/item-circle';

import temporaryItemList from '../../store/temporary-item-list';
import store from '../../store';

export default class IaCircle extends IaBase {
  start() {
    const opt = {
      callbackName: "iaCircleCallback"
    }
    this.iaOnePoint = interaction.start('iaOnePoint', opt);
  }

  stop() {
    interaction.stop(this.iaOnePoint);
    return "stop";
  }

  iaCircleCallback(payload) {
    switch (payload.event) {
      case "escape":
        this.cleanUp();
        return this.stop();
      case "onPoint":
        return this.onPoint(payload.pt);
      case "onPointMove":
        return this.onPointMove(payload.pt);
      /*
      case "escape":
        this.cleanUp();
        return "stop";
      case "onMouseMove":
        return this.resizeCircle(payload);
      case "onMouseUp":
        return this.finishCircle(payload);
    }
    */
    }
  }

  onPoint(pt) {
    if (!this.firstPoint) {
      this.firstPoint = pt;
      this.circle = new ItemCircle(pt);
      this.circle.svg.stroke = store.getters.color;
      temporaryItemList.add(this.circle);
    } else {
      if (this.firstPoint.equal(pt)) {
        this.cleanUp();
        return this.stop();
      }
      let radius = this.firstPoint.sub(pt).length();
      this.circle.setRadius(radius);
      this.saveCircle();
      return false;
    }
  }

  onPointMove(pt) {
    if (this.circle) {
      let radius = this.firstPoint.sub(pt).length();
      this.circle.setRadius(radius);
    }
  }

  saveCircle() {
    store.dispatch('createGraphic', this.circle)
      .then(() => {
        this.cleanUp();
      })
  }

  cleanUp() {
    if (this.circle) {
      temporaryItemList.remove(this.circle);
      this.circle = null;
    }
    this.firstPoint = null;
  }
}
