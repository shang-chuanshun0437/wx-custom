<template>
 <!-- 首页左侧导航栏 -->
    <el-row class="homeLeft">
      <el-col :span="3" style="height: 100%">
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
      </el-col>
      <el-col :span="21" style="height: 100%;background-color: rgb(240, 243, 245)">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
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

<style scoped>
  .homeLeft{
    position: relative;
    height: 100%;
  }
  /* 右侧内容区域 */
  .home_center {
    position: absolute;
    background-color: rgb(240, 243, 245);
    left: 135px;
    width: 100%;

  }

  .el-menu-item.is-active {
   background-color: rgb(240, 243, 245) !important;
  }

</style>
