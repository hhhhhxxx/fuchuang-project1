import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import Layout from '@/module-dashboard/pages/layout'
import {getToken} from '@/utils/auth'
import login from '@/module-dashboard/pages/login'
import show from '../utils/show'
// 定义
const _import = require('./import_' + 'development') // 懒加载 导包process.env.NODE_ENV
const whiteList = ['/login', '/reg', '/authredirect', '/facelogin'] // 白名单 无需跳转

// 配置
Vue.use(Router)
// 进度条插件
NProgress.configure({showSpinner: false}) // NProgress Configuration

/**
 * 基础路由
 *
 * root: true                     在一级栏目显示
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)*
 * 如果' hidden:true '不会在侧边栏中显示(默认为false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 *                                * 如果设置为true，将始终显示根菜单，无论它的子路由长度是多少
 *                                * 如果没有设置alwaysShow，则只能在子节点下面设置多个路径
 *                                * 它将变成嵌套模式，否则不会显示根菜单
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 *                                 * 如果' redirect:noredirect '不会重定向到面包屑中
 * name:'router-name'             the name is used by <keep-alive> (must set!!!) (必须设置!!)使用该名称。
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles) 将控制页面角色(您可以设置多个角色)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)  名称显示在子菜单和面包屑(推荐集)
    icon: 'svg-name'             the icon show in the sidebar,  图标显示在侧边栏，
    noCache: true                if true ,the page will no be cached(default is false) 如果为true，页面将不会被缓存(默认为false)
  }
 **/
export const constantRouterMap = [
  { // 登录
    path: '/login',
    component: _import('dashboard/pages/login'),
    hidden: true
  },
  { // 注册
    path: '/reg',
    component: _import('dashboard/pages/reg'),
    hidden: true
  },
  { // 身份重定向
    path: '/authredirect',
    component: _import('dashboard/pages/authredirect'),
    hidden: true
  },
  { // 面部登录
    path: '/facelogin',
    component: _import('dashboard/pages/facelogin'),
    hidden: true
  },
  {path: '/404', component: _import('dashboard/pages/404'), hidden: true},
  {path: '/401', component: _import('dashboard/pages/401'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {title: 'dashboard', icon: 'dashboard'},
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/pages/dashboard'),
        name: 'dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
      }
    ]
  }
]

/**
 * 配置路由
 **/
let router = new Router({
  // 切换页面，滚动条回到顶部
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token 确定是否有token
    //  has token  有token(之前登录过)
    if (to.path === '/login') {
      next({path: '/'})
      //  如果当前页面是仪表板后不会触发每个钩子，那么手动处理它
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => {
          // 拉取user_info
          const roles = res.data.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', {roles}).then(() => {
            // 根据roles权限生成可访问的路由表
            store.getters.addRouters.forEach(oneRouter => {
              router.addRoute(oneRouter)
            })
            // router.addRoutes已废弃 addRoute参数是对象，不能说对象数组
            // 动态添加可访问路由表
            next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            //  设置replace: true，这样导航就不会留下历史记录
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败, 请重新登录')
            next({path: '/login'})
          })
        })
      } else {
        next()
      }
    }
  } else {
    //  has no token 没有token
    //  indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入 （允许不需要登录就可以访问的页面） 如注册
      next()
    } else {
      // 没有登录 如在网站输入url访问
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export let asyncRouterMap = [
  {path: '*', redirect: '/404', hidden: true}
]
