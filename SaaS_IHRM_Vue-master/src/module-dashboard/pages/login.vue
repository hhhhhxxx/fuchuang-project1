<template>
  <div class="login-container">
    <div class="left-container">
      <span>今日事，</span><span>今日毕</span>
    </div>

    <div class="right-container">
      <!--登录表单-->
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">

        <div class="title">
          <span>跨组织人才管理系统</span>
        </div>

        <!--账号密码-->
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                    prefix-icon="fa fa-user" placeholder="username"/>
        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" type="password " @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    :show-password="true"
                    prefix-icon="fa fa-lock" autoComplete="on" placeholder="password"/>
        </el-form-item>

        <!--登录按钮-->
        <el-button class="loginBtn" type="primary" :loading="loading"
                   @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>
        <el-button class="resetBtn" type="info" @click="resetLoginForm">重置</el-button>
        <!--注册-->
        <div class="regInfo">
          <router-link :to="{'path':'/reg'}">还没有账号？立即注册</router-link>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import loginSocialSignin from './../components/loginSocialSignin'

export default {
  components: {LangSelect, loginSocialSignin},
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('用户名不能小于6位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      centerDialogVisible: false,
      param: {
        qrcode: ''
      },
      loginForm: {
        username: '13800000002',
        password: '123456'
      },
      loginFormRules: {
        username: [
          {required: true, trigger: 'blur', validator: validateUsername}
        ],
        password: [
          {required: true, trigger: 'blur', validator: validatePassword}
        ]
      },
      loading: false, // 登录按钮的加载圈圈
      showDialog: false,
      states: '-1'
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginForm.resetFields()
      this.loginForm.username = this.loginForm.password = ''
    },
    handleLogin() {
      if (this.loginForm.username.length < 6 || this.loginForm.password.length < 6) {
        this.$message.error('用户名或密码不能低于6位')
        return
      }
      this.loading = true
      this.$store.dispatch('LoginByUsername', {
        mobile: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        this.loading = false
        //  permission.js里的next({ ...to, replace: true })
        //  会被认为是一个失败的navigation（虽然能导航成功，但不再是原来的to），所以login里的push()返回一个rejected Promise。
        // 解决方案：在push()后面接一个.catch(()=>{})
        this.$router.push({path: '/'}).catch(() => {
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;

  .left-container {
    width: 40%;
    height: 100%;
    background-color: $theme;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    span {
      color: #ffffff;
      font-size: 60px;
      margin-bottom: 300px;
    }
  }

  .right-container {
    width: 60%;
    height: 100%;
    background-color: #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form {
      background-color: #ffffff;
      width: 520px;
      min-height: 300px;
      padding: 35px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

      .title{
        margin-bottom: 30px;
        span{
          color: $theme;
          font-size: 30px;
        }
      }

      .el-form-item {



        /deep/ .el-input__inner{
          &:focus{
            border:1px solid $theme;
          }
        }

      }

      .loginBtn {
        background-color: $theme;
        border-color: $theme;
        width: 100px;
        &:hover {
          background-color: #25cbb2;
          border-color: #25cbb2;
        }
      }

      .resetBtn {
        width: 100px;
      }

      .regInfo{
        float: right;
      }

    }
  }
}
</style>
