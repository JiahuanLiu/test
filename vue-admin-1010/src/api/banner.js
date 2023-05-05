/* eslint-disable indent */
import request from '@/utils/request'

export default {

    // 1 讲师列表 (条件查询分页)
    // current当前页 limit每页记录数 teacherQuery条件对象
    getBannerListPage (page, limit, bannerQuery) {
        return request({
            url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
            method: 'get',
            // data表示把对象转换成json进行传递到接口里面
            data: bannerQuery
        })
    },
    deleteBannerId (id) {
        return request({
            url: `/educms/banneradmin/remove/${id}`,
            method: 'delete'
        })
    },
    // 添加轮播图
    addBanner (banner) {
        return request({
            url: `/educms/banneradmin/addBanner`,
            method: 'post',
            data: banner
        })
    },
    // 根据id查询轮播图
    getBannerInfo (id) {
        return request({
            url: `/educms/banneradmin/get/${id}`,
            method: 'get'
        })
    },
    updateBannerInfo (banner) {
        return request({
            // url: `/educms/banneradmin/update/${banner.id}`,
            url: `/educms/banneradmin/update`,
            method: 'put',
            data: banner
        })
    },
    // 所有
    getBannerList () {
        return request({
            url: `/educms/banneradmin`,
            method: 'get'
        })
    }

}
