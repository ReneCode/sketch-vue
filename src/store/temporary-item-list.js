
class TemporaryItemList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    const idx = this.items.find(it => it === item);
    if (idx) {
      this.items.splice(idx, 1);
      return true;
    } else {
      return false;
    }
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items.splice(0);
  }
}

export default new TemporaryItemList();
