<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部证书</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">证书类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a id="button" title="全部" href="#" @click="searchAll(-1)" :class="{active:oneIndex==-1}">全部</a>
                  <a id="button" title="level2" herf="#" @click="searchOne(1)" :class="{active:oneIndex==1}">一级证书</a>
                  <a id="button" title="level2" herf="#" @click="searchOne(2)" :class="{active:oneIndex==2}">二级证书</a>
                  <a id="button" title="level2" herf="#" @click="searchOne(3)" :class="{active:oneIndex==3}">三级证书</a>
                  <a id="button" title="level2" herf="#" @click="searchOne(4)" :class="{active:oneIndex==4}">四级证书</a>
                </li>
                <!-- <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.name2" href="#" @click="searchOne(item.id2,index)">{{item.name2}}</a>
                </li> -->
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
          <!-- <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="#" @click="searchBuyCount()">销量
                  <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="#" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="#" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section> -->
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
              <li v-for="item in data.items" :key="item.id2">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.avatar2" class="img-responsive" :alt="item.name2">
                    <div class="cc-mask">
                      <a id="button" :href="'/teacher2/'+item.id2" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a id="button" :href="'/teacher2/'+item.id2" :title="item.name2" class="course-title fsize18 c-333">{{item.name2}}</a>
                  </h3>
                  <!-- <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                       <i class="c-999 f-fA">{{item.buyCount}}人学习</i>
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section> -->
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
            <a v-for="pages in data.pages" id="button" :key="pages" :class="{current:data.current == pages,undisable:data.current == pages}" :title="'第'+pages+'页'" href="#" @click.prevent="gotoPage(pages)">{{pages}}</a>
            <a id="button" :class="{undisable:!data.hasNext}" href="#" title="末页" @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear" />
          </div>
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import teacher2Api from '@/api/teacher2'
import throttle from '@/utils/throttle'
export default {
  data () {
    return {
      page: 1, // 当前页
      data: {}, // 课程列表
      searchObj2: {
        id2: '',
        name2: '',
        intro: '',
        career2: '',
        level2: '',
        avatar2: '',
        viewCount: '',
        sort2: '',
        isDeleted2: false,
        gmtCreated: '',
        gmtModified2: ''
      }, // 查询表单对象
      esObj: {
        key: '',
        page: '1',
        size: '10'
      },
      oneIndex: -1
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to.query.keyword);
      // console.log(from);
      this.esObj.key = to.query.keyword
      // this.initCourseFrist()
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
    // 课程第一次查询
    // this.initTeacher2First(1)
    if (this.$route.query.keyword) {
      // console.log(this.$route.query.keyword)
      this.esObj.key = this.$route.query.keyword
      this.ES()
    } else {
      this.searchObj2.level2 = -1
      this.gotoPage(1)
    }
  },
  methods: {
    ES () {
      teacher2Api.esTeacher2(this.esObj).then(response => {
        this.data = response.data.data
      })
    },
    // 点击全部分类,查询全部
    searchAll (index) {
      this.oneIndex = index
      this.searchObj2.level2 = -1
      this.gotoPage(1)
      // this.initTeacher2First(1)
    },
    // 查询第一页数据
    initTeacher2First (pages) {
      teacher2Api.getTeacherList(pages, 8).then(response => {
        this.data = response.data.data
      })
    },
    searchOne (index) {
      this.oneIndex = index
      this.searchObj2.level2 = index
      this.gotoPage(1)
    },
    // 分页切换
    gotoPage (pages) {
      teacher2Api.getTeacher2List(pages, 8, this.searchObj2).then(response => {
        this.data = response.data.data
      })
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
