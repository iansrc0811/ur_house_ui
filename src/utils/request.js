import axios from "axios";
import router from "@/router";
// import store from "@/store";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = process.env.VUE_APP_REMOTE_URL;
    config.headers.remoteSystem = "IanProject";
    if (
      !config.url.includes("/user/login") &&
      !config.url.includes("/user/register")
    ) {
      const jwt = Cookies.get("jwt");
      if (!jwt) {
        throw new Error("Token not found or invalid");
      }
      config.headers.Authorization = `Bearer ${Cookies.get("jwt")}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      if (!router.name == "signin") router.push({ name: "signin" });
    }
    return Promise.reject(error);
  }
);
export default axios;
