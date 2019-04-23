import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OutStock from '@/components/OutStock'
import Login from '@/components/Login'
import Home from '@/components/Home'
import PageNotFound from '@/components/PageNotFound'
import Main from '@/components/Main'
import MedicationListManagement from '@/components/MedicationListManagement'
import CollectTag from '@/components/CollectTag'
import ConfirmReturnDrug from '@/components/ConfirmReturnDrug'
import ReturnDrug from '@/components/ReturnDrug'
import InStock from '@/components/InStock'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: true}, // 必须要登录才能跳转
      children: [
        {
          path: '/main',
          name: 'Main',
          component: Main,
          meta: {requireAuth: true}
        },
        {
          path: '/helloWorld',
          name: 'HelloWorld',
          component: HelloWorld,
          meta: {requireAuth: true}
        },
        {
          path: '/outStock',
          name: 'OutStock',
          component: OutStock,
          meta: {requireAuth: true}
        },
        {
          path: '/inStock',
          name: 'InStock',
          component: InStock,
          meta: {requireAuth: true}
        },
        {
          path: '/medicationListManagement',
          name: 'MedicationListManagement',
          component: MedicationListManagement,
          meta: {requireAuth: true},
          children: []
        },
        /** **** 路由在这里加******/
        {
          path: '/collectTag',
          name: 'CollectTag',
          component: CollectTag,
          meta: {requireAuth: true}
        },
        {
          path: '/confirmReturnDrug',
          name: 'ConfirmReturnDrug',
          component: ConfirmReturnDrug,
          meta: {requireAuth: true}
        },
        {
          path: '/returnDrug',
          name: 'ReturnDrug',
          component: ReturnDrug,
          meta: {requireAuth: true}
        }
        /** **********************/
      ]
    },
    { path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
      meta: {
        title: '404 页面未找到'
      }
    }
  ]
})
