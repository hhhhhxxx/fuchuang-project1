<template>
  <div class="app-wrapper">
    <el-container>
      <!--顶部状态栏-->
      <el-header height="50px">
        <layout-navbar></layout-navbar>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <layout-sidebar></layout-sidebar>
        <!--内容区-->
        <el-main class="main-container">
          <layout-tags></layout-tags>
          <layout-app-main></layout-app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutNavbar from './../components/layoutNavbar'
import layoutSidebar from './../components/layoutSidebar'
import layoutTags from './../components/layoutTags'
import layoutAppMain from './../components/layoutAppMain'

export default {
  name: 'layout',
  components: {
    layoutNavbar,
    layoutSidebar,
    layoutTags,
    layoutAppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  height: 100vh;
  width: 100%;

  .el-container, {
    height: 100%;
    overflow: hidden;
  }
}

</style>
