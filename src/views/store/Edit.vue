/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="编辑店铺" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="editDialog" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item  label="店铺编号" prop="storeId">
          <el-col :span="12">
            <el-input v-model="storeId" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="店铺名称" prop="storeName">
          <el-col :span="12">
            <el-input v-model="ruleForm.storeName" placeholder="请输入店铺名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="店铺位置" prop="storeName">
          <el-col :span="12">
            <el-input v-model="ruleForm.address" placeholder="请输入店铺位置"></el-input>
          </el-col>
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
  props: ["show","storeId"],
  data: function() {
    return {
      confirm:false,
      ruleForm: {
        storeName: "",
        address: ""
      },
      rules: {
        storeId: [
          { required: true, message: "店铺编号", trigger: "blur" }
        ],
        address: [
          { required: true, message: "店铺位置", trigger: "blur" }
        ],
        storeName: [
          { required: true, message: "店铺名称", trigger: "blur" }
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
      var param = Object.assign({}, {userPhone: user.userPhone ,token: user.token ,address: this.ruleForm.address ,
        storeName: this.ruleForm.storeName ,storeId: this.storeId});

      //更新店铺
      API.POST(URL.UPDATE_STORE, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.confirm=false;
            this.$emit("update:show", false);
            parent.location.reload();
            this.$message({
            message: '修改成功',
            type: 'success'
            });
          }else
          {
            this.confirm=false;
            this.$message.error('修改失败！');
            console.log(res.result.retCode);
          }
        })
        .catch(err => {
          this.confirm=false;
          this.$message.error('后台正在升级，请联系管理员！');
          console.log(err);
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
  .editDialog{
    margin:center;
  }
</style
