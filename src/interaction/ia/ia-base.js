
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

  pickElements(event) {
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

  pickItemId(event) {
    if (!event) {
      throw new Error("pickedItemIds: event missing")
    }
    let pickedElements = this.pickElements(event);
    if (!pickedElements || pickedElements.length === 0) {
      return null;
    }

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
}
