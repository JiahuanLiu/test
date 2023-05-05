import request from '@/utils/request'
export default {
  // 添加小节
  addVideo (video) {
    return request({
      url: '/eduservice/video',
      method: 'post',
      data: video
    })
  },
  // 根据id查询小节
  getVideo (id) {
    return request({
      url: '/eduservice/video/getVideo/' + id,
      method: 'get'
    })
  },
  // 修改小节
  updateVideo (video) {
    return request({
      url: '/eduservice/video/update',
      method: 'post',
      data: video
    })
  },
  // 删除小节
  deleteVideo (id) {
    return request({
      url: '/eduservice/video/' + id,
      method: 'delete'
    })
  },
  // 删除视频
  deleteAliyunvod (id) {
    return request({
      url: '/eduvod/video/AliyVideo' + id,
      method: 'delete'
    })
  }
  // 添加视频
  // getAliyunvod (video) {
  //   return request({
  //     url: '/eduvod/video/uploadAlyiVideo',
  //     method: 'post',
  //     data: video
  //   })
  // }
}
