<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <!-- <a title="全部" href="#" @click="searchAll(-1)" :class="{active:oneIndex==-1}">全部</a> -->
                  <a id="button" title="全部" href="#" @click="searchAll(-1)" :class="{active:oneIndex==-1}">全部</a>
                  <!-- <router-link to="/course" tag="li" active-class="current">
                    <a title="全部" href="#" @click="searchAll(-1)" :class="{active:oneIndex==-1}">全部</a>
                  </router-link> -->
                </li>
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="searchOne(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="item.title" href="#" @click="searchTwo(item.id,index)">{{item.title}}</a>
                </li>

              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a id="button" title="销量" href="#" @click="searchBuyCount()">销量
                  <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a id="button" title="最新" href="#" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a id="button" title="价格" href="#" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="comm-course-list">
            <!-- <article class="comm-course-list"> -->
            <ul class="of" id="bna">
              <li v-for="item in data.items" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a id="button" :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fr jgTag bg-green" v-else>
                      <i class="c-fff fsize12 f-fA">{{item.price}}元</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.buyCount}}人学习</i>

                      <!-- <i class="c-999 f-fA">9634评论</i> -->
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a id="button" :class="{undisable:!data.hasPrevious}" href="#" title="首页" @click.prevent="gotoPage(1)">首页</a>
            <a id="button" :class="{undisable:!data.hasPrevious}" href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a v-for="pages in data.pages" :key="pages" id="button" :class="{current:data.current == pages,undisable:data.current == pages}" :title="'第'+pages+'页'" href="#" @click.prevent="gotoPage(pages)">{{pages}}</a>
            <a id="button" :class="{undisable:!data.hasNext}" href="#" title="末页" @click.prevent="gotoPage(data.pages)">末页</a>
            <div class="clear" />
          </div>
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course'
import throttle from '@/utils/throttle'
export default {
  data () {
    return {
      pages: 1, // 当前页
      data: {}, // 课程列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: '',
      gmtCreateSort: '',
      priceSort: ''
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to.query.keyword);
      // console.log(from);
      this.searchObj.keyword = to.query.keyword
      this.initCourseFrist()
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
        // console.log('11111')
        _throttle('节流节流')
      }
    }
  },
  created () {
    if (this.$route.query.keyword) {
      // console.log(this.$route.query.keyword)
      this.searchObj.keyword = this.$route.query.keyword
    }
    // 课程第一次查询
    this.initCourseFirst()
    // 一级分类显示
    this.initSubject()
  },
  methods: {
    // 点击全部分类,查询全部
    searchAll (index) {
      this.oneIndex = index
      this.twoIndex = -1
      // 进行查询全部
      this.searchObj = {}
      this.gotoPage(1)
      this.subSubjectList = []// 清空二级,填充所有二级分类
      for (var i = 0; i < this.subjectNestedList.length; i++) {
        this.subSubjectList.push(...this.subjectNestedList[i].children)
      }
    },
    // 查询第一页数据
    initCourseFirst () {
      courseApi.getCourseList(1, 8, this.searchObj).then(response => {
        this.data = response.data.data
      })
    },
    // 查询所有一级分类
    initSubject () {
      courseApi.getAllSubject().then(response => {
        this.subjectNestedList = response.data.data.list
      })
    },
    // 分页切换
    gotoPage (pages) {
      courseApi.getCourseList(pages, 8, this.searchObj).then(response => {
        this.data = response.data.data
      })
    },
    // 点击某个一级分类，查询出对应二级分类
    searchOne (subjectParentId, index) {
      // 把传递过来的index赋值给oneIndex，让active样式生效
      this.oneIndex = index
      this.twoIndex = -1
      this.searchObj.subjectId = ''
      this.subSubjectList = []
      // 把一级分类点击的id值，赋值给searchObj
      this.searchObj.subjectParentId = subjectParentId
      // 点击某个一级分类，进行条件查询
      this.gotoPage(1)
      // 拿着点击的一级分类id和所有一级分类id比较
      // 如果id相同，拿出对应二级分类
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        // 获取每个一级分类
        var oneSubject = this.subjectNestedList[i]
        // 比较id是否相同
        if (subjectParentId === oneSubject.id) {
          // 从一级分类里获取对应二级分类
          this.subSubjectList = oneSubject.children
        }
      }
    },
    // 点击某个二级分类实现查询
    searchTwo (subjectId, index) {
      // 把index赋值给twoIndex
      this.twoIndex = index
      // 把二级分类id赋值给searchObj
      this.searchObj.subjectId = subjectId
      // 点击某个二级分类实现查询
      this.gotoPage(1)
    },
    // 根据销量排序
    searchBuyCount () {
      // 设置对应变量值，样式生效
      this.buyCountSort = '1'
      this.gmtCreateSort = ''
      this.priceSort = ''
      // 把值复制到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort
      // 调用方法查询
      this.gotoPage(1)
    },
    // 根据最新时间排序
    searchGmtCreate () {
      // 设置对应变量值，样式生效
      this.buyCountSort = ''
      this.gmtCreateSort = '1'
      this.priceSort = ''
      // 把值复制到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort
      // 调用方法查询
      this.gotoPage(1)
    },
    // 根据价格排序
    searchPrice () {
      // 设置对应变量值，样式生效
      this.buyCountSort = ''
      this.gmtCreateSort = ''
      this.priceSort = '1'
      // 把值复制到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort
      // 调用方法查询
      this.gotoPage(1)
    }
  }
}
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
