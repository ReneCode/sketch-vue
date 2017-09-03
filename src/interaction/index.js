
import IaRect from './ia-rect';
import IaSelect from '@/interaction/ia-select';
import IaDelete from './ia-delete';
import IaMove from './ia-move';
import IaTwoPoints from './ia-two-points';

class Interaction {
  constructor() {
    this.iaList = [];
  }

  init(domElement, transform, tmpItems) {
    this.tmpItems = tmpItems;
    this.transform = transform;
    this.domElement = domElement;

    this.registerListener();

    this.start('iaSelect');
    this.start('iaDelete');
    this.start('iaMove');
  }

  exit() {
    this.unregisterListener();
  }

  getIaList() {
    return this.iaList;
  }

  stop(name) {
    const foundIndex = this.iaList.findIndex(ia => ia.name === name);
    if (foundIndex >= 0) {
      this.iaList.splice(foundIndex, 1);
    }
  }

  start(name, callback) {
    let interAction = this.createInteraction(name);
    if (interAction) {
      this.iaList.push(interAction);
      if (interAction.start) {
        interAction.start();
      }
      let self = this;
      interAction.on((err, data) => {
        if (err) {
          self.stop(name);
        }
        if (callback) {
          callback(err, data);
        }
      });
    }
    return interAction;
  }

  createInteraction(name) {
    let interAction;
    switch (name) {
      case "iaRect":
        interAction = new IaRect(this.transform, this.tmpItems);
        break;
      case "iaSelect":
        interAction = new IaSelect(this.transform, this.tmpItems);
        break;
      case "iaDelete":
        interAction = new IaDelete(this.transform, this.tmpItems);
        break;
      case "iaMove":
        interAction = new IaMove(this.transform, this.tmpItems);
        break;
      case "iaTwoPoints":
        interAction = new IaTwoPoints(this.transform, this.tmpItems);
        break;
    }
    if (interAction) {
      interAction.name = name;
    }
    return interAction;
  }

  // ---------------

  registerListener() {
    let self = this;
    this.mouseMoveHandler = (ev) => { self.onMouseMove(ev); }
    this.mouseDownHandler = (ev) => { self.onMouseDown(ev); }
    this.mouseUpHandler = (ev) => { self.onMouseUp(ev); }
    this.keyDownHandler = (ev) => { self.onKeyDown(ev); }
    this.keyUpHandler = (ev) => { self.onKeyUp(ev); }
    this.domElement.addEventListener('mousemove', this.mouseMoveHandler);
    this.domElement.addEventListener('mousedown', this.mouseDownHandler);
    this.domElement.addEventListener('mouseup', this.mouseUpHandler);

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  unregisterListener() {
    this.domElement.removeEventListener('mousemove', this.mouseMoveHandler);
    this.domElement.removeEventListener('mousedown', this.mouseDownHandler);
    this.domElement.removeEventListener('mouseup', this.mouseUpHandler);

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
    this.route("onKeyUp", ev);
  }

  route(method, ev) {
    const event = window.event || ev; // old IE support

    // start routing at the newest interation pushed on the idList.
    // that is at the last position
    for (let idx = this.iaList.length - 1; idx >= 0; idx--) {
      const ia = this.iaList[idx];
      if (ia[method]) {
        let stopRoute = false;
        const result = ia[method](event);
        switch (result) {
          case false:
            stopRoute = true;
            break;
          case "stop":
            stopRoute = true;
            this.stop(ia.name);
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

export default new Interaction();
