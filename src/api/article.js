import request from '@/utils/request'
//  获取推荐文章的数据axios 中query请求的参数放在params中
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
