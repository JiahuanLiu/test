import request from '@/utils/request'

export default {
  // 更新用户基本信息
  updateUserInfo (userInfo) {
    return request({
      url: `/educenter/member/update`,
      method: 'post',
      data: userInfo
    })
  },
  updatePassword (passwordVo) {
    return request({
      url: `/educenter/member/updatepassword`,
      method: 'post',
      data: passwordVo
    })
  }
}
