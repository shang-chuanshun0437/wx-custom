/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "./../mutation-types";

const getters = {
    userPhone: state => state.userPhone,
    token: state => state.token
};

const state = {
    userPhone: '',
    token: ''
};

const actions = {
    login({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.LOGIN_SUCCESS, param);
        });
    }

};

const mutations = {
    [types.LOGIN_SUCCESS](state, res) {
      state.userPhone = res.userPhone;
      state.token = res.token;
      let result = {
        userPhone:res.userPhone,
        token:res.token
      }
      //将登录信息存储到本地
      localStorage.setItem('access-user', JSON.stringify(result));
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
