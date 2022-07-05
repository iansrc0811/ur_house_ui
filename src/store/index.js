import Vue from "vue";
import Vuex from "vuex";
import lodash from "lodash";
import { getCities, getDistricts } from "@/api/citiesDistricts";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    cities: {},
    districts: {},
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
    setCities(state, cities) {
      state.cities = cities;
    },
    setDistricts(state, Districts) {
      state.districts = Districts;
    },
  },
  actions: {
    loginInfoAction({ commit }, user) {
      commit("setUser", user);
    },
    logoutUser({ commit }) {
      commit("setUser", {});
    },
    getCitiesDistricts({ commit, state }) {
      if (lodash.isEmpty(state.cities)) {
        getCities().then((res) => {
          commit("setCities", res.data);
        });
      }

      if (lodash.isEmpty(state.districts)) {
        getDistricts().then((res) => {
          commit("setDistricts", res.data);
        });
      }
    },
  },
  modules: {},
});
