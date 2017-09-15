import store from '@/store';

const START_MARKER = "START";

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

  start() {
    // remove possible redo step
    this.list.splice(this.currentIdx + 1)
    this.list.push(START_MARKER);
    this.currentIdx = this.list.length - 1;
    this.updateCanUndoRedo();
  }

  undo() {
    if (!this.canUndo) {
      return;
    }
    while (this.currentIdx >= 0 && this.list[this.currentIdx] !== START_MARKER) {
      let urData = this.list[this.currentIdx];
      store.dispatch('undo', urData);
      this.currentIdx--;
    }
    if (this.list[this.currentIdx] !== START_MARKER) {
      throw new Error("bad undo list");
    }
    // skip start-marker
    this.currentIdx--;

    this.updateCanUndoRedo();
  }

  redo() {
    if (!this.canRedo) {
      return;
    }
    // skip start-marker
    this.currentIdx++;
    if (this.list[this.currentIdx] !== START_MARKER) {
      throw new Error("bad redo list");
    }

    while (this.currentIdx + 1 < this.list.length && this.list[this.currentIdx + 1] !== START_MARKER) {
      this.currentIdx++;
      let urData = this.list[this.currentIdx];
      store.dispatch('redo', urData);
    }
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

