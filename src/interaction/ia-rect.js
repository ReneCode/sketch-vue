import IaBase from './ia-base'
import selectionList from '@/store/selectionList';
import interaction from '@/interaction';
import ItemRectangle from '@/model/item-rectangle';
// import store from '@/store';

export default class IaRect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start(payload) {
    console.log("iaRect start:", payload)
    this.startPoint = null;
  }

  onMouseDown(event) {
    selectionList.clear();
    let ia = interaction.start('iaTwoPoints', (err, payload) => {
      return this.twoPointsCallback(err, payload);
    });
    ia.onMouseDown(event);

    // this.startPoint = this.getSVGPoint(event);
    // this.item = new ItemRectangle(this.startPoint, this.startPoint);
    // this.tmpItems.push(this.item);
    return false;
  }

  twoPointsCallback(err, payload) {
    if (err) {
      this.clearUp();
      return "stop";
    }
    switch (payload.event) {
      case "onMouseDown":
        this.setRect(payload.pt1, payload.pt1);
        const item = {
          svg: this.rect
        }
        this.tmpItems.push(item);
        break;
      case "onMouseMove":
        this.setRect(payload.pt1, payload.pt2);
        break;
      case "onMouseUp":
        this.finishRectangle(payload);
        break;
    }
  }

  finishRectangle(payload) {
    this.clearUp();
    let delta = payload.pt1.sub(payload.pt2);
    if (delta.x === 0 || delta.y === 0) {
      this.emit("zero rect", null)
    } else {
      let item = new ItemRectangle(payload.pt1, payload.pt2);
      this.emit(null, item);
    }
  }

  clearUp() {
    this.tmpItems.splice(0);
    this.startPoint = null;
    this.rect = null;
  }

  setRect(pt1, pt2) {
    if (!this.rect) {
      this.rect = {};
    }
    this.rect.x = Math.min(pt1.x, pt2.x);
    this.rect.y = Math.min(pt1.y, pt2.y);
    let delta = pt2.sub(pt1).abs();
    this.rect.width = delta.x;
    this.rect.height = delta.y;
  }
}
