import store from '@/store'

// 检查是否有权限
export function hasPermission(roles, route) {
  if (roles.menus && route.name) {
    return roles.menus.some(role => {
      //  some() 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      return route.name.toLowerCase() === role.toLowerCase()
    })
  } else {
    return false
  }
}

// 检查是否有权限点
export function hasPermissionPoint(point) {
  let points = store.getters.roles.points
  if (points) {
    return points.some(it => it.toLowerCase() === point.toLowerCase())
  } else {
    return false
  }
}
