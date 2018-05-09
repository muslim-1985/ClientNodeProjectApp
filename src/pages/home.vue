<template>
    <div class="container register">
        <div class="row">
           <div class="col-12">
               <h1>Привет</h1>
               <ul>
                   <li v-for="data in getData()">{{ data }}</li>
               </ul>
           </div>
        </div>
    </div>
</template>
<script>
    import store from '../store/index'
    export default {
        data() {
            return {
               msg: []
            }
        },
        methods: {
            getData () {
                return store.state.resData;
            }
        }
    }
</script>
<style lang="scss">

</style>