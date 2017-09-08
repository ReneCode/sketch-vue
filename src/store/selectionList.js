
class SelectionList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const newItem = JSON.parse(JSON.stringify(item));
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

  containsItemWithId(id) {
    let found = this.items.find(item => item.id === id);
    if (found) {
      return true;
    }
    return false;
  }

}

export default new SelectionList();
