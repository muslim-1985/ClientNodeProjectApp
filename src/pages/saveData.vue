<template>
    <div class="container data">
        <div class="row">
            <div class="col-4 offset-4">
                <h3>Load Category</h3>
                <div v-if="errors.length" class="alert alert-danger">
                    <strong>Danger!</strong> <p v-for="error in errors">{{ error }}</p>
                </div>
                <form>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <input type="text" class="form-control" id="category" aria-describedby="category" placeholder="Enter category" v-model="model.category">
                    </div>
                </form>
                <button class="btn btn-primary" @click="setData()">Submit</button>
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
                    category: ''
                }
            }
        },
        methods: {
            setData() {
                if(this.model.category) {
                    return store.dispatch('setData', this.model).then(() => {
                        this.model.category = '';
                    });
                }
                this.errors = [];
                if(!this.model.category) this.errors.push("Требуется указать категорию.");
            }
        }
    }
</script>

<style lang="scss">
    .data {
        margin-top: 70px;
    }
</style>