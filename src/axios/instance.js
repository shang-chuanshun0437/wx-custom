/*
 * Project: f:\2017Project\game-cms
 * Created Date: Saturday June 2nd 2018
 * Author: 17030360
 * Email:wdnybbz@163.com
 * Description:-----
 * EditLog:-----
 * Copyright (c) 2018 SN
 */
import * as util from "@/utils/index";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/smartlock',
    timeout: 10000
});

instance.defaults.headers.common["Authorization"] = "Rene";
instance.defaults.headers.post["Content-Type"] = "application/json";
//错误处理
// instance.interceptors.response.use(function(response) {
//     return response;
// }, util.catchError);

export { instance };
