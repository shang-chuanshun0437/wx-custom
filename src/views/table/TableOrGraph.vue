/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *餐桌管理
 */
<template>
  <div class="table-graph-list">
    <div class="stores-graph-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="table-graph-list-select" >
        <el-switch v-model="tableOrGraph" active-text="图形展示" inactive-text="列表展示"></el-switch>
      </div>
      <div class="table-graph-list-or">
        <TableList v-if="!tableOrGraph"></TableList>
        <GraphList v-if="tableOrGraph"></GraphList>
      </div>
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

<style scoped lang="stylus" type="text/stylus">
  .table-graph-list
    position: relative;
    width 100%
    height 100%
    .stores-graph-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .table-graph-list-select
        position: relative;
        top 40px
      .table-graph-list-or
        position relative
        top 50px
</style>
