import Vue from "vue";
import Vuex from "vuex";
import lodash from "lodash";
// import Cookies from "js-cookie";
// import { loginUser } from "@/api/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  getters: {
    isAdmin(state) {
      return state.user && state.user.admin;
    },
    isLogin(state) {
      return state.user && !lodash.isEmpty(state.user);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {
    loginUser({ commit }, user) {
      commit("setUser", user);
    },
    logoutUser({ commit }) {
      commit("setUser", {});
    },
  },
  modules: {},
});
