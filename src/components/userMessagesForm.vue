<template>
    <div class="col-7">
        <!--messages from db-->
        <div class="messages" v-for="(msg, index) in userMessages[0]" :key="index">
            <p>
                <span class="font-weight-bold">{{ msg.username }}: </span>
                <span class="delete" style="color: red; cursor: pointer" @click="deleteMessage({userId: userMessages[1], msgId: msg._id}, index )">delete</span>
                {{ msg.subject }}
                <img v-bind:src="userMessages[6]" alt="userImg" style="width: 6%; border-radius: 50%">
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
    export default {
        name: "userMessagesForm",
        data() {
            return {
                message: '',
            }
        },
        created() {
            console.log(this.$route.params.chatId)
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