import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入Vant 插件以及样式
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
//  引入布局自动适配插件
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
