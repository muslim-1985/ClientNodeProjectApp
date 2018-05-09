import Vue from 'vue'
import App from './App.vue'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import store  from './store/index'
import {sync}  from 'vuex-router-sync'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

export const router = new VueRouter ({
  routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
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

//router guard
router.beforeEach((to, from, next) => {
    if(to.path != '/login' && to.path != '/register') {
        if(store.state.authState) {
            console.log('Ваш токен верен. (' + to.path + ')');
            next();
        } else {
            console.log('Ваш токен устарел. (' + to.path + ')');
            next('login');
        }
    } else {
        console.log('You\'re on the login page');
        next();
    }
});
sync(store, router);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
// sync(Store, router);
