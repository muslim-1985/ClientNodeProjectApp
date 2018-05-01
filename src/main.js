import Vue from 'vue'
import App from './App.vue'
import Store from './store'
import Axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

let router = new VueRouter ({

})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
