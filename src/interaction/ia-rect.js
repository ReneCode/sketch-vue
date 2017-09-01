import IaBase from './ia-base'
import selectionList from '@/store/selectionList';

export default class IaRect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start() {
    this.startPoint = null;
  }

  onMouseDown(event) {
    selectionList.clear();
    this.startPoint = this.getSVGPoint(event);
    this.rect = {
      x: this.startPoint.x,
      y: this.startPoint.y,
      width: 0,
      height: 0
    }
    const item = {
      svg: this.rect
    }
    this.tmpItems.push(item);
    return "stop";
  }

  onMouseUp(event) {
    this.setPoint2(event);
    this.startPoint = null;
    this.clearTempItems();
    // resolve ia
    this.commit(null, this.rect);
  }

  onMouseMove(event) {
    if (this.startPoint) {
      this.setPoint2(event);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.clearTempItems();
      // reject ia
      this.commit("escape", null);
    }
  }

  clearTempItems() {
    this.tmpItems.splice(0);
  }

  setPoint2(event) {
    if (this.rect) {
      const p2 = this.getSVGPoint(event);
      this.rect.x = Math.min(this.startPoint.x, p2.x);
      this.rect.y = Math.min(this.startPoint.y, p2.y);
      let delta = this.startPoint.sub(p2).abs();
      this.rect.width = delta.x;
      this.rect.height = delta.y;
    }
  }

}
