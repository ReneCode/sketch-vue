
class ItemBase {
  constructor(id) {
    this.id = id;
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

  nearPoint(point, radius) {
    return false;
  }

}

export default ItemBase;
