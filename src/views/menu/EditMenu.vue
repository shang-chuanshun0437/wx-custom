/*
* Project: f:\2017Project\game-cms
* Copyright (c) 2018 SN
*/

<template>
  <div>
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">我的店铺</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">{{storeName}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">修改菜单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item  label="商品编号" prop="foodId">
          <el-col :span="12">
            <el-input type="number" v-model="ruleForm.foodId" placeholder="请输入商品编号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名" prop="foodName">
          <el-col :span="12">
            <el-input v-model="ruleForm.foodName" placeholder="请输入商品名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="goods-add__item" label="商品图片" prop="imgPath">
          <el-col :span="15">
            <el-upload class="avatar-uploader" action="" :show-file-list="false"
                       :auto-upload="false" ref="upload"
                       :on-change	="handleOnChange">
              <img v-if="ruleForm.imgPath" :src="ruleForm.imgPath" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且尺寸为800*800,建议上传500kb以内的图片，最大不超过2MB</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="原价" prop="oldPrice">
          <el-col :span="12">
            <el-input type="number" v-model="ruleForm.oldPrice" placeholder="请输入原价"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="现价" prop="newPrice">
          <el-col :span="12">
            <el-input type="number" v-model="ruleForm.newPrice" placeholder="请输入现价"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="会员价" prop="vipPrice">
          <el-col :span="12">
            <el-input type="number" v-model="ruleForm.vipPrice" placeholder="请输入会员价"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类目" prop="category">
          <el-col :span="12">
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option  label="小炒系列" :value="1"></el-option>
              <el-option  label="凉菜系列" :value="2"></el-option>
              <el-option  label="海鲜系列" :value="3"></el-option>
              <el-option  label="汤系列" :value="4"></el-option>
              <el-option  label="酒水饮料" :value="5"></el-option>
              <el-option  label="主食" :value="6"></el-option>
              <el-option  label="其它" :value="7"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="是否推荐" prop="recommend" >
          <el-radio-group v-model="ruleForm.recommend" ref="recommend">
            <el-radio :label="1">不推荐</el-radio>
            <el-radio :label="2">推荐</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否售罄" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">未售罄</el-radio>
            <el-radio :label="2">售罄</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="味道" prop="taste">
          <el-radio-group v-model="ruleForm.taste">
            <el-radio :label="1">不辣</el-radio>
            <el-radio :label="2">微辣</el-radio>
            <el-radio :label="3">中辣</el-radio>
            <el-radio :label="4">特辣</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div >
      <el-button type="primary" :disabled="confirm" v-loading.fullscreen.lock="fullscreenLoading" @click.native.prevent="handleChange" class="confirmBtn">确认添加</el-button>
    </div>

    <div class="vue-cropper-box" v-if="isShowCropper">
      <div class="vue-cropper-content">
        <VueCropper ref="cropper"
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"></VueCropper>
      </div>
      <el-button class="onCubeImgBtn" v-if="isShowCropper" type="primary" @click="onCubeImg">确定裁剪图片</el-button>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data: function() {
      return {
        option: {
          img: '',                         //裁剪图片的地址
          info: true,                      //裁剪框的大小信息
          outputSize: 1,                   // 裁剪生成图片的质量
          outputType: 'png',              //裁剪生成图片的格式
          canScale: false,                 // 图片是否允许滚轮缩放
          autoCrop: true,                  // 是否默认生成截图框
          autoCropWidth: 260,              // 默认生成截图框宽度
          autoCropHeight: 260,             // 默认生成截图框高度
          fixed: true,                    //是否开启截图框宽高固定比例
          fixedNumber: [1, 1]              //截图框的宽高比例
        },
        isShowCropper: false,            //是否显示截图框
        //图片上传时有个加载的效果
        fullscreenLoading: false,

        confirm:true,
        storeName: "",
        storeId:"",

        //图片是否修改标志位
        imgIsChange: false,

        //图片名称临时记录
        imgNameTemp: "",

        ruleForm: {
          foodId: "",
          foodName: "",
          oldPrice: "",
          newPrice: "",
          vipPrice: "",
          category: "",
          recommend: "2",
          taste: "",
          imgPath: "",
          imgName: "",
          status: "",
        },
        rules: {
          foodId: [
            { required: true, message: "请填写菜编号", trigger: "blur" }
          ],
          foodName: [
            { required: true, message: "请填写菜名", trigger: "blur" }
          ],
          imgPath: [
            { required: true, message: "请上传商品图片", trigger: "blur" }
          ],
          price: [
            { required: true, message: "请填写单价", trigger: "blur" }
          ],
          vipPrice: [
            { required: true, message: "请填写会员价", trigger: "blur" }
          ],
          category: [
            { required: true, message: "请选择类目", trigger: "blur" }
          ],
          recommend: [
            { required: true, message: "请选择是否推荐", trigger: "blur" }
          ],
          taste: [
            { required: true, message: "请选择味道", trigger: "blur" }
          ],
          status: [
            { required: true, message: "请选择味道", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      this.storeId = this.$route.query.storeId;
      this.storeName = this.$route.query.storeName;
      this.ruleForm.foodId = this.$route.query.foodId;
      this.refresh();
    },
    beforeUpdate() {
      if( this.ruleForm.foodId != '' & this.ruleForm.foodName != '' & this.ruleForm.price != ''&
        this.ruleForm.vipPrice != '' & this.ruleForm.category != '' & this.ruleForm.recommend != '' &
        this.ruleForm.taste != '',this.ruleForm.imgPath != '')
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
      }
    },
    methods: {
      refresh() {
        //获取商品详细信息
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token,foodId: this.ruleForm.foodId,storeId: this.storeId});

        API.POST(URL.QUERY_SINGLE_MENU_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.ruleForm.foodName = res.menu.foodName;
              this.ruleForm.imgPath = res.menu.foodImg;
              this.ruleForm.oldPrice = res.menu.oldPrice;
              this.ruleForm.newPrice = res.menu.newPrice;
              this.ruleForm.vipPrice = res.menu.vipPrice;
              this.ruleForm.category = res.menu.category;
              this.ruleForm.taste = res.menu.taste;
              this.ruleForm.status = res.menu.status;
              this.ruleForm.recommend = res.menu.recommend;
              this.ruleForm.imgName = res.menu.imgName;
            }
          })
          .catch(err => {
            //this.fullscreenLoading = false;
            this.$message.error("服务器异常,请联系客服");
          });
      },
      //当点击上传图片按钮时，会回调该函数
      handleOnChange(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        this.imgNameTemp = file.name;
        reader.onload = function(e){
          that.option.img = this.result;
          that.isShowCropper = true;
        }
      },
      // 确定裁剪图片
      onCubeImg() {
        // 获取cropper的截图的base64 数据
        this.$refs.cropper.getCropData(data => {
          this.ruleForm.imgPath = data;
          this.ruleForm.imgName = this.imgNameTemp;
          this.imgIsChange = true;
          this.isShowCropper = false

          //先将显示图片地址清空，防止重复显示
          this.option.img = ''
        })
      },
      handleChange() {
        this.fullscreenLoading = true;
        let user = JSON.parse(window.localStorage.getItem('access-user'));

        //如果图片修改了，则上传新图片
        if (this.imgIsChange == true){
          this.imgIsChange = false;
          //上传图片
          var paramImg = Object.assign({}, {userPhone: user.userPhone , token: user.token,
            multipartFile: this.ruleForm.imgPath,imgName: this.ruleForm.imgName});
          API.POST(URL.UPLOAD_IMG_URL, paramImg)
            .then(res => {
              if (res.result.retCode === 0) {
                if(res.imgUrl == ''){
                  //商品图片上传失败
                  this.fullscreenLoading = false;
                  this.$message.error("商品图片上传失败，请重新上传");
                  return;
                }
                //图片上传成功后，获取图片的URL
                this.ruleForm.imgPath = res.imgUrl;
                this.modifyFood();
              }else {
                this.fullscreenLoading = false;
                this.$message.error("图片上传失败，请重新上传");
                return;
              }
            })
            .catch(err => {
              this.fullscreenLoading = false;
              this.$message.error("服务器异常,请联系客服");
              return;
            });
        }else {
          this.modifyFood();
        }
      },
      modifyFood(){
        console.log("modify")
        //修改菜单
        let user = JSON.parse(window.localStorage.getItem('access-user'));

        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token , storeId: this.storeId,
          foodId: this.ruleForm.foodId ,foodName: this.ruleForm.foodName ,oldPrice: this.ruleForm.oldPrice ,
          newPrice: this.ruleForm.newPrice ,vipPrice: this.ruleForm.vipPrice ,category: this.ruleForm.category ,
          recommend: this.ruleForm.recommend , taste: this.ruleForm.taste ,foodImg : this.ruleForm.imgPath,
          imgName: this.ruleForm.imgName});

        API.POST(URL.UPDATE_MENU_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.fullscreenLoading = false;
              this.$router.go(-1);
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }else {
              this.fullscreenLoading = false;
              this.$message.error("修改失败，商品编号已存在.");
            }
          })
      },
    },
  };
</script>

<style scoped>
  .headNav{
    position: relative;
    top: 20px;
    left: 30px;
    width: 380px;
  }
  .content{
    position: relative;
    top: 40px;
    width: 90%;
    left: 20px;
  }
  .confirmBtn{
    position: relative;
    top: 70px;
    width: 480px;
    left: 30px;
  }
  .el-icon-plus.avatar-uploader-icon,
  .avatar-uploader .avatar {
    position: relative;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid black;
    top: 10px;
    left: 20px;
  }
  .vue-cropper-content{
    position: absolute;
    top: 60px;
    left: 20%;
    width: 600px;
    height: 400px;
    background-color: #eaffea;
  }
  .onCubeImgBtn{
    position: absolute;
    width: 600px;
    top: 460px;
    left: 20%;
   }
</style>
