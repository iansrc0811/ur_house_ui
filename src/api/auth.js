import request from "@/utils/request";

const loginUser = (email, password) => {
  return request.post("/api/v1/user/login", {
    email: email,
    password: password,
  });
};
const registerUser = ({ first_name, last_name, email, password }) => {
  return request.post("/api/v1/user/register", {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });
};

const logoutUser = () => {
  return request.delete("/api/v1/user/logout");
};

const verifyToken = () => {
  return request.get("/api/v1/user/verify_token_status");
};

export { loginUser, registerUser, logoutUser, verifyToken };
