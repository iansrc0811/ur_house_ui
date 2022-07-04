import request from "@/utils/request";

const loginUser = (email, password) => {
  return request.post("/api/v1/user/login", {
    email: email,
    password: password,
  });
};

export { loginUser };
