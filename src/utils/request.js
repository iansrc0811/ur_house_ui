import axios from "axios";
// import router from "@/router";
// import store from "@/store";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:3000/"; // 域名

axios.interceptors.request.use(
  (config) => {
    config.baseURL = process.env.VUE_APP_REMOTE_URL;
    config.headers.remoteSystem = "IanProject";
    if (
      !config.url.includes("/user/login") &&
      !config.url.includes("/user/register")
    ) {
      debugger;
      config.headers.Authorization = `Bearer ${Cookies.get("jwtToken")}`;
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
    return Promise.reject(error);
  }
);
export default axios;
