import store from '@/store';

class UndoRedoList {
  constructor() {
    this.list = [];
    this.currentIdx = -1;
    this.canUndo = false;
    this.canRedo = false;
  }

  getList() {
    return this.list;
  }

  add(ref, oldData, newData) {
    // remove possible redo step
    this.list.splice(this.currentIdx + 1)
    this.list.push({
      ref: ref,
      oldData: oldData,
      newData: newData
    });
    this.currentIdx = this.list.length - 1;
    this.updateCanUndoRedo();
  }

  undo() {
    if (!this.canUndo) {
      return;
    }
    let urData = this.list[this.currentIdx];
    store.dispatch('undo', urData);
    this.currentIdx--;
    this.updateCanUndoRedo();
  }

  redo() {
    if (!this.canRedo) {
      return;
    }
    this.currentIdx++;
    let urData = this.list[this.currentIdx];
    store.dispatch('redo', urData);
    this.updateCanUndoRedo();
  }

  // -----------------

  updateCanUndoRedo() {
    if (this.currentIdx < 0) {
      this.canUndo = false;
    } else {
      this.canUndo = true;
    }

    if (this.currentIdx >= this.list.length - 1) {
      this.canRedo = false;
    } else {
      this.canRedo = true;
    }
  }

}

const undoRedoList = new UndoRedoList();
export default undoRedoList;

