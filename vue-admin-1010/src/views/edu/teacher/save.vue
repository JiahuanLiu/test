<template>
  <div class="app-container">
    讲师表单
    <el-form ref="teacher" :model="teacher" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item ref="name" label="讲师名称" prop="name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <!-- <el-form-item label="讲师头像">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="handleAvatarChange" :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
          <img :src="teacher.avatar" height="133px" width="133px">
          <img :src="teacher.avatar" height="133px" width="133px">
        </el-upload>
      </el-form-item> -->

      <el-form-item ref="avatar" label="讲师头像" prop="avatar">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
          <img :src="teacher.avatar" height="133px" width="133px">
        </el-upload>
      </el-form-item>

      <el-form-item ref="sort" label="讲师排序" prop="sort">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0" />
      </el-form-item>
      <el-form-item ref="level" label="讲师头衔" prop="level">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item ref="career" label="讲师资历" prop="career">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item ref="intro" label="讲师简介" prop="intro">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button id="button" :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import teacherApi from '@/api/edu/teacher'
import throttle from '@/utils/throttle'
export default {
  data () {
    return {
      teacher: {
        id: '',
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false, // 保存按钮是否禁用
      rules: {
        name: [
          { required: true, message: '讲师名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '讲师头像不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请填写讲师排序', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择讲师头衔', trigger: 'change' }
        ],
        career: [
          { required: true, message: '讲师资历不能为空', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '讲师简介不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: { // 监听
    $route (to, from) { // 路由变化方式，路由发生变化，方法就会执行
      this.init()
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
  created () { // 页面渲染之前执行
    this.init()
  },
  methods: {
    // handleAvatarSuccess (res, file) {
    //   this.teacher.avatar = res.data.url
    //   console.log(this.teacher.avatar)
    //   // console.log(res)
    // },
    handleAvatarSuccess (res, file) {
      this.teacher.avatar = res.data.url
      // this.teacher.avatar = URL.createObjectURL(file.raw)
    },
    // beforeAvatarUpload (res) {
    //   // console.log(file)
    //   // 使图片显示
    //   this.teacher.avatar = res.data.url
    //   // this.teacher.avatar = URL.createObjectURL(file);
    //   return false
    // },
    // handleAvatarChange (file, filelist) {
    //   this.teacher.avatar = URL.createObjectURL(file.raw)
    // },
    init () {
      // 回显
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else { // 路径没有id值，做添加
        // 清空表单
        this.teacher = {}
      }
    },
    // 根据讲师id查询的方法
    getInfo (id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    // saveOrUpdate () {
    //   // 判断修改还是添加
    //   // 根据teacher是否有id
    //   if (!this.teacher.id) {
    //     // 添加
    //     this.saveTeacher()
    //   } else {
    //     // 修改
    //     this.updateTeacher()
    //   }
    // },
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
    // 修改讲师的方法
    updateTeacher () {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/teacher/table' })
        })
    },
    // 添加讲师的方法
    saveTeacher () {
      teacherApi.addTeacher(this.teacher)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/teacher/table' })
        })
    },
    saveOrUpdate () {
      this.$refs.teacher.validate((valid, object) => {
        if (valid) {
          // 这里面是全部的条件校验成功之后进入的
          if (!this.teacher.id) {
            // 添加
            this.saveTeacher()
          } else {
            // 修改
            this.updateTeacher()
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
