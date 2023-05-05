<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray">
          <span>共{{ coursePublish.lessonNum }}课时</span>
        </p>
        <p>
          <span>所属分类：{{ coursePublish.subjectLevelOne }} —
            {{ coursePublish.subjectLevelTwo }}</span>
        </p>
        <!-- <p>
          <span>所属证书：{{ coursePublish.name2 }}</span>
        </p> -->
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>
    <div>
      <el_button id="button" @click="previous">返回修改</el_button>
      <el-button id="button" :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import throttle from '@/utils/throttle'
export default {

  data () {
    return {
      saveBtnDisabled: false, // 保存按钮是否被禁用
      courseId: '',
      coursePublish: {}
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
    // 获取路由课程id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCoursePublishId()
    }
  },
  methods: {
    // 根据课程id查询
    getCoursePublishId () {
      course.getPublishCourseInfo(this.courseId).then(response => {
        this.coursePublish = response.data.publishCourse
      })
    },
    publish () {
      course.publishCourse(this.courseId).then(response => {
        // 提示
        this.$message({
          type: 'success',
          message: '课程发布成功'
        })
        // 跳转到课程列表页面
        this.$router.push({ path: '/edu/course/list' })
      })
      // this.$router.push({ path: '/course/list' })
    },
    previous () {
      console.log('previous')
      this.$router.push({ path: '/edu/course/chapter/' + this.courseId })
      // this.$router.push({ path: '/course/chapter/1' })
    }
  }
}
</script>
<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}
.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
