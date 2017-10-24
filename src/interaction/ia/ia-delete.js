
import store from '../../store';
import interaction from '../../interaction';
import IaBase from './ia-base'
import temporaryItemList from '../../store/temporary-item-list';

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaDelete extends IaBase {
  mode = MODE_NONE;

  start() {
    this.restart();
  }

  stop() {
    interaction.stop(this.iaCircleCursor);
  }

  restart() {
    temporaryItemList.clear();
    const options = {
      circleFill: '#e22'
    };
    this.iaCircleCursor = interaction.start('iaCircleCursor', options);
  }

  onMouseDown(event) {
    this.mode = MODE_MOUSE_DOWN;
    this.pickAndAddItems(event);
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.mode = MODE_NONE;
      this.deleteItems();
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.pickAndAddItems(event);
    }
  }

  pickAndAddItems(event) {
    const point = this.getSVGPoint(event);
    const circlePickRadius = this.iaCircleCursor.getRadius();
    const pickedItems = this.pickItems(point, circlePickRadius);
    for (const item of pickedItems) {
      temporaryItemList.add(item);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      temporaryItemList.clear();
      interaction.stop(this.iaCircleCursor);
      return "stop"
    }
  }

  deleteItems() {
    // note: there is the circle-cursor (with .id = 0)
    // in the temporaryItemList !!
    // do not delete that circle-cursor-item
    const items = temporaryItemList.getItems()
      .filter(item => item.id !== 0);
    if (items.length > 0) {
      store.dispatch('deleteGraphics', items);
    }
    temporaryItemList.clear(item => !!item.id);
  }
}
