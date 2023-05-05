<template>
  <div class="app-container">
    <h2 style="text-align: center">添加证书</h2>

    <!-- <el-form label-width="120px"> -->
    <el-form ref="teacher2Info" :model="teacher2Info" :rules="rules" label-width="120px" class="demo-ruleForm">

      <el-form-item ref="name2" label="证书名称" prop="name2">
        <el-input v-model="teacher2Info.name2" placeholder=" 示例：信息系统项目管理师" />
      </el-form-item>
      <!-- <el-form-item ref="id2" label="证书id" prop="id2">
        <el-input v-model="teacher2Info.id2" placeholder=" 示例：11" />
      </el-form-item> -->

      <!-- 所属分类 TODO -->
      <el-form-item ref="level2" label="证书等级" prop="level2">
        <el-select v-model="teacher2Info.level2" clearable placeholder="请选择">
          <el-option :value="1" label="一级证书" />
          <el-option :value="2" label="二级证书" />
          <el-option :value="3" label="三级证书" />
          <el-option :value="4" label="四级证书" />
        </el-select>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <!-- 课程简介-->
      <el-form-item ref="intro2" label="证书简介" prop="intro2">
        <!-- 普通文本框 -->
        <!-- <el-input v-model="courseInfo.description" /> -->
        <!-- 富文本编辑器 -->
        <tinymce :height="200" v-model="teacher2Info.intro2" />
      </el-form-item>

      <el-form-item ref="preparation" label="证书备考信息" prop="preparation">
        <!-- 普通文本框 -->
        <!-- <el-input v-model="courseInfo.description" /> -->
        <!-- 富文本编辑器 -->
        <tinymce :height="200" v-model="teacher2Info.preparation" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="证书封面">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
          <img :src="teacher2Info.avatar2" height="200px" width="350px">
        </el-upload>
      </el-form-item>

      <div>
        <el-button id="button" :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import teacher2 from '@/api/edu/teacher2'
import Tinymce from '@/components/Tinymce' // 引入
import throttle from '@/utils/throttle'
export default {
  // 声明
  components: { Tinymce },
  data () {
    return {
      saveBtnDisabled: false,
      teacher2Info: {
        id2: '',
        name2: '',
        level2: '',
        intro2: '',
        career2: '',
        avatar2: '/static/01.jpg', // 默认封面
        viewCount: '',
        preparation: '',
        sort2: '',
        isDeleted2: '',
        gmtCreated2: '',
        gmtModified: ''
      },
      teacher2Id: '',
      BASE_API: process.env.BASE_API, // 接口API地址
      rules: {
        name2: [
          { required: true, message: '证书名称不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        level2: [
          { required: true, message: '请选择等级', trigger: 'change' }
        ],
        intro2: [
          { required: true, message: '证书简介不能为空', trigger: 'blur' }
        ],
        id2: [
          { required: true, message: '证书id不能为空', trigger: 'blur' }
        ],
        preparation: [
          { required: true, message: '证书备考信息不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 监听路由：
    $route (to, from) {
      this.teacher2Info = {}
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
    // 获取路由中的id值 回显时使用
    if (this.$route.params && this.$route.params.id) {
      this.teacher2Id = this.$route.params.id
      // 调用根据id查询证书方法
      this.getInfo()
    } else {
      // 初始化一级分类
      this.getOneSubject()
    }
  },
  methods: {
    // 根据证书id查询证书基本信息回显
    getInfo () {
      teacher2.getTeacher2InfoById(this.teacher2Id).then(response => {
        this.teacher2Info = response.data.tteacher2InfoVo
      })
    },
    // 上传封面成功调用的方法
    handleAvatarSuccess (res, file) {
      this.teacher2Info.avatar2 = res.data.url
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
    // 添加证书
    addCourse2 () {
      teacher2.addTeacher2Info(this.teacher2Info).then(response => {
        // 提示
        this.$message({
          type: 'success',
          message: '添加证书信息成功!'
        })
        this.$router.push({ path: '/teacher2/list' })
      })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '添加证书信息失败!'
          })
        })
    },
    // 修改课程
    updateCourse2 () {
      teacher2.updateTeacher2Info(this.teacher2Info).then(response => {
        // 提示
        this.$message({
          type: 'success',
          message: '修改证书信息成功!'
        })
        this.$router.push({ path: '/teacher2/list' })
      })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '修改证书信息失败!'
          })
        })
    },
    // 提交课程信息
    // saveOrUpdate () {
    //   // 判断是添加还是修改 根据路由是否有id值判断
    //   if (this.$route.params && this.$route.params.id) {
    //     this.updateCourse2()
    //   } else {
    //     this.addCourse2()
    //   }
    //   // 直接跳转到后一页，后期需要根据id判断
    //   // this.$router.push({ path: '/teacher2/list' })
    // }
    saveOrUpdate () {
      this.$refs.teacher2Info.validate((valid, object) => {
        if (valid) {
          // 这里面是全部的条件校验成功之后进入的
          if (this.$route.params && this.$route.params.id) {
            this.updateCourse2()
          } else {
            this.addCourse2()
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
