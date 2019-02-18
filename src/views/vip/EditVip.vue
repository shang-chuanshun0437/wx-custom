/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="修改会员" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="editDialog" :before-close="handleClose">
      <el-form :model="row" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item  label="ID" prop="id">
          <el-col :span="12">
            <el-input v-model="row.id" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item  label="会员编号" prop="vipId">
          <el-col :span="12">
            <el-input v-model="row.vipId"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="充值金额" prop="realAmount">
          <el-col :span="12">
            <el-input v-model="row.realAmount"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="有效期" prop="validTime">
          <el-date-picker type="datetime" placeholder="请选择设备有效期" format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss" v-model="row.validTime">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click.native="cancel()">取消</el-button>
          <el-button type="primary" :disabled="confirm" @click.native="handleEdit()">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  props: ["show","row"],
  data: function() {
    return {
      confirm:false,
      rules: {
        id: [
          { required: true, message: "ID", trigger: "blur" }
        ],
        vipId: [
          { required: true, message: "请填写会员编号", trigger: "blur" }
        ],
        realAmount: [
          { required: true, message: "请填写充值金额", trigger: "blur" }
        ],
        validTime: [
          { required: true, message: "请填写有效期", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("update:show", false);
    },
    handleEdit() {
      this.confirm=true;
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone ,token: user.token , vipId: this.row.vipId,
        id: this.row.id,realAmount: this.row.realAmount,validTime: this.row.validTime});
      //更新vip
      API.POST(URL.UPDATE_VIP, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.confirm=false;
            this.$emit("update:show", false);
            parent.location.reload();
            this.$message({
            message: '添加成功',
            type: 'success'
            });
          }else {
            this.confirm=false;
            this.$message.error('vip账号已存在，请重新输入！');
          }
        })
        .catch(err => {
          this.confirm=false;
          this.$message.error("服务器异常,请联系客服");
        });
    },
    handleClose() {
      this.$emit("update:show", false);
    }
  },
  beforeUpdate() {
      if( this.row.vipId != '' & this.row.realAmount != ''& this.row.validTime != '')
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
      }
  },
  created() {
    console.log('editDevice');
  }
};
</script>

<style scoped>
  .editDialog{
    margin: center;
  }
</style>
