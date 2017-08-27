
export default class IaRect {
  constructor(transform) {
    this.transform = transform;
    this.startPoint = null;
  }

  start(tempSvgItems) {
    this.tempItems = tempSvgItems;
  }

  onMouseDown(event) {
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
    this.tempItems.push(item);
  }

  onMouseUp(event) {
    this.setPoint2(event);
    this.clearTempItems();
    this.onCallback(null, this.rect);
  }

  onMouseMove(event) {
    this.setPoint2(event);
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.clearTempItems();
      this.onCallback("escape", null);
    }
  }

  on(callback) {
    this.onCallback = callback;
  }

  clearTempItems() {
    this.tempItems.splice(0);
  }

  setPoint2(event) {
    if (this.rect) {
      const p2 = this.getSVGPoint(event);
      this.rect.x = Math.min(this.startPoint.x, p2.x);
      this.rect.y = Math.min(this.startPoint.y, p2.y);
      this.rect.width = Math.abs(this.startPoint.x - p2.x);
      this.rect.height = Math.abs(this.startPoint.y - p2.y);
    }
  }

  getSVGPoint(event) {
    return this.transform.getSVGPoint(event);
  }

}
