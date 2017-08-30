import IaBase from './ia-base'
import selectionList from '@/store/selectionList';

export default class IaMove extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  start(tmpItems) {
    this.startPoint = null;
  }

  onMouseDown(event) {
    if (selectionList.getItems().length > 0) {
      this.startPoint = this.getSVGPoint(event);
    }
  }

  onMouseUp(event) {
    this.startPoint = null;
    this.clearTempItems();
  }

  onMouseMove(event) {
    if (this.startPoint) {

    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.clearTempItems();
    }
  }

  clearTempItems() {
    this.tmpItems.splice(0);
  }

}
