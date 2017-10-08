
class TemporaryItemList {
  constructor() {
    this.items = [];
  }

  add(item) {
    if (!this.contains(item)) {
      this.items.push(item);
    }
  }

  removeItem(item) {
    const idx = this.items.findIndex(it => it === item);
    if (idx >= 0) {
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

  contains(item) {
    if (this.items.find(i => i === item)) {
      return true;
    }
    return false;
  }

}

export default new TemporaryItemList();
