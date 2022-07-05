import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
const ResidenceView = () => import("../views/ResidenceView.vue");
const LoginView = () => import("../views/LoginView.vue");
const RegisterView = () => import("../views/RegisterView.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: () => {
      return { name: "residences" };
    },
  },
  {
    path: "/residences",
    name: "residences",
    component: ResidenceView,
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

router.beforeEach(async (to, from, next) => {
  if (
    // make sure the user is authenticated
    !store.getters.isLogin &&
    to.name !== "signin" &&
    to.name !== "signup"
  ) {
    next({ name: "signin" });
  } else next();
});

export default router;
