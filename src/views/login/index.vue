<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow></van-nav-bar>
    <van-cell-group>
      <van-field @blur="checkMobile"
       v-model="loginForm.mobile"
       :error-message="errMsg.mobile"
        label="手机号"
         placeholder="请输入手机号码"></van-field>

        <van-field @blur="checkCode" :error-message="errMsg.code" v-model="loginForm.code" label="验证码" placeholder="请输入验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
    </van-cell-group>
  <div class="bnt-box">
    <van-button type="info" size="samll" round block @click="login">登录</van-button>
  </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 校验
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '手机格式不正确'
        return false
      }
      this.errMsg.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码必须为6位数字'
        return false
      }
      this.errMsg.code = ''
      return true
    },
    //  登录向接口发送请求
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        // 都通过了 表示前端校验通过 还要调用接口
        // 提示消息 表示登录成功
        const data = await login(this.loginForm) // 获取结果
        // 拿到了token 更新token信息
        // this.$store.commit('updateUser', { user: data }) // 第一种写法
        this.updateUser({ user: data }) // 更新用户信息
        // 登录成功
        this.$notify({ type: 'success', message: '登录成功' })
        // 跳转
        // 两种情况 1 redirectUrl (登录未遂 => 登录  => 遂) 2 没有 redirectUrl 跳到首页
        let { redirectUrl } = this.$route.query // 解构当前的路由信息
        this.$router.push(redirectUrl || '/') // 短路表达式
      }
    },
    ...mapMutations(['updateUser']) // 将vuex中的mutations方法映射到方法中
  }
}
</script>

<style lang="less" scoped>
.bnt-box{
  margin-top: 15px
}
</style>
