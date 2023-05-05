import request from '@/utils/request'

export default {
  // 条件分页课程查询方法
  getCourseList (page, limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //  查询所有分类
  getAllSubject () {
    return request({
      url: `/eduservice/subject`,
      method: 'get'
    })
  },
  // 登录 课程详情
  getCourseInfo (id) {
    return request({
      url: '/eduservice/coursefront/' + id,
      method: 'get'
    })
  },
  // 不登录 课程详情
  getFCourseInfo (id) {
    return request({
      url: '/eduservice/coursefront/getFCourseInfo/' + id,
      method: 'get'
    })
  }
}
