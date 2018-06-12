import Vue from 'vue'
import App from './App.vue'
import Login from './pages/login'
import Register from './pages/register'
import SaveData from './pages/saveData'
import Home from './pages/home'
import GoodSave from './pages/goodSave'
import GoodShow from './pages/goodShow'
import store  from './store/index'
import {sync}  from 'vuex-router-sync'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

function RRR (to, from, next) {
    store.dispatch('resUserData');
    next()
}
function getCategoryData(to, from, next) {
    store.dispatch('setCategory');
    next()
}
function logout (to, from, next) {
    store.dispatch('logout');
    store.state.authState = false;
    next()
}
function getGoodData (to, from ,next) {
    store.dispatch('setGood');
    next();
}
export const router = new VueRouter ({
  routes: [
      {
        path: '/logout',
        name: 'logout',
        component: Login,
          beforeEnter: logout
      },
      {
        path: '/',
        name: 'home',
        component: Home,
          beforeEnter: RRR
      },
      {
          path: '/savedata',
          name: 'savedata',
          component: SaveData
      },
      {
          path: '/goodsave',
          name: 'goodsave',
          component: GoodSave,
          beforeEnter: getCategoryData
      },
      {
          path: '/goodShow',
          name: 'goodShow',
          component: GoodShow,
          beforeEnter: getGoodData
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
        store.dispatch('checkAuth');
        if(store.state.authState) {
            //console.log('Ваш токен верен. (' + to.path + ')');
            next();
        } else {
            //console.log('Ваш токен устарел. (' + to.path + ')');
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

