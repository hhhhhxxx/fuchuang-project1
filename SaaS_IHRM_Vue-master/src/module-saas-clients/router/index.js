import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/saas-clients', //  父路径
    component: Layout,
    redirect: 'noredirect',
    name: 'saas-clients',
    meta: {
      title: 'saas_clients',
      icon: 'component'
    },
    children: [
      {
        path: 'index', //  请求地址--/saas-clients/index
        component: _import('saas-clients/pages/index'), //  跳转的vue视图
        name: 'saas-clients-index',
        meta: {title: 'saas-clients-index', icon: 'component', noCache: true}
      },
      {
        path: 'details/:id',
        component: _import('saas-clients/pages/detail'), // 跳转的vue视图
        name: 'saas-clients-detail',
        meta: {title: 'saas-clients-detail', icon: 'component', noCache: true}
      }
    ]
  }
]
