import IaBase from './ia-base'
import interaction from '@/interaction';
import ItemPolygon from '@/models/item-polygon';
import store from '@/store';
import temporaryItemList from '@/store/temporary-item-list';

export default class IaPolygon extends IaBase {
  start(options) {
    this.options = options;
    this.startFirstPoint();
  }

  startFirstPoint() {
    this.polygon = null;
    const options = {
      callbackName: "iaPolygonCallback"
    }
    this.iaOnePoint = interaction.start('iaOnePoint', options);
  }

  iaPolygonCallback(payload) {
    switch (payload.event) {
      case "escape":
        return this.escape();
      case "onPoint":
        return this.addPointToPolygon(payload.pt);
      case "onPointMove":
        return this.redrawPolygon(payload.pt);
    }
  }

  escape() {
    // legal polygon is if there are 3 points and one temporary ( > 3)
    if (this.polygon && this.polygon.countPoints() > 3) {
      this.polygon.removeLastPoint();
      return this.finishPolygon();
    }
    // no legal polygon - stop interaction
    this.cleanUp();
    interaction.stop(this.iaOnePoint);
    return "stop";
  }

  redrawPolygon(pt) {
    if (!this.polygon) {
      return;
    }
    this.polygon.updateLastPoint(pt);
  }

  addPointToPolygon(pt) {
    if (!this.polygon) {
      this.polygon = new ItemPolygon();
      temporaryItemList.addItem(this.polygon);
      // fix first point
      this.polygon.addPoint(pt);
    } else {
      // fix the last (temp) point
      this.polygon.updateLastPoint(pt);
    }
    // add temp point
    this.polygon.addPoint(pt);
  }

  finishPolygon() {
    let item = this.polygon;
    item.projectId = this.options.projectId;
    item.pageId = this.options.pageId;
    store.dispatch('createGraphic', item)
      .then(() => {
        this.cleanUp();
        this.startFirstPoint();
      });
  }

  cleanUp() {
    if (this.polygon) {
      temporaryItemList.removeItem(this.polygon);
      this.polygon = null;
    }
  }
}
