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
    //查询用户管理的设备下的用户
    list({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.DEVICE_USER_LIST, param);
        });
    },
};

const mutations = {
    [types.DEVICE_USER_LIST](state, param) {
        console.log(param);
        state.total = param.count;
        if (param.count === 0) {
            state.list = null;
        } else {
            state.list = [].concat(param.queryDeviceUserRes);
        }

        console.log(state.list);
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
