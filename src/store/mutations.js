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
    getGoodDataFromDelete(state) {
        return state.good;
    },
    setGoodDataFromLocalStorage(state, data) {
        state.goodDataLocalStorage.push(data);
    }
}