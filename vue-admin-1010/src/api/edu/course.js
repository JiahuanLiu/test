import request from '@/utils/request'

export default {
  // 1. 添加课程信息
  addCourseInfo (courseInfo) {
    return request({
      url: '/eduservice/course',
      method: 'post',
      data: courseInfo
    })
  },
  // 2. 查询所有讲师
  getListTeacher () {
    return request({
      url: '/eduservice/teacher',
      method: 'get'
    })
  },
  // 查询所有证书
  getListTeacher2 () {
    return request({
      url: '/eduservice/teacher2',
      method: 'get'
    })
  },
  // 3. 根据课程id查询课程基本信息
  getCourseInfoById (courseId) {
    return request({
      url: '/eduservice/course/' + courseId,
      method: 'get'
    })
  },
  // 4. 修改课程信息
  updateCourseInfo (courseInfo) {
    return request({
      url: '/eduservice/course/update',
      method: 'post',
      data: courseInfo
    })
  },
  // 5. 根据id值查询最终发布课程的所有信息
  getPublishCourseInfo (id) {
    return request({
      url: '/eduservice/course/getPublishCourseInfo/' + id,
      method: 'get'
    })
  },
  // 6. 课程最终发布 状态修改
  publishCourse (id) {
    return request({
      url: '/eduservice/course/publishCourse/' + id,
      method: 'get'
    })
  },
  // 7. 课程列表 分页
  getCourseListPage (current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  // 课程最终发布
  getListCourse () {
    return request({
      url: '/eduservice/course',
      method: 'get'
    })
  },
  // 8. 删除课程
  deleteCourseById (id) {
    return request({
      url: `/eduservice/course/${id}`,
      method: 'delete'
    })
  }
}
