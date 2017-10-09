
class TemporaryItemList {
  constructor() {
    this.items = [];
  }

  add(item) {
    if (!this.contains(item)) {
      this.items.push(item);
    }
  }

  remove(item) {
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

  clear(lamba) {
    if (lamba === undefined) {
      this.items.splice(0);
      return;
    }
    if (typeof lamba === 'function') {
      for (var i = 0; i < this.items.length;) {
        if (lamba(this.items[i])) {
          this.items.splice(i, 1);
          // in next round check the next item - now on the same index i
        } else {
          // check next item
          i++
        }
      }
    }
  }

  contains(itemOrItems) {
    if (Array.isArray(itemOrItems)) {
      for (var item of itemOrItems) {
        if (!this.items.find(i => i === item)) {
          return false;
        }
      }
      return true;
    } else {
      if (this.items.find(i => i === itemOrItems)) {
        return true;
      }
      return false;
    }
  }

}

export default new TemporaryItemList();
