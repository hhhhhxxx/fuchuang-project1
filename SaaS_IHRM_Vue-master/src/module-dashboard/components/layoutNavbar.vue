<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!--语言选择-->
      <lang-select class="item"></lang-select>
      <!-- 用户信息 -->
      <el-dropdown class="item" placement="bottom-start">
        <span class="el-dropdown-link">
          <img class="avatar" src="../assets/header.png">
          <span>{{name}}</span>
        </span>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { search } from '@/api/base/menus'

export default {
  name: 'layoutNavBar',
  components: {
    Breadcrumb,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  data() {
    return {
      searchVal: '',
      timeout: null,
      showSearchInput: false,
      restaurants: []
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs 为了重新实例化vue-router对象以避免bug
        // reload() 方法类似于你浏览器上的刷新页面按钮。
      })
    }
  },
  mounted() {
    this.restaurants = search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  margin: 0;
  border-radius: 0px !important;
  background-color: #1bc6ac;

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 50px;
    display: flex;
    .item {
      cursor: pointer;
      .avatar {
        margin-right: 6px;
        width: 30px;
        vertical-align: -10px;
        border-radius: 50%;
        box-shadow: 0px 0px 1px #dddddd;
      }
      span {
        margin-right: 25px;
      }
    }
  }
}
.el-breadcrumb__inner a {
  color: #fff;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.item {
  .screenfull-svg,
  .svg-icon {
    fill: #fff !important;
  }
}
.el-dropdown {
  color: #fff;
}
</style>
