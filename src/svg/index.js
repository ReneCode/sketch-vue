
import SvgTransform from './svg-transform';

import IaRect from './ia-rect';

class Svg {
  constructor() {
    this.iaList = [];
  }

  init(svgElement, tmpItems) {
    this.svgElement = svgElement;
    this.tmpItems = tmpItems;

    this.transform = new SvgTransform();
    this.transform.init(svgElement);

    this.registerListener(svgElement);
  }

  exit() {
    this.unregisterListener();
  }

  start(name) {
    return new Promise((resolve, reject) => {
      let interAction;
      switch (name) {
        case "sketchRect":
          interAction = new IaRect(this.transform, this.tmpItems);
          break;
      }
      if (interAction) {
        this.iaList.push(interAction);
        interAction.start();
        interAction.on((err, data) => {
          // remove interaction
          this.iaList = this.iaList.filter(ia => ia !== interAction);
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      } else {
        reject();
      }
    });
  }

  // ---------------

  registerListener() {
    let self = this;
    this.mouseMoveHandler = (ev) => { self.onMouseMove(ev); }
    this.mouseDownHandler = (ev) => { self.onMouseDown(ev); }
    this.mouseUpHandler = (ev) => { self.onMouseUp(ev); }
    this.keyDownHandler = (ev) => { self.onKeyDown(ev); }
    this.keyUpHandler = (ev) => { self.onKeyUp(ev); }
    this.svgElement.addEventListener('mousemove', this.mouseMoveHandler);
    this.svgElement.addEventListener('mousedown', this.mouseDownHandler);
    this.svgElement.addEventListener('mouseup', this.mouseUpHandler);

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  unregisterListener() {
    this.svgElement.removeEventListener('mousemove', this.mouseMoveHandler);
    this.svgElement.removeEventListener('mousedown', this.mouseDownHandler);
    this.svgElement.removeEventListener('mouseup', this.mouseUpHandler);

    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  onMouseMove(ev) {
    this.route("onMouseMove", ev);
  }

  onMouseDown(ev) {
    this.route("onMouseDown", ev);
  }

  onMouseUp(ev) {
    this.route("onMouseUp", ev);
  }
  onKeyDown(ev) {
    this.route("onKeyDown", ev);
  }
  onKeyUp(ev) {
    this.route("onKeyDown", ev);
  }

  route(method, ev) {
    const event = window.event || ev; // old IE support

    for (const ia of this.iaList) {
      if (ia[method]) {
        let stopRoute = false;
        const result = ia[method](event);
        switch (result) {
          case "stop":
            stopRoute = true;
            break;
          case "finish":
            stopRoute = true;
            this.iaList = this.iaList.filter(i => i !== ia);
            break;
          case undefined:
            break;
          default:
            throw new Error("unhandled ia result:", result);
        }
        if (stopRoute) {
          break;
        }
      }
    }
    this.finishEvent(event)
  }

  finishEvent(event) {
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}

export default Svg;
