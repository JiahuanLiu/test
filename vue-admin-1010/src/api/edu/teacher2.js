import request from '@/utils/request'

export default {
  // 1. 添加证书信息
  addTeacher2Info (teacher2Query) {
    return request({
      url: '/eduservice/teacher2',
      method: 'post',
      data: teacher2Query
    })
  },
  // 3. 根据证书id查询证书基本信息
  getTeacher2InfoById (teacher2Id) {
    return request({
      url: `/eduservice/teacher2/${teacher2Id}`,
      method: 'get'
    })
  },
  // 4. 修改证书信息
  updateTeacher2Info (teacher2Query) {
    return request({
      url: '/eduservice/teacher2',
      method: 'put',
      data: teacher2Query
    })
  },
  // 5. 根据id值查询最终发布证书的所有信息
  // getPublishTeacher2Info (id) {
  //   return request({
  //     url: '/eduservice/teacher2/getPublishTeacher2Info/' + id,
  //     method: 'get'
  //   })
  // },
  // 7. 证书列表 分页
  getTeacher2ListPage (page, limit, teacher2Query) {
    return request({
      url: `/eduservice/teacher2front/backend/${page}/${limit}`,
      method: 'post',
      data: teacher2Query
    })
  },
  getTeacher2ListPage1 (page, limit, teacher2Query) {
    return request({
      url: `/eduservice/teacher2front/All/${page}/${limit}`,
      method: 'post',
      data: teacher2Query
    })
  },
  getTeacher2List () {
    return request({
      url: `/eduservice/teacher2`,
      method: 'get'
    })
  },
  // 8. 删除证书
  deleteTeacher2ById (id) {
    return request({
      url: `/eduservice/teacher2/${id}`,
      method: 'delete'
    })
  }
}
