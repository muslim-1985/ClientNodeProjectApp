<template>
    <div class="container data">
        <div class="row">
            <div class="col-4 offset-4">
                <h3>Load Good</h3>
                <form>
                    <div class="form-group">
                        <label for="sel1">Select Category:</label>
                        <select class="form-control" id="sel1" name="sellist1">
                            <option v-for="(data, index) in getCategoryData" v-bind:value="data._id">{{ data.category }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="name">Good name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter good name" v-model="model.name">
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="text" class="form-control" id="price" placeholder="Price" v-model="model.price">
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="file" class="form-control" id="image" @change="model.image">
                    </div>
                    <button type="submit" class="btn btn-primary" @click="setData()">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store/index'
    export default {
        data() {
            return {
                model: {
                    category: '',
                    name: '',
                    price: '',
                    image: ''
                }
            }
        },
        computed: {
            getCategoryData () {
                return store.getters.categoryData;
            }
        }
    }
</script>

<style lang="scss">
    .data {
        margin-top: 70px;
    }
</style>