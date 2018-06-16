<template>
  <div class="container register">
    <div class="row">
      <div class="col-4 offset-4">
        <form>
          <div class="form-group">
            <label for="username">Name</label>
            <input type="text" class="form-control" id="username" aria-describedby="username" placeholder="Enter name" v-model="model.username">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="model.email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="model.password">
          </div>
          <div class="form-group">
            <label for="forgotPass">Forgot Password</label>
            <input type="password" class="form-control" id="forgotPass" placeholder="Password" v-model="model.forgotPassword">
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        </form>
        <button class="btn btn-primary" @click="Auth()">Submit</button>
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
                  email: '',
                  password: '',
                  forgotPassword: ''
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
  .register {
    margin-top: 70px;
  }
</style>
