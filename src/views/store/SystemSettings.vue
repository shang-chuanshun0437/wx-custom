/*
* Author: 阿甘
* Email:519983770@qq.com
*/
<template>
  <div class="system-setting">
    <div class="system-setting-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">系统设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="system-setting-content-pay">
        <div style="margin-bottom: 20px">请选择支付方式：(温馨提示，建议您选择“在线支付”)</div>
        <el-radio-group v-model="payType">
          <el-radio :label="1">前台支付</el-radio>
          <el-radio :label="2">在线支付</el-radio>
        </el-radio-group>
      </div>
      <el-button style="position: relative;top: 150px;width: 200px" type="primary" round @click="save">保存</el-button>
    </div>
  </div>

</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    components: {
    },
    computed: {

    },
    data() {
      return {
        payType: ''
      };
    },
    created() {
      this.$store.dispatch("leftSideSelect/list",1);
      this.refresh();
    },
    methods: {
      refresh() {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token });

        //查询店铺列表
        API.POST(URL.USER_INFO_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.payType = res.user.payType
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
      save(){
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token,payType: this.payType });

        //查询店铺列表
        API.POST(URL.USER_INFO_UPDATE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      }
    }
  };
</script>

<style scoped lang="stylus" type="text/stylus">
  .system-setting
    position: relative;
    width 100%
    height 100%
    .system-setting-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .system-setting-content-pay
         position relative
         top 60px
</style>
