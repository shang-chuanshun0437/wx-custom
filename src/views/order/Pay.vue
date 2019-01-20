/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="结账" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="bindDialog" :before-close="handleClose">
      <div class="account">
        <span>餐桌编号：{{object.tableId}}号&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp订单总金额：￥{{object.amount}}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp会员总金额：￥{{object.vipAmount}}</span>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="90px" style="position: relative;top: 30px;">
        <el-form-item  label="会员编号" prop="vipNum">
          <el-col :span="12">
            <el-input v-model="ruleForm.vipNum" placeholder="如果是会员，请输入会员编号"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click.native="cancel()">取消</el-button>
          <el-button type="primary" :disabled="confirm" @click.native="handlePay()">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  props: ["show","object"],
  data: function() {
    return {
      confirm:false,
      ruleForm: {
        vipNum: "",
      },
    };
  },

  methods: {
    cancel() {
      this.$emit("update:show", false);
    },
    handlePay() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.object.storeId,
        orderId: this.object.orderId,tableId: this.object.tableId,vipNum: this.ruleForm.vipNum});

      //查询订单列表
      API.POST(URL.PAY_ORDER, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$message({
              message: '结账成功',
              type: 'success'
            });
            //parent.location.reload();
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },
    handleClose() {
      this.$emit("update:show", false);
    }
  },
  created() {
  }
};
</script>

<style scoped>
  .bindDialog{
    margin:center;
  }
</style>
