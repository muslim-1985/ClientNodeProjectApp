<template>
    <div class="col-7">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
            <p><span class="font-weight-bold">{{ msg.username }}: </span>{{ msg.message }}</p>
        </div>

        <div class="messages" v-for="(msg, index) in userMessages[0]" :key="index">
            <p><span class="font-weight-bold">{{ msg.username }}: </span>{{ msg.subject }}</p>
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
    export default {
        name: "userMessagesForm",
        data() {
            return {
                message: '',
            }
        },
        mounted() {
            store.dispatch('eventOnMessages', this.$route.params.chatId);
            store.dispatch('setUserMessages', this.$route.params.chatId);
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
                store.dispatch('sendMessage', {
                    //записываем id чата текущего пользователя
                        chatId: this.$route.params.chatId,
                        message: this.message
                });
                this.message = '';
            }
        },
    }
</script>

<style scoped>

</style>