<template>
  <div class="vip-left">
    <div class="vip-left-nav">
      <el-menu :default-active="$route.path" router text-color="#000000" style="height: 100%">
        <el-submenu index="/user/store/vip">
          <template slot="title">
            <i class="el-icon-ali-putong"></i>
            <span style = "font-size: 16px;" > 会员管理</span>
          </template>
          <el-menu-item index="/user/store/vip/list" style = "font-size: 16px;">
            <span > 会员列表 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/vip/vipStatistics" style = "font-size: 16px;">
            <span > 会员统计 </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="vip-router">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VipLeftSideNav',
    data () {
      return {
        username: 'Weflcome'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .vip-left
    position: relative;
    display flex
    flex-direction row
    height: 100%;
    width 100%;
    .vip-left-nav
      position relative;
      flex 0 0 201px;
      height 100%
      .el-menu-item.is-active
        background-color: rgb(240, 243, 245) !important;
    .vip-router
      position relative
      flex 0 10 2000px
      height 100%
</style>
