
class SelectionList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    // const newItem = JSON.parse(JSON.stringify(item));
    const newItem = item.clone();
    newItem.selected = true;
    this.items.push(newItem);
  }

  setItem(item) {
    this.clear();
    this.addItem(item);
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items.splice(0);
  }

  any() {
    return this.items.length > 0;
  }

  contains(items) {
    for (var item of items) {
      if (!this.items.find(i => i.id === item.id)) {
        return false;
      }
    }
    return true;
  }

}

export default new SelectionList();
