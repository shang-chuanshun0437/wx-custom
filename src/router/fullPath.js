import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/Login'
import Register from '@/components/common/Register'
import Home from '@/components/Home'
import Summary from '@/components/Summary'

import Stores from '../views/store/Stores'
import StoresList from '../views/store/StoresList'
import OpenDoorHistory from '../views/store/OpenDoorHistory'

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

import User from '../views/user/User'
import UserList from '../views/user/UserList'

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
            ]
        },
        {
            path: '/user/store/info',
            name: 'storeInfo1',
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
            ]
        },
      { path: '/user/store/list/storeInfo/addOrder', component: AddOrder, name: 'addOrder' },
      { path: '/user/store/list/storeInfo/addOrderInfo', component: AddOrderInfo, name: 'addOrderInfo' },
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
      {
        path: '/device/openHistory/list',
        name: 'openDoorHistory',
        component: OpenDoorHistory,
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
