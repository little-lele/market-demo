<template>
  <div class="loginBox">
    <h1>登录页</h1>
    <el-form>
      <el-form-item prop="uname" :rules="rules" :model="loginForm">
        <el-input
          prefix-icon="el-icon-user-solid"
          maxlength="8"
          placeholder="用户名"
          v-model="loginForm.uname"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          prefix-icon="el-icon-user-solid"
          placeholder="密码"
          show-password
          v-model="loginForm.pwd"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="loginBtn">登录</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
  </div>
</template>
<script>
import { loginCheck } from "@/api/index.js";
import { mapMutations } from "vuex";
import { USERLOGIN, USERLOGOUT } from "../../store/type.js";
export default {
  data() {
    return {
      loginForm: {
        uname: "",
        pwd: ""
      },
      rules: {
        uname: { required: true, message: "请输入用户名", trigger: "blur" },
        pwd: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  methods: {
    ...mapMutations([USERLOGIN, USERLOGOUT]),
    loginBtn() {
      loginCheck(this.loginForm.uname, this.loginForm.pwd).then(res => {
        console.log("登录", res);
        this.$message.success({
          message: "登录成功",
          duration: 2000,
          center: true
        });
        this[USERLOGIN](res.data.token);
        this.$router.push({
          name: "layout"
        });
      });
    },
    reset() {
      console.log("重置");

      this.loginForm = {
        uname: "",
        pwd: ""
      };
      this.$message.success({
        message: "重置成功",
        duration: 2000,
        center: true
      });
    }
  }
};
</script>
<style lang="less" scoped>
@color-main: skyblue;
.loginBox {
  width: 400px;
  height: 300px;
  background-color: @color-main;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  padding: 0 30px;
}
</style>