<template>
    <div class="container register">
        <div class="row">
           <div class="col-12">
               <h3>Hello</h3>
               <table class="table">
                   <thead class="thead-dark">
                       <tr>
                           <th scope="col">Number</th>
                           <th scope="col">Name</th>
                       </tr>
                   </thead>
                   <tbody>
                   <tr v-for="(data, index) in getUserData">
                       <td>{{ index }}</td>
                       <td>{{ data }}</td>
                   </tr>
                   </tbody>
               </table>
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
        created() {
            this.setUserData();
        },
        computed: {
            getUserData () {
                return store.getters.userData;
            }
        },
        methods: {
             setUserData () {
                store.dispatch('resUserData');
            }
        }
    }
</script>
<style lang="scss">

</style>