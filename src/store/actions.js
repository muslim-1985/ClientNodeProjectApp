import Vue from "vue";
import axios from "axios";
import {router} from '../main'

export default {
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
            Vue.localStorage.set('token', res.data.token, 7);
            commit('checkLoginAuthState', true);
            router.push('/');
            commit('checkLoginAuthState', false);
        })
        .catch((err) => {
            console.log(err)
        })
},
    logout () {
    Vue.localStorage.remove('token');
    window.location.reload();
},
    resUserData ({commit}) {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Vue.localStorage.get('token')}`
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
            'Authorization': `Bearer ${Vue.localStorage.get('token')}`
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
    //создаем нативный js обЪект для отправки данных multipart form data
    let obj = new FormData();
    obj.append('category', objFormData.category );
    obj.append('name', objFormData.name);
    obj.append('price', objFormData.price);
    obj.append('image', objFormData.image);
    //отправляем данные на сервер
    axios.post('http://localhost:3012/setGood', obj)
        .then((res) => {
            alert('Good created successful');
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
},
    //записываем полученные данные в переменную состояния
    setGood ({commit}) {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Vue.localStorage.get('token')}`
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
},
    deleteGood ({commit}, {id, path}) {
    const objFormData = JSON.stringify({id, path});
    //console.log(objFormData);
    const headers = {headers: {'Content-Type': 'application/json'}};
    axios.post('http://localhost:3012/deleteGood', objFormData, headers)
        .then((res) => {
            alert('Good deleted successful');
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
},
    setGoodToFavorites ({commit, state}) {
        if(state.goodDataLocalStorage.length !== 0) {
            //если локальное хранилище не пустое
            if (Vue.localStorage.get('goodData') !== null) {
                //получаем переменную состояния
                let dataState = state.goodDataLocalStorage;
                //получаем текущие данные в локальном хранилище
                let dataLocalStorage = JSON.parse(Vue.localStorage.get('goodData'));
                //объединяем два массива и сохраняем в локальном хранилище
                let concatArrays = JSON.stringify(dataState.concat(dataLocalStorage));
                //очищаем массив
                 state.goodDataLocalStorage = [];
                //записываем массив с данными в хранилище
                 Vue.localStorage.set('goodData', concatArrays, 7);
            } else {
                const setData = JSON.stringify(state.goodDataLocalStorage);
                Vue.localStorage.set('goodData', setData, 7);
                 state.goodDataLocalStorage = [];
            }
        }
    },

    getBotUsers ({commit}) {
        axios.post('http://localhost:3012/botUsers')
            .then((res) => {
                commit('clearBotUsers');
                for (let key in res.data) {
                    commit('setBotUsers', res.data[key]);
                }
            })
            .catch((err) => console.log(err));
    },

    setUserMessages ({commit, state}, chatId) {
        axios.get(`http://localhost:3012/userMessages/${chatId}`)
            .then((res) => {
                console.log(res);
                commit('clearUserMessages');
                for (let key in res.data) {
                    commit('setUserMessage', res.data[key]);
                }
            })
            .catch((err) => console.log(err));
    },

    eventOnMessages ({commit, state}, chatId) {
        //console.log(chatId);
        state.io.emit('SUBSCRIBE', chatId);
        state.io.on('MESSAGE', (data) => {
            commit('setMessageData', data);
        });
        state.io.on('MESSAGE_BOT_USER', (data) => {
            commit('countMessages');
            commit('getCounterFromLocalStorage');
            commit('setMessageData', data);
        })
    },
    sendMessage ({commit, state}, {chatId, message}) {
        state.io.emit('SEND_MESSAGE', {chatId, message});
    },
    async deleteMessageFromDB ({commit, state}, {userId, msgId}) {
        try {
            let ids = {userId, msgId};
            let res = await axios.post(`http://localhost:3012/deleteMessage`, ids);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
}