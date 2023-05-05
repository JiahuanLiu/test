<template>

  <div>

    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption" style="width:75.5%">
      <div class="swiper-wrapper">

        <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040b1b;">
          <a target="_blank" :href="banner.linkUrl" position="relative">
            <img :src="banner.imageUrl" :alt="banner.title" />
          </a>
        </div>

      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门证书</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="course in eduList2" :key="course.id2">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img :src="course.avatar2" class="img-responsive" alt="course.name2">
                      <div class="cc-mask">
                        <!-- <a href="#" title="开始学习" class="comm-btn c-btn-1">开始学习</a> -->
                        <!-- 点击首页课程跳转到相应的课程页面 -->
                        <a id="button" :href="'/teacher2/' + course.id2" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a id="button" :href="'/teacher2/' + course.id2" :title="course.name2" class="course-title fsize18 c-333">{{course.name2}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <!-- <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span> -->
                      <!-- <span class="fr jgTag bg-green" v-else>
                        <i class="c-fff fsize12 f-fA">{{course.price}}元</i>
                      </span> -->
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">热度&nbsp;{{course.viewCount}}</i>

                        <!-- <i class="c-999 f-fA">9634评论</i> -->
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear" />
            </article>
            <section class="tac pt20">
              <!-- <a href="#" title="全部课程" class="comm-btn c-btn-2">全部证书</a> -->
              <router-link to="/teacher2" tag="li" active-class="current">
                <a id="button" title="全部证书" class="comm-btn c-btn-2">全部证书</a>
              </router-link>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="course in eduList" :key="course.id">
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
            <section class="tac pt20">
              <!-- <a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a> -->
              <router-link to="/course" tag="li" active-class="current">
                <a id="button" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
              </router-link>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <!-- <a href="/teacher/1" :title="teacher.name"> -->
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a id="button" :href="'/teacher/'+teacher.id" title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{teacher.career}}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{teacher.intro}}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear" />
            </article>
            <section class="tac pt20">
              <!-- <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a> -->
              <router-link to="/teacher" tag="li" active-class="current">
                <a id="button" title="全部证书" class="comm-btn c-btn-2">全部名师</a>
              </router-link>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import banner from '@/api/banner'
import index from '@/api/index'
import throttle from '@/utils/throttle'
export default {
  data () {
    return {

      swiperOption: {
        // 配置分页
        pagination: {
          el: '.swiper-pagination'// 分页的dom节点
        },
        // 配置导航
        navigation: {
          nextEl: '.swiper-button-next', // 下一页dom节点
          prevEl: '.swiper-button-prev'// 前一页dom节点
        }
      },
      // banner数组
      bannerList: [],
      eduList2: [],
      eduList: [],
      teacherList: []
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
  created () {
    // 调用查询banner的方法
    this.getBannerList()
    // 调用查询热门课程讲师的方法
    this.getHotCourseTeacher()
  },
  methods: {
    // 查询热门课程和名师
    getHotCourseTeacher () {
      index.getIndexData()
        .then(response => {
          this.eduList2 = response.data.data.eduList2
          this.eduList = response.data.data.eduList
          this.teacherList = response.data.data.teacherList
        })
    },
    // 查询banner数据
    getBannerList () {
      banner.getListBanner()
        .then(response => {
          this.bannerList = response.data.data.list
        })
    }
  }
}
</script>
