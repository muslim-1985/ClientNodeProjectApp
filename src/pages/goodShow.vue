<template>
    <div class="container good">
        <div class="row">
            <div class="col-12">
                <h3>Goods</h3>
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Image</th>
                        <th scope="col">Buttons</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data, index) in getGoodData">
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
            this.setGoodData();
        },
        computed: {
            getGoodData () {
                return store.getters.goodData;
            }
        },
        methods: {
             setGoodData () {
                store.dispatch('setGood');
            }
        }
    }
</script>

<style scoped>

</style>