<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <!-- <el-form :rules="rules" label-width="120px"> -->
    <el-form ref="courseInfo" :model="courseInfo" :rules="rules" label-width="120px" class="demo-ruleForm">
      <!-- <el-form-item label="课程ID">
        <el-input v-model="courseInfo.courseId" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item> -->

      <el-form-item ref="title" label="课程标题" prop="title">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <!--一级分类-->
      <el-form-item label="课程分类">
        <!--在一级分类列表中绑定change事件，事件一触发，就会取到值-->
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="subjectLevelOneChanged">
          <!-- <el-option :value="1" label="前端开发" />
          <el-option :value="2" label="后端开发" />
          <el-option :value="3" label="数据库开发" /> -->
          <!-- 根据后端显示数据，可变，二级分类根据一级变化 -->
          <el-option v-for="subject in subjectOneList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>

        <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option v-for="subject in subjectTwoList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>
      </el-form-item>

      <el-form-item ref="id2" label="课程证书" prop="id2">
        <el-select v-model="courseInfo.id2" placeholder="请选择">
          <!-- <el-option :value="1" label="张三" />
          <el-option :value="2" label="李四" /> -->
          <!-- 下面根据后端显示课程讲师 -->
          <el-option v-for="teacher in teacher2List" :key="teacher.id2" :label="teacher.name2" :value="teacher.id2" />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item ref="teacherId" label="课程讲师" prop="teacherId">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <!-- <el-option :value="1" label="张三" />
          <el-option :value="2" label="李四" /> -->
          <!-- 下面根据后端显示课程讲师 -->
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>

      <!-- <el-form-item ref="id" label="课程id" prop="id">
        <el-input-number :min="0" v-model="courseInfo.id" controls-position="right" placeholder="请填写课程id" />
      </el-form-item> -->
      <el-form-item ref="lessonNum" label="总课时" prop="lessonNum">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <!-- 课程简介-->
      <el-form-item ref="description" label="课程简介" prop="description">
        <!-- 普通文本框 -->
        <!-- <el-input v-model="courseInfo.description" /> -->
        <!-- 富文本编辑器 -->
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
          <img :src="courseInfo.cover" height="200px" width="350px">
        </el-upload>
      </el-form-item>

      <el-form-item ref="price" label="课程价格" prop="price">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元" />元
      </el-form-item>

      <!-- <el-form-item label="课程id">
        <el-input :min="0" v-model="courseInfo.id" placeholder="请修改课程id" />
      </el-form-item> -->

      <div>
        <el-button id="button" :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' // 引入
import throttle from '@/utils/throttle'
export default {
  // 声明
  components: { Tinymce },
  data () {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        // courseId: '',
        title: '',
        subjectId: '', // 二级分类id
        subjectParentId: '', // 一级分类id
        teacherId: '',
        id: '',
        id2: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg', // 默认封面
        price: 0
      },
      courseId: '',
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [], // 封装所有的讲师
      teacher2List: [], // 封装所有证书
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      rules: {
        title: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        teacherId: [
          { required: true, message: '请选择讲师', trigger: 'change' }
        ],
        id2: [
          { required: true, message: '请选择课程证书', trigger: 'change' }
        ],
        lessonNum: [
          { required: true, message: '总课时不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '课程简介不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请设置课程价格', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请设置课程id', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 监听路由：
    $route (to, from) {
      this.courseInfo = {}
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
    // 获取路由中的id值 回显时使用
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      // 调用根据id查询课程方法
      this.getInfo()
    } else {
      this.getListTeacher2()
      // 初始化所有讲师
      this.getListTeacher()
      // 初始化一级分类
      this.getOneSubject()
    }
  },
  methods: {
    // 根据课程id查询课程基本信息回显
    getInfo () {
      course.getCourseInfoById(this.courseId).then(response => {
        // 在courseInfo课程基本信息，包含一级分类id和二级分类id
        this.courseInfo = response.data.courseInfoVo
        // 为 subjectTwoList 二级分类赋值
        subject.getSubjectList().then(response => {
          // 获取一级分类
          this.subjectOneList = response.data.list
          // 把所有一级分类数组进行遍历通过courseInfo从一级分类中获取到二级分类
          for (var i = 0; i < this.subjectOneList.length; i++) {
            // 获取每个一级分类
            var oneSubject = this.subjectOneList[i]
            // 比较当前courseInfo里面的一级分类id和所有的一级分类id
            if (this.courseInfo.subjectParentId === oneSubject.id) {
              // 从一级分类获取里面所有的二级分类
              this.subjectTwoList = oneSubject.children
            }
          }
        })
        // 初始化所有讲师
        this.getListTeacher()
        this.getListTeacher2()
      })
    },
    // 上传封面成功调用的方法
    handleAvatarSuccess (res, file) {
      this.courseInfo.cover = res.data.url
    },
    // 上传之前调用的方法
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged (value) {
      // value就是一级分类id值
      // 遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        // 每个一级分类
        var oneSubject = this.subjectOneList[i]
        // 判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          // 从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children
          // 把二级分类id值清空
          this.courseInfo.subjectId = ''
        }
      }
    },
    // 查询所有的一级分类
    getOneSubject () {
      subject.getSubjectList().then(response => {
        this.subjectOneList = response.data.list
      })
    },
    // 查询所有的讲师
    getListTeacher () {
      course.getListTeacher().then(response => {
        this.teacherList = response.data.items
      })
    },
    // 查询所有证书
    getListTeacher2 () {
      course.getListTeacher2().then(response => {
        this.teacher2List = response.data.items
      })
    },
    // 添加课程
    addCourse () {
      course.addCourseInfo(this.courseInfo).then(response => {
        // 提示
        this.$message({
          type: 'success',
          message: '添加课程信息成功!'
        })
        // 跳转到第二步
        this.$router.push({
          path: '/edu/course/chapter/' + response.data.courseId
        })
      })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '添加课程信息失败!'
          })
        })
    },
    // 修改课程
    updateCourse () {
      course.updateCourseInfo(this.courseInfo).then(response => {
        // 提示
        this.$message({
          type: 'success',
          message: '修改课程信息成功!'
        })
        // 跳转到第二步
        this.$router.push({
          // 添加课程会返回课程id，但是更新课程并没有返回，可以使用 created 方法中从第二步拿到的id
          path: '/edu/course/chapter/' + this.courseId
        })
      })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '修改课程信息失败!'
          })
        })
    },
    // 提交课程信息
    // saveOrUpdate () {
    //   // 判断是添加还是修改 根据路由是否有id值判断
    //   if (this.$route.params && this.$route.params.id) {
    //     this.updateCourse()
    //   } else {
    //     this.addCourse()
    //   }
    //   // 直接跳转到后一页，后期需要根据id判断
    //   // this.$router.push({ path: '/course/chapter/1' })
    // }
    saveOrUpdate () {
      this.$refs.courseInfo.validate((valid, object) => {
        if (valid) {
          // 这里面是全部的条件校验成功之后进入的
          if (this.$route.params && this.$route.params.id) {
            this.updateCourse()
          } else {
            this.addCourse()
          }
          // this.$router.push({ path: '/teacher2/list' })
        } else {
          const split = []
          for (const i in object) {
            // 这里的object打印出来是一个对象,里面包含的就是未输入的input框绑定的变量
            // 我把他用for in,遍历出来存入到我定义的spilt里面
            split.push(i)
          }
          // 我的需求是跳转到未填的第一项,所以我把第一项的变量名取了出来
          // 还需要在上面的需要跳转的input或者其他,给一个,ref=‘变量名’
          const dom = split[0]
          this.$refs[dom].$el.scrollIntoView({
            block: 'start', // 值有start,center,end，nearest，当前显示在视图区域中间
            behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
          })
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
