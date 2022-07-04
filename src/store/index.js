import Vue from "vue";
import Vuex from "vuex";
import lodash from "lodash";

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
      return !lodash.isEmpty(state.user);
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
    loginInfoAction({ commit }, user) {
      commit("setUser", user);
    },
    logoutUser({ commit }) {
      commit("setUser", {});
    },
  },
  modules: {},
});
