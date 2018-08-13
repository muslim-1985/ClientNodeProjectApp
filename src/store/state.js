import SocketIo from 'socket.io-client';
export default {
    authState: false,
    resData: [],
    category: [],
    good: [],
    goodDataLocalStorage: [],
    localStorage: '',
    //TELEGRAM CHAT DATA
    botUsers: [],
    isConnected: false,
    messageCounter: 0,
    messageCounterFromStorage: 0,
    messages: [],
    userMessages: [],
    io: SocketIo('http://localhost:3012')
}