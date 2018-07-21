
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
        return state.localStorage;
    },
    getBotUsers (state) {
            return state.botUsers;
    },
    isConnected (state) {
            return state.isConnected;
    },
    getMessages (state) {
            return state.messages;
    }
}