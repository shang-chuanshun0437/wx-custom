/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="修改用户有效期" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="editDialog" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item  label="设备编号" prop="deviceNum">
          <el-col :span="12">
            <el-input v-model="deviceNum" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName">
          <el-col :span="12">
            <el-input v-model="deviceName" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户账号" prop="userPhone">
          <el-col :span="12">
            <el-input v-model="userPhone" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="有效期" prop="expiryDate">
          <el-date-picker type="datetime" placeholder="请选择设备有效期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.expiryDate">
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
  props: ["show","deviceNum","deviceName","userPhone",],
  data: function() {
    return {
      confirm:false,
      ruleForm: {
        expiryDate: "",
      },
      rules: {
        expiryDate: [
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
      var param = Object.assign({}, {userPhone: user.userPhone ,token: user.token , deviceNum: this.deviceNum,
        expiryDate: this.ruleForm.expiryDate,needModifyPhone:this.userPhone});

      //修改用户的有效期
      API.POST(URL.MODIFY_EXPIRE_URL, param)
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
            this.$message.error('请输入正确的11位设备编号！');
            console.log(res.result.retCode);
          }
        })
        .catch(err => {
          this.confirm=false;
          console.log(err);
          this.$message.error("服务器异常,请联系客服");
        });
    },
    handleClose() {
      this.$emit("update:show", false);
    }
  },
  beforeUpdate() {
      if( this.ruleForm.deviceName != '')
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
