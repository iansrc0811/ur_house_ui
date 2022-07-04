<template>
  <div id="app">
    <nav>
      <router-link v-if="isLogin" to="/">Home</router-link>
      <router-link v-if="!isLogin" to="/signin">Login</router-link> |
      <router-link v-if="!isLogin" to="/signup">signup</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLogin"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
