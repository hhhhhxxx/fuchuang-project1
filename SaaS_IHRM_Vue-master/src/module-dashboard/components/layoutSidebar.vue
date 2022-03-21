<template>
  <scroll-bar>
  <div class='Sidebar-container'>
    <div class="toggle-wrapper" @click="toggleSideBar">
      <!--如果是刷新或第一次进入，不执行动画，点击后更改init值，便能执行动画-->
      <i :class="['fa','fa-angle-left',init? sidebar_opened?'open':'close' : sidebar_opened?'openTransition':'closeTransition']"></i>
    </div>
    <el-menu :class="['el-menu-vertical-demo']" mode="vertical" :default-active="$route.path"
             :collapse-transition="true" :collapse="!sidebar_opened"
             :router="true"
             background-color="#fff"
             text-color="#2c3e50"
             active-text-color="#18a792">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </div>
  </scroll-bar>
</template>

<script>
import {mapGetters} from 'vuex'
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'
import Cookies from 'js-cookie'
import show from '../../utils/show'

export default {
  name: 'layoutSidebar',
  components: {SidebarItem, ScrollBar},
  computed: {
    ...mapGetters(['permission_routers', 'sidebar_opened'])
  },
  data() {
    return {
      init: true
    }
  },
  methods: {
    toggleSideBar() {
      this.init = false
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
<style lang="scss" scoped>
.Sidebar-container {
  width: auto;
  height: 100%;
  //box-shadow: 0px 0px 5px rgba(0,0,0,0.5) !important;
  .toggle-wrapper {
    height: 56px;
    display: flex;
    align-items: center;
    //justify-content: center;
  }
}

// 动画
@keyframes open {
  0% {
    transform:rotate(180deg);
    margin-left: 28.5px;
  }
  100% {
    transform:rotate(360deg);
    margin-left: 96.5px;
  }
}
@keyframes close {
  0% {
    transform:rotate(0deg);
    margin-left: 96.5px;
  }
  100% {
    transform:rotate(180deg);
    margin-left: 28.5px;
  }
}

.openTransition{
  animation-name: open;
  animation-fill-mode:forwards;
  animation-duration: 0.5s
}
.closeTransition{
  animation-name: close;
  animation-fill-mode:forwards;
  animation-duration: 0.5s
}

.open{
  transform:rotate(360deg);
  margin-left: 96.5px;
}

.close{
  transform:rotate(180deg);
  margin-left: 28.5px;
}

</style>
