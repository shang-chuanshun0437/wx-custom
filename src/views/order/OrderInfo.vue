/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *前台点餐
 */
<template>
  <div class="order-info-list">
    <div class="order-info-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="order-info-list-info">
        <span>餐桌编号：{{this.tableId}}号&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp订单总金额：￥{{this.amount}}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp会员总金额：￥{{this.vipAmount}}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp实收金额：￥{{this.realAmount}}</span>
        <span v-show="this.realAmount == 0">
          <el-button style="margin-left: 40px" round type="success" @click="pay">结账</el-button>
          <el-button round type="primary"  @click="addOrderInfo">加菜</el-button>
        </span>
        <span v-show="newStatus == 2" >
          <el-button round  @click="receiveOrder">接收订单</el-button>
        </span>
      </div>
      <div class="order-info-list-table">
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
          <el-table-column width="100" prop="vipNum" label="会员编号" align="center"></el-table-column>
          <el-table-column width="100" prop="orderType" label="点菜类型" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.orderType===1" type="success">点菜</el-tag>
              <el-tag v-else-if="scope.row.orderType===2" type="info">加菜</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="180" prop="createTime" label="订单日期" align="center"></el-table-column>
          <el-table-column width="120"  label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-if = "scope.row.realPrice != 0" size="mini" type="danger" disabled>删除</el-button>
              <el-button v-else  size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Pay :show.sync="payShow" :object="object"></Pay>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";
import Pay from "./Pay"

export default {
  components: {
    Pay,
  },
  computed: {
    ...mapState("orderInfo", {
      total: state => state.total,
      list: state => state.list
    },),
    object() {
      let object={storeId: this.storeId,orderId: this.orderId,tableId: this.tableId,amount: this.amount,vipAmount: this.vipAmount,}
      return object
    },
    newStatus() {
      return this.orderStatus;
    }
  },
  data() {
    return {
      loading: false,
      payShow: false,
      storeId: "",
      storeName: "未知",
      orderId:"",
      tableId:"",
      amount:"",
      vipAmount:"",
      realAmount:"",
      orderStatus:""
    };
  },
  created() {
    let storeIdAndName = JSON.parse(window.localStorage.getItem('storeIdAndName'));
    this.storeId = storeIdAndName.storeId;
    this.storeName = storeIdAndName.storeName;
    this.orderId = this.$route.query.orderId;
    this.tableId = this.$route.query.tableId;
    this.orderStatus = this.$route.query.orderStatus;
    console.log(this.orderStatus)
    this.refresh();
  },
  methods: {
    refresh() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,orderId: this.orderId});

      //查询订单列表
      API.POST(URL.QUERY_ORDER_INFO, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("orderInfo/list",res);
            this.amount = 0;
            this.vipAmount = 0;
            this.realAmount = 0;
            try{
              res.orderInfos.forEach((food) => {
                this.amount += food.totalPrice;
                this.vipAmount += food.vipTotalPrice;
                this.realAmount += food.realPrice;
              })
            }catch (e){
              console.log(e)
            }

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
    addOrderInfo() {
      this.$router.push({path:"/user/store/list/storeInfo/addOrderInfo",query:{storeId: this.storeId,storeName: this.storeName,
           orderId: this.orderId,tableId: this.tableId}});
    },
    receiveOrder() {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,
        orderId: this.orderId});
      swal({
        title: "接收订单",
        text: "您确定要接收该订单吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          API.POST(URL.MODIFY_ORDER_STATUS, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                  title: "已接收",
                  text: "订单接收成功",
                  icon: "success",
                  button: "确认"
                }).then(() => {
                  this.refresh();
                });
              }
              this.orderStatus = 1;
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
            });
        }
      })
    },
    pay(){
      this.payShow = true;
    },
    handleDelete(row) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,
        orderId: this.orderId,foodId: row.foodId,vipTotalPrice: row.vipTotalPrice,totalPrice: row.totalPrice,
        orderType: row.orderType,createTime: row.createTime});

      swal({
        title: "删除商品",
        text: "您确定要删除: " + row.foodName + " 吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //删除订单中的某一个商品
          API.POST(URL.DELETE_ORDER_INFO, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除商品成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    this.refresh();
                  });
                }else if (res.result.retCode === 1022){
                this.$message.error('订单已支付，无法删除！');
              }
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
            });
          }
        })
    },
  }
};
</script>

<style scoped lang="stylus" type="text/stylus">
  .order-info-list
    position: relative;
    width 100%
    height 100%
    .order-info-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .order-info-list-info
        position relative
        top 40px
      .order-info-list-table
        position relative
        width 100%
        top 60px
</style>
