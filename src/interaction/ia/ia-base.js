import store from '../../store';

export default class IaBase {
  constructor(transform) {
    this._transform = transform;
  }

  on(callback) {
    this._callback = callback;
  }

  emit(event, payload) {
    if (this._callback) {
      this._callback(event, payload)
    }
  }

  getMouseDelta(event, otherPoint) {
    const pt = this.getScreenPoint(event);
    const xDelta = Math.abs(pt.x - otherPoint.x);
    const yDelta = Math.abs(pt.y - otherPoint.y);
    const delta = Math.max(xDelta, yDelta);
    return delta;
  }

  getScreenPoint(event) {
    return this._transform.getScreenPoint(event);
  }

  pickElementsFromDOM(event) {
    const pt = this.getScreenPoint(event);
    const elements = document.elementsFromPoint(pt.x, pt.y);
    if (!elements) {
      return null;
    }
    const pickedElements = [];
    for (const element of elements) {
      let pickedElement = null;
      switch (element.nodeName) {
        case "tspan":
          if (element.parentNode && element.parentNode.nodeName === "text") {
            pickedElement = element.parentNode;
          }
          break;
        case "text":
        case "rect":
        case "circle":
        case "polygon":
          pickedElement = element;
          break;
      }
      if (pickedElement) {
        pickedElements.push(pickedElement)
      }
    }
    return pickedElements;
  }

  pickItems(pickPoint, radius) {
    const selectedItems = [];
    let items = store.getters.loadedGraphics;
    for (let item of items) {
      if (item.nearPoint(pickPoint, radius)) {
        selectedItems.push(item);
      }
    }
    return selectedItems;
  }

  pickItemId(event) {
    if (!event) {
      throw new Error("pickedItemIds: event missing")
    }
    let pickedElements = this.pickElementsFromDOM(event);
    if (!pickedElements || pickedElements.length === 0) {
      return null;
    }

    // todo return a list of ids
    for (const pickedElement of pickedElements) {
      const iid = pickedElement.getAttribute("iid");
      if (iid && iid !== "0") {
        return iid;
      }
    }
    return null;
  }

  getSVGPoint(event) {
    let pt = this._transform.getSVGPoint(event);
    pt.x = Math.floor(pt.x);
    pt.y = Math.floor(pt.y);
    return pt;
  }

  screenDistanceToSVGDistance(distance) {
    return this._transform.screenDistanceToSVGDistance(distance);
  }
}
