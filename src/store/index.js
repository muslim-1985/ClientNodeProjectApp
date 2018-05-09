import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {router} from '../main'
Vue.use(Vuex);
const store = new Vuex.Store ({
    state: {
        authState: false,
        resData: []
    },
    mutations: {
        checkToken(state, bool) {
            state.authState = bool;
        },
        pushData(state, data) {
            state.resData.push(data);
        }
    },
    actions: {
        auth({commit}, {username, email, password, forgotPassword}) {
            const objFormData = {username, email, password, forgotPassword};
            const headers = {headers : { 'Content-Type':'application/json' }};

            if (password === forgotPassword) {
                 axios.post('http://localhost:3012/register', objFormData, headers )
                    .then((res) => {
                        const headers = {headers: {'Content-Type':'application/json','Authorization':`Bearer ${res.data.token}`}};
                        axios.get('http://localhost:3012', headers)
                            .then((res) => {
                                commit('checkToken', true);
                                for(let key in res.data) {
                                    commit('pushData', res.data[key].username);
                                }
                                router.push('/');
                                commit('checkToken', false);
                            })
                            .catch((err) => {
                                console.log(err);
                                commit('checkToken', false);
                                router.push('/');
                            });
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else alert('Ваши пароли не совпадают, повторите ввод снова');
        }
    }
});
export default  store;
