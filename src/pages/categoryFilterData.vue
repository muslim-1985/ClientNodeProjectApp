<template>
    <div class="container good">
        <div class="row">
            <div class="col-12">
                <router-link tag="button" class="btn btn-success btn-sm" style="float: right;" to="/goodsave">+ Create Good </router-link>
                <router-link tag="button" class="btn btn-success btn-sm" to="/savedata">+ Create Category</router-link>
                <h3>Category Goods</h3>
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
                        <td>{{ data.category.category }}</td>
                        <td><img :src="'http://localhost:3012/'+data.image.path"/></td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="deleteGoodData({id: data._id, path: data.image.path}, index)">delete</button>
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
                // goodsArray: []
            }
        },
        created() {
            this.setGoodData();
        },
        computed: {
            getGoodData () {
                //отфильтровываем результаты
                return store.getters.goodData.filter((data) => {
                    if(data.category._id === this.$route.params.id) {
                        return data;
                    } else return false;
                })
            }
        },
        methods: {
            //получаем данные из БД и записываем в state
            setGoodData () {
                store.dispatch('setGood');
            },
            deleteGoodData ({id, path}, index) {
                store.dispatch('deleteGood', {id, path}).then(() => {
                    this.getGoodData.splice(index, 1);
                })
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