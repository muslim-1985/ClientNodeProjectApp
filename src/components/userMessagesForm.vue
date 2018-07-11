<template>
    <div class="col-7">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
            <p><span class="font-weight-bold">{{ msg.username }}: </span>{{ msg.message }}</p>
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
    import SocketIo from 'socket.io-client'
    export default {
        name: "userMessagesForm",
        data() {
            return {
                data: '',
                user: '',
                message: '',
                messages: [],
                io: SocketIo('http://localhost:3012')
            }
        },
        mounted() {
            this.io.on('MESSAGE', (data) => {
                this.messages.push(data);
            });
        },

        methods: {
            sendMessage() {
                this.io.emit('SEND_MESSAGE', {
                    //записываем id чата текущего пользователя
                    chatId: this.$route.params.chatId,
                    message: this.message
                });
                this.message = ''
            }
        },
    }
</script>

<style scoped>

</style>