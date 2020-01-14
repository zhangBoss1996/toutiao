import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// create 创建一个instance 和axios 一样
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  //   处理数字最大值
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
//  请求拦截器
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    //  将本地的token保存在请求头中
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
  // 处理token失效  refresh_token有效期14天
}, async function (error) {
  if (error.response && error.response.status === 401
  ) {
    let topath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    if (store.state.user.refresh_token) {
      try {
        //   存在refresh_token 的-向后台发送请求换取新的rtesresh_token
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        return instance(error.config)
      } catch (error) {
        store.commit('clearUSer')
        router.push(topath)
      }
    } else {
      router.push(topath)
    }
  }
  return Promise.reject(error)
})
export default instance
