import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/Login'
import Register from '@/components/common/Register'
import Home from '@/components/Home'
import Summary from '@/components/Summary'

import Stores from '../views/store/Stores'
import StoreSales from '../views/order/StoreSales'
import StoresList from '../views/store/StoresList'
import SystemSettings from '../views/store/SystemSettings'
import SaleStatistics from '../views/sale/SaleStatistics'

import TableOrGraph from '../views/table/TableOrGraph'
import AddStoreTable from '../views/table/AddStoreTable'
import EditStoreTable from '../views/table/EditStoreTable'

import MenuList from '../views/menu/MenuList'
import AddMenu from '../views/menu/AddMenu'
import EditMenu from '../views/menu/EditMenu'

import FrontDeskOrder from '../views/order/FrontDeskOrder'
import OrderInfo from '../views/order/OrderInfo'
import AddOrder from '../views/order/AddOrder'
import AddOrderInfo from '../views/order/AddOrderInfo'
import CompleteOrder from '../views/order/CompleteOrder'
import FrontDeskPay from '../views/order/FrontDeskPay'
import WxOrder from '../views/order/WxOrder'

import User from '../views/user/User'
import UserList from '../views/user/UserList'

import Vip from '../views/vip/Vip'
import VipList from '../views/vip/VipList'
import VipConsumRecord from '../views/vip/VipConsumRecord'
import ConsumRecordOrderInfo from '../views/vip/ConsumRecordOrderInfo'
import VipStatistics from '../views/vip/VipStatistics'

import Instructions from '@/components/Instructions'
import Help from '@/components/Help'
import Account from '../views/account/Account'
// 懒加载方式，当路由被访问的时候才加载对应组件
//const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: 'summary',
            redirect: '/summary'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/summary',
            children: [
                { path: '/summary', component: Summary, name: 'summary' },
                { path: '/instructions', component: Instructions, name: 'instructions' },
                { path: '/help', component: Help, name: 'help' }
            ]
        },
        {
            path: '/user/store',
            name: 'store',
            component: Stores,
            redirect: '/user/store/list',
            children: [
              { path: '/user/store/list', component: StoresList, name: 'storesList' },
              { path: '/user/store/systemSettings', component: SystemSettings, name: 'systemSettings' },
              { path: '/user/store/saleStatistics', component: SaleStatistics, name: 'saleStatistics' },
            ]
        },
        {
            path: '/user/store/info',
            name: 'storeInfo',
            component: Stores,
            redirect: '/user/store/info/menuList',
            children: [
              { path: '/user/store/info/menuList', component: MenuList, name: 'menuList' },
              { path: '/user/store/list/menu/add', component: AddMenu, name: 'addMenu' },
              { path: '/user/store/list/menu/add/editMenu', component: EditMenu, name: 'editMenu' },
              { path: '/user/store/list/storeInfo/tableOrGraph', component: TableOrGraph, name: 'tableOrGraph' },
              { path: '/user/store/list/storeInfo/addTable', component: AddStoreTable, name: 'addStoreTable' },
              { path: '/user/store/list/storeInfo/editTable', component: EditStoreTable, name: 'editStoreTable' },
              { path: '/user/store/list/storeInfo/frontDeskOrder', component: FrontDeskOrder, name: 'frontDeskOrder' },
              { path: '/user/store/list/storeInfo/frontDeskOrder/orderInfo', component: OrderInfo, name: 'orderInfo' },
              { path: '/user/store/list/storeInfo/CompleteOrder', component: CompleteOrder, name: 'completeOrder' },
              { path: '/user/store/list/storeInfo/frontDeskPay', component: FrontDeskPay, name: 'frontDeskPay' },
              { path: '/user/store/list/storeInfo/wxOrder', component: WxOrder, name: 'wxOrder' },
              { path: '/user/store/list/storeInfo/storeSales', component: StoreSales, name: 'storeSales' },
            ]
        },
        { path: '/user/store/list/storeInfo/addOrder', component: AddOrder, name: 'addOrder' },
        { path: '/user/store/list/storeInfo/addOrderInfo', component: AddOrderInfo, name: 'addOrderInfo' },
        {
          path: '/user/store/vip',
          name: 'vip',
          component: Vip,
          redirect: '/user/store/vip/list',
          children: [
            { path: '/user/store/vip/list', component: VipList, name: 'vipList' },
            { path: '/user/store/vip/vipConsumRecord', component: VipConsumRecord, name: 'vipConsumRecord' },
            { path: '/user/store/vip/consumRecordOrderInfo', component: ConsumRecordOrderInfo, name: 'consumRecordOrderInfo' },
            { path: '/user/store/vip/vipStatistics', component: VipStatistics, name: 'vipStatistics' },
            ]
          },
          {
              path: '/device/user',
              name: 'user',
              component: User,
              redirect: '/device/user/list',
              children: [
                  { path: '/device/user/list', component: UserList, name: 'userList' },
              ]
          },
          {
            path: '/account/private',
            name: 'account',
            component: Account,
          },
    ]

})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login') || to.path.startsWith('/register')) {
        window.localStorage.removeItem('access-user')
        next()
    } else {
        let user = JSON.parse(window.localStorage.getItem('access-user'))
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

export default router
