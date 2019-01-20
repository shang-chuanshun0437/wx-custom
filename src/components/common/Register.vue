<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" class="login-container">
    <h3 class="title">欢迎注册</h3>
    <el-form-item prop="userPhone">
      <el-input type="text" v-model="account.userPhone" prefix-icon="el-icon-ali-login_zhanghu"
                auto-complete="off" placeholder="请输入手机号">
      </el-input>
    </el-form-item>

    <el-form-item prop="verificationCode" style="width:100%;">
      <el-input type="text" style="width:60%;" v-model="account.verificationCode" auto-complete="off"
       placeholder="请输入短信验证码"></el-input>

      <el-button type="text" :disabled="disabled" @click.native.prevent="getCode">{{btnCode}}</el-button>
    </el-form-item>

    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" prefix-icon="el-icon-ali-login_mima"
      auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="register" :loading="loading">注册</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  data() {
    return {
      loading: false,
      disabled: false,
      btnCode: "获取短信验证码",
      account: {
        userPhone: "",
        verificationCode: "",
        pwd: ""
      },
      rules: {
        userPhone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  created() {
    this.$store.dispatch("top/hide",false);
  },
  methods: {
    register() {
      let that = this;
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          var registerParams = Object.assign(
            {},
            { userPhone: this.account.userPhone, verificationCode: this.account.verificationCode, password: this.account.pwd}
          );
          API.POST(URL.REGISTER_URL, registerParams)
            .then(res => {
              if (res.result.retCode === 0) {
                this.$message({
                  message:
                    "恭喜您已注册成功",
                  type: "success"
                });
                this.$router.push({path: '/login'});
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("服务器异常,请联系客服");
            });
        }
      });
    },
    getCode() {
      // 将按钮设置为不可点击状态
      if (this.account.userPhone === "") {
        this.$message.error("手机号不能为空");
      } else {
        this.disabled = true;
        // 60秒倒计时
        let time = 60;
        let timer = setInterval(() => {
          if (time <= 0) {
            //倒计时结束后，恢复
            this.disabled = false;
            this.btnCode = "获取短信验证码";
            clearInterval(timer);
          } else {
            this.btnCode = "重新获取" + time + "s";
            time--;
          }
        }, 1000);

        var getCodeParams = Object.assign(
          {},
          { userPhone: this.account.userPhone }
        );
        API.POST(URL.GET_VERIFYCATION_CODE, getCodeParams)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$message({
                message: "验证码已发送到:" + this.account.userPhone + ",请查收",
                type: "success"
              });
            }
          })
          .catch(err => {
            this.$message.error("服务器异常,请联系客服");
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px 0px 20px 0px;
  text-align: center;
  color: #505458;
}
</style>
