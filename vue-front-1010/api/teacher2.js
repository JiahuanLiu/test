import request from '@/utils/request'

export default {
  // 条件分页证书查询方法
  getTeacher2List (page, limit, searchObj2) {
    return request({
      url: `/eduservice/teacher2front/${page}/${limit}`,
      method: 'post',
      data: searchObj2
    })
  },
  getTeacherList (page, limit) {
    return request({
      url: `/eduservice/teacher2front/All/${page}/${limit}`,
      method: 'post'
    })
  },
  // 登录 证书详情
  getTeacher2Info (id) {
    return request({
      url: '/eduservice/teacher2front/' + id,
      method: 'get'
    })
  },
  // 不登录 证书详情
  getFTeacher2Info (id) {
    return request({
      url: '/eduservice/teacher2front/' + id,
      method: 'get'
    })
  },
  // 查询证书对应课程
  getCourseInfo(id) {
    return request({
      url: `/eduservice/teacher2front/getCourseTeacher2/${id}`
    })
  },
  // es搜索
  esTeacher2 (esObj) {
    return request({
      // url: `/eduservice/esteacher2/list/${esObj.key}/${esObj.page}/${esObj.size}`,
      url: `/eduservice/esteacher2/list`,
      method: 'post',
      data: esObj
    })
  }
}
