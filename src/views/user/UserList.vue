/*
 * Author: 阿甘
 * Email:519983770@qq.com
 */

<template>
  <div >
    <div class="panel-heading">
      <span  class="panel-text">用户列表</span>
    </div>
    <el-row style="top:5px">
      <el-col :span="20">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
      </el-col>

    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%" @row-click="clickRow" border stripe ref="moviesTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userPhone" label="用户账号" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="deviceNum" label="设备编号" align="center"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="expiryDate" label="有效期" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.deviceNum,scope.row.deviceName,scope.row.userPhone,)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.deviceNum,scope.row.deviceName,scope.row.userPhone)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="text-align:center;margin-top:15px;">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
      </el-pagination>
    </el-row>

    <EditUser :show.sync="editUserParam.show" :deviceNum.sync="editUserParam.deviceNum" :deviceName.sync="editUserParam.deviceName" :userPhone.sync="editUserParam.userPhone"></EditUser>

  </div>

</template>

<script>
import SearchForm from "../common/SearchForm";
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";
import EditUser from "./EditUser"
const searchData = [
  {
    name: "设备编号",
    type: "input",
    placeholder: "请输入设备编号",
    key: "deviceNum"
  },
  {
    name: "设备名称",
    type: "input",
    placeholder: "请输入设备名称",
    key: "deviceName"
  },
  {
      name: "用户手机号",
      type: "input",
      placeholder: "请输入用户手机号",
      key: "userPhone"
    },
];
export default {
  components: {
    SearchForm,
    EditUser,
  },
  computed: {
    ...mapState("deviceUser", {
      total: state => state.total,
      list: state => state.list
    })
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      searchData: searchData,
      editUserParam:{
        show: false,
        userPhone:"",
        deviceName:"",
        deviceNum:"",
      },
      filters: {
        deviceNum: "",
        deviceName: "",
        userPhone: "",
      }
    };
  },
  created() {

    this.refresh();
  },
  methods: {
    refresh() {
      //debugger
      console.log('refresh');
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,deviceName: this.filters.deviceName ,
      deviceNum: this.filters.deviceNum ,needPhone:this.filters.userPhone,currentPage: this.currentPage });

      //发送查询设备下的用户列表请求
      API.POST(URL.DEVICE_USER_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("deviceUser/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器异常,请联系客服");
        });
    },

    handleSearch(params) {
      console.log(params);
      this.filters=Object.assign({},params);
      this.refresh();
    },
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    //修改用户有效期
    handleEdit(deviceNum,deviceName,userPhone) {
      this.editUserParam.deviceNum = deviceNum;
      this.editUserParam.deviceName = deviceName;
      this.editUserParam.userPhone = userPhone;
      this.editUserParam.show = true;
    },

    handleDelete(deviceNum,deviceName,userPhone) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,deviceNum: deviceNum,
        needUnBindPhone: userPhone,});

      swal({
        title: "确定？",
        text: "你确定要删除:" + deviceName + "  设备下的" + deviceNum + "  用户吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //解绑设备
          API.POST(URL.DEVICE_UNBIND4USER_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除用户成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    console.log('unbindDevice');
                    this.refresh();
                  });
                }
            })
            .catch(err => {
              //this.confirm=false;
              if(err.response.status === 400)
              {
                this.$message.error('输入错误，设备编号只包含数字！');
              }else{
                this.$message.error('系统正在升级中，请联系管理员！');
              }

              console.log(err.response.status);
            });
          }
        })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.refresh();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
  .panel-heading{
    background: #eee;
    height: 20px;
    margin: 0px;
    padding: 10px;
    position: relative;
    border-bottom: 1px solid #DEE5E7;
  }
  .panel-text{
    position:relative;
    left:30px;
    top:1px;
    font-size:16px;
  }
</style>
