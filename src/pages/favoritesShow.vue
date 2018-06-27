<template>
    <div class="container good">
        <div class="row">
            <div class="col-12">
                <h3>Favorite Goods</h3>
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data, index) in getGoodData">
                        <td>{{ index }}</td>
                        <td>{{ data.name }}</td>
                        <td>{{ data.price }}</td>
                        <td>{{ data.category }}</td>
                        <td><img :src="data.image"/></td>
                        <td>
                            <button class="btn btn-danger btn-sm">delete</button>
                        </td>
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
            this.setLocalStorage();
            this.getLocal();
        },
        computed: {
            getGoodData () {
                return store.getters.getGoodToFavorites;
            },
        },
        methods: {
            setLocalStorage () {
                store.dispatch('setGoodToFavorites');
            },
            getLocal () {
                store.commit('setGoodDataLocalSt');
            }
        }
    }
</script>

<style lang="scss">
    img {
        width: 100px;
        height: auto;
    }
</style>