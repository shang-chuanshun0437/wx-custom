/*
* Author: 阿甘
* Email:519983770@qq.com
*餐桌管理
*/
<template>
  <div class="graph-list">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部" name="first">
        <el-row>
          <el-col style="height: 150%;width: 190px" v-for="(item, index) in list" :key="index">
            <div v-if="item.status == 1">
              <el-card style="margin: 10px;">
                <div slot="header" style="height: 2px;text-align: center">
                  <span >{{item.tableId}}号桌</span>
                </div>
                <div> 餐桌状态:&nbsp;空闲</div>
                <div> 容纳人数: &nbsp;{{item.capacity}}</div>
                <div> 实际就餐人数: &nbsp;{{item.personNum}}</div>
              </el-card>
            </div>
            <div v-if="item.status == 2">
              <el-card style="margin: 10px;background-color: #63a35c">
                <div slot="header" style="height: 2px;text-align: center">
                  <span >{{item.tableId}}号桌</span>
                </div>
                <div> 餐桌状态:&nbsp;就餐中</div>
                <div> 容纳人数: &nbsp;{{item.capacity}}</div>
                <div> 实际就餐人数: &nbsp;{{item.personNum}}</div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="空闲" name="second">
        <el-row>
          <el-col style="height: 150%;width: 190px" v-for="(item, index) in list" :key="index">
            <div v-if="item.status == 1">
              <el-card style="margin: 10px;">
                <div slot="header" style="height: 2px;text-align: center">
                  <span >{{item.tableId}}号桌</span>
                </div>
                <div> 餐桌状态:&nbsp;空闲</div>
                <div> 容纳人数: &nbsp;{{item.capacity}}</div>
                <div> 实际就餐人数: &nbsp;{{item.personNum}}</div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="就餐中" name="fourth">
        <el-row>
          <el-col style="height: 150%;width: 190px" v-for="(item, index) in list" :key="index">
            <div v-if="item.status == 2">
              <el-card style="margin: 10px;background-color: #63a35c">
                <div slot="header" style="height: 2px;text-align: center">
                  <span >{{item.tableId}}号桌</span>
                </div>
                <div> 餐桌状态:&nbsp;就餐中</div>
                <div> 容纳人数: &nbsp;{{item.capacity}}</div>
                <div> 实际就餐人数: &nbsp;{{item.personNum}}</div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    computed: {
      ...mapState("storeTable", {
        total: state => state.total,
        list: state => state.list
      })
    },
    data() {
      return {
        loading: false,
        activeName: 'first',
        storeId: "",
        storeName: "未知",
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
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,storeId: this.storeId });

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
  .graph-list
    position: relative;
    width 100%
    height 100%
</style>
