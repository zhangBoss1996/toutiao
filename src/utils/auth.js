const usertoken = 'heima-toutiao'

export function setUser (user) {
// 将token值保存在本地中
  localStorage.setItem(usertoken, JSON.stringify(user))
}

// 读取token信息
export function getUser () {
  return JSON.parse(localStorage.getItem(usertoken) || '{}')
}

// 清除
export function delUser () {
  localStorage.removeItem(usertoken)
}
