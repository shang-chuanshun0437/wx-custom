/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *会员消费记录
 */
<template>
  <div class="frontDeskOrder">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/store/vip/list' }" style="font-size: 17px;">会员管理</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{vipId}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">消费记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="position: relative;top: 40px;width: 100%;height: 100%">
      <el-table v-loading="loading" :data="list" style="width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="200" prop="orderId" label="订单编号" align="center"></el-table-column>
        <el-table-column width="120" prop="storeName" label="店铺名称" align="center"></el-table-column>
        <el-table-column width="100" prop="personNum" label="就餐人数" align="center"></el-table-column>
        <el-table-column width="100" prop="amount" align="center" label="订单金额" ></el-table-column>
        <el-table-column width="120px" prop="vipAmount" label="会员金额" align="center"></el-table-column>
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
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  components: {

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
      vipId: ""
    };
  },
  created() {
    this.vipId = this.$route.query.vipId;
    this.refresh();
  },
  methods: {
    refresh() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,vipId: this.vipId,currentPage: this.currentPage });

      //查询订单列表
      API.POST(URL.QUERY_VIP_CONSUME_RECORD, param)
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
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    orderInfo(row) {
      this.$router.push({path:"/user/store/vip/consumRecordOrderInfo",query:{orderId: row.orderId,
          storeId: row.storeId,vipId: this.vipId}});
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
    top: 10px;
  }
  .headNav{
    position: relative;
    top: 10px;
    left: 20px;
    width: 680px;
  }
</style>
