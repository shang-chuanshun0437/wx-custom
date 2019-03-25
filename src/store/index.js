import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import store from "./modules/store";
import storeTable from "./modules/storeTable";
import menu from "./modules/menu";
import deviceUser from "./modules/deviceUser";
import top from "./modules/top";
import openHistory from "./modules/openHistory";
import leftSideSelect from "./modules/leftSideSelect";
import storeSelected from "./modules/storeSelected";
import storeOrder from "./modules/storeOrder";
import orderInfo from "./modules/orderInfo";
import vip from "./modules/vip";
import storeSales from "./modules/storeSales";
import storeWxOrder from "./modules/storeWxOrder";

import getters from "./getters";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
      login,
      store,
      deviceUser,
      top,
      openHistory,
      storeTable,
      menu,
      leftSideSelect,
      storeSelected,
      storeOrder,
      orderInfo,
      vip,
      storeSales,
      storeWxOrder
    },
    getters
});
