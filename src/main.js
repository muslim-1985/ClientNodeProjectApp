import Vue from 'vue'
import App from './App.vue'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Store from './store/index'
import { sync } from 'vue-router-sync'
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
        if(Store.commit('checkToken')) {
            console.log('There is a token, resume. (' + to.path + ')');
            next();
        } else {
            console.log('There is no token, redirect to login. (' + to.path + ')');
            next('login');
        }
    } else {
        console.log('You\'re on the login page');
        next();
    }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  Store
});
// sync(Store, router);
