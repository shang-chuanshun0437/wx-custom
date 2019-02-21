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
          <el-breadcrumb-item style="font-size: 17px;">{{tableId}}号桌</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item  label="容纳人数" prop="capacity">
            <el-col :span="12">
              <el-input type="number" v-model="ruleForm.capacity" placeholder="请输入餐桌容纳人数"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="餐桌位置" prop="address">
            <el-col :span="12">
              <el-input v-model="ruleForm.address" placeholder="请输入餐桌位置"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="就餐人数" prop="personNum">
            <el-col :span="12">
              <el-input type="number" v-model="ruleForm.personNum" placeholder="请输入就餐人数"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="使用状态" prop="status">
            <el-col :span="12">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div >
        <el-button type="primary" :disabled="confirm" @click.native.prevent="handleEdit" class="confirmBtn">确认修改</el-button>
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
      tableId: "",
      options: [{
        value: '1',
        label: '空闲'
      },{
        value: '2',
        label: '就餐中'
      }],
      ruleForm: {
        address: "",
        capacity: "",
        personNum: "",
        status: ""
      },
      rules: {
        personNum: [
          { required: true, message: "请填写就餐人数", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写餐桌位置", trigger: "blur" }
        ],
        capacity: [
          { required: true, message: "请填写可坐人数", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择餐桌使用状态", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    handleEdit() {
      this.confirm=true;
      if (this.ruleForm.status == "空闲"){
        this.ruleForm.status = 1;
      }
      else if (this.ruleForm.status == "就餐中"){
        this.ruleForm.status = 2;
      }
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token , storeId: this.storeId, tableId: this.tableId ,
        address: this.ruleForm.address ,capacity: this.ruleForm.capacity , personNum: this.ruleForm.personNum, status: this.ruleForm.status});

      //更新餐桌
      API.POST(URL.UPDATE_STORE_TABLE_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.confirm=false;
            this.$router.go(-1);
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else if(res.result.retCode === 1017){
            this.$message.error("餐桌编号不存在");
          }
        })
        .catch(err => {
          this.$message.error("服务器异常,请联系客服");
        });
    },
  },
   beforeUpdate() {
    console.log("beforeUpdate");
      if( this.ruleForm.address != '' & this.ruleForm.capacity != '' & this.ruleForm.status != '')
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
      }
    },
  created() {
    console.log("created");
    this.storeId = this.$route.query.storeId;
    this.storeName = this.$route.query.storeName;
    this.tableId = this.$route.query.tableId;

    this.ruleForm.address = this.$route.query.address;
    this.ruleForm.capacity = this.$route.query.capacity;
    this.ruleForm.personNum = this.$route.query.personNum;
    this.ruleForm.status = this.$route.query.status;

    if (this.ruleForm.status == 1){
      this.ruleForm.status = "空闲";
    }
    if (this.ruleForm.status == 2){
      this.ruleForm.status = "就餐中";
    }
  }
};
</script>

<style scoped>
  .headNav{
    position: relative;
    top: 20px;
    left: 30px;
    width: 380px;
  }
  .content{
    position: relative;
    top: 40px;
    width: 90%;
    left: 30px;
  }
  .confirmBtn{
    position: relative;
    top: 70px;
    width: 480px;
    left: 30px;
  }
</style>
