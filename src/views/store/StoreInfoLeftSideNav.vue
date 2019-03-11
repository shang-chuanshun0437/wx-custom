<template>
  <div class="store-info-left">
    <div class="store-info-left-nav">
      <el-menu :default-active="$route.path" router text-color="#000000" style="height: 100%">
        <el-submenu index="/user/store/info/menuList">
          <template slot="title">
            <i class="el-icon-ali-putong"></i>
            <span style = "font-size: 16px;" > 店铺详情</span>
          </template>
          <el-menu-item index="/user/store/info/menuList" style = "font-size: 16px;">
            <span > 菜单管理 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/tableOrGraph" style = "font-size: 16px;">
            <span > 餐桌管理 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/frontDeskOrder" style = "font-size: 16px;">
            <span > 前台点餐 </span>
          </el-menu-item>
          <el-menu-item index="/user/device/unmanage" style = "font-size: 16px;">
            <span > 扫码订单 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/frontDeskPay" style = "font-size: 16px;">
            <span > 前台收银 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/CompleteOrder" style = "font-size: 16px;">
            <span > 已完成订单 </span>
          </el-menu-item>
          <el-menu-item index="/user/device/unmanage" style = "font-size: 16px;">
            <span > 销售分析 </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="store-info-router">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StoreInfoLeftSideNav',
    data () {
      return {
        username: 'Weflcome'
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .store-info-left
    position: relative;
    display flex
    flex-direction row
    height: 100%;
    width 100%;
    .store-info-left-nav
      position relative;
      flex 0 0 201px;
      height 100%
      .el-menu-item.is-active
        background-color: rgb(240, 243, 245) !important;
    .store-info-router
      position relative
      flex 0 10 2000px
      height 100%
</style>
