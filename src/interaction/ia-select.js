
import store from '@/store';
import selectionList from '@/store/selectionList';
import interaction from '@/interaction'
import IaBase from './ia-base'

export default class IaSelect extends IaBase {
  constructor(transform, tmpItems) {
    super(transform);
    this.tmpItems = tmpItems;
  }

  onMouseDown(event) {
    const itemId = this.pickItemId(event);
    selectionList.clear();
    if (itemId) {
      let selectedItem = store.getters.graphic(itemId);
      if (!selectedItem) {
        throw new Error("can't find Item:", itemId);
      }
      selectionList.addItem(selectedItem);
    } else {
      let ia = interaction.start('iaTwoPoints', (err, payload) => {
        this.selectionCallback(err, payload);
      });
      ia.onMouseDown(event);
    }
    this.commit(null, {
      event: "onMouseDown",
      itemId: itemId
    });
  }

  selectionCallback(err, payload) {
    switch (payload.event) {
      case "onMouseDown":
        this.setRect(payload.pt1, payload.pt1);
        const item = {
          svg: this.rect
        }
        this.tmpItems.push(item);
        break;
      case "onMouseMove":
        this.setRect(payload.pt1, payload.pt2);
        break;
      case "onMouseUp":
        this.setRect(payload.pt1, payload.pt2);
        this.tmpItems.splice(0);
        this.clearRect();
        break;

    }
    console.log("#", err, payload);
  }

  clearRect() {
    this.rect = null;
  }

  setRect(pt1, pt2) {
    if (!this.rect) {
      this.rect = {};
    }
    this.rect.x = Math.min(pt1.x, pt2.x);
    this.rect.y = Math.min(pt1.y, pt2.y);
    let delta = pt2.sub(pt1).abs();
    this.rect.width = delta.x;
    this.rect.height = delta.y;
  }

}
