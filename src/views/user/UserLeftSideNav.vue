<template>
 <!-- 用户左侧导航栏 -->

 <el-row>

   <el-col :span="24" class="middle">

    <div class="el-menu-demo">
      <el-menu :default-active="$route.path" router text-color="#FFFFFF" background-color="#48576a" >
        <el-submenu index="/user/device">
          <template slot="title">
            <i class="el-icon-ali-yonghuguanli"></i>
            <span style = "font-size: 16px;" > 用户管理</span>
          </template>

          <el-menu-item index="/device/user/list" style = "font-size: 16px;">
            <i class="el-icon-ali-user"></i>
            <span > 用户列表 </span>
          </el-menu-item>

        </el-submenu>
      </el-menu>
    </div>
    <!--右侧内容区-->
     <!--右侧内容区-->
      <section class="content-container">
        <div>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>

</el-col>
 </el-row>

</template>

<script>
export default {
  name: 'UserLeftSideNav',
  data () {
    return {
      username: 'Weflcome'
    }
  }
}
</script>

<style scoped>
 /* 中间样式，包含左侧导航栏和右侧内容 flex布局 */
  .middle {
    display: flex;
    position: fixed;
    left:0px;
    top: 55px;
    bottom: 0px;
  }
  .el-menu-demo{
    width:200px;
    background-color: rgb(48, 65, 86);
    min-height: 100%;
    min-height: 700px;
  }

  /* 右侧内容区域 */
  .content-container {
    background-color: #f0f3f5;
    flex: 1;
    overflow-y: auto;
    min-height: 100%;
    min-height: 700px;
    padding: 8px;
    padding-bottom: 1px;
  }

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

</style>
