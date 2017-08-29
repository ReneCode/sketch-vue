
class SelectionList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const newItem = Object.assign({}, item, { selected: true });
    this.items.push(newItem);
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items.splice(0);
  }
}

export default new SelectionList();
