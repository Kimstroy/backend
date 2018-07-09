import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Main/Container'
import Index from '@/components/Pages/Index'
import TableManager from '@/components/Pages/TableManager'
import Setting from '@/components/Pages/Setting'
import Types from '@/components/Pages/Type'
import Details from '@/components/childrenCom/details'

import Login from '@/components/SpecialPages/Login'
import Register from '@/components/SpecialPages/Register'
import Err404 from '@/components/SpecialPages/404'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
      children: [
      	{ path: '/index', component: Index, meta:{name: ['首页']} },
        { path: '/tableManager', component: TableManager, meta:{name: ['桌台管理']} },
        { path: '/types', component: Types, meta:{name: ['分类']} },
        { path: '/setting', component: Setting, meta:{name: ['设置']} },
        { path: '/details', component: Details, meta:{name: ['首页','详情页']} },
      	{ path: '/', redirect: 'index'}
      ]
    },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '*', component: Err404},
  ]
})
