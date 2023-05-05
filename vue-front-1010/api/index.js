import request from '@/utils/request'

export default {
  // 查询热门证书、课程和名师
  getIndexData() {
    return request({
      url: '/eduservice/indexfront/index',
      method: 'get'
    })
  }
}
