
import * as firebase from 'firebase';

export default {
  state: {
    user: null
  },

  getters: {
    user(state) {
      return state.user;
    }
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    signUpUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid
          };
          commit('setUser', newUser);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
        })
    },

    signInUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const currentUser = {
            id: user.uid
          };
          commit('setUser', currentUser);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
        })
    }
  }
};
