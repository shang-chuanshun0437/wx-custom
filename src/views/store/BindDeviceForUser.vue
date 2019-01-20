/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <el-dialog title="添加用户" :modal=true :modal-append-to-body="false" :visible="show" top="15%" class="editDialog" :before-close="handleClose">
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
        <el-form-item label="用户帐号" prop="needBindPhone">
          <el-col :span="12">
            <el-input v-model="ruleForm.needBindPhone" ></el-input>
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
  props: ["show","deviceNum","deviceName"],
  data: function() {
    return {
      confirm:true,
      ruleForm: {
        deviceName: "",
        needBindPhone:"",
        expiryDate:"",
      },
      rules: {
        deviceName: [
          { required: true, message: "请填写设备名称", trigger: "blur" }
        ],
        deviceNum: [
          { required: true, message: "请填写设备编码", trigger: "blur" }
        ],
        needBindPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        expiryDate: [
          { required: true, message: "请输入设备有效期", trigger: "blur" }
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
      var param = Object.assign({}, {userPhone: user.userPhone ,token: user.token ,needBindPhone: this.ruleForm.needBindPhone ,
      deviceNum: this.deviceNum, expiryDate: this.ruleForm.expiryDate});

      //为其他用户绑定设备
      API.POST(URL.DEVICE_BIND4USER_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.confirm=false;
            this.$message({
            message: '添加成功',
            type: 'success'
            });
            this.$emit("update:show", false);
            parent.location.reload();
          }else if(res.result.retCode === 1002)
          {
            this.confirm=false;
            this.$message.error('添加失败，该手机号未注册！');
          }
        })
        .catch(err => {
          this.confirm=false;
          if(err.response.status === 400)
          {
            this.$message.error('请输入11位的手机号！');
          }
          else{
            this.$message.error('后台正在升级，请联系管理员！');
          }

        });
    },
    handleClose() {
      this.$emit("update:show", false);
    }
  },
  created() {
    console.log('editDevice');
  },
  beforeUpdate() {
    if( this.ruleForm.needBindPhone != '' & this.ruleForm.expiryDate != null)
    {
      this.confirm = false;
    }
    else{
      this.confirm = true;
    }
  },

};
</script>

<style scoped>
  .editDialog{
    margin:center;
  }
</style
