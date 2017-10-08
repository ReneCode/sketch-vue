
export default class SetList {
  items = [];

  clear() {
    this.items.splice(0);
  }

  getItems() {
    return this.items;
  }

  contains(item) {
    if (this.items.find(i => i === item)) {
      return true;
    }
    return false;
  }

  add(item) {
    if (!this.contains(item)) {
      this.items.push(item);
    }
  }
}
