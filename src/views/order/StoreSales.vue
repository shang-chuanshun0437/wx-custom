<template>
  <div class="sales-statistics">
    <div class="sales-statistics-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">今日销量</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sales-statistics-content-chart">
        <div class="sales-statistics-content-chart-each">
          <G2Columnar :charData="allSales" :id="'all'"></G2Columnar>
        </div>
        <div class="sales-statistics-content-chart-category">
         <G2Columnar :charData="categorySales" :id="'category'"></G2Columnar>
        </div>
        <div class="sales-statistics-content-chart-percent">
          <G2Pie :charData="percentSales" :id="'percent'"></G2Pie>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import { mapState } from "vuex";
  import G2Columnar from '../common/G2Columnar.vue'
  import G2Pie from '../common/G2Pie.vue'
  export default {
    components: {
      G2Columnar,
      G2Pie
    },
    data () {
      return {
        options: [{
          value: '1',
          label: '今日销量'
        }],
        value: '1',
        allSales: [],
        categorySales : [],
        percentSales: [],
        storeName: "",
        storeId: ""
      }
    },
    computed: {
    },
    watch: {
      value: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        this.refresh(val);
      }
    },
    created() {
      this.$store.dispatch("leftSideSelect/list",2);
      let storeIdAndName = JSON.parse(window.localStorage.getItem('storeIdAndName'));
      this.storeId = storeIdAndName.storeId;
      this.storeName = storeIdAndName.storeName;
      this.refresh();
    },
    methods: {
      refresh() {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId});

        //查询在某段时间内店铺的销售额度
        API.POST(URL.QUERY_STOREID_SALES_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.allSales = res.allStatistics;
              this.categorySales = res.categoryStatistics;
              this.percentSales = res.statisticsPercents;
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .sales-statistics
    position relative
    width 100%
    height 100%
    display flex
    flex-wrap wrap
    .sales-statistics-content
      position absolute
      width 98%
      height 98%
      left 1%
      top 2%
      .panel-heading
        position relative
        top 20px
      .sales-statistics-content-chart
        position relative
        display flex
        flex-wrap wrap
        top 30px
        .sales-statistics-content-chart-all
          position relative
          text-align center
        .sales-statistics-content-chart-each
          position relative
          text-align center
</style>
