/*
 * Project: f:\2017Project\game-cms
 * Copyright (c) 2018 SN
 */

<template>
    <div>
      <div class="headNav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">添加餐桌</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item  label="餐桌编号" prop="tableId">
            <el-col :span="12">
              <el-input type="number" v-model="ruleForm.tableId" placeholder="请输入餐桌编号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="餐桌位置" prop="address">
            <el-col :span="12">
              <el-input v-model="ruleForm.address" placeholder="请输入餐桌位置"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="可坐人数" prop="capacity">
            <el-col :span="12">
              <el-input type="number" v-model="ruleForm.capacity" placeholder="请输入人数"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div >
        <el-button type="primary" :disabled="confirm" @click.native.prevent="handleAdd" class="confirmBtn">确认添加</el-button>
      </div>
    </div>
</template>

<script>
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  data: function() {
    return {
      confirm:false,
      storeName: "",
      storeId:"",
      ruleForm: {
        tableId: "",
        address: "",
        capacity: ""
      },
      rules: {
        tableId: [
          { required: true, message: "请填写餐桌编号", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写餐桌位置", trigger: "blur" }
        ],
        capacity: [
          { required: true, message: "请填写可坐人数", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    handleAdd() {
      this.confirm=true;
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token , storeId: this.storeId,
        tableId: this.ruleForm.tableId ,address: this.ruleForm.address ,capacity: this.ruleForm.capacity ,});

      //添加餐桌
      API.POST(URL.ADD_STORE_TABLE_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.confirm=false;
            this.$router.go(-1);
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else if(res.result.retCode === 1016){
            this.$message.error("添加失败，餐桌编号已存在.");
          }
        })
        .catch(err => {
          this.$message.error("服务器异常,请联系客服");
        });
    },
  },
   beforeUpdate() {
      if( this.ruleForm.tableId != '' & this.ruleForm.address != '' & this.ruleForm.capacity != '')
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
      }
    },
  created() {
    this.storeId = this.$route.query.storeId;
    this.storeName = this.$route.query.storeName;
  }
};
</script>

<style scoped>
  .headNav{
    position: relative;
    top: 20px;
    left: 20px;
    width: 380px;
  }
  .content{
    position: relative;
    top: 40px;
    width: 90%;
    left: 20px;
  }
  .confirmBtn{
    position: relative;
    top: 70px;
    width: 480px;
    left: 30px;
  }
</style>
