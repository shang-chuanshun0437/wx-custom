/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="添加店铺" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="bindDialog" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item  label="店铺名称" prop="storeName">
          <el-col :span="12">
            <el-input v-model="ruleForm.storeName" placeholder="请输入店铺名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="店铺位置" prop="address">
          <el-col :span="12">
            <el-input v-model="ruleForm.address" placeholder="请输入店铺位置"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click.native="cancel()">取消</el-button>
          <el-button type="primary" :disabled="confirm" @click.native="handleAdd()">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  props: ["show"],
  data: function() {
    return {
      confirm:false,
      ruleForm: {
        storeName: "",
        address: "",
      },
      rules: {
        storeName: [
          { required: true, message: "请填写店铺名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写店铺位置", trigger: "blur" }
        ],

      }
    };
  },

  methods: {
    cancel() {
      this.$emit("update:show", false);
    },
    handleAdd() {
      this.confirm=true;
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,address: this.ruleForm.address ,
      storeName: this.ruleForm.storeName });

      //添加店铺
      API.POST(URL.ADD_STORE_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.confirm=false;
            this.$emit("update:show", false);
            parent.location.reload();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else if(res.result.retCode === 1013)
          {
            this.confirm=false;
            this.$message.error('您的店铺数量已达到上限，请联系客服!');
          }
        })
        .catch(err => {
          this.$message.error("服务器异常,请联系客服");
        });
    },
    handleClose() {
      this.$emit("update:show", false);
    }
  },
   beforeUpdate() {
      if( this.ruleForm.storeName != '' & this.ruleForm.address != '')
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
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
