import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 引入中文的语言包
dayjs.extend(relativeTime) // 扩展相对时间的方法
export default {
  // Vue.use(obj) => 会调用obj 中的install方法
  install (Vue) {
    Vue.prototype.$sleep = sleep // 封装一个休眠函数
    Vue.filter('relTime', relTime) // 注册一个全局相对时间的过滤器
  }
}
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time) // 表示 等待time时间之后 才能resolve
  })
}

// 相对时间的过滤器 得到一个相对时间
/**
 * value值我们认为就是时间
 * ****/
function relTime (value) {
  return dayjs().locale('zh-cn').from(value)
}
