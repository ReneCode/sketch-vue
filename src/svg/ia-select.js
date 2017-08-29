
export default class IaSelect {
  constructor(transform, tmpItems) {
    this.transform = transform;
    this.tmpItems = tmpItems;
  }

  start() {
  }

  onMouseDown(event) {
    this.startPoint = this.getSVGPoint(event);
  }

  onMouseUp(event) {
    this.onCallback(null, this.rect);
  }

  on(callback) {
    this.onCallback = callback;
  }

  //

  getSVGPoint(event) {
    return this.transform.getSVGPoint(event);
  }

}
