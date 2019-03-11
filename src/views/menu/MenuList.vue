/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *餐桌管理
 */
<template>
  <div class="menu-list">
    <div class="menu-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">店铺列表</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="menu-list-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
        <el-button type="primary" style="height: 40px" icon="el-icon-plus" @click="addMenu()">新增菜单</el-button>
      </div>
      <div class="menu-list-table">
        <el-table v-loading="loading" :data="list" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="100" prop="foodId" label="商品编号" align="center"></el-table-column>
          <el-table-column width="180" prop="foodName" label="商品名" align="center"></el-table-column>
          <el-table-column width="80" prop="foodImg" align="center" label="商品图片" >
            <template slot-scope="scope">
              <img  :src="scope.row.foodImg" alt="" style="width: 60px;height: 60px">
            </template>
          </el-table-column>
          <el-table-column width="120px" prop="category" label="类目" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.category===1" type="success">小炒系列</el-tag>
              <el-tag v-else-if="scope.row.category===2" type="info">凉菜系列</el-tag>
              <el-tag v-else-if="scope.row.category===3" type="danger">海鲜系列</el-tag>
              <el-tag v-else-if="scope.row.category===4" type="success">汤系列</el-tag>
              <el-tag v-else-if="scope.row.category===5" type="info">酒水饮料</el-tag>
              <el-tag v-else-if="scope.row.category===6" type="danger">主食</el-tag>
              <el-tag v-else-if="scope.row.category===7" type="danger">其它</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="100" prop="oldPrice" label="原价" align="center"></el-table-column>
          <el-table-column width="100" prop="newPrice" label="现价" align="center"></el-table-column>
          <el-table-column width="100" prop="vipPrice" label="会员价" align="center"></el-table-column>
          <el-table-column width="100px" prop="recommend" label="是否推荐" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.recommend == 1" type="info" @click="recommend(scope.row.foodId,scope.row.foodName,scope.row.recommend)">不推荐</el-button>
              <el-button v-else-if="scope.row.recommend == 2" type="success" @click="recommend(scope.row.foodId,scope.row.foodName,scope.row.recommend)">推荐</el-button>
            </template>
          </el-table-column>
          <el-table-column width="100px" prop="status" label="是否售罄" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 1" type="success" @click="sellOut(scope.row.foodId,scope.row.foodName,scope.row.status)">未售罄</el-button>
              <el-button v-else-if="scope.row.status == 2" type="danger" @click="sellOut(scope.row.foodId,scope.row.foodName,scope.row.status)">售罄</el-button>
            </template>
          </el-table-column>
          <el-table-column width="100px" prop="taste" label="口味" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.taste === 1" type="success">不辣</el-tag>
              <el-tag v-else-if="scope.row.taste === 2" type="info">微辣</el-tag>
              <el-tag v-else-if="scope.row.taste === 3" type="info">中辣</el-tag>
              <el-tag v-else-if="scope.row.taste === 4" type="info">特辣</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="180" prop="createTime" label="添加日期" align="center"></el-table-column>
          <el-table-column width="180" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.foodId)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.foodId,scope.row.foodName)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="menu-list-page">
        <el-row style="text-align:center;margin-top:15px;">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
          </el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "../common/SearchForm";
import { mapState } from "vuex";
import * as API from "../../axios/api";
import * as URL from "../../axios/url";
const searchData = [
  {
    name: "菜编号",
    type: "input",
    placeholder: "请输入菜编号",
    key: "foodId"
  },
  {
    name: "菜名",
    type: "input",
    placeholder: "请输入菜名",
    key: "foodName"
  },
  {
    name: "类目",
    type: "select",
    key: "category",
    options: ["小炒系列", "凉菜系列", "海鲜系列", "汤系列", "酒水饮料", "主食","其它"]
  },
  {
    name: "是否推荐",
    type: "select",
    key: "recommend",
    options: ["推荐", "不推荐"]
  },
];
export default {
  components: {
    SearchForm,
  },
  computed: {
    ...mapState("menu", {
      total: state => state.total,
      list: state => state.list
    }),

  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      storeId: "",
      storeName: "未知",
      searchData: searchData,
      filters: {
        foodId: "",
        foodName: "",
        category: "",
        recommend: "",
      },
    };
  },
  created() {
    let storeIdAndName = JSON.parse(window.localStorage.getItem('storeIdAndName'));
    this.storeId = storeIdAndName.storeId;
    this.storeName = storeIdAndName.storeName;

    this.refresh();
  },
  methods: {
    refresh() {
      console.log('refresh');
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId ,
        foodId: this.filters.foodId ,foodName: this.filters.foodName ,category: this.filters.category ,
        recommend: this.filters.recommend , currentPage: this.currentPage });

      //查询菜单列表
      API.POST(URL.QUERY_MENU_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("menu/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },

    handleSearch(params) {
      this.filters=Object.assign({},params);
      if (this.filters.category == "小炒系列") {
        this.filters.category = 1;
      } else if (this.filters.category == "凉菜系列") {
        this.filters.category = 2;
      }else if (this.filters.category == "海鲜系列") {
        this.filters.category = 3;
      }else if (this.filters.category == "汤系列") {
        this.filters.category = 4;
      }else if (this.filters.category == "酒水饮料") {
        this.filters.category = 5;
      }else if (this.filters.category == "主食") {
        this.filters.category = 6;
      }else if (this.filters.category == "其它") {
        this.filters.category = 7;
      }

      if (this.filters.recommend == "不推荐") {
        this.filters.recommend = 1;
      } else if (this.filters.recommend == "推荐") {
        this.filters.recommend = 2;
      }
      this.refresh();
    },
    addMenu() {
      this.$router.push({path:"/user/store/list/menu/add",query:{storeId: this.storeId,storeName: this.storeName}});
    },
    sellOut(foodId,foodName,status){
      var msg = "设置为售罄";
      if (status == 2){
        status = 1;
        msg = "设置为未售罄";
      }else {
        status = 2;
      }
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,foodId: foodId,
        status: status});

      swal({
        title: "售罄/未售罄",
        text: "您确定要将: " + foodName + msg + "吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //设置
          API.POST(URL.UPDATE_MENU_STATUS_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                  title: "更新完成",
                  text: "更新商品成功",
                  icon: "success",
                  button: "确认"
                }).then(() => {
                  this.refresh();
                });
              }else{
                this.$message.error('更新商品失败，请重新操作！');
              }
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
            });
        }
      })
    },
    recommend(foodId,foodName,recommend){
      //是否推荐 1 不推荐； 2 推荐

      var msg = "";
      if (recommend == 1){
        recommend = 2;
        msg = "设置为推荐";
      }else {
        recommend = 1;
        msg = "设置为不推荐";
      }
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,foodId: foodId,
        recommend: recommend});

      swal({
        title: "推荐/不推荐",
        text: "您确定要将: " + foodName + msg + "吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //设置
          API.POST(URL.UPDATE_MENU_STATUS_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                  title: "更新完成",
                  text: "更新商品成功",
                  icon: "success",
                  button: "确认"
                }).then(() => {
                  this.refresh();
                });
              }else{
                this.$message.error('更新商品失败，请重新操作！');
              }
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
            });
        }
      })
    },
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    handleEdit(foodId) {
      console.log(this.storeName);
      this.$router.push({path:"/user/store/list/menu/add/editMenu",
        query:{storeId: this.storeId,storeName: this.storeName, foodId: foodId}});
    },
    handleIntoStore(storeId) {
      this.$router.push({path:"/user/store/list/storeInfo",query:{storeId: storeId}});
    },
    handleDelete(foodId,foodName) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,foodId: foodId});

      swal({
        title: "删除菜单",
        text: "您确定要删除: " + foodName + " 吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //删除菜单
          API.POST(URL.DELETE_MENU_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除商品成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    this.refresh();
                  });
                }else{
                this.$message.error('删除失败，请重新操作！');
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
  .menu-list
    position: relative;
    width 100%
    height 100%
    .menu-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .menu-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .menu-list-table
        position relative
        width 100%
        top 50px
      .menu-list-page
        position relative
        top 50px
        text-align center
</style>
