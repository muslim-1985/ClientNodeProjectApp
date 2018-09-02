<template>
  <div class="main-wrap">
  <headNav></headNav>
    <router-view></router-view>
  <footNav></footNav>
  </div>
</template>

<script>
  import headNav from './components/header'
  import footNav from './components/footer'
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: {
    headNav,
    footNav
  }
}
</script>

<style lang="scss">

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
