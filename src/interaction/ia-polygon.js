import IaBase from './ia-base'
import interaction from '@/interaction';
import ItemPolygon from '@/model/item-polygon';
import store from '@/store';

export default class IaPolygon extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start(options) {
    this.options = options;
    this.startFirstPoint();
  }

  startFirstPoint() {
    this.polygon = null;
    const options = {
      callbackName: "iaPolygonCallback"
    }
    interaction.start('iaOnePoint', options);
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
      this.tmpItems.push(this.polygon);
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
    this.polygon = null;
    this.tmpItems.splice(0);
  }
}
