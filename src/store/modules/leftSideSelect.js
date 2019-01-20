/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "../mutation-types";

const getters = {
  show: state => state.show,
};

const state = {
  show: 1,
};

const actions = {

    list({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.STORE_INFO_LEFT_SHOW, param);
        });
    },
};

const mutations = {
    [types.STORE_INFO_LEFT_SHOW](state, param) {
        state.show = param;
      let result = {
        show:param
      }
      //存储到本地，防止刷新页面时数据丢失
      localStorage.setItem('leftSideSelect', JSON.stringify(result));
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
