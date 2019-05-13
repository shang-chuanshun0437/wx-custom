<template>
  <div class="store-info-left">
    <div class="store-info-left-nav">
      <el-menu :default-active="$route.path" router text-color="#000000" style="height: 100%">
        <el-submenu index="/user/store/info/menuList">
          <template slot="title">
            <i class="el-icon-ali-putong"></i>
            <span style = "font-size: 16px;" > 店铺详情</span>
          </template>
          <el-menu-item index="/user/store/info/menuList" style = "font-size: 16px;">
            <span > 菜单管理 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/tableOrGraph" style = "font-size: 16px;">
            <span > 餐桌管理 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/frontDeskOrder" style = "font-size: 16px;">
            <span > 前台点餐 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/wxOrder" style = "font-size: 16px;">
            <span > 扫码订单 </span>
            <el-badge :value="total" style="position: relative;margin-top: -5px; margin-right: 20px;"></el-badge>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/frontDeskPay" style = "font-size: 16px;">
            <span > 前台收银 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/CompleteOrder" style = "font-size: 16px;">
            <span > 已完成订单 </span>
          </el-menu-item>
          <el-menu-item index="/user/store/list/storeInfo/storeSales" style = "font-size: 16px;">
            <span > 销售分析 </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="store-info-router">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <audio id="audio">
      <source src="../../assets/shake.mp3"
              type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    name: 'StoreInfoLeftSideNav',
    data () {
      return {
        username: 'Weflcome',
        websocket: null,
        status: "",
        storeId:""
      }
    },
    created(){
      let storeIdAndName = JSON.parse(window.localStorage.getItem('storeIdAndName'));
      this.storeId = storeIdAndName.storeId;
      this.refresh();
    },
    mounted() {
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://47.94.86.112:8080/smartlock/websocket?storeId=' + this.storeId);
        this.initWebSocket();
      } else {
        alert('not support websocket')
      }
    },
    beforeDestroy() {
      this.closeWebSocket();
    },
    computed: {
      ...mapState("storeWxOrder", {
        total: state => state.total,
        list: state => state.list
      })
    },
    methods: {
      initWebSocket() {
        //连接错误
        this.websocket.onerror = this.setErrorMessage
        // //连接成功
        this.websocket.onopen = this.setOnopenMessage
        //收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage
        //连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        //window.onbeforeunload = this.closeWebSocket()
      },
      refresh() {
        console.log("storeInfoLeftSide refresh");
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId
          ,payType: 1 ,source: 1, orderStatus: 2 });

        //查询订单列表
        API.POST(URL.QUERY_ORDER, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.loading = false;
              this.$store.dispatch("storeWxOrder/list",res);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
      setErrorMessage() {
        this.status = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
        console.log(this.status)
      },
      setOnopenMessage() {
        this.status = "WebSocket连接成功" + '   状态码：' + this.websocket.readyState;
        console.log(this.status)
      },
      setOnmessageMessage(event) {
        this.status = '服务端返回：' + event.data;
        this.refresh();
        const audio = document.getElementById('audio');
        audio.play();
        console.log(this.total)
      },
      setOncloseMessage() {
        this.status = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
        console.log(this.status)
      },
      //websocket发送消息
      //send() {
      //  this.websocket.send(this.text)
     //   this.text = ''
      //},
      closeWebSocket() {
        this.websocket.close()
        console.log("websocket closed.")
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .store-info-left
    position: relative;
    display flex
    flex-direction row
    height: 100%;
    width 100%;
    .store-info-left-nav
      position relative;
      flex 0 0 201px;
      height 100%
      .el-menu-item.is-active
        background-color: rgb(240, 243, 245) !important;
    .store-info-router
      position relative
      flex 0 10 2000px
      height 100%
</style>
