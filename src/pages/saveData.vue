<template>
    <div class="container data">
        <div class="row">
            <div class="col-4 offset-4">
                <h3>Load Category</h3>
                <form>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <input type="text" class="form-control" id="category" aria-describedby="category" placeholder="Enter category" v-model="model.category">
                    </div>
                    <!--<div class="form-group">-->
                        <!--<label for="name">Good name</label>-->
                        <!--<input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter good name" v-model="model.name">-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                        <!--<label for="price">Price</label>-->
                        <!--<input type="text" class="form-control" id="price" placeholder="Price" v-model="model.price">-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                        <!--<label for="image">Image</label>-->
                        <!--<input type="file" class="form-control" id="image" @change="model.image">-->
                    <!--</div>-->
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
                    category: ''
                }
            }
        },
        methods: {
            setData() {
                store.dispatch('setData', this.model);
            }
        }
    }
</script>

<style lang="scss">
    .data {
        margin-top: 70px;
    }
</style>