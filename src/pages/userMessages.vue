<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h3 v-if="isConnected">We're connected to the socket server!</h3>
            </div>
            <LeftSidebar></LeftSidebar>
            <UserMessagesForm></UserMessagesForm>
        </div>
    </div>
</template>

<script>
    import LeftSidebar from '../components/leftSidebar'
    import UserMessagesForm from "../components/userMessagesForm";
    import store from '../store/index';
    export default {
        data() {
            return {

            }
        },
        mounted() {
            store.commit('isConnected');
        },
        computed: {
          isConnected () {
              return store.getters.isConnected;
          }
        },
        components: {
            UserMessagesForm,
            LeftSidebar
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