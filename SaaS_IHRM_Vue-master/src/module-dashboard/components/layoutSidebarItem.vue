<template>
  <div class="menu-wrapper">
    <template v-for="item in routes"
              v-if="(!item.hidden&&item.children && item.children.length===1 && !item.children[0].children && !item.alwaysShow && item.children[0].meta && item.children[0].meta.icon) || (item.root)"
              :to="item.path+'/'+item.children[0].path">
      <el-menu-item :index="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                  :icon-class="item.children[0].meta.icon"></svg-icon>
        <span v-if="item.meta&&item.meta.title"
              slot="title">{{generateTitle(item.meta.title)}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import {generateTitle} from '@/utils/i18n'
import {mapGetters} from 'vuex'
import show from '../../utils/show'

export default {
  name: 'layoutSidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item {
  &:hover {
    background-color: #e3e3e3 !important;
  }

  .svg-icon {
    margin-left: 5px;
    margin-right: 16px;
  }

  span {
  }
}
</style>
