/* eslint-disable indent */
import request from '@/utils/request'

export default {
    // 登录日志
    getRecentLogin () {
        return request({
            // url: '/sys/log/login/page',
            url: '/admin/log/login/page',
            method: 'get'
        })
    },
    // 登录日志列表（分页）
    getRecentLoginListPage (current, limit, logQuery) {
        return request({
            url: `/admin/log/login/page/${current}/${limit}`,
            method: 'get',
            data: logQuery
        })
    },
    // 操作日志
    getRecnetOperation () {
        return request({
            // url: `/eduservice/log/operationlog`,
            url: `/admin/log/operation/page`,
            method: 'get'
        })
    },
    // 操作日志列表（分页）
    getOperationListPage (current, limit, operationQuery) {
        return request({
            // url: `/eduservice/log/recentoperationpageUserCondition/${current}/${limit}`,
            url: `/admin/log/recentoperationpageUserCondition/${current}/${limit}`,
            method: 'post',
            data: operationQuery
        })
    },
    // 异常日志
    getRecentexception () {
        return request({
            // url: `/eduservice/log/exceptionlog`,
            url: `/admin/log/error/page`,
            method: 'get'
        })
    }
}
