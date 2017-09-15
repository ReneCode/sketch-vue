import * as firebase from 'firebase';
import itemFactory from '@/models/item-factory'
import undoRedoList from './undo-redo-list';

export default {
  state: {
    loadedGraphics: []
  },

  getters: {
    loadedGraphics(state) {
      return state.loadedGraphics;
    },

    graphic(state) {
      return (id) => {
        return state.loadedGraphics.find(g => g.id === id);
      }
    }
  },

  mutations: {
    setLoadedGraphics(state, payload) {
      state.loadedGraphics = payload;
    }
  },

  actions: {
    loadGraphics({ commit }, payload) {
      commit('setLoading', true);
      const projectId = payload.projectId;
      const pageId = payload.pageId;
      const ref = 'project-data/' + projectId + '/pages-data/' + pageId + '/graphics'
      firebase.database().ref(ref).on('value', data => {
        // data.val() is an object - not an array
        let graphics = [];
        const obj = data.val();
        for (let key in obj) {
          const item = itemFactory.createFromSvg(obj[key].svg)
          item.id = key;
          item.projectId = projectId;
          item.pageId = pageId;
          graphics.push(item);
        }
        commit('setLoadedGraphics', graphics);
        commit('setLoading', false);
      })
    },

    createGraphic({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const graphic = {
          svg: payload.svg
        };
        const projectId = payload.projectId;
        const pageId = payload.pageId;
        const ref = 'project-data/' + projectId + '/pages-data/' + pageId + '/graphics';
        firebase.database().ref(ref).push(graphic)
          .then(data => {
            undoRedoList.start();
            undoRedoList.add(ref + '/' + data.key, null, graphic);
            resolve(data.key);
          })
          .catch(err => {
            commit('setError', err);
            reject();
          });
      });
    },

    deleteGraphics({ commit, getters }, items) {
      let promises = [];

      undoRedoList.start();
      for (let item of items) {
        const projectId = item.projectId;
        const pageId = item.pageId;
        const ref = 'project-data/' + projectId + '/pages-data/' + pageId + '/graphics/' + item.id;
        const oldData = getters.graphic(item.id);
        undoRedoList.add(ref, oldData, null);
        let promise = firebase.database().ref(ref).remove();
        promises.push(promise);
      }
      return Promise.all(promises);
    },

    updateGraphics({ commit, getters }, items) {
      let promises = [];

      undoRedoList.start();
      for (let item of items) {
        const projectId = item.projectId;
        const pageId = item.pageId;
        const ref = 'project-data/' + projectId + '/pages-data/' + pageId + '/graphics/' + item.id;
        const clone = item.clone();
        const graphic = {
          svg: clone.svg
        };
        let oldData = getters.graphic(item.id);
        undoRedoList.add(ref, oldData, graphic);
        let promise = firebase.database().ref(ref).update(graphic);
        promises.push(promise);
      }
      return Promise.all(promises);
    }
  }
};
