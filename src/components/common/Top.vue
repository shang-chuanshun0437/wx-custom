<template>
 <!-- 头部区域 -->
 <div v-if="show" class="top-head">
   <div class="img">
     <img style="width: 40px;height: 40px;" src="../../assets/logo.png">
   </div>
   <div class="info">
     <el-menu background-color="#20a0ff" mode="horizontal" :default-active="$route.path" router
              active-text-color="#FFFFFF" text-color="#000000" >
       <el-menu-item index = "/summary" style = "font-size: 16px;">首页</el-menu-item>
       <el-menu-item index="/user/store/list" style = "font-size: 16px;">店铺管理</el-menu-item>
       <el-menu-item index="/user/store/vip" style = "font-size: 16px;">会员管理</el-menu-item>
       <el-menu-item index="/account/private" style = "font-size: 16px;" >账户信息</el-menu-item>
     </el-menu>
   </div>
   <div class="basic-info">
     <el-dropdown>
      <span style = "color:#ffffff;font-size: 15px;" class="el-dropdown-link">{{userPhone}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item @click.native = "userInfo">基本资料</el-dropdown-item>
         <el-dropdown-item @click.native = "changPassword">修改密码</el-dropdown-item>
         <el-dropdown-item @click.native = "logout">退出登录</el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
   </div>
   <ChangePwd :show.sync="pwdShow"></ChangePwd>
 </div>
</template>

<script>
  import { mapState } from "vuex";
  import ChangePwd from "../../views/account/ChangPwd";
  export default {
    name: 'Top',
    components: {
      ChangePwd,
    },
    data () {
      return {
        pwdShow: false,
        //userPhone: 'Welcome',
      }
    },
    created() {
      //let user = JSON.parse(window.localStorage.getItem('access-user'));
      //this.userPhone = user.userPhone;
    },
    methods:{
      logout(){
        this.$router.push('/login');
      },
      changPassword(){
        this.pwdShow = true;
      },
      userInfo(){
        this.$router.push('/account/private');
      },
    },
    computed: {
      ...mapState("top", {
        show: state => state.show,
      }),
      ...mapState("login", {
        userPhone: state => state.userPhone,
      }),
    },
}
</script>

<style scoped lang="stylus" type="text/stylus">
  .top-head
    position relative
    display table
    width 100%
    height 60px
    background-color: #20a0ff;
    .img
      position: absolute;
      top: 10px;
      left: 60px;
      width: 40px;
      height: 40px;
    .info
      position: absolute;
      width 580px
      top: 0px;
      left: 140px;
    .basic-info
      position: absolute;
      width 180px
      top: 20px;
      right: 60px;
      .el-menu-item:hover
        background-color: #ffffff !important;
      .el-menu-item.is-active
        background-color: #00b43c !important;
      .el-menu-item.focus
        background-color: rgb(43, 127, 247) !important;

</style>
