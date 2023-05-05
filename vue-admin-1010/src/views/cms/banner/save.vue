<template>
  <div class="app-container">
    <el-form :rules="rules" label-width="120px">
      <el-form-item ref="title" label="图片标题" prop="title">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item ref="sort" label="图片排序" prop="sort">
        <el-input-number v-model="banner.sort" controls-position="right" min="0" />
      </el-form-item>
      <!-- <el-form-item label="讲师头衔">
        <el-select v-model="banner.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item> -->
      <el-form-item ref="linkUrl" label="展示内容" prop="linkUrl">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>
      <!-- <el-form-item label="讲师简介">
        <el-input v-model="banner.intro" :rows="10" type="textarea" />
      </el-form-item> -->

      <!-- 轮播图-->
      <el-form-item ref="imageUrl" label="轮播图" prop="imageUrl">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
          <img :src="banner.imageUrl" height="200px" width="350px">
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import bannerApi from '@/api/banner'
export default {
  data () {
    return {
      banner: {
        title: '',
        sort: 0,
        // level: 1,
        // career: '',
        linkUrl: '',
        imageUrl: ''
      },
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false // 保存按钮是否禁用,
      // rules: {
      //   title: [
      //     { required: true, message: '标题不能为空' }
      //   ],
      //   sort: [
      //     { required: true, message: '请填写排序' }
      //   ],
      //   linkUrl: [
      //     { required: true, message: '请填写展示内容' }
      //   ]
      // }
    }
  },
  watch: { // 监听
    $route (to, from) { // 路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  created () { // 页面渲染之前执行
    this.init()
  },
  methods: {
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
        this.banner = {}
      }
    },
    // 根据讲师id查询的方法
    getInfo (id) {
      bannerApi.getBannerInfo(id)
        .then(response => {
          this.banner = response.data.item
        })
    },
    // 传图片
    // 上传封面成功调用的方法
    handleAvatarSuccess (res, file) {
      this.banner.imageUrl = res.data.url
      // console.log(this.banner.imageUrl)
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
    saveOrUpdate () {
      // 判断修改还是添加
      // 根据是否有id
      if (!this.banner.id) {
        // 添加
        this.saveBanner()
      } else {
        // 修改
        this.updateBanner()
      }
    },
    // 修改讲师的方法
    updateBanner () {
      bannerApi.updateBannerInfo(this.banner)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/cms/banner/list' })
        })
    },
    // 添加讲师的方法
    saveBanner () {
      bannerApi.addBanner(this.banner)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/cms/banner/list' })
        })
    }

  }
}
</script>

