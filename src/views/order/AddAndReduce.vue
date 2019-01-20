<template>

  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.foodCount > 0" @click.stop.prevent="decreaseCart()">
          <img class="img" src="../../assets/reduce.png">
      </div>
    </transition>
    <div class="cart-count" v-show="food.foodCount > 0">
      {{food.foodCount}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <img class="img" src="../../assets/add.png">
    </div>
  </div>

</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: Object
  },
  methods: {
    addCart(event) {
      if (!this.food.foodCount) {
        Vue.set(this.food, 'foodCount', 0)
      }
      this.food.foodCount++;
    },
    decreaseCart() {
      this.food.foodCount--;
    }
  }
}

</script>

<style>

  .img{
    width: 25px;
    height: 25px;
  }
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    transition: all .4s linear;
  }

    .inner{
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
      transition: all 0.4s linear;
    }

    .fadeRotate-enter-active, .fadeRotate-leave-active{
      transform: translate3d(0,0,0);
    }

.fadeRotate-enter-active.inner, .fadeRotate-leave-active.inner{
        display: inline-block;
        transform: rotate(0);
      }

    .fadeRotate-enter, .fadeRotate-leave-active{
      opacity: 0;
      transform: translate3d(24px,0,0);
    }
.fadeRotate-enter.inner, .fadeRotate-leave-active.inner{
  transform: rotate(180deg);
}
  .cart-count{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 24px;
    text-align: center;
    padding: 6px 0;
  }

  .cart-add{
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
    padding: 6px;
  }

</style>
