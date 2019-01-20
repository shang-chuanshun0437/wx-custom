<template>
    <div class="shop-cart">
        <div class="head" >
          <img class="outSide" src="../../assets/outSide.png">
          <div class="badge">
            {{totalCount}}
          </div>
          <img class="img" src="../../assets/shopCart.png">
          <div class="totalPrice">
            ￥{{totalPrice}}
          </div>
          <div class="confirm" @click="addOrder"></div>
          <div class="confirm-text" @click="addOrder">提交</div>
        </div>
      <div class="content" v-show="totalPrice">
        <ul class = "ul">
          <span>菜名&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;份数&nbsp; &nbsp;&nbsp;总价</span>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.foodName}}</span>
            <span class="food-count">{{food.foodCount}}</span>
            <div class="price">
              <span>￥{{food.newPrice * food.foodCount}}</span>
            </div>
          </li>
        </ul>
        <div style="position:relative;top: 30px;left: 10%;width: 80%; height: 2px; background-color: rgb(231,231,231);">
          <span>原价：￥{{totalPrice}};</span>
          <span>会员价：￥{{totalVipPrice}}</span>
        </div>
      </div>
  </div>
</template>

<script>
  import AddAndReduce from './AddAndReduce'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default: []
      }
    },
    components: {
      AddAndReduce,
    },
    data() {
      return {
        deliveryPrice: 0,
        minPrice: 0
      }
    },
    created() {

    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          if (food.foodCount) {
            total += food.newPrice * food.foodCount
          }
        })
        return total
      },
      totalVipPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          if (food.foodCount) {
            total += food.vipPrice * food.foodCount
          }
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.foodCount
        })
        return count
      },
      leftAmount() {
        if (this.minPrice - this.totalPrice > 0 && totalPrice) {
          return true;
        }
        return false
      },
    },
    methods: {
      setEmpty() {
        this.selectFoods.forEach((food) => {
          food.foodCount = 0
        })
      },
      addOrder() {
        //调用父组件的方法
        this.$emit('addOrder', 'data')
      }
    }
  }

</script>

<style scoped>
  .shop-cart{
    position: relative;
    width:100%;
    height: 100%;
    right: 0px;
    background-color: #eef1f6
  }
  .head{
    position: fixed;
    bottom: 3px;
    width: 19%;
    height: 60px;
    background-color: #505458;
  }
  .badge{
    position: absolute;
    top: -5px;
    left: 35px;
    background: rgb(240,20,20);
    color: white;
    width: 24px;
    height: 16px;
    line-height: 16px;
    font-size: 9px;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
    font-weight: 700;
    border-radius: 16px;
    text-align: center;
  }
  .outSide{
    position: relative;
    top: -10px;
    width: 60px;
    height: 60px;
  }
  .img{
    position: relative;
    left: -53px;
    top: -20px;
    width: 35px;
    height: 35px;
  }
  .totalPrice{
    position: relative;
    left: 40%;
    top: -46px;
    color: white;
  }
  .confirm{
    position: absolute;
    top: 0px;
    right: 0;
    height: 60px;
    width: 80px;
    background-color: #00b43c;
    text-align: center;
  }
  .confirm-text{
    position: absolute;
    top: 20px;
    right: 25px;
    color: white;
    font-size: 17px;
  }
  .content{
    position: relative;
    width: 100%;
    background-color: #eaffea;
  }
  .ul{
    list-style: none;
    margin: 0;
    border: 0;
  }
  .food{
    position: relative;
    display: flex;
    height: 30px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .name{
    width: 100px;
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 48px;
  }
  .food-count{
    position: relative;
    font-size: 14px;
    font-weight: 700;
    line-height: 48px;
    left: 5px;
    width: 20px;
  }
  .price{
    position: relative;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
    line-height: 48px;
    left: 20px;
  }

</style>
