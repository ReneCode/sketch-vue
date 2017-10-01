
export default {
  state: {
    interactionMode: ""
  },

  getters: {
    interactionMode(state) {
      return state.interactionMode;
    }
  },

  mutations: {
    setInteractionMode(state, payload) {
      if (state.interactionMode !== payload.mode) {
        state.interactionMode = payload.mode;
      }
    }
  },

  actions: {
  }
};
