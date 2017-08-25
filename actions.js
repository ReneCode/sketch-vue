
import * as firebase from 'firebase';

export default {

  signUpUser({ commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid
        };
        commit('setUser', newUser);
      })
      .catch(err => {
        console.error(err);
      })
  }
}
