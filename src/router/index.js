import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
const LoginView = () => import("../views/LoginView.vue");
const RegisterView = () => import("../views/RegisterView.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "signin",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: RegisterView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
