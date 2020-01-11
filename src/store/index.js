import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //  从本地拿到token
    user: auth.getUSer()
  },
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user // 同步数据
      auth.setUser(payload.user) // 将数据同步到本地存储中
    },
    //  清空token
    clearUser (state) {
      state.user = {}
      // 将本地的token清空
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
