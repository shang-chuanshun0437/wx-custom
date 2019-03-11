/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *会员管理
 */
<template>
  <div class="vip-list">
    <div class="vip-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/vip/list' }" style="font-size: 17px;">会员管理</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">会员列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="vip-list-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
        <el-button type="primary" icon="el-icon-plus" @click="addVip()" style="height: 40px">添加会员</el-button>
      </div>
      <div class="vip-list-table">
        <el-table v-loading="loading" :data="list" style="width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="80" prop="id" label="ID" align="center"></el-table-column>
          <el-table-column width="160" prop="vipId" label="会员编号" align="center"></el-table-column>
          <el-table-column width="140" prop="realAmount" label="会员充值金额" align="center"></el-table-column>
          <el-table-column width="80" prop="consumCount" align="center" label="消费次数" ></el-table-column>
          <el-table-column width="180" prop="updateTime" align="center" label="最近一次消费" ></el-table-column>
          <el-table-column width="180" prop="validTime" align="center" label="有效期" ></el-table-column>
          <el-table-column width="180" prop="createTime" label="添加日期" align="center"></el-table-column>
          <el-table-column width="280" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="edit(scope.row)">修改</el-button>
              <el-button size="mini" @click="consumeRecord(scope.row.vipId)">消费记录</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.vipId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="vip-list-page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <AddVip :show.sync="addVipShow"></AddVip>
    <EditVip :show.sync="editVipShow" :row.sync="selected"></EditVip>
  </div>
</template>

<script>
import SearchForm from "../common/SearchForm";
import AddVip from "./AddVip";
import EditVip from "./EditVip";
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";
const searchData = [
  {
    name: "会员编号",
    type: "input",
    placeholder: "请输入会员编号",
    key: "vipId"
  },
  {
    name: "开始时间",
    type: "date",
    placeholder: "请选择开始时间",
    key: "beginTime"
  },
  {
    name: "结束时间",
    type: "date",
    placeholder: "请选择结束时间",
    key: "endTime"
  },
];
export default {
  components: {
    SearchForm,
    AddVip,
    EditVip
  },
  computed: {
    ...mapState("vip", {
      total: state => state.total,
      list: state => state.list
    }),
    selected(){
      return this.row;
    }
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      searchData: searchData,
      addVipShow: false,
      editVipShow: false,
      row: "",
      filters: {
        vipId: "",
        beginTime: "",
        endTime: "",
      },
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      console.log('refresh');
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,vipId: this.filters.vipId,
        beginTime: this.filters.beginTime , endTime: this.filters.endTime, currentPage: this.currentPage });

      //查询会员列表
      API.POST(URL.QUERY_VIP, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("vip/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },

    handleSearch(params) {
      this.filters=Object.assign({},params);
      this.refresh();
    },
    addVip() {
      this.addVipShow = true;
    },
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    edit(row) {
      this.row = row;
      this.editVipShow = true;
    },
    handleIntoStore(storeId) {
      this.$router.push({path:"/user/store/list/storeInfo",query:{storeId: storeId}});
    },
    handleDelete(vipId) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,vipId: vipId});

      swal({
        title: "删除会员",
        text: "您确定要删除: " + vipId + " 会员吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //删除订单
          API.POST(URL.DELETE_VIP, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除会员成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    this.refresh();
                  });
                }
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
            });
          }
        })
    },
    consumeRecord(vipId){
      this.$router.push({path:"/user/store/vip/vipConsumRecord",query:{vipId: vipId}});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.refresh();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang="stylus" type="text/stylus">
  .vip-list
    position: relative;
    width 100%
    height 100%
    .vip-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .vip-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .vip-list-table
        position relative
        width 100%
        top 50px
      .vip-list-page
        position relative
        top 80px
        text-align center
</style>
