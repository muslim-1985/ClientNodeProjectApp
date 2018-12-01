<template>
    <div class="col-7">
        <!--messages from db-->
        <div class="messages" v-for="(msg, index) in userMessages[0]" :key="index">
            <p>
                <span class="font-weight-bold">{{ msg.username }}: </span>
                <span class="delete" style="color: red; cursor: pointer" @click="deleteMessage({userId: userMessages[1], msgId: msg._id}, index )">delete</span>
                {{ msg.subject }}
                <img v-bind:src="`http://localhost:3012/${userMessages[6]}`" alt="userImg" style="width: 6%; border-radius: 50%">
            </p>
        </div>
        <div class="messages" v-for="(msg, index) in messages" :key="index">
            <p>
                <span class="font-weight-bold">{{ msg.username }}: </span>{{ msg.message }}
            </p>
        </div>
        <form>
            <div class="form-group">
                <textarea class="form-control" rows="5" id="message" placeholder="Enter message" v-model="message"></textarea>
            </div>
        </form>
        <button class="btn btn-primary" @click="sendMessage()">Submit</button>
    </div>
</template>

<script>
    import store from '../store/index';
    import Vue from 'vue'
    export default {
        name: "userMessagesForm",
        data() {
            return {
                message: '',
            }
        },
        mounted() {
            store.dispatch('eventOnMessages', Vue.localStorage.get('chatId'));
            store.dispatch('setUserMessages', Vue.localStorage.get('chatId'));
        },
        computed: {
            messages () {
                return store.getters.getMessages;
            },
            //получаем сохраненные сообщения из бд
            userMessages () {
                return store.state.userMessages;
            }
        },
        methods: {
            sendMessage() {
                // console.log(this.messages)
                store.dispatch('sendMessage', {
                    //записываем id чата текущего пользователя
                        chatId: Vue.localStorage.get('chatId'),
                        message: this.message
                });
                this.message = '';
            },
            deleteMessage ({userId, msgId}, index) {
                store.dispatch('deleteMessageFromDB', {userId, msgId});
                store.state.userMessages[0].splice(index, 1);
            }
        },
    }
</script>

<style scoped>

</style>