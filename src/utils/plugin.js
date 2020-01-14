export default {
  // Vue.use(obj) => 会调用obj 中的install方法
  install (Vue) {
    Vue.prototype.$sleep = sleep // 封装一个休眠函数
  }
}
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time) // 表示 等待time时间之后 才能resolve
  })
}
