<template>
  <div class="sales-statistics">
    <div class="sales-statistics-content">
      <div class="sales-statistics-head" >
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="sales-statistics-content-chart">
        <div class="sales-statistics-content-chart-all">
          <G2Line :charData="allSales" :id="'allSales'"></G2Line>
          <span>店铺销售总额</span>
        </div>
        <div class="sales-statistics-content-chart-each" v-if="storeNum >= 1">
          <G2Line :charData="dataItemOne.eachStoreSales" :id="generatedId(1)"></G2Line>
          <span>{{dataItemOne.storeName}}</span>
        </div>
        <div class="sales-statistics-content-chart-each" v-if="storeNum >= 2">
          <G2Line :charData="dataItemTwo.eachStoreSales" :id="generatedId(2)"></G2Line>
          <span>{{dataItemTwo.storeName}}</span>
        </div>
        <div class="sales-statistics-content-chart-each" v-if="storeNum >= 3">
          <G2Line :charData="dataItemThree.eachStoreSales" :id="generatedId(3)"></G2Line>
          <span>{{dataItemThree.storeName}}</span>
        </div>
        <div class="sales-statistics-content-chart-each" v-if="storeNum >= 4">
          <G2Line :charData="dataItemFour.eachStoreSales" :id="generatedId(4)"></G2Line>
          <span>{{dataItemFour.storeName}}</span>
        </div>
        <div class="sales-statistics-content-chart-each" v-if="storeNum >= 5">
          <G2Line :charData="dataItemFive.eachStoreSales" :id="generatedId(5)"></G2Line>
          <span>{{dataItemFive.storeName}}</span>
        </div>
        <div class="sales-statistics-content-chart-each" v-if="storeNum >= 6">
          <G2Line :charData="dataItemSix.eachStoreSales" :id="generatedId(6)"></G2Line>
          <span>{{dataItemSix.storeName}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import { mapState } from "vuex";
  import G2Line from '../common/G2Line.vue'
  export default {
    components: {
      G2Line,
    },
    data () {
      return {
        options: [{
          value: '1',
          label: '最近六个月'
        }, {
          value: '2',
          label: '最近一周'
        }],
        value: '1',
        allSales: [],
        storeNum: '10',
        eachStoreSales : [],
        dataItemOne: {
          eachStoreSales: [],
          storeName: ''
        },
        dataItemTwo: {
          eachStoreSales: [],
          storeName: ''
        },
        dataItemThree: {
          eachStoreSales: [],
          storeName: ''
        },
        dataItemFour: {
          eachStoreSales: [],
          storeName: ''
        },
        dataItemFive: {
          eachStoreSales: [],
          storeName: ''
        },
        dataItemSix: {
          eachStoreSales: [],
          storeName: ''
        },
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
      this.refresh();
    },
    methods: {
      refresh() {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,flag: this.value});

        //查询在某段时间内店铺的销售额度
        API.POST(URL.QUERY_STORE_PERIOD_SALES_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.allSales = res.allSales.statistics;
              this.eachStoreSales = res.eachStoreSales;
              if(this.eachStoreSales == null){
                this.storeNum = 0;
                return;
              }
              this.storeNum = this.eachStoreSales.length;

              if (this.storeNum >= 1) {
                this.dataItemOne.storeName = this.eachStoreSales[0].storeName
                this.dataItemOne.eachStoreSales = this.eachStoreSales[0].statistics
              }
              if (this.storeNum >= 2){
                this.dataItemTwo.storeName = this.eachStoreSales[1].storeName
                this.dataItemTwo.eachStoreSales = this.eachStoreSales[1].statistics
              }
              if (this.storeNum >= 3) {
                this.dataItemThree.storeName = this.eachStoreSales[2].storeName
                this.dataItemThree.eachStoreSales = this.eachStoreSales[2].statistics
              }
              if (this.storeNum >= 4){
                this.dataItemFour.storeName = this.eachStoreSales[3].storeName
                this.dataItemFour.eachStoreSales = this.eachStoreSales[3].statistics
              }
              if (this.storeNum >= 5) {
                this.dataItemFive.storeName = this.eachStoreSales[4].storeName
                this.dataItemFive.eachStoreSales = this.eachStoreSales[4].statistics
              }
              if (this.storeNum >= 6){
                this.dataItemSix.storeName = this.eachStoreSales[5].storeName
                this.dataItemSix.eachStoreSales = this.eachStoreSales[5].statistics
              }
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
      generatedId(index){
        return "store_" + index;
      },
      generatedData(index){
        return this.testdata;
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
      .sales-statistics-head
        position relative
        width 120px
      .sales-statistics-content-chart
        position relative
        display flex
        flex-wrap wrap
        .sales-statistics-content-chart-all
          position relative
          text-align center
        .sales-statistics-content-chart-each
          position relative
          text-align center
</style>
