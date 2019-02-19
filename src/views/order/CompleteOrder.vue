/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *已完成订单
 */
<template>
  <div class="frontDeskOrder">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">已完成订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="position: relative;top: 40px">
      <el-row >
        <el-col :span="23" style="position: relative;left: 30px">
          <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
          <el-button type="primary" icon="el-icon-plus" @click="exportReport()">导出报表</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="list" style="position:relative;top: 10px;width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="200" prop="orderId" label="订单编号" align="center"></el-table-column>
        <el-table-column width="100" prop="tableId" label="餐桌编号" align="center"></el-table-column>
        <el-table-column width="100" prop="personNum" label="就餐人数" align="center"></el-table-column>
        <el-table-column width="100" prop="amount" align="center" label="订单金额" ></el-table-column>
        <el-table-column width="120px" prop="vipAmount" label="会员金额" align="center"></el-table-column>
        <el-table-column width="120px" prop="vipNum" label="会员编号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.vipNum==null" style="color:red">非会员</span>
            <span v-else style="color: #00b43c;">{{scope.row.vipNum}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" prop="realAmount" label="实收金额"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.vipNum==null" style="color:red">{{scope.row.realAmount}}</span>
            <span v-else style="color: #00b43c;">{{scope.row.realAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" prop="payType" label="支付方式" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType===2" type="info">前台支付</el-tag>
            <el-tag v-else-if="scope.row.payType===3" type="danger">支付宝支付</el-tag>
            <el-tag v-else-if="scope.row.payType===4" type="danger">微信支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="180" prop="createTime" label="订单日期" align="center"></el-table-column>
        <el-table-column width="180" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="orderInfo(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="text-align:center;margin-top:15px;">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchForm from "../common/SearchForm";
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

import { instance } from "../../axios/instance";

const searchData = [
  {
    name: "餐桌编号",
    type: "input",
    placeholder: "请输入餐桌编号",
    key: "tableId"
  },
  {
    name: "订单来源",
    type: "select",
    key: "source",
    options: ["前台点餐", "扫码点餐"]
  },
  {
    name: "付款方式",
    type: "select",
    key: "payType",
    options: ["前台支付","扫码支付-支付宝","扫码支付-微信"]
  },
  {
    name: "开始时间",
    type: "date",
    placeholder: "请选择开始时间",
    key: "beginTime"
  },
  {
    name: "结束时间",
    type: "date",
    placeholder: "请选择结束时间",
    key: "endTime"
  },
];
export default {
  components: {
    SearchForm,
  },
  computed: {
    ...mapState("storeOrder", {
      total: state => state.total,
      list: state => state.list
    })
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      searchData: searchData,
      storeId: "",
      storeName: "未知",
      filters: {
        tableId: "",
        payType: "",
        source:"",
        beginTime: "",
        endTime: "",
      },
    };
  },
  created() {
    this.$store.dispatch("leftSideSelect/list",2);
    let storeIdAndName = JSON.parse(window.localStorage.getItem('storeIdAndName'));
    this.storeId = storeIdAndName.storeId;
    this.storeName = storeIdAndName.storeName;
    this.refresh();
  },
  methods: {
    refresh() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId ,
        tableId: this.filters.tableId ,payType: this.filters.payType ,beginTime: this.filters.beginTime ,
        endTime: this.filters.endTime ,source: this.filters.source, currentPage: this.currentPage });

      //查询订单列表
      API.POST(URL.QUERY_ORDER, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("storeOrder/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },
    handleSearch(params) {
      this.filters=Object.assign({},params);
      if (this.filters.payType == '前台支付'){
        this.filters.payType = 2;
      }else if (this.filters.payType == '扫码支付-支付宝'){
        this.filters.payType = 3;
      }else if (this.filters.payType == '扫码支付-微信'){
        this.filters.payType = 4;
      }
      if (this.filters.source == '前台点餐'){
        this.filters.source = 2;
      }else if (this.filters.source == '扫码点餐'){
        this.filters.source = 1;
      }
      this.refresh();
    },
    addOrder() {
      this.$router.push({path:"/user/store/list/storeInfo/addOrder",query:{storeId: this.storeId,storeName: this.storeName}});
    },
    exportReport() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId ,
        tableId: this.filters.tableId ,payType: this.filters.payType ,beginTime: this.filters.beginTime ,
        endTime: this.filters.endTime ,source: this.filters.source});

      //查询订单列表
      instance.post(URL.EXPORT_REPORT, param,{responseType: 'blob'})
        .then(res => {
          const blob = new Blob([res.data],{type: "application/vnd.ms-excel"});
          const fileName = '已完成订单.xlsx';
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = window.URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          window.URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    orderInfo(row) {
      this.$router.push({path:"/user/store/list/storeInfo/frontDeskOrder/orderInfo",query:{orderId: row.orderId,
          tableId: row.tableId,amount: row.amount,vipAmount: row.vipAmount,realAmount: row.realAmount}});
    },
    handleIntoStore(storeId) {
      this.$router.push({path:"/user/store/list/storeInfo",query:{storeId: storeId}});
    },
    handleDelete(orderId,tableId) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,
        orderId: orderId,tableId: tableId});

      swal({
        title: "删除订单",
        text: "您确定要删除: " + orderId + " 订单吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //删除订单
          API.POST(URL.DELETE_ORDER, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除订单成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    this.refresh();
                  });
                }else if (res.result.retCode === 1022){
                this.$message.error('删除失败，订单已付款，无法删除！');
              }
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
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

<style scoped>
  .frontDeskOrder{
    position: relative;
    height: 100%;
    width: 100%;
    top: 10px;
  }
  .headNav{
    position: relative;
    top: 10px;
    left: 20px;
    width: 680px;
  }
</style>
