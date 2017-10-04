
import IaBase from './ia-base'

export default class IaZoom extends IaBase {

  onMouseWheel(event) {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta > 0) {
        this._transform.zoomIn(event);
      } else if (delta < 0) {
        this._transform.zoomOut(event);
      }
    }
  }

}
