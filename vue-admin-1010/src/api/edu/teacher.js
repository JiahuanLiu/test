import request from '@/utils/request'

export default {

  // 1 讲师列表 (条件查询分页)
  // current当前页 limit每页记录数 teacherQuery条件对象
  getTeacherListPage (current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/${current}/${limit}`,
      method: 'post',
      // data表示把对象转换成json进行传递到接口里面
      data: teacherQuery
    })
  },
  deleteTeacherId (id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher (teacher) {
    return request({
      url: `/eduservice/teacher`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id查询讲师
  getTeacherInfo (id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'get'
    })
  },
  updateTeacherInfo (teacher) {
    return request({
      url: `/eduservice/teacher/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  },
  getUserList () {
    return request({
      url: `/eduservice/teacher`,
      method: 'get'
    })
  }

}
