import Vue from 'vue';
import Vuex from 'vuex'

import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedProjects: [
      { id: "1", name: "hallo", description: "new project" },
      { id: "2", name: "a-test", description: "for all engineers" }
    ],

    user: null
  },

  getters: {
    lastProjects(state) {
      return state.loadedProjects.sort((p1, p2) => {
        return p1.name > p2.name
      })
      .slice(0, 10);
    },

    // that getter is a function that takes the id !!
    project(state) {
      return (id) => {
        return state.loadedProjects.find(p => p.id === id);
      }
    },

    user(state) {
      return state.user;
    }

  },

  mutations: mutations,

  actions: actions
});

export default store;
