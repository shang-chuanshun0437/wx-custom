<template>
  <div class="vip-statistics">
    <div class="last-add-vip-num">
      <span>
        最近一周会员新增量
      </span>
      <G2Line :charData="serverData" :id="'c1'"></G2Line>
    </div>
    <div class="last-vip-consume">
      <span>
        最近一周会员消费金额
      </span>
      <G2Columnar :charData="allVipConsume" :id="'c2'"></G2Columnar>
    </div>

    <div class="last-vip-consume-percent">
      <span>
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

<style scoped lang="stylus" type="text/stylus">
  .vip-statistics
    position relative
    width 100%
    height 100%
    display flex
    flex-wrap wrap
    .last-add-vip-num
      text-align center
    .last-vip-consume
      text-align center
    .last-vip-consume-percent
      text-align center
</style>
