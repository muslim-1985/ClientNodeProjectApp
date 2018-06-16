<template>
  <div class="container login">
    <div class="row">
      <div class="col-4 offset-4">
        <form>
          <div class="form-group">
            <div class="form-group">
              <label for="username">Name</label>
                <input type="text" class="form-control" id="username" aria-describedby="username" placeholder="Enter name" v-model="model.username">
              </div>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="model.password">
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        </form>
        <button class="btn btn-primary"@click="Auth()">Submit</button>
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
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            Auth() {
                store.dispatch('auth', this.model);
            }
        }
    }
</script>
<style lang="scss">
  .login {
    margin-top: 70px;
  }
</style>
