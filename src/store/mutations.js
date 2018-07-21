import Vue from "vue";
import axios from "axios";

export default {
    checkLoginAuthState(state, bool) {
        state.authState = bool;
    },
    checkToken(state) {
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Vue.localStorage.get('token')}`
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
    deleteData(state) {
        return state.resData = [];
    },
    deleteCategoryData(state) {
        return state.category = [];
    },
    setCategoryData(state, data) {
        state.category.push(data);
    },
    setGoodData(state, data) {
        state.good.push(data);
    },
    deleteGoodData(state) {
        return state.good = [];
    },
    setGoodDataFromLocalStorage(state, data) {
        state.goodDataLocalStorage.push(data);
    },
    setGoodDataLocalSt (state) {
        state.localStorage = JSON.parse(Vue.localStorage.get('goodData'));
    },
    //telegramm chat
    setBotUsers (state, data) {
        state.botUsers.push(data);
    },
    clearBotUsers (state) {
        state.botUsers = [];
    },
    isConnected(state) {
        state.io.on('connect', () => state.isConnected = true);
    },
    setMessageData (state, data) {
        state.messages.push(data);
    },
}