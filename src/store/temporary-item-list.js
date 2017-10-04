
class TemporaryItemList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    const idx = this.items.findIndex(it => it === item);
    if (idx >= 0) {
      this.items.splice(idx, 1);
      return true;
    } else {
      console.log('TemporaryItemList#removeItem item not found')
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
