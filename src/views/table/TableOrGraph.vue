/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *餐桌管理
 */
<template>
  <div class="tableOrGraph">
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-switch style="left: 30px;width: 240px;top: 40px" v-model="tableOrGraph"
       active-text="图形展示" inactive-text="列表展示">
    </el-switch>
    <div style="position: relative;top: 40px;" v-if="!tableOrGraph">
      <TableList></TableList>
    </div>
    <div style = "position: relative;top: 40px;" v-if="tableOrGraph">
      <GraphList ></GraphList>
    </div>
  </div>
</template>

<script>
import TableList from "./TableList";
import GraphList from "./GraphList";
export default {
  components: {
    GraphList,
    TableList,
  },
  computed: {
  },
  data() {
    return {
      tableOrGraph: false,
      storeId: "",
      storeName: "未知",
    };
  },
  created() {
    let storeIdAndName = JSON.parse(window.localStorage.getItem('storeIdAndName'));
    this.storeId = storeIdAndName.storeId;
    this.storeName = storeIdAndName.storeName;
  },
  methods: {
  }
};
</script>

<style scoped>
  .tableOrGraph{
    position: relative;
    height: 100%;
    top: 10px;
  }
  .headNav{
    position: relative;
    top: 20px;
    left: 20px;
    width: 380px;
  }
</style>
