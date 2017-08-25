
export default {
  state: {
    loadedProjects: [
      { id: "1", name: "hallo", description: "new project" },
      { id: "2", name: "a-test", description: "for all engineers" }
    ]
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
    addProject(state, payload) {
      state.loadedProjects.push(payload);
    }
  },

  actions: {
    createProject({commit}, payload) {
      // firebase.database().ref('projects')
    }
  }
};
