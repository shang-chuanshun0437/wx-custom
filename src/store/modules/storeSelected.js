/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "../mutation-types";

const getters = {
  storeId: state => state.storeId,
  storeName: state => state.storeName,
};

const state = {
  storeId: 0,
  storeName: "未知",
};

const actions = {

    list({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.STORE_SELECTED, param);
        });
    },
};

const mutations = {
    [types.STORE_SELECTED](state, param) {
        state.storeId = param.storeId;
        state.storeName = param.storeName;

        let result = {
          storeId:param.storeId,
          storeName:param.storeName
        }
        //选择的store信息存储到本地，防止刷新页面时数据丢失
        localStorage.setItem('storeIdAndName', JSON.stringify(result));
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
