import request from '@/utils/request'
// 封装获取频道
export function getMyChannels () {
  return request({
    url: '/user/channels'
  })
}
