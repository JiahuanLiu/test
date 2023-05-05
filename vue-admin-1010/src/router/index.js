import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/getters'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import { getToken } from '../utils/auth' // 验权

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
// 路由守卫
/* Layout */
import Layout from '../views/layout/Layout'
// router.beforeEach((to, from, next) => {
//   next(true)
// })
// router.beforeEach((to, from, next) => {
//   if (store.getters.token) {
//     // 路径如果是请求的login登录页面，但是又存在token，并且有账户信息
//     // 证明用户登陆过，不能重复登录，则跳转到首页
//     if (to.path === '/login') {
//       next({path: '/'})
//     } else // 跳的是登录界面，但是没有账户信息
//     {
//       // 判断是否有账号信息，如果没有，则获取
//       // if (store.state.account.length === 0) {
//       //   // 需要获取用户信息
//       //   store.dispatch('getUserInfo').then((res) => {
//       //     next()
//       //   }).catch((err) => {
//       //     Message({
//       //       type: 'warning',
//       //       showClose: true,
//       //       message: '登录已过期!'
//       //     })
//       //     next({path: '/login'})
//       //   })
//       // } else {
//       // 如果有用户信息，直接放行
//       next()
//       // }
//     }
//   } else {
//     if (to.matched.some(r => r.meta.requireLogin)) {
//       Message({
//         type: 'warning',
//         showClose: true,
//         message: '请先登录哦'
//       })
//     } else {
//       next()
//     }
//   }
// })
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '极客学院后台首页', icon: 'dashboard' }
    }]
  }]
/**
 * 动态路由
 */
export const asyncRoutes = [

  // 讲师管理
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'create',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'EduTeacherEdit',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '编辑讲师', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'import',
        name: '添加课程分类',
        component: () => import('@/views/edu/subject/import'),
        meta: { title: '添加课程分类', icon: 'tree' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/table',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加课程',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '添加课程', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/create',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'example' },
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: () => import('@/views/sta/create'),
        meta: { title: '生成数据', icon: 'table' }
      },
      {
        path: 'show',
        name: '图表显示',
        component: () => import('@/views/sta/show'),
        meta: { title: '图表显示', icon: 'tree' }
      }
    ]
  },

  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }
    ]
  },
  {
    path: '/teacher2',
    component: Layout,
    redirect: '/teacher2/list',
    name: '证书管理',
    meta: { title: '证书管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '证书列表',
        component: () => import('@/views/edu/teacher2/list'),
        meta: { title: '证书列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加证书',
        component: () => import('@/views/edu/teacher2/info'),
        meta: { title: '添加证书', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduTeacher2eInfoEdit',
        component: () => import('@/views/edu/teacher2/info'),
        meta: { title: '编辑证书基本信息', noCache: true },
        hidden: true// 隐藏路由,做到页面跳转
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/log',
    name: '日志管理',
    meta: { title: '日志管理', icon: 'example' },
    children: [
      {
        path: 'login',
        name: '登录日志',
        component: () => import('@/views/sys/log/login'),
        meta: { title: '登录日志', icon: 'table' }
      },
      {
        path: 'operation',
        name: '操作日志',
        component: () => import('@/views/sys/log/operation'),
        meta: { title: '操作日志', icon: 'table' }
      },
      {
        path: 'error',
        name: '异常日志',
        component: () => import('@/views/sys/log/error'),
        meta: { title: '异常日志', icon: 'table' }
      }
    ]
  },

  {
    path: '/cms/banner/list',
    component: Layout,
    redirect: '/cms/banner/list',
    name: '轮播图管理',
    meta: { title: '轮播图管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '轮播图列表',
        component: () => import('@/views/cms/banner/list'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加轮播图',
        component: () => import('@/views/cms/banner/save'),
        meta: { title: '添加轮播图', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'bannerEdit',
        component: () => import('@/views/cms/banner/save'),
        meta: { title: '编辑轮播图', noCache: true },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // NProgress.start()
  const hasToken = getToken()
  if (hasToken) { next() } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 不是-1就证明存在白名单里，不管你有没有令牌，都直接去到白名单路由对应的页面
      next()
    } else {
      // 如果这个页面不在白名单里，直接跳转到登录页面
      next(`/login?redirect=${to.path}`)
      // 关闭进度条
    }
  }
})
export default router
