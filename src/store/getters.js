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
        getGoodToFavorites (state) {
            console.log(state.localStorage)
        return state.localStorage;
    }
}