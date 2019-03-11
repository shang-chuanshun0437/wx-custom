/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "../mutation-types";

const getters = {
  list: state => state.list,
};

const state = {
  list: [],
};

const actions = {

    list({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.STORE_SALES_LIST, param);
        });
    },
};

const mutations = {
    [types.STORE_SALES_LIST](state, param) {
      state.list = [].concat(param.eachStoreSales);
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
