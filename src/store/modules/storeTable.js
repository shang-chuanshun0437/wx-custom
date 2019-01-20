/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "../mutation-types";

const getters = {
  total: state => state.total,
  list: state => state.list,
};

const state = {
  total: 0,
  list: [],
};

const actions = {

    list({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.STORE_TABLE_LIST, param);
        });
    },
};

const mutations = {
    [types.STORE_TABLE_LIST](state, param) {
        state.total = param.total;
        if (param.total === 0) {
            state.list = null;
        } else {
            state.list = [].concat(param.storeTables);
        }
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
