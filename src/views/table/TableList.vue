/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *餐桌管理
 */
<template>
  <div class="tables-list">
    <div class="tables-list-content">
      <div class="tables-list-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
        <el-button type="primary" style="height: 40px" icon="el-icon-plus" @click="addStoreTable()">新增餐桌</el-button>
      </div>
      <div class="tables-list-table">
        <el-table v-loading="loading" :data="list" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="140" prop="tableId" label="餐桌编号" align="center"></el-table-column>
          <el-table-column width="100" prop="capacity" label="容纳人数" align="center"></el-table-column>
          <el-table-column width="180" prop="address" label="餐桌位置" align="center"></el-table-column>
          <el-table-column width="100" prop="personNum" label="就餐人数" align="center"></el-table-column>
          <el-table-column width="150px" prop="status" label="使用状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===1" type="success">空闲</el-tag>
              <el-tag v-else-if="scope.row.status===2" type="danger">就餐中</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="100" prop="foodImg" align="center" label="餐桌二维码" >
            <template slot-scope="scope">
              <img  :src="scope.row.qrCodeUrl" alt="" style="width: 80px;height: 80px">
            </template>
          </el-table-column>
          <el-table-column width="180" prop="createTime" label="添加日期" align="center"></el-table-column>
          <el-table-column width="160" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.tableId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tables-list-page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
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
    name: "餐桌编号",
    type: "input",
    placeholder: "请输入餐桌编号",
    key: "tableId"
  },
  {
    name: "餐桌位置",
    type: "input",
    placeholder: "请输入餐桌位置",
    key: "address"
  },
  {
    name: "餐桌状态",
    type: "select",
    key: "status",
    options: ["空闲","正在就餐"]
  },
];
export default {
  components: {
    SearchForm,
  },
  computed: {
    ...mapState("storeTable", {
      total: state => state.total,
      list: state => state.list
    })
  },
  data() {
    return {
      tableOrGraph: true,
      loading: false,
      currentPage: 1,
      searchData: searchData,
      storeId: "",
      storeName: "未知",
      edit: {
        show:false,
        storeId: "",
        storeName: ""
      },
      delete: {
        storeName: "",
        storeId: ""
      },
      filters: {
        tableId: "",
        address: "",
        status: "",
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
        tableId: this.filters.tableId ,address: this.filters.address ,status: this.filters.status ,currentPage: this.currentPage });

      //查询餐桌列表
      API.POST(URL.QUERY_STORE_TABLE_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("storeTable/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },

    handleSearch(params) {
      this.filters=Object.assign({},params);
      if (this.filters.status == "空闲") {
        this.filters.status = 1;
      } else if (this.filters.status == "正在就餐") {
        this.filters.status = 2;
      }
      this.refresh();
    },
    addStoreTable() {
      this.$router.push({path:"/user/store/list/storeInfo/addTable",query:{storeId: this.storeId,storeName: this.storeName}});
    },
    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    handleEdit(row) {
      this.$router.push({path:"/user/store/list/storeInfo/editTable",
        query:{storeId: this.storeId,storeName: this.storeName,
          tableId: row.tableId,capacity: row.capacity,address: row.address,personNum: row.personNum,status: row.status,}});
    },
    handleIntoStore(storeId) {
      this.$router.push({path:"/user/store/list/storeInfo",query:{storeId: storeId}});
    },
    handleDelete(tableId) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId,tableId: tableId});

      swal({
        title: "删除餐桌",
        text: "您确定要删除:" + tableId + "号餐桌吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //删除餐桌
          API.POST(URL.DELETE_STORE_TABLE_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除餐桌成功",
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
  .tables-list
    position: relative;
    width 100%
    height 100%
    .tables-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .tables-list-search
        position: relative;
        top 20px
        display flex
        flex-direction row
        flex-wrap wrap
      .tables-list-table
        position relative
        width 100%
        top 40px
      .tables-list-page
        position relative
        top 50px
        text-align center
</style>
