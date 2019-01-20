/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "./../mutation-types";

const getters = {
  show: state => state.show,
};

const state = {
    show:true,
};

const actions = {
    hide({ commit }, param) {
        commit(types.TOP_SHOW, param);
    }

};

const mutations = {
    [types.TOP_SHOW](state, param) {
        state.show = param;
        console.log('mutations:' + param);
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
