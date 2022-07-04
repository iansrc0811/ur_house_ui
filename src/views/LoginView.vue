<template>
  <div class="login">
    <el-form
      id="login-form"
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="10px"
    >
      <el-form-item type="email" label="Email" prop="email">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item type="password" label="Password" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userLogin('ruleForm')">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginUser } from "@/api/auth";
import Cookies from "js-cookie";
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input your email"));
      }
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return callback();
      }
      callback(new Error("Email format is incorrect"));
    };
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          { validator: validateEmail, trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur",
          },
          {
            min: 6,
            message: "The password must be at least 6 characters",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    userLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
      loginUser(this.loginForm.email, this.loginForm.password)
        .then((res) => {
          this.$message.success("login success");
          Cookies.set("jwt", res.data.jwt);
        })
        .catch((error) => {
          this.$message.error(error.response.data.error);
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 50%;
  max-width: 400px;
  min-width: 400px;
  margin: 0 auto;
  .login-form {
    display: flex;
    align-items: center;
  }
}
</style>
