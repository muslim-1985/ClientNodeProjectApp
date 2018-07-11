<template>
        <div class="col-3">
            <ul class="left_sidebar">
                <li v-for="(user, index) in getBotUsers" :key="index">
                    <router-link tag="a" :to="{ name: 'userMessages', params: { chatId: user.chatId }}">{{ user.username }}</router-link>
                    <!--<span class="online"></span>-->
                </li>
            </ul>
        </div>
</template>
<!--<a href="#">{{ users.username }}-->
<script>
    import store from '../store/index'
    //import SocketIo from 'socket.io-client'
    export default {
        name: "leftSidebar",
        data() {
            return {
                data: '',
                user: '',
                //messages: [],
                //io: SocketIo('http://localhost:3012')
            }
        },
        mounted() {
            this.setBotUsers();
        },
        computed: {
            getBotUsers () {
                return store.getters.getBotUsers;
            }
        },
        methods: {
            //получаем данные из БД и записываем в state
            setBotUsers () {
                store.dispatch('getBotUsers');
            }
        }
    }
</script>

<style scoped>

</style>