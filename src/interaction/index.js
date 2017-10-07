
import InteractionFactory from './interaction-factory';
import store from '@/store';

class Interaction {
  constructor() {
    this.iaList = [];
  }

  init(domElement, transform) {
    this.interactionFactory = new InteractionFactory(transform);
    this.domElement = domElement;

    this.registerListener();
  }

  exit() {
    this.unregisterListener();
  }

  getIaList() {
    return this.iaList;
  }

  clear() {
    for (let ia of this.iaList) {
      if (typeof ia["stop"] === 'function') {
        ia.stop();
      }
    }
    this.iaList.splice(0);
  }

  stop(name) {
    let foundIndex = -1;
    if (typeof name === 'string') {
      foundIndex = this.iaList.findIndex(ia => ia.name === name);
    } else if (typeof name === 'object') {
      foundIndex = this.iaList.findIndex(ia => ia === name);
    }
    if (foundIndex >= 0) {
      const ia = this.iaList[foundIndex];
      if (typeof ia["stop"] === 'function') {
        ia.stop();
      }
      this.iaList.splice(foundIndex, 1);
    }
    if (this.iaList.length === 0) {
      store.commit('setInteractionMode', { mode: 'select' });
    }
  }

  start(name, ...args) {
    let interAction = this.interactionFactory.create(name);
    if (interAction) {
      let callback;
      if (args.length > 0) {
        const lastArgument = args[args.length - 1];
        if (typeof lastArgument === 'function') {
          callback = lastArgument;
        }
      }
      this.iaList.push(interAction);
      if (interAction.start) {
        interAction.start(...args);
      }
      let self = this;
      interAction.on((err, data) => {
        if (err) {
          self.stop(interAction);
        }
        if (callback) {
          callback(err, data);
        }
      });
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
    this.mouseWheelHandler = (ev) => { self.onMouseWheel(ev); }
    this.domElement.addEventListener('mousemove', this.mouseMoveHandler);
    this.domElement.addEventListener('mousedown', this.mouseDownHandler);
    this.domElement.addEventListener('mouseup', this.mouseUpHandler);
    this.domElement.addEventListener('wheel', this.mouseWheelHandler);

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  unregisterListener() {
    this.domElement.removeEventListener('mousemove', this.mouseMoveHandler);
    this.domElement.removeEventListener('mousedown', this.mouseDownHandler);
    this.domElement.removeEventListener('mouseup', this.mouseUpHandler);
    this.domElement.removeEventListener('wheel', this.mouseWheelHandler);

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
  onMouseWheel(ev) {
    this.route("onMouseWheel", ev);
  }
  onKeyDown(ev) {
    this.route("onKeyDown", ev);
  }
  onKeyUp(ev) {
    this.route("onKeyUp", ev);
  }

  route(method, ev) {
    const event = window.event || ev; // old IE support
    this.dispatch(method, event);
    this.finishEvent(event)
  }

  dispatch(method, event) {
    // start routing at the newest interation pushed on the idList.
    // that is at the last position
    for (let idx = this.iaList.length - 1; idx >= 0; idx--) {
      const ia = this.iaList[idx];
      if (typeof ia[method] === 'function') {
        let stopRoute = false;
        const result = ia[method](event);
        switch (result) {
          case false:
            stopRoute = true;
            break;
          case "stop":
            // stopRoute = true;
            this.stop(ia);
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
