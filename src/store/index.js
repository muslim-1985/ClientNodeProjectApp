import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalstorage from 'vue-localstorage'
import mutations from './mutations';
import actions from './actions'
import getters from './getters'
import state from './state'
Vue.use(VueLocalstorage);
Vue.use(Vuex);

const store = new Vuex.Store ({
    state,
    mutations,
    actions,
    getters,
});

export default  store;
