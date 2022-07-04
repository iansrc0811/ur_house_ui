<template>
  <div class="register">
    <el-form
      id="register-form"
      :model="registerForm"
      :rules="rules"
      ref="registerForm"
      label-width="100px"
    >
      <el-form-item type="email" label="Email" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="First Name" prop="first_name">
        <el-input v-model="registerForm.first_name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="last_name">
        <el-input v-model="registerForm.last_name"></el-input>
      </el-form-item>
      <el-form-item type="password" label="Password" prop="password">
        <el-input v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item type="password" label="Confirm" prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userRegister('ruleForm')">
          Register
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerAPI } from "@/api/auth";
import Cookies from "js-cookie";
import { mapActions } from "vuex";
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
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs["registerForm"].validateField("confirmPassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        first_name: [
          {
            required: true,
            message: "Please input your first name",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Please input your last name",
            trigger: "blur",
          },
        ],
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
          { validator: validatePass, trigger: "blur" },
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: "blur" },
          {
            required: true,
            message: "Please comfirm your password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["loginInfoAction"]),
    userRegister() {
      this.$refs["registerForm"].validate((valid) => {
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
      registerAPI({ ...this.registerForm })
        .then((res) => {
          this.$message.success("register success");
          Cookies.set("jwt", res.data.jwt);
          delete res.data["jwt"];
          const user = res.data;
          this.loginInfoAction(user);
        })
        .catch((error) => {
          this.$message.error(error.response.data.error);
        });
    },
  },
};
</script>

<style lang="scss">
.register {
  width: 50%;
  max-width: 400px;
  min-width: 400px;
  margin: 0 auto;
  .register-form {
    display: flex;
    align-items: center;
  }
}
</style>
