<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /证书详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{eduTeacher2.level2}}级证书</a>
        \
        <span class="c-333 fsize14">{{eduTeacher2.name2}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img height="357px" :src="eduTeacher2.avatar2" :alt="courseWebVo.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{eduTeacher2.name2}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff"> 学习花费：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{this.pri}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">精品证书</span>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">值得购买</span>
            </section>
            <!-- <section class="c-attr-mt c-attr-undis">
              <ul v-for="course in eduCourse" :key="course.id">
                <li class="c-fff fsize14">{{couse.title}}</li>
              </ul>
            </section> -->
            <!-- <section v-if="((isBuy || Number(courseWebVo.price) === 0 ) && this.token)" class="c-attr-mt"> -->
            <!-- <section v-if="isbuy" class="c-attr-mt"> -->
            <!-- <a href="#" title="立即观看" class="comm-btn c-btn-3">已购买</a> -->
            <!-- <a :href="''" title="立即观看" class="comm-btn c-btn-3">立即观看</a> -->
            <!-- </section> -->
            <section class="c-attr-mt">
              <a id="button" href="#course" title="立即学习" class="comm-btn c-btn-3">立即学习</a>
            </section>
          </section>
        </aside>
        <!-- <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM"></span>
                <br>
                <h6 class="c-fff f-fM mt10"></h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM"></span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.lessonNum}}</h6>
                <h6 class="c-fff f-fM mt10"></h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{eduTeacher2.viewCount}}</h6>
              </aside> -->
        <!-- </li>
        </ol>
        </aside> -->
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">证书详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>证书介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="eduTeacher2.intro2" style="text-indent:2em;"></p>
                    </section>
                  </div>
                  <!-- <p v-html="courseWebVo.description">{{courseWebVo.description}}</p> -->
                </div>
                <!-- 课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>学习课程</span>
                  </h6>
                  <section class="mt20" id="course">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <article class="comm-course-list">
                          <ul id="bna" class="of">
                            <li v-for="course in eduCourse" :key="course.id">
                              <div class="cc-l-wrap">
                                <section class="course-img">
                                  <img :src="course.cover" class="img-responsive" alt="course.title">
                                  <div class="cc-mask">
                                    <a id="button" :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                                  </div>
                                </section>
                                <h3 class="hLh30 txtOf mt10">
                                  <a id="button" :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                                </h3>
                                <section class="mt10 hLh20 of">
                                  <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                                    <i class="c-fff fsize12 f-fA">免费</i>
                                  </span>
                                  <span class="fr jgTag bg-green" v-else>
                                    <i class="c-fff fsize12 f-fA">{{course.price}}元</i>
                                  </span>
                                  <span class="fl jgAttr c-ccc f-fA">
                                    <i class="c-999 f-fA">{{course.viewCount}}人学习</i>

                                    <!-- <i class="c-999 f-fA">9634评论</i> -->
                                  </span>
                                </section>
                              </div>
                            </li>
                          </ul>
                          <div class="clear" />
                        </article>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">备考信息</a>
              </section>
              <section class="stud-act-list">

                <!-- <div class="u-face">
                      <a :href="'/teacher/'+courseWebVo.teacherId">
                        <img :src="courseWebVo.avatar" width="50" height="50" :alt="courseWebVo.teacherName">
                      </a>
                    </div> -->
                <!-- <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'/teacher/'+courseWebVo.teacherId">{{courseWebVo.teacherName}}</a>
                    </section> -->
                <!-- <section class="hLh20 txtOf"> -->

                <section>
                  <p v-html="eduTeacher2.preparation" style="text-indent:2em;"></p>
                </section>

              </section>

            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>
<script>
// import courseApi from '@/api/course'
import teacher2Api from '@/api/teacher2'
import throttle from '@/utils/throttle'
import ordersApi from '@/api/orders'
import cookie from 'js-cookie'
export default {
  // asyncData异步调用方式
  asyncData ({ params }) {
    return { courseId: params.id }
    // return courseApi.getCourseInfo(params.id)
    //   .then(response => {
    //     return {
    //       courseWebVo: response.data.data.courseWebVo,
    //       chapterVideoList: response.data.data.chapterVideoList,
    //       courseId: params.id
    //     }
    //   })
  },
  data () {
    return {
      courseWebVo: {},
      chapterVideoList: [],
      isBuy: false,
      token: '',
      flag: 0,
      eduTeacher2: {},
      eduCourse: [],
      pri: 0
      // title3: ''
    }
  },
  mounted () {
    // 节流
    const onClick = args => {
      console.log(args)
    }
    const t2 = 2000
    // 三秒钟内只能触发一次
    const _throttle = throttle(onClick, t2)
    var ells = document.querySelectorAll('#button')
    for (const ell of ells) {
      ell.onclick = function () {
        // 多次打印，对比
        console.log('11111')
        _throttle('节流节流')
      }
    }
  },
  // created 表示在页面渲染之前执行
  created () {
    // this.flag = 0
    // this.token = cookie.get('token')
    // if (this.token) { // 判断路径是否有token值
    //   // this.wxLogin()
    //   this.initCourseInfo()
    // } else {
    //   this.initFCourseInfo()
    // }
    this.initFCourseInfo()
    // this.begin()
  },
  methods: {
    begin () {
      teacher2Api.getCourseInfo(this.courseId).then(res => {
        // this.eduCourse = res.data.data.rows
        this.eduCourse2 = res.data.data.rows
        // this.eduCourse.forEach(obj => {
        //   this.pri += obj.price
        // })
      })
    },
    // 未登录 点击进入登陆页面
    // trans () {
    //   this.$router.push({ path: '/login' })
    //   this.$message({
    //     message: '请先登录',
    //     type: 'warning'
    //   })
    // },
    // 登录 查询课程详情信息
    // initCourseInfo () {
    //   courseApi.getCourseInfo(this.courseId).then(response => {
    //     this.courseWebVo = response.data.data.courseWebVo
    //     this.chapterVideoList = response.data.data.chapterVideoList
    //     this.isBuy = response.data.data.isBuy
    //   })
    // },
    // 不登录 查询课程详情信息
    initFCourseInfo () {
      teacher2Api.getFTeacher2Info(this.courseId).then(res => {
        // this.courseWebVo = response.data.data.courseWebVo
        // this.chapterVideoList = response.data.data.chapterVideoList
        // this.isbuy = response.data.data.isbuy
        this.eduTeacher2 = res.data.data.eduTeacher2
      })
      teacher2Api.getCourseInfo(this.courseId).then(res => {
        this.eduCourse = res.data.data.rows
        this.eduCourse2 = this.eduCourse
        this.eduCourse.forEach(obj => {
          this.pri += obj.price
        })
      })
    }
    // 生成订单
    // createOrders () {
    //   ordersApi.createOrders(this.courseId)
    //     .then(response => {
    //       // 获取返回订单号
    //       // 生成订单之后，跳转订单显示页面
    //       this.$router.push({ path: '/orders/' + response.data.data.orderId })
    //     })
    // }
  }
  // }
}
</script>

