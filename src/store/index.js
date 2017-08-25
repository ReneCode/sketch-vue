import Vue from 'vue';
import Vuex from 'vuex'

import project from './modules/project-store';
import user from './modules/user-store';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    error: null,
    loading: false
  },

  getters: {
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    }
  },

  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },

  actions: {
    clearError({commit}) {
      commit('clearError');
    }
  },

  modules: {
    project,
    user
  }
});

export default store;
