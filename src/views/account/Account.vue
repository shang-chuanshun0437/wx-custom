<template>
  <div class = "account-list">
          <el-card class="accountCard">
            <div slot="header">
              &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              <span style = "font-size: 20px;">账号基本信息</span>
              <el-button type="primary" icon="el-icon-edit" circle class="editButton" @click.native="editInfo()" v-if="editable"></el-button>
              <el-button type="success" icon="el-icon-check" circle class="editButton" @click.native="saveInfo()" v-if="checkable"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle class="editButton" @click.native="unSaveInfo()" v-if="checkable"></el-button>
            </div>
            <el-form ref="form" :model="form"  label-width="80px" class="accountInfo">
              <el-form-item>
                <span style = "font-size: 17px;">账号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input style = "width: 300px" v-model="form.userPhone" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item>
                <span style = "font-size: 17px;">店铺最大数量：&nbsp;&nbsp;&nbsp;</span>
                <el-input style = "width: 300px" v-model="form.shopTotal" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item>
                <span style = "font-size: 17px;">地址：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input style = "width: 300px" v-model="form.userAddress" :disabled="editable"></el-input>
              </el-form-item>
              <el-form-item>
                <span style = "font-size: 17px;">注册时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input style = "width: 300px" v-model="form.createTime" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
  </div>

</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    name: 'Account',
    data() {
      return {
        editable:true,
        checkable:false,
        form: {
          userPhone: '',
          shopTotal: '',
          userAddress: '',
          createTime: '',
        }
      };
    },
    created() {
      this.refresh();
    },
    mounted: function () {
    },
    methods:{
      refresh(){
        //获取账户详情
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token});

        API.POST(URL.ACCOUNT_INFO_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.form.userPhone = res.user.userPhone;
              this.form.shopTotal = res.user.shopTotal;
              this.form.userAddress = res.user.userAddress;
              this.form.createTime = res.user.createTime;
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("服务器异常,请联系客服");
          });
      },
      editInfo(){
        this.editable = false;
        this.checkable = true;
      },
      saveInfo(){
        //保存账户详情
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token,
          shopTotal: this.form.shopTotal,userAddress: this.form.userAddress});

        API.POST(URL.ACCOUNT_UPDATE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.editable = true;
              this.checkable = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.refresh();
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("服务器异常,请联系客服");
          });
      },
      unSaveInfo(){
        this.editable = true;
        this.checkable = false;
        this.refresh();
      },
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .account-list
    position: relative;
    background-color: #f0f3f5;
    width: 100%;
    height: 100%;
    top:0px;
    .accountCard
      position: absolute;
      top:100px;
      left: 15%;
      width: 70%;
      height: 500px;
      background-color: white;
      .editButton
        position: relative;
        left: 60%;
      .accountInfo
        position: relative;
        left:80px;
</style>
