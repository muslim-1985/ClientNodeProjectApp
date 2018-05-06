import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {router} from '../main'
Vue.use(Vuex);
const store = new Vuex.Store ({
    state: {
        authState: true
    },
    mutations: {
        checkToken() {
            return true;
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
                                console.log(res);
                                router.push('home');
                            })
                            .catch((err) => {
                                console.log(err);
                                router.push('home');
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
