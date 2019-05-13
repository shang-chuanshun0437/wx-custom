// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/fullPath'
import store from './store/index'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css"
import swal from "sweetalert";
import 'babel-polyfill'
//引入axios
import Axios from 'axios'
//给vue挂载一个属性
Vue.prototype.$axios = Axios;

//图片裁剪
import VueCropper from "vue-cropper"
Vue.use(VueCropper);

//全局css
import "@/styles/top.css"

//去掉告警信息
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    render: h => h(App),
    template: '<App/>'
})
