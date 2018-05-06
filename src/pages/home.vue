<template>
    <div class="container register">
        <div class="row">
           <div class="col-12">
               <h1>{{ msg }}</h1>
           </div>
        </div>
    </div>
</template>
<script>
    import store from '../store/index'
    export default {
        data() {
            return {
               msg: 'hello vue!'
            }
        },
        methods: {

        }
    }
</script>
<style lang="scss">

</style>