import * as firebase from 'firebase';

export default {
  state: {
    loadedProjects: []
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
    }
  },

  mutations: {
    setLoadedProjects(state, payload) {
      state.loadedProjects = payload;
    }
  },

  actions: {
    loadProjects({ commit }) {
      firebase.database().ref('projects').on('value', data => {
        // data.val() is an object - not an array
        let projects = [];
        const obj = data.val();
        for (let key in obj) {
          const prj = {
            id: key,
            name: obj[key].name,
            description: obj[key].description
          }
          projects.push(prj)
        }
        commit('setLoadedProjects', projects);
      })
    },

    createProject({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const project = {
          name: payload.name,
          description: payload.description
        };
        firebase.database().ref('projects').push(project)
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
