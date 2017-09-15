import * as firebase from 'firebase';

export default {
  actions: {
    undo({ commit }, payload) {
      if (payload.oldData) {
        // update or create
        return firebase.database().ref(payload.ref).update(payload.oldData);
      } else {
        return firebase.database().ref(payload.ref).remove();
      }
    },

    redo({ commit }, payload) {
      if (payload.newData) {
        return firebase.database().ref(payload.ref).update(payload.newData);
      } else {
        return firebase.database().ref(payload.ref).remove();
      }
    }
  }
};
