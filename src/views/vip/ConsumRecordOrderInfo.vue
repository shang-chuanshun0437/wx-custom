/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *前台点餐
 */
<template>
  <div class="frontDeskOrder">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/store/vip/list' }" style="font-size: 17px;">会员管理</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{vipId}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">消费详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="position: relative;top: 70px;width: 100%;height: 85%">
      <el-table v-loading="loading" :data="list" style="width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="90" prop="foodId" label="商品编号" align="center"></el-table-column>
        <el-table-column width="150" prop="foodName" label="商品名称" align="center"></el-table-column>
        <el-table-column width="80" prop="foodCount" label="份数" align="center">
          <template slot-scope="scope">
            <span style="color: red">{{scope.row.foodCount}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90px" prop="oldPrice" align="center" label="原价" ></el-table-column>
        <el-table-column width="90px" prop="newPrice" label="现价" align="center">
          <template slot-scope="scope">
            <span style="color: #000000">{{scope.row.newPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90px" prop="vipPrice" label="会员价" align="center"></el-table-column>
        <el-table-column width="90" prop="totalPrice" label="总价" align="center">
          <template slot-scope="scope">
            <span style="color: #20a0ff">{{scope.row.totalPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" prop="vipTotalPrice" label="会员总价" align="center">
          <template slot-scope="scope">
            <span style="color: #00b43c">{{scope.row.vipTotalPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" prop="realPrice" label="实收金额" align="center"></el-table-column>
        <el-table-column width="100" prop="orderType" label="点菜类型" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderType===1" type="success">点菜</el-tag>
            <el-tag v-else-if="scope.row.orderType===2" type="info">加菜</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="180" prop="createTime" label="订单日期" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  components: {

  },
  computed: {
    ...mapState("orderInfo", {
      total: state => state.total,
      list: state => state.list
    }),
  },
  data() {
    return {
      loading: false,
      storeName: "未知",
      orderId:"",
      storeId:"",
      vipId:"",
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.storeId = this.$route.query.storeId;
    this.vipId = this.$route.query.vipId;
    this.refresh();
  },
  methods: {
    refresh() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,orderId: this.orderId,storeId: this.storeId});

      //查询订单列表
      API.POST(URL.QUERY_ORDER_INFO, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("orderInfo/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
  }
};
</script>

<style scoped>
  .frontDeskOrder{
    position: relative;
    height: 100%;
    top: 10px;
  }
  .headNav{
    position: relative;
    top: 20px;
    left: 20px;
    width: 580px;
  }
  .total-count{
    position: relative;
    top: 50px;
    left: 80px;
    width: 780px;
    font-size: 18px;
  }
  .check{
    position: absolute;
    top: -10px;
    left: 780px;
    font-size: 18px;
  }
</style>
