import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import {router} from '../main'
Vue.use(VueCookie);
Vue.use(Vuex);
const store = new Vuex.Store ({
    state: {
        authState: false,
        resData: [],
        category: [],
        good: []
    },
    mutations: {
        checkLoginAuthState (state, bool) {
            state.authState = bool;
        },
        checkToken(state) {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Vue.cookie.get('token')}`
                }
            };
            axios.get('http://localhost:3012', headers)
                .then((res) => {
                    //console.log(res);
                    state.authState = true;
                })
                .catch((res) => {
                    console.log(res);
                    state.authState = false;
                });
        },
        pushData(state, data) {
            state.resData.push(data);
        },
        deleteData (state) {
            return state.resData = [];
        },
        deleteCategoryData (state) {
            return state.category = [];
        },
        setCategoryData (state, data) {
            state.category.push(data);
        },
        setGoodData (state, data) {
            state.good.push(data);
        },
        deleteGoodData (state) {
            return state.good = [];
        }
    },
    actions: {
        checkAuth({commit}) {
            commit('checkToken');
        },
        auth({commit}, {username, email, password, forgotPassword}) {
            const objFormData = {username, email, password, forgotPassword};
            const headers = {headers: {'Content-Type': 'application/json'}};
            //проверка если есть поле почты то значит регистрируемся если нет то логинимся
            let route = objFormData.email === undefined ? '/login' : '/register';
            axios.post('http://localhost:3012' + route, objFormData, headers)
                .then((res) => {
                    Vue.cookie.set('token', res.data.token, 7);
                    commit('checkLoginAuthState', true);
                    router.push('/');
                    commit('checkLoginAuthState', false);
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        logout () {
            Vue.cookie.delete('token');
            window.location.reload();
        },
        resUserData ({commit}) {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Vue.cookie.get('token')}`
                }
            };
            axios.get('http://localhost:3012', headers)
                .then((res) => {
                    commit('checkToken');
                    commit('deleteData');
                    for (let key in res.data) {
                        commit('pushData', res.data[key].username);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        setData({commit}, {category}) {
            const objFormData = {category};
            const headers = {headers: {'Content-Type': 'application/json'}};
            axios.post('http://localhost:3012/info', objFormData, headers)
                .then((res) => {
                    alert('Category created successful');
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        setCategory ({commit}) {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Vue.cookie.get('token')}`
                }
            };
            axios.get('http://localhost:3012/goods', headers)
                .then((res) => {
                    commit('checkToken');
                    commit('deleteCategoryData');
                    for (let key in res.data) {
                        commit('setCategoryData', res.data[key]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveGood ({commit}, {category, name, price, image}) {
            const objFormData = {category, name, price, image};
            //console.log(objFormData.image.name);
            // let obj = new FormData();
            // obj.append('img', objFormData.image, objFormData.image.name);
            // objFormData.image = obj;

            const headers = {headers: {'Content-Type': 'application/json'}};
            axios.post('http://localhost:3012/setGood', objFormData, headers)
                .then((res) => {
                    alert('Good created successful');
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        setGood ({commit}) {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Vue.cookie.get('token')}`
                }
            };
            axios.get('http://localhost:3012/getGood', headers)
                .then((res) => {
                    commit('checkToken');
                    commit('deleteGoodData');
                    for (let key in res.data) {
                        commit('setGoodData', res.data[key]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    },

    getters: {
        userData(state) {
            return state.resData;
        },
        categoryData (state) {
            return state.category;
        },
        goodData (state) {
            return state.good;
        }
    }
});

export default  store;
