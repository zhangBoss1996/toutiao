import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import store from './store'
// 引入Vant 插件以及样式 引入lazyload对象 (懒加载)
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
import plugin from '@/utils/plugin'
//  引入布局自动适配插件
import 'amfe-flexible'
Vue.use(plugin)
Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
