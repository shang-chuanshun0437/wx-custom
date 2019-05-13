/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *前台点餐
 */
<template>
  <div class="front-order-list">
    <div class="front-order-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">前台点餐</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="front-order-list-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
        <el-button type="primary" style="height: 40px" icon="el-icon-plus" @click="addOrder()">点餐</el-button>
      </div>
      <div class="front-order-list-table">
        <el-table v-loading="loading" :data="list" style="width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="140" prop="orderId" label="订单编号" align="center"></el-table-column>
          <el-table-column width="100" prop="tableId" label="餐桌编号" align="center"></el-table-column>
          <el-table-column width="80" prop="personNum" label="就餐人数" align="center"></el-table-column>
          <el-table-column width="100" prop="amount" align="center" label="订单金额" ></el-table-column>
          <el-table-column width="80" prop="vipAmount" label="会员金额" align="center"></el-table-column>
          <el-table-column width="100" prop="realAmount" label="实收金额" align="center"></el-table-column>
          <el-table-column width="100" prop="payType" label="支付方式" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.payType===1" type="success">未支付</el-tag>
              <el-tag v-else-if="scope.row.payType===2" type="info">前台支付</el-tag>
              <el-tag v-else-if="scope.row.payType===3" type="danger">支付宝支付</el-tag>
              <el-tag v-else-if="scope.row.payType===4" type="danger">微信支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="180" prop="createTime" label="订单日期" align="center"></el-table-column>
          <el-table-column width="180" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="orderInfo(scope.row)">查看详情</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.orderId,scope.row.tableId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="front-order-list-page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "../common/SearchForm";
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";
const searchData = [
  {
    name: "餐桌编号",
    type: "input",
    placeholder: "请输入餐桌编号",
    key: "tableId"
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
      console.log('refresh');
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId ,
        tableId: this.filters.tableId ,payType: 1 ,beginTime: this.filters.beginTime ,
        endTime: this.filters.endTime ,source: 2, currentPage: this.currentPage });

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
      this.refresh();
    },
    addOrder() {
      this.$router.push({path:"/user/store/list/storeInfo/addOrder",query:{storeId: this.storeId,storeName: this.storeName}});
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

<style scoped lang="stylus" type="text/stylus">
  .front-order-list
    position: relative;
    width 100%
    height 100%
    .front-order-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .front-order-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .front-order-list-table
        position relative
        width 100%
        top 50px
      .front-order-list-page
        position relative
        top 80px
        text-align center
</style>
