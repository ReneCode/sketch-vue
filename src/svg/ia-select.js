
import store from '@/store';
import selectionList from '@/store/selectionList';

const DELTA_LIMIT = 3;

export default class IaSelect {
  constructor(transform, tmpItems) {
    this.transform = transform;
    this.tmpItems = tmpItems;
  }

  start() {
  }

  onMouseDown(event) {
    this.mouseDownPoint = this.getScreenPoint(event);
  }

  onMouseUp(event) {
    if (this.getMouseDelta(event) <= DELTA_LIMIT) {
      selectionList.clear();
      const iid = this.pickItemId(event);
      if (!iid) {
        return;
      }
      let selectedItem = store.getters.graphic(iid);
      console.log(selectedItem)
      if (!selectedItem) {
        return;
      }
      selectionList.addItem(selectedItem);
    }
  }

  on(callback) {
    this.onCallback = callback;
  }

  //

  getMouseDelta(event) {
    const mouseUpPoint = this.getScreenPoint(event);
    const xDelta = Math.abs(mouseUpPoint.x - this.mouseDownPoint.x);
    const yDelta = Math.abs(mouseUpPoint.y - this.mouseDownPoint.y);
    const delta = Math.max(xDelta, yDelta);
    return delta;
  }

  getScreenPoint(event) {
    return this.transform.getScreenPoint(event);
  }

  pickItemId(event) {
    const pt = this.getScreenPoint(event);
    const element = document.elementFromPoint(pt.x, pt.y);
    if (!element) {
      return null;
    }
    let pickedElement = null;
    switch (element.nodeName) {
      case "text":
        pickedElement = element;
        break;
      case "tspan":
        if (element.parentNode && element.parentNode.nodeName === "text") {
          pickedElement = element.parentNode;
        }
        break;
      case "rect":
        pickedElement = element;
        break;
    }

    if (!pickedElement) {
      return null;
    }

    const iid = pickedElement.getAttribute("iid");
    return iid;
  }

}
