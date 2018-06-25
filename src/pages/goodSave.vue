<template>
    <div class="container data">
        <div class="row">
            <div class="col-4 offset-4">
                <h3>Load Good</h3>
                    <div v-if="errors.length" class="alert alert-danger">
                        <strong>Danger!</strong> <p v-for="error in errors">{{ error }}</p>
                    </div>
                <form>
                    <div class="form-group">
                        <label for="category">Select Category:</label>
                        <select class="form-control" id="category" name="category" v-model="model.category">
                            <option v-for="data in getCategoryData" v-bind:value="data._id">{{ data.category }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="name">Good name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter good name" v-model="model.name">
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" id="price" placeholder="Price" v-model="model.price">
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="file" class="form-control" id="image" @change="onFile">
                    </div>
                </form>
                <button class="btn btn-primary" @click="saveGood()">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store/index'
    export default {
        data() {
            return {
                errors: [],
                model: {
                    category: '',
                    name: '',
                    price: null,
                    image: ''
                }
            }
        },
        created() {
            this.setCategory();
        },
        computed: {
            getCategoryData() {
                return store.getters.categoryData;
            }
        },
        methods: {
            saveGood() {
                if(this.model.category && this.model.name && this.model.price && typeof (+this.model.price) === 'number' && this.model.image) {
                    return store.dispatch('saveGood', this.model).then(() => {
                        this.model.category = '';
                        this.model.name = '';
                        this.model.price = null;
                        this.model.image = '';
                    });
                }
                this.errors = [];
                if(!this.model.category) this.errors.push("Требуется указать категорию.");
                if(!this.model.name) this.errors.push("Требуется указать название товара.");
                if(!this.model.price) this.errors.push("Требуется указать стоимость товара.");
                if(typeof (+this.model.price) !== 'number') this.errors.push("Стоимость товара должна быть числом.");
                if(!this.model.image) this.errors.push("Загрузите изображение товара.");
            },
            onFile(event) {
                this.model.image = event.target.files[0];
            },
            setCategory () {
                store.dispatch('setCategory');
            }
        }
    }
</script>

<style lang="scss">
    .data {
        margin-top: 70px;
    }
</style>