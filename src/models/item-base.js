
class ItemBase {
  constructor(id) {
    this.id = id;
    this.pickable = true;
  }

  createBoundingBox() {
    return null;
  }

  isInSelectionBox(selectionBbox) {
    if (!selectionBbox || !this.svg) {
      return false;
    }

    let myBbox = this.createBoundingBox();
    if (!myBbox) {
      return false;
    }

    if (selectionBbox.intersect(myBbox)) {
      return true;
    }
    return false;
  }

}

export default ItemBase;
