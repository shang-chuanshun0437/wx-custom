/*
* Author: 阿甘
* Email:519983770@qq.com
*/
<template>
  <div class="stores-list">
    <div class="stores-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="stores-list-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
        <el-button style="height: 40px" type="primary" icon="el-icon-plus" :disabled="add.addDisabled" @click="addStore()">
          新增店铺
        </el-button>
      </div>
      <div class="stores-list-table">
        <el-table v-loading="loading" :data="list" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="140" prop="storeId" label="店铺编号" align="center"></el-table-column>
          <el-table-column width="180" prop="storeName" label="店铺名称" align="center"></el-table-column>
          <el-table-column width="180" prop="address" label="位置" align="center"></el-table-column>
          <el-table-column width="80" prop="tableNum" label="餐桌数量" align="center"></el-table-column>
          <el-table-column width="80" prop="foodNum" label="菜品数量" align="center"></el-table-column>
          <el-table-column width="180" prop="updateTime" label="更新日期" align="center"></el-table-column>
          <el-table-column width="180" prop="createTime" label="出厂日期" align="center"></el-table-column>
          <el-table-column width="270" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.storeId)">编辑</el-button>
              <el-button size="mini" @click="handleIntoStore(scope.row.storeId,scope.row.storeName)">进入店铺</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.storeId,scope.row.storeName)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="stores-list-page">
        <el-row>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
          </el-pagination>
        </el-row>
      </div>
      <AddStore :show.sync="add.addShow" ></AddStore>
      <Edit :show.sync="edit.show" :storeId.sync="edit.storeId"></Edit>
    </div>
  </div>

</template>

<script>
  import SearchForm from "../common/SearchForm";
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import AddStore from './AddStore'
  import Edit from './Edit'
  const searchData = [
    {
      name: "店铺编号",
      type: "input",
      placeholder: "请输入店铺编号",
      key: "storeId"
    },
    {
      name: "店铺名称",
      type: "input",
      placeholder: "店铺名称",
      key: "storeName"
    },
    {
      name: "店铺位置",
      type: "input",
      placeholder: "店铺位置",
      key: "address"
    }
  ];
  export default {
    components: {
      SearchForm,
      AddStore,
      Edit,
    },
    computed: {
      ...mapState("store", {
        total: state => state.total,
        list: state => state.list
      })
    },
    data() {
      return {
        loading: false,
        currentPage: 1,
        searchData: searchData,
        add: {
          addDisabled:false,
          addShow:false,
        },
        edit: {
          show:false,
          storeId:'44544545',
          storeName: ""
        },
        delete: {
          storeName: "",
          storeId: ""
        },
        filters: {
          storeId: "",
        },
      };
    },
    created() {
      this.$store.dispatch("leftSideSelect/list",1);
      this.refresh();
    },
    methods: {
      refresh() {
        console.log('refresh');
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.filters.storeId ,
          storeName: this.filters.storeName ,address: this.filters.address ,currentPage: this.currentPage });

        //查询店铺列表
        API.POST(URL.STORE_LIST_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.loading = false;
              this.$store.dispatch("store/list",res);
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
      addStore() {
        this.add.addShow = true;
      },
      clickRow(row){
        this.$refs.moviesTable.toggleRowSelection(row)
      },
      handleEdit(storeId) {
        this.edit.storeId = storeId;
        this.edit.show = true;
      },
      handleIntoStore(storeId,storeName) {
        this.$store.dispatch("leftSideSelect/list",2);
        let param = {storeId: storeId, storeName: storeName};
        this.$store.dispatch("storeSelected/list",param);
        this.$router.push("/user/store/info/menuList");
      },
      handleDelete(storeId,storeName) {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: storeId});

        swal({
          title: "删除店铺",
          text: "您确定要删除:" + storeName + "  店铺吗？",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            //删除店铺
            API.POST(URL.DELETE_STORE, param)
              .then(res => {
                if (res.result.retCode === 0) {
                  swal({
                    title: "已删除",
                    text: "删除用户成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    console.log('unbindDevice');
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
  .stores-list
    position: relative;
    width 100%
    height 100%
    .stores-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .stores-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .stores-list-table
        position relative
        width 100%
        top 50px
      .stores-list-page
        position relative
        top 80px
        text-align center
</style>
