import Vue from 'vue'
import App from './App.vue'
import Login from './pages/login'
import Register from './pages/register'
import SaveData from './pages/saveData'
import Home from './pages/home'
import GoodSave from './pages/goodSave'
import GoodShow from './pages/goodShow'
import FavoritesShow from './pages/favoritesShow'
import store  from './store/index'
import {sync}  from 'vuex-router-sync'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


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
        component: Home
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
      },
      {
          path: '/goodShow',
          name: 'goodShow',
          component: GoodShow
      },
      {
          path: '/favorites',
          name: 'favorites',
          component: FavoritesShow,
          beforeEnter: beforeSetLocalStorage
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
//logout
function logout (to, from, next) {
    store.dispatch('logout');
    store.state.authState = false;
    next()
}
//перед переходом на страницу записываем данные товара из массива state которые мы передали из компонента goodShow
//в локальное хранилище
function beforeSetLocalStorage (to, from, next) {
    store.dispatch('setGoodToFavorites');
    next()
}
//router guard
router.beforeEach((to, from, next) => {
    if(to.path != '/login' && to.path != '/register') {
        store.dispatch('checkAuth');
        if(store.state.authState) {
            next();
        } else {
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

