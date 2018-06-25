<template>
  <div class="container register">
    <div class="row">
      <div class="col-4 offset-4">
        <div v-if="errors.length" class="alert alert-danger">
          <strong>Danger!</strong> <p v-for="error in errors">{{ error }}</p>
        </div>
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
              errors: [],
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
              if(this.model.username && this.model.email && this.model.password && this.model.forgotPassword && this.model.password === this.model.forgotPassword) {
                  return store.dispatch('auth', this.model);
              }
              this.errors = [];
              if(!this.model.username) this.errors.push("Требуется указать ваше имя.");
              if(!this.model.email) this.errors.push("Требуется указать email.");
              if(!this.model.password) this.errors.push("Требуется указать пароль.");
              if(!this.model.forgotPassword) this.errors.push("Повторите пароль.");
              if(this.model.password !== this.model.forgotPassword) this.errors.push("Введенный пароль несоотвествует указанному.");
          }
      }
  }
</script>
<style lang="scss">
  .register {
    margin-top: 70px;
  }
</style>
