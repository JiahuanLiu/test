<!-- eslint-disable vue/html-indent -->
<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="'/static/01.xlsx'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload ref="upload" :auto-upload="false" :on-success="fileUploadSuccess" :on-error="fileUploadError" :disabled="importBtnDisabled" :limit="1" :action="BASE_API+'/eduservice/subject/addSubject'" name="file"
          accept="application/vnd.ms-excel">
          <el-button id="button" slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button id="button" :loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import throttle from '@/utils/throttle'
export default {
  data () {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false
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

  },
  methods: {
    // 点击按钮上传文件到接口里面
    submitUpload () {
      this.importBtnDisabled = true
      this.loading = true
      // js: document.getElementById("upload").submit()
      this.$refs.upload.submit()
    },
    // 上传成功
    fileUploadSuccess (response) {
      // 提示信息
      this.loading = false
      this.$message({
        type: 'success',
        message: '添加课程分类成功'
      })
      // 跳转课程分类列表
      // 路由跳转
      this.$router.push({ path: '/subject/list' })
    },
    // 上传失败
    fileUploadError () {
      this.loading = false
      this.$message({
        type: 'error',
        message: '添加课程分类失败'
      })
    }
  }
}
</script>
