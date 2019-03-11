<template>
  <div class="store-left">
    <div class="store-left-nav">
      <el-menu :default-active="$route.path" router text-color="#000000" style="height: 100%">
        <el-submenu index="/user/device">
          <template slot="title">
            <i class="el-icon-ali-putong"></i>
            <span style = "font-size: 16px;" > 我的店铺</span>
          </template>
          <el-menu-item index="/user/store/list" style = "font-size: 16px;">
            <span > 店铺列表 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/saleStatistics" style = "font-size: 16px;">
            <span > 销售统计 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/systemSettings" style = "font-size: 16px;">
            <span > 系统设置 </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="store-router">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyStoreLeftSideNav',
  data () {
    return {
      username: 'Weflcome'
    }
  }
}
</script>
<style scoped lang="stylus" type="text/stylus">
  .store-left
    position: relative;
    display flex
    flex-direction row
    height: 100%;
    width 100%;
    .store-left-nav
      position relative;
      flex 0 0 201px;
      .el-menu-item.is-active
        background-color: rgb(240, 243, 245) !important;
    .store-router
      position relative
      flex 0 10 2000px
      height 100%
</style>
