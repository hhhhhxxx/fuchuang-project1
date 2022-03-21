import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets 初始化css
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store' // vuex
import i18n from './lang' // Internationalization 国际化
import './icons' // icon
import './errorLog'// error log
import * as filters from './filters' // global filters
//  FontAwesome图标字体库
import './assets/FontAwesome/css/all.css'
// simulation data 模拟数据
import './mock'
// * 注册 - 业务模块
import dashboard from '@/module-dashboard/' // 面板
import menusManage from '@/module-menusManage/' // 面板
import saasClients from '@/module-saas-clients/' // 企业管理
import departments from '@/module-departments/' // 部门管理
import employees from '@/module-employees/' // 员工管理
import settings from '@/module-settings/' // 角色管理
import permissions from '@/module-permissions/' // 权限管理
import socialSecuritys from '@/module-social-securitys/' // 社保
import attr from '@/module-attendances/' // 考勤
import salarys from '@/module-salarys/' // 薪资
import audit from '@/module-users/' // 审批

import tools from './utils/common.js'
Vue.prototype.$tools = tools

Vue.use(tools)
Vue.use(dashboard, store)
Vue.use(saasClients, store)
Vue.use(departments, store)
Vue.use(employees, store)
Vue.use(settings, store)
Vue.use(permissions, store)
Vue.use(socialSecuritys, store)
Vue.use(attr, store)
Vue.use(salarys, store)
Vue.use(audit, store)
Vue.use(menusManage, store)
/*
* 注册 - 组件
*/

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  // 多语言配置
  i18n: (key, value) => i18n.t(key, value)
})
// 过滤器   Object.keys 返回值：一个表示给定对象的所有可枚举属性的字符串数组
// 对于输入值得格式化
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
