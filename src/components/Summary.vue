<template>
  <div class = "summary-wrapper">
    <div class="content-wrapper">
      <div class="summary-desc">
        <h3>尊敬的用户您好 ，在云扫码点餐系统平台上，您共有：</h3>
      </div>
      <div class="summary-info">
        <el-card class="store-card">
          <div slot="header">
            <span>店铺</span>
            <el-button style="float: right; padding: 3px 0" @click="storeShop" type="text">查看详情</el-button>
          </div>
          <div >
            <img src="../assets/forest.png" class="store-image">
          </div>
          <div class = "shops_num">
            <span class = "text-style">店铺数量</span>
            &nbsp; &nbsp;&nbsp;{{shopCount}}
          </div>
        </el-card>

        <el-card class="vip-card" >
          <div slot="header">
            <span>会员</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="vipInfo">查看详情</el-button>
          </div>
          <div >
            <img src="../assets/forest.png" class="vip-image">
          </div>
          <div class = "vip_num">
            <span class = "text-style">会员数量</span>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{vipNum}}
          </div>
        </el-card>

        <el-card class="statics-card">
          <div slot="header">
            <span>统计</span>
            <el-button style="float: right; padding: 3px 0" type="text" >查看详情</el-button>
          </div>
          <div >
            <img src="../assets/forest.png" class="statics-image">
          </div>
          <div class = "statics-money">
            <span class = "text-style">本月销售额</span>
            &nbsp; &nbsp;{{totalSales}}元
          </div>
        </el-card>
      </div>

      <div class="summary-company">
        <el-card class="notice">
          <div slot="header">
            <span>公司公告</span>
          </div>
          <ul>
            <li style="margin-bottom: 15px">
              <a href="www.baidu.com" style="font-size: 15px;color: black;">有关恢复PV、UV统计的通知(2018-09-18)</a>
            </li>
            <li style="margin-bottom: 15px">
              <a href="www.baidu.com" style="font-size: 15px;color: black">有关短时暂停PV、UV统计的通知(2018-09-05)</a>
            </li>
            <li style="margin-bottom: 15px">
              <a href="www.baidu.com" style="font-size: 15px;color: black">用户编辑平台v4.0.2更新公告(2018-05-09)</a>
            </li>
          </ul>
        </el-card>
        <el-card class="version">
          <div slot="header">
            <span>版本升级</span>
          </div>
          <ul>
            <li style="margin-bottom: 15px">
              <a href="www.baidu.com" style="font-size: 15px;color: black;">编辑平台v4.0.2上线(2018-05-09)</a>
            </li>
          </ul>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
  import * as API from "../axios/api";
  import * as URL from "../axios/url";

  export default {
    name: 'Summary',
    data() {
      return {
        shopCount: '0',
        vipNum: '0',
        totalSales: '0'
      };
    },
    created() {
      this.$store.dispatch("top/hide",true);
      this.refresh();
    },
    computed:{

    },
    mounted: function () {
    },
    methods:{
      refresh(){
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var queryParams = Object.assign({},{ userPhone: user.userPhone, token: user.token});
        //获取用户详情
        API.POST(URL.USER_INFO_URL, queryParams)
          .then(res => {
            if (res.result.retCode === 0) {
              this.shopCount = res.user.shopCount;
            }
          })
          .catch(err => {
            this.$message.error("服务器异常,请联系客服");
          });
        //获取会员数量
        API.POST(URL.QUERY_VIP_NUM, queryParams)
          .then(res => {
            if (res.result.retCode === 0) {
              this.vipNum = res.total;
            }
          })
          .catch(err => {
            this.$message.error("服务器异常,请联系客服");
          });
        //获取所有店铺的当月销售总额
        const date = new Date();
        queryParams.beginTime = this.dateFormat(date.getTime());
        queryParams.endTime = '2999-12-23 05:57:58';
        API.POST(URL.QUERY_STORE_SALES_URL, queryParams)
          .then(res => {
            if (res.result.retCode === 0) {
              this.totalSales = res.total
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("服务器异常,请联系客服");
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
        return year+"-"+month+"-"+"01 00:00:00";
      },
      storeShop(){
        this.$router.push('/user/store');
      },
      vipInfo(){
        this.$router.push('/user/store/vip');
      },
      subUserInfo(){
        this.$router.push('/device/user/list');
      },
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .summary-wrapper
    width 100%
    height 100%
    .content-wrapper
      position relative
      width 96%
      height 100%
      left 4%
      .summary-desc
        position relative
        top 20px
      .summary-info
        position relative
        top: 30px
        display flex
        flex-direction row
        flex-wrap wrap
        .store-card
          position relative
          height 200px
          width 280px
          margin 0 80px 0 0
          .store-image
            position relative
            width 60px
            height 60px
          .shops_num
            position absolute
            top: 100px
            left 100px
        .vip-card
          position relative
          height 200px
          width 280px
          margin 0 80px 0 0
          .vip-image
            position relative
            width 60px
            height 60px
          .vip_num
            position absolute
            top: 100px
            left 100px
        .statics-card
          position relative
          height 200px
          width 280px
          margin 0 80px 0 0
          .statics-image
            position relative
            width 60px
            height 60px
          .statics-money
            position absolute
            top: 100px
            left 100px
      .summary-company
        position relative
        top: 30px
        display flex
        flex-direction row
        flex-wrap wrap
        .notice
          position relative
          margin-top 30px
          margin-right 40px
        .version
          position relative
          margin-top 30px

</style>
