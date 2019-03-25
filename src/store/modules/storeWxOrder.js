/*
 * Author: 519983770@qq.com
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
            commit(types.WX_ORDER_LIST, param);
        });
    },
};

const mutations = {
    [types.WX_ORDER_LIST](state, param) {
        state.total = param.total;
        if (param.total === 0) {
            state.list = null;
        } else {
            state.list = [].concat(param.storeOrders);
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
