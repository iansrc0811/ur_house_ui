<template>
  <div id="app">
    <nav>
      <router-link v-if="isLogin" to="/">Residents</router-link> |
      <router-link v-if="!isLogin" to="/signin">Login</router-link>
      <router-link v-if="!isLogin" to="/signup">signup</router-link>
      <a v-if="isLogin" herf="" @click="logout">logout</a>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import { verifyToken, logoutUser } from "@/api/auth";
import { mapActions } from "vuex";
export default {
  mounted() {
    // verify token, if still valid, get user info to vuex
    const jwt = Cookies.get("jwt");
    if (!jwt || jwt === "null") {
      Cookies.remove("jwt");
      return;
    }
    verifyToken()
      .then((res) => {
        Cookies.set("jwt", res.data.jwt);
        delete res.data["jwt"];
        const user = res.data;
        this.loginInfoAction(user);
        this.$router.push({ name: "residences" });
      })
      .catch(() => {
        Cookies.remove("jwt");
        this.loginInfoAction({});
        this.$message.error("Token exired or invalid, please login again");
      });
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions(["loginInfoAction"]),
    logout() {
      logoutUser()
        .then(() => {
          this.$message.success("Logout success");
          this.$router.push({ name: "signin" });
        })
        .catch((error) => {
          this.$message.error(error.message);
        })
        .finally(() => {
          Cookies.remove("jwt");
          this.loginInfoAction({});
        });
    },
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
