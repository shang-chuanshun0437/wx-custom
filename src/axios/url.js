/*
 * Email:519983770@qq.com
 */

//注册用的URL
export const GET_VERIFYCATION_CODE = "/user/getVerificationCode"; //获取验证码
export const REGISTER_URL = "/user/register"; //注册
export const LOGIN_URL = "/user/login"; //登录
//店铺
export const STORE_LIST_URL = "/store/query/list"; //获取管理的设备
export const DEVICE_UNMANAGE_URL = "/device/unManage/queryDeviceList"; //获取普通的设备
export const ADD_STORE_URL = "/store/add"; //添加店铺
export const DELETE_STORE = "/store/delete"; //删除店铺
export const UPDATE_STORE = "/store/update"; //更新店铺
export const DEVICE_BIND4USER_URL = "/user/device/bindDevice4User"; //为其他用户绑定设备
export const DEVICE_UNBIND4USER_URL = "/user/device/unbindDevice4User"; //设备管理员解绑其他用户的设备
export const MODIFY_EXPIRE_URL = "/user/device/modify/user"; //设备管理员修改用户的有效期

//餐桌
export const ADD_STORE_TABLE_URL = "/store/table/add"; //添加餐桌
export const QUERY_STORE_TABLE_URL = "/store/table/query/list"; //查询餐桌列表
export const UPDATE_STORE_TABLE_URL = "/store/table/update"; //更新餐桌
export const DELETE_STORE_TABLE_URL = "/store/table/delete"; //删除餐桌

//菜单
export const ADD_MENU_URL = "/store/menu/add"; //添加菜单
export const DELETE_MENU_URL = "/store/menu/delete"; //删除菜单
export const UPDATE_MENU_STATUS_URL = "/store/menu/update/statusAndRecommend"; //更新菜单
export const UPDATE_MENU_URL = "/store/menu/update"; //更新菜单
export const QUERY_MENU_URL = "/store/menu/query/list"; //查询菜单
export const QUERY_SINGLE_MENU_URL = "/store/menu/query"; //查询单个菜单

//订单
export const ADD_ORDER = "/store/order/add"; //添加订单
export const PAY_ORDER = "/store/order/pay"; //结账
export const QUERY_ORDER = "/store/order/query/list"; //查询订单列表
export const QUERY_ORDER_INFO = "/store/order/info/query"; //查询订单详情
export const DELETE_ORDER = "/store/order/delete"; //删除订单
export const DELETE_ORDER_INFO = "/store/order/info/delete"; //删除订单中的某一个商品
export const ADD_ORDER_INFO = "/store/order/info/add"; //向订单中增加一个商品

//上传资源
export const UPLOAD_IMG_URL = "/upload/img"; //上传图片


//用户设备
export const DEVICE_USER_URL = "/user/device/manage/queryUserList"; //查询管理员设备下的所有用户

//账户
export const ACCOUNT_INFO_URL = "/user/query/userInfo"; //查询账户详情
export const ACCOUNT_UPDATE_URL = "/user/updateUser"; //查询账户详情
export const MODIFY_PWD_URL = "/user/modifyPassword"; //修改账户的密码

//开门记录
export const DEVICE_OPEN_HISTORY_URL = "/open/door/history/user/query/list"; //查询管理员设备下的所有用户
