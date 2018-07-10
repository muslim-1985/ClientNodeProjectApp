<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h3 v-if="isConnected">We're connected to the server!</h3>
            </div>
            <div class="col-3">
                <ul class="left_sidebar">
                    <li><a href="#">Muslim (2)<span class="online"></span></a></li>
                    <li><a href="#">Anton</a></li>
                    <li><a href="#">Alex</a></li>
                    <li><a href="#">Oleg</a></li>
                    <li><a href="#">Adiba</a></li>
                </ul>
            </div>
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
        </div>
    </div>
</template>

<script>
    import SocketIo from 'socket.io-client'
    export default {
        data() {
            return {
                data: '',
                user: '',
                message: '',
                isConnected: false,
                messages: [],
                io: SocketIo('http://localhost:3012')
            }
        },
        mounted() {
            this.io.on('connect', () => this.isConnected = true);

            this.io.on('MESSAGE', (data) => {
            this.messages.push(data);
        });
        },
        computed: {

        },
        methods: {
            sendMessage() {
                this.io.emit('SEND_MESSAGE', {
                    user: this.user,
                    message: this.message
                });
                this.message = ''
            }
        }
    }
</script>

<style lang="scss">
    ul.left_sidebar {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: #f8f9fa;
        padding-top: 20px;
        li {
            display: block;
            .online {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: inline-block;
                background: #1e7e34;
                margin-left: 10px;
            }
        }
        a {
            padding: 6px 8px 6px 16px;
            text-decoration: none;
            font-size: 20px;
            color: #818181;
            display: block;
        }
        a:hover {
            color: #212529;
        }
    }
    #message {
        margin-top: 40px;
    }
    .block {
        margin-top: 40px;
    }


</style>