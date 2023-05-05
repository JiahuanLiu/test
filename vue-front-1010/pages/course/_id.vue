<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{courseWebVo.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{courseWebVo.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img height="357px" :src="courseWebVo.cover" :alt="courseWebVo.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{courseWebVo.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{courseWebVo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{courseWebVo.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <!-- <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                 <a class="c-fff vam" title="收藏" href="#">收藏</a> -->
            <!-- </span> -->
            <!-- </section> --> -->
            <section v-if="((isBuy || Number(courseWebVo.price) === 0 ) && this.token)" class="c-attr-mt">
              <!-- <section v-if="isbuy" class="c-attr-mt"> -->
              <a href="#" title="立即观看" class="comm-btn c-btn-3">已购买</a>
              <!-- <a :href="''" title="立即观看" class="comm-btn c-btn-3">立即观看</a> -->
            </section>
            <section v-else-if="((!isBuy || Number(courseWebVo.price) !== 0 ) && this.token)" class="c-attr-mt">
              <a id="button" @click="createOrders()" href="#" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section>
            <section v-else class="c-attr-mt">
              <a id="button" @click="trans()" href="/login" title="立即购买" class="comm-btn c-btn-3">请先登录</a>
            </section>
          </section>
        </aside>
        <!-- <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.viewCount}}</h6>
              </aside>
            </li>
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
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- <p v-html="courseWebVo.description"></p> -->
                      <p v-html=" courseWebVo.description==null || courseWebVo.description=='' ? '该课程暂无介绍' : courseWebVo.description " style="text-indent:2em;"></p>
                    </section>
                  </div>
                  <!-- <p v-html=" courseWebVo.description">{{courseWebVo.description}}</p> -->
                </div>
                <!-- 课程介绍 -->
                <div v-if="((isBuy || Number(courseWebVo.price) === 0 ) && this.token)" class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="chapter in chapterVideoList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>

                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <a :href="'/player/'+video.videoSourceId" target="_blank">
                                  <span class="fr">
                                    <i class="free-icon vam mr10" v-if="video.isFreee === true">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
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
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+courseWebVo.teacherId">
                        <img :src="courseWebVo.avatar" width="50" height="50" :alt="courseWebVo.teacherName">
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'/teacher/'+courseWebVo.teacherId">{{courseWebVo.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseWebVo.intro}}</span>
                    </section>
                  </li>
                </ul>
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
import courseApi from '@/api/course'
import ordersApi from '@/api/orders'
import throttle from '@/utils/throttle'
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
      flag: 0
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
    this.flag = 0
    this.token = cookie.get('token')
    if (this.token) { // 判断路径是否有token值
      // this.wxLogin()
      this.initCourseInfo()
    } else {
      this.initFCourseInfo()
    }
  },
  methods: {
    // 未登录 点击进入登陆页面
    trans () {
      // this.$router.push({ path: '/login' })
      this.$message({
        message: '请先登录',
        type: 'warning'
      })
    },
    // 登录 查询课程详情信息
    initCourseInfo () {
      courseApi.getCourseInfo(this.courseId).then(response => {
        this.courseWebVo = response.data.data.courseWebVo
        this.chapterVideoList = response.data.data.chapterVideoList
        this.isBuy = response.data.data.isBuy
      })
    },
    // 不登录 查询课程详情信息
    initFCourseInfo () {
      courseApi.getFCourseInfo(this.courseId).then(response => {
        this.courseWebVo = response.data.data.courseWebVo
        this.chapterVideoList = response.data.data.chapterVideoList
        this.isbuy = response.data.data.isbuy
      })
    },
    // 生成订单
    createOrders () {
      ordersApi.createOrders(this.courseId)
        .then(response => {
          // 获取返回订单号
          // 生成订单之后，跳转订单显示页面
          this.$router.push({ path: '/orders/' + response.data.data.orderId })
        })
    }
  }
  // }
}
</script>
