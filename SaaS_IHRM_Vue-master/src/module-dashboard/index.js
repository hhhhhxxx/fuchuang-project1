// vue-router
import {asyncRouterMap} from '@/router'
import routerMaps from './router'
// vuex
import app from './store/app'
import errorLog from './store/errorLog'
import permission from './store/permission'
import tagsView from './store/tagsView'
import user from './store/user'

// 只要在index.js里规定了install方法，就可以向其他ui组件库那样，使用Vue.use()来全局使用
export default {
  // 自定义插件install
  install(module, store) {
    if (store !== undefined) {
      store.registerModule('app', app)
      store.registerModule('errorLog', errorLog)
      store.registerModule('permission', permission)
      store.registerModule('tagsView', tagsView)
      store.registerModule('user', user)
    }
  }
}
