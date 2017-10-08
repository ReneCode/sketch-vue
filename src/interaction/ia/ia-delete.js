
import store from '@/store';
import interaction from '@/interaction';
// import selectionList from '@/store/selectionList';
import IaBase from './ia-base'
import temporaryItemList from '@/store/temporary-item-list';

const MODE_NONE = 1;
const MODE_MOUSE_DOWN = 2;

export default class IaDelete extends IaBase {
  circleRadius = 10;
  mode = MODE_NONE;

  start() {
    this.restart();
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
  }

  onMouseUp(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      this.mode = MODE_NONE;
      this.deleteItems();
    }
  }

  onMouseMove(event) {
    if (this.mode === MODE_MOUSE_DOWN) {
      const point = this.getSVGPoint(event);
      const pickedItems = this.pickItems(point, this.circleRadius);
      for (const item of pickedItems) {
        temporaryItemList.add(item);
      }
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
    const items = temporaryItemList.getItems();
    store.dispatch('deleteGraphics', items);
    temporaryItemList.clear();
  }
}
