<template>
  <el-form  :model="account" :rules="rules" class="login-container">
    <h3 class="title">商家登录</h3>
    <el-form-item prop="userPhone">
      <el-input type="text" v-model="account.userPhone" prefix-icon="el-icon-ali-login_zhanghu"
                auto-complete="off" placeholder="手机号">
      </el-input>
    </el-form-item>

    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" prefix-icon="el-icon-ali-login_mima"
      auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item >
      <el-button type="primary"  @click.native.prevent="login"  :loading="loading" class="loginBtn">登录</el-button>
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
        account: {
          userPhone: '',
          pwd: ''
        },
        //参数校验
        rules: {
          userPhone: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    created() {
      this.$store.dispatch("top/hide",false);
    },
    methods:{
        login(){
          var loginParams = Object.assign(
            {},
            { userPhone: this.account.userPhone, password: this.account.pwd}
          );
          //发送登录请求
          API.POST(URL.LOGIN_URL, loginParams)
            .then(res => {
              if (res.result.retCode === 0) {
                this.$store.dispatch("login/login",res);
                //路由跳转
                this.$store.dispatch("top/hide",true);
                this.$router.push({path: '/summary'});
              }else {
                this.$message.error("手机号或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("服务器异常,请联系客服");
              console.log(err.response);
            });
        }
    }
  }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 25px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    height: 300px;
    padding: 35px 35px 15px 35px;
    background: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
  .title{
    margin: 0px 0px 20px 0px;
    text-align: center;
    color: #505458;
  }
  .loginBtn{
    position: relative;
    top: 30px;
    width: 100%;
  }
</style>
