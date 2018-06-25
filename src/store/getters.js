import Vue from "vue";

export default {
        userData(state) {
        return state.resData;
    },
        categoryData (state) {
        return state.category;
    },
        goodData (state) {
        return state.good;
    },
        getGoodToFavorites () {
        return JSON.parse(Vue.localStorage.get('goodData'));
    }
}