import request from "@/utils/request";

const loginAPI = (email, password) => {
  return request.post("/api/v1/user/login", {
    email: email,
    password: password,
  });
};
const registerAPI = ({ first_name, last_name, email, password }) => {
  return request.post("/api/v1/user/register", {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });
};

const verifyTokenAPI = () => {
  return request.get("/api/v1/user/verify_token_status");
};

export { loginAPI, registerAPI, verifyTokenAPI };
