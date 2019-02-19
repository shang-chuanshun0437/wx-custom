<template>
  <div class="vip-statistics">
    <div class="last-add-vip-num">
      <span class="last-add-vip-num-desc">
        最近一周会员新增量
      </span>
      <G2Line :charData="serverData" :id="'c1'"></G2Line>
    </div>
    <div class="last-vip-consume">
      <span class="last-vip-consume-desc">
        最近一周会员消费金额
      </span>
      <G2Columnar :charData="allVipConsume" :id="'c2'"></G2Columnar>
    </div>

    <div class="last-vip-consume-percent">
      <span class="last-vip-consume-percent-desc">
        最近一周会员消费金额所占比例
      </span>
      <G2Pie :charData.sync="percentData" :id="'c3'"></G2Pie>
    </div>

  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  import G2Line from '../common/G2Line.vue'
  import G2Columnar from '../common/G2Columnar.vue'
  import G2Pie from '../common/G2Pie.vue'
  export default {
    components: {
      G2Line,
      G2Columnar,
      G2Pie
    },
    data () {
      return {
        serverData: [],
        allVipConsume: [],
        percentData : []
      }
    },
    computed: {
      ...mapState("orderInfo", {
        total: state => state.total,
        list: state => state.list
      }),
    },
    created() {
      this.refresh();
    },
    methods: {
      refresh() {
        const date = new Date();
        var endTime = this.dateFormat(date.getTime());
        var beginTime = this.dateFormat(date.getTime() - 3600 * 1000 * 24 * 7);
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,beginTime: beginTime,endTime: endTime});

        //查询在某段时间内添加vip的数量
        API.POST(URL.QUERY_ADD_NUM, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.serverData = res.statistics;
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });

        //查询在某段时间内所有vip的消费金额
        API.POST(URL.QUERY_ALL_VIP_CONSUME, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.allVipConsume = res.statistics;
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });

        //查询在某段时间内所有vip的消费金额所占比例
        API.POST(URL.QUERY_ALL_VIP_CONSUME_PERCENT, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.percentData = res.statisticsPercents;
              console.log("vipStatistic:" + this.percentData)
              console.log(this.percentData)
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
      dateFormat(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours = date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes = date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      }
    }
  }
</script>

<style scoped>
  .vip-statistics{
    position: relative;
    height: 100%;
  }
  .last-add-vip-num{
    position: absolute;
    top: 30px;
    left: 20px;
  }
  .last-add-vip-num-desc{
    position: absolute;
    left: 120px;
  }
  .last-vip-consume{
    position: absolute;
    top: 30px;
    left: 450px;
  }
  .last-vip-consume-desc{
    position: absolute;
    left: 120px;
  }
  .last-vip-consume-percent{
    position: absolute;
    top: 440px;
    left: 20px;
  }
  .last-vip-consume-percent-desc{
    position: absolute;
    width: 300px;
    left: 120px;
  }
</style>
