<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link tag="a" class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdow" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdow">
            <router-link tag="a" class="dropdown-item" :to="{ name: 'catFilter', params: { id: data.category._id }}" v-for="(data, index) in goodData" :key = "index">{{ data.category.category }}</router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/goodShow">Goods<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/favorites">Favorites<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/chat">Telegram Chat<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Auth
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link tag="a" class="dropdown-item" to="/login" v-if="check === false">Login</router-link>
            <router-link tag="a" class="dropdown-item" to="/register" v-if="check === false">Register</router-link>
            <router-link tag="a" class="dropdown-item" to="/logout" v-if="check">Logout</router-link>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>
<script>
    import store from '../store/index'
  export default {
    name: 'headNav',
      created () {
          this.setGoodData();
      },
    computed: {
        check () {
            return store.state.authState;
        },
        goodData () {
            //let unique = ([...new Set(store.getters.goodData.map(item => item.category._id))]);
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
<style lang="scss">

</style>
