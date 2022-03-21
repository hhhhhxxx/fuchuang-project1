
import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/settings',
    component: Layout,
    redirect: 'noredirect',
    name: 'settings',
    meta: {
      title: 'settings',
      icon: 'set'
    },
    children: [
      {
        path: 'index',
        component: _import('settings/pages/index'),
        name: 'settings-index',
        meta: {title: 'settings-index', icon: 'set', noCache: true}
      }
    ]
  }
]
