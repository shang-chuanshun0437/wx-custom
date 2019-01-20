/*
* Project: f:\2017Project\game-cms
* Copyright (c) 2018 SN
*/

<template>
  <div style="position: fixed;height: 100%;width: 100%;overflow-y: hidden;overflow-x: hidden">

    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{ruleForm.tableId}}号桌</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">加菜</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="position:relative;width: 96%; height: 2px; background-color: rgb(231,231,231);"></div>
      <div class="foods">
        <div class="all-food">
          <div v-for="category in categoryList" :key="category.id">
            <span>{{category.value}}</span>
            <el-row>
              <el-col style="width: 250px" v-for="(item, index) in list" :key="index">
                <div v-if="item.category == category.id">
                  <el-card style="margin: 8px;height: 140px;width: 225px">
                    <div slot="header" style="position: relative;top: -18px;height: 0px;text-align: center">
                      <span >编号:{{item.foodId}}</span>
                    </div>
                    <img class="img" :src="item.foodImg">
                    <ul class="ul">
                      <li class="food-name">{{item.foodName}}</li>
                      <li style="line-height: 20px;">
                        <span class="old-price" v-show="item.oldPrice != item.newPrice">原价：{{item.oldPrice}}</span>
                        <span class="price">现价：{{item.newPrice}}</span>
                      </li>
                      <li class="vip-price">会员价：{{item.vipPrice}}</li>
                      <li v-if="item.status === 2" class="price">售罄</li>
                      <div class="cartcontrol-wrapper" >
                        <AddAndReduce :food="item"></AddAndReduce>
                      </div>
                    </ul>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div style="position:relative;top: -100%;left:96%;width: 2px; height: 100%; background-color: rgb(231,231,231);"></div>
    </div>
    <div class="aside">
      <ShopCart :selectFoods = "selectFoods" @addOrder="addOrder"></ShopCart>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import { mapState } from "vuex";
  import AddAndReduce from "./AddAndReduce";
  import ShopCart from "./ShopCart";
  export default {
    data: function() {
      return {
        confirm:false,
        storeName: "",
        storeId:"",
        orderId:"",
        selectFood: [],
        ruleForm: {
          tableId: "",
        },
        categoryList: [
          { id: '1', value: '小炒系列' },
          { id: '2', value: '凉菜系列' },
          { id: '3', value: '海鲜系列' },
          { id: '4', value: '汤系列' },
          { id: '5', value: '酒水饮料' },
          { id: '6', value: '主食' },
          { id: '7', value: '其它' }
        ],
      };
    },
    created() {
      this.storeId = this.$route.query.storeId;
      this.storeName = this.$route.query.storeName;
      this.orderId = this.$route.query.orderId;
      this.ruleForm.tableId = this.$route.query.tableId;
      this.refresh();
    },
    computed: {
      ...mapState("menu", {
        total: state => state.total,
        list: state => state.list
      }),
      selectFoods() {
        let foods = []
        this.list.forEach((food) => {
            if (food.foodCount) {
              foods.push(food)
            }
        })
        return foods
      }
    },
    components: {
      AddAndReduce,
      ShopCart
    },
    methods: {
      refresh() {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId });

        //查询菜单列表
        API.POST(URL.QUERY_MENU_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.loading = false;
              this.$store.dispatch("menu/list",res);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
      addOrder: function (str) {
        if (this.selectFoods.length <= 0){
          this.$message.error('购物车为空，请点餐');
          return;
        }
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,
         orderId: this.orderId,orderInfos: this.selectFoods});

        //向订单中添加商品
        API.POST(URL.ADD_ORDER_INFO, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.go(-1);
            }else if (res.result.retCode === 1017){
              this.$message.error('餐桌编号不存在，请重新输入餐桌编号！');
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      }
    },

  };
</script>

<style scoped>
  .add-order{
    position: relative;
    height: 100%;
  }
  .headNav{
    position: relative;
    top: 20px;
    left: 20px;
    width: 380px;
  }
  .content{
    position: relative;
    top: 60px;
    width: 80%;
    height: 100%;
    left: 20px;
  }
  .img{
    position: relative;
    top: -8px;
    left: -15px;
    width: 80px;
    height: 80px;
  }
  .foods{
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .all-food{
    position: relative;
    width: 90%;
    left: 5%;
    top: 20px;
    height: 75%;
    overflow-y: scroll;
  }
  .ul{
    position: relative;
    top: -115px;
    left: 80px;
    padding: 0;
    list-style-type: none
  }
  .food-name{
    line-height: 20px;
    color: black;
    font-size: 17px;
  }
  .old-price{
    line-height: 20px;
    text-decoration: line-through;
    color: rgb(147,153,159);
    font-size: 13px;
  }
  .vip-price{
    line-height: 20px;
    color: #2b7ff7;
    font-size: 13px;
  }
  .price{
    line-height: 20px;
    color: red;
    font-size: 13px;
  }
  .cartcontrol-wrapper{
    position: absolute;
    top: 60px;
    right: 60px;
    z-index: 20;
  }
  .aside{
    position: absolute;
    top: 80px;
    left: 80%;
    width: 19%;
    height: 100%;
    background-color: #20a0ff;
  }

</style>
