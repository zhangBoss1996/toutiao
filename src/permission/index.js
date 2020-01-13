// 路由拦截器
import router from '@/router'
import store from '@/store'
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let topath = {
      path: '/login',
      query: {
        redirectUrl: to.path
      }
    }
    next(topath)
  } else {
    next()
  }
})

export default router
