<template>
 <!-- 首页左侧导航栏 -->
  <div class="home-left">
    <div class="left-nav">
      <el-menu :default-active="$route.path" router style="height:100%">
        <el-menu-item index = "/summary" style = "font-size: 16px;">
          <i class="el-icon-menu"></i>
          <span slot="title">概况</span>
        </el-menu-item>
        <el-menu-item index = "/instructions" style = "font-size: 16px;">
          <i class="el-icon-ali-shiyongshuoming"></i>
          <span slot="title">使用说明</span>
        </el-menu-item>
        <el-menu-item index = "/help" style = "font-size: 16px;">
          <i class="el-icon-ali-jishuzhichizhichizhinengkefuzhinengfuwuzhinengzhichi"></i>
          <span slot="title">技术支持</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="home-left-router">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLeftSideNav',
  data () {
    return {
      username: 'Weflcome'
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  .home-left
    position: relative;
    display flex
    flex-direction row
    height: 100%;
    width 100%;
    .left-nav
      position relative;
      flex 0 0 140px;
      .el-menu-item.is-active
        background-color: rgb(240, 243, 245) !important;
    .home-left-router
      position relative
      flex 0 10 2000px
      height 100%
</style>
