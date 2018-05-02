import Vue from 'vue'
import App from './App.vue'
import Login from './pages/login'
import Register from './pages/register'
import Store from './store/index'
import { sync } from 'vue-router-sync'
import Axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

export const router = new VueRouter ({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  Store
});
sync(Store, router);
