import * as firebase from 'firebase';

export default {
  state: {
    loadedPages: []
  },

  getters: {
    loadedPages(state) {
      return state.loadedPages;
    },

    // that getter is a function that takes the id !!
    page(state) {
      return (id) => {
        return state.loadedPages.find(p => p.id === id);
      }
    }
  },

  mutations: {
    setLoadedPages(state, payload) {
      state.loadedPages = payload;
    }
  },

  actions: {
    loadPages({ commit }, payload) {
      commit('setLoading', true);
      const projectId = payload;
      const ref = 'project-data/' + projectId + '/pages'
      firebase.database().ref(ref).on('value', data => {
        // data.val() is an object - not an array
        let pages = [];
        const obj = data.val();
        for (let key in obj) {
          const page = {
            id: key,
            name: obj[key].name,
            description: obj[key].description
          }
          pages.push(page)
        }
        commit('setLoadedPages', pages);
        commit('setLoading', false);
      })
    },

    createPage({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const page = {
          name: payload.name,
          description: payload.description
        };
        const projectId = payload.projectId;
        const ref = 'project-data/' + projectId + '/pages'
        firebase.database().ref(ref).push(page)
          .then(data => {
            resolve(data.key);
          })
          .catch(err => {
            commit('setError', err);
            reject();
          });
      });
    }
  }
};
