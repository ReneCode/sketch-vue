import IaBase from './ia-base'
import interaction from '@/interaction';
import ItemRectangle from '@/models/item-rectangle';
import store from '@/store';

export default class IaRectangle extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start(options) {
    this.options = options;
    this.firstPoint = null;
    const opt = {
      callbackName: "iaRectangleCallback"
    }
    this.iaOnePoint = interaction.start('iaOnePoint', opt);
  }

  stop() {
    interaction.stop(this.iaOnePoint);
    return "stop";
  }

  iaRectangleCallback(payload) {
    switch (payload.event) {
      case "escape":
        this.cleanUp();
        return this.stop();
      case "onPoint":
        return this.onPoint(payload.pt);
      case "onPointMove":
        return this.onMove(payload.pt);
    }
  }

  onPoint(pt) {
    if (!this.firstPoint) {
      this.firstPoint = pt;
      this.rectangle = new ItemRectangle(pt, pt);
      this.tmpItems.push(this.rectangle);
    } else {
      if (this.firstPoint.equal(pt)) {
        this.cleanUp();
        return this.stop();
      }
      this.rectangle.setFromTwoPoints(this.firstPoint, pt);
      this.saveRectangle();
      return false;
    }
  }

  onMove(pt) {
    if (this.rectangle) {
      this.rectangle.setFromTwoPoints(this.firstPoint, pt);
    }
  }

  saveRectangle() {
    this.rectangle.projectId = this.options.projectId;
    this.rectangle.pageId = this.options.pageId;
    store.dispatch('createGraphic', this.rectangle)
      .then(() => {
        this.cleanUp();
      });
  }

  cleanUp() {
    this.tmpItems.splice(0);
    this.rectangle = null;
    this.firstPoint = null;
  }
}
