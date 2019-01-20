/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="修改密码" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="editDialog" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item  label="当前密码" prop="currentPwd">
          <el-col :span="12">
            <el-input type="password" v-model="ruleForm.currentPwd" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-col :span="12">
            <el-input type="password" v-model="ruleForm.newPwd" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPwd">
          <el-col :span="12">
            <el-input type="password" v-model="ruleForm.confirmPwd" ></el-input>
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
  props: ["show",],
  data: function() {
    return {
      confirm:false,
      ruleForm: {
        currentPwd:"",
        newPwd:"",
        confirmPwd:"",
      },
      rules: {
        currentPwd: [
          { required: true, message: "请填写当前密码", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请填写新密码", trigger: "blur" }
        ],
        confirmPwd: [
          { required: true, message: "请填写确认密码", trigger: "blur" }
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
      console.log(this.ruleForm.newPwd + ":" + this.ruleForm.confirmPwd);
      if(this.ruleForm.newPwd === this.ruleForm.confirmPwd)
      {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone ,token: user.token ,oldPassword : this.ruleForm.currentPwd,
          newPassword:this.ruleForm.newPwd,});

        //修改用户密码
        API.POST(URL.MODIFY_PWD_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              let result = {
                userPhone:user.userPhone,
                token:res.token
              }
              this.$store.dispatch("login/login",result);
              this.$emit("update:show", false);
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }else
            {
              this.confirm=false;
              this.$message.error('密码输入错误！');
              console.log(res.result.retCode);
            }
          })
          .catch(err => {
            this.confirm=false;
            console.log(err);
            this.$message.error("服务器异常,请联系客服");
          });
      }else{
        this.$message.error('确认密码错误！');
      }

    },
    handleClose() {
      this.$emit("update:show", false);
    }
  },
  beforeUpdate() {
      if( this.ruleForm.currentPwd != '' & this.ruleForm.newPwd != '' & this.ruleForm.confirmPwd != '')
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
      }
  },
  created() {
    console.log('ChangePwd');
  }
};
</script>

<style scoped>
  .editDialog{
    margin: center;
  }
</style>
