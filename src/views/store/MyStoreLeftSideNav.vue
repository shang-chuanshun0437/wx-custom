<template>
  <el-row class="store">
    <el-col :span="3" style="height: 100%">
      <el-menu :default-active="$route.path" router text-color="#000000" class="storeNav" >
        <el-submenu index="/user/device">
          <template slot="title">
            <i class="el-icon-ali-putong"></i>
            <span style = "font-size: 16px;" > 我的店铺</span>
          </template>
          <el-menu-item index="/user/store/list" style = "font-size: 16px;">
            <span > 店铺列表 </span>
          </el-menu-item>
          <el-menu-item index="/user/device/unmanage" style = "font-size: 16px;">
            <span > 销售统计 </span>
          </el-menu-item>
          <el-menu-item index="/user/device/unmanage" style = "font-size: 16px;">
            <span > 订单列表 </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="21" style="height: 100%;background-color: rgb(255, 255, 255)">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
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

<style scoped>
  .store{
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .storeNav{
    position: absolute;
    width:200px;
    height: 100%;
    background-color: #eef1f6
  }

  /* 右侧内容区域 */
  .store_info {
    position: absolute;
    top: 50px;
    left: 200px;
    width:100%;
    height: 100%;
    background-color: #f0f3f5;
    padding: 8px;
    padding-bottom: 1px;
  }

</style>
