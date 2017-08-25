import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBUipVOW2ovDYuIpT5_yaBA4VfklFyPjOI",
      authDomain: "sketch-vue.firebaseapp.com",
      databaseURL: "https://sketch-vue.firebaseio.com",
      projectId: "sketch-vue",
      storageBucket: ""
    });
  }
})
