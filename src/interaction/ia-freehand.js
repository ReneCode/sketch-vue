
import IaBase from './ia-base'
import ItemPolyline from '@/models/item-polyline';
import store from '@/store';

const MODE_NONE = 0;
const MODE_MOUSE_DOWN = 1;

export default class IaFreehand extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
    this.mode = MODE_NONE;
  }

  start(options) {
    this.options = options;
  }

  onMouseDown(event) {
    this.mode = MODE_MOUSE_DOWN;
    const pt = this.getSVGPoint(event);
    this.polyline = new ItemPolyline();
    this.tmpItems.push(this.polyline);
    // fix first point
    this.polyline.addPoint(pt);
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      const pt = this.getSVGPoint(event);
      this.polyline.addPoint(pt);
    }
  }

  onMouseUp(event) {
    this.mode = MODE_NONE;
    if (this.polyline) {
      const pt = this.getSVGPoint(event);
      this.polyline.addPoint(pt);

      let item = this.polyline;
      item.projectId = this.options.projectId;
      item.pageId = this.options.pageId;
      store.dispatch('createGraphic', item)
        .then(() => {
          this.cleanUp();
        });
    }
  }

  /*
  startFirstPoint() {
    this.polygon = null;
    const options = {
      callbackName: "iaFreehandCallback"
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
  */

  cleanUp() {
    this.mode = MODE_NONE;
    this.polyline = null;
    this.tmpItems.splice(0);
  }
}
