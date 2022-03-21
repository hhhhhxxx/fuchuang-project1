// translate router.meta.title, be used in breadcrumb sidebar tagsview
import show from './show'

export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)
  // const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
  // show('标题', title)
  if (hasKey) {
    const translatedTitle = this.$t('route.' + title)
    return translatedTitle
  }
  return title
}

// $t(path, locale, option) // text 文本替换，locale可单独设置语言，option可传参数替换模板
// $tc(path, choice, locale, option) // text+choice 比$t多一个choice，可以选择模板内容（模板内容间用 | 分隔，如 香蕉|苹果|梨，最多只能使用三个选项，下标从0开始，当选项为2个时下标从1开始~~）
// $te(path) // text+exist 判断当前语言包中path是否存在
// $d(number|Date, path, locale) // date 时间格式化
// $n(number, path, locale) // number  数字格式化（货币等)
