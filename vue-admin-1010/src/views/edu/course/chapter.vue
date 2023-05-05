<!-- eslint-disable vue/html-indent -->
<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="marginbottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button id="button" type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controlsposition="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button id="button" @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button id="button" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单弹框 -->
    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- <el-upload :on-success="handleVodUploadSuccess" :on-remove="handleVodRemove" :before-remove="beforeVodRemove" :on-exceed="handleUploadExceed" :file-list="fileList" :action="BASE_API + '/eduvod/video/uploadAlyiVideo'" :limit="1" -->
          <!-- <el-upload :on-success="handleVodUploadSuccess(item,response, file, fileList)" :on-remove="handleVodRemove" :before-remove="beforeVodRemove" :on-exceed="handleUploadExceed" :file-list="fileList" :action="BASE_API + '/eduvod/video/uploadAlyiVideo'" :limit="1"
            class="upload-demo"> -->
          <!-- <el-upload :on-success="(item, response, file, fileList) =>handleVodUploadSuccess(item,response, file, fileList)" :on-remove="handleVodRemove" :before-remove="beforeVodRemove" :on-exceed="handleUploadExceed" :file-list="fileList"
            :action="BASE_API + '/eduvod/video/uploadAlyiVideo'" :limit="1" class="upload-demo"> -->
          <!-- <el-upload :on-success="handleVodUploadSuccess(item,response, file, fileList)" :on-remove="handleVodRemove" :before-remove="beforeVodRemove" :on-exceed="handleUploadExceed" :file-list="fileList" -->
          <el-upload :on-remove="handleVodRemove" :on-success="handleVodUploadSuccess" :before-remove="beforeVodRemove" :on-exceed="handleUploadExceed" :file-list="fileList" :action="BASE_API + '/eduvod/video/uploadAlyiVideo'" :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
          <span>请待</span><span style="color:green">绿色小勾</span><span>出现后再点击确定</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="diaglog-footer">
        <el-button id="button" @click="dialogVideoFormVisible=false">取消</el-button>
        <el-button id="button" type="primary" @click="saveOrUpdateVideo">确定</el-button>
      </div>
    </el-dialog>

    <!-- 章节弹框 -->
    <ul class="chapterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <!-- <li> -->
        <p>
          {{ chapter.title }}
          <!-- 第一章java类 -->
          <span class="acts">
            <el-button id="button" style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
            <el-button id="button" style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
            <el-button id="button" type="text" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <!-- <li> -->
            <p>
              {{ video.title }}
              <!-- 与后端连接后，删除写死固定的内容 -->
              <!-- 第一小节 String类 -->
              <span class="acts">
                <el-button id="button" style="" type="text" @click="openEditVideo(video.id)">编辑</el-button>
                <el-button id="button" type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
            <!-- 与后端连接后，以下<p></p>整块删除 -->
            <!-- <p>
              第二小节 Java类
              <span class="acts">
                <el-button style="" type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p> -->
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button id="button" :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
import throttle from '@/utils/throttle'
export default {
  data () {
    return {
      // flag: 0,
      // res: '',
      // file: '',
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '',
      chapterVideoList: [],
      dialogChapterFormVisible: false, // 章节弹框
      dialogVideoFormVisible: false, // 小节弹框
      chapter: {
        // 封装章节属性
        title: '',
        sort: 0
      },
      video: {
        // 封装小节属性
        // id: '',
        title: '',
        sort: 0,
        isFree: true,
        videoSourceId: '',
        videoOriginalName: ''
      },
      fileList: [], // 上传文件列表
      BASE_API: process.env.BASE_API // 接口API地址,
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
    console.log('chapter created')
    // 获取路由的id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {
    // 点击确定调用方法
    handleVodRemove () {
      // 调用删除视频接口
      video.deleteAliyunvod(this.video.videoSourceId).then(response => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '删除视频成功'
        })
        // 把文件列表清空
        this.fileList = []
        // 把video视频id和视频名称清空
        this.video.videoSourceId = ''
        this.video.videoOriginalName = ''
      })
    },
    // 点击x调用方法
    beforeVodRemove () {
      return this.$confirm('确定移除 ${file.name }?')
    },
    // 上传视频
    // handleVodUploadSuccess (response, file, fileList) {
    handleVodUploadSuccess (res, file, fileList) {
      if (res.code === 20000) {
        this.$message({
          type: 'success',
          message: '视频上传成功'
        })
      }
      // this.$message.warning('想要重新上传视频，请先删除已上传的视频')
      // console.log(1)
      // console.log(2)
      // console.log(3)
      // console.log(4)
      // console.log(res)
      this.video.videoSourceId = res.data.videoId
      // console.log(1234)
      console.log(file.name)
      this.video.videoOriginalName = file.name
      console.log(this.video.videoOriginalName)
      console.log('handleVodUploadSuccess#file:', file, fileList)
    },
    // 上传之前的方法
    handleUploadExceed () {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    // ==============================小节操作=========================================
    // 修改小节
    updateVideo () {
      video.updateVideo(this.video).then(response => {
        // 关闭弹框
        this.dialogVideoFormVisible = false
        // 提示信息
        this.$message({
          type: 'success',
          message: '修改小节成功'
        })
        // 刷新页面
        this.getChapterVideo()
      })
    },
    // 修改小节弹框数据回显
    openEditVideo (id) {
      // 弹框
      this.dialogVideoFormVisible = true
      // 调用接口
      video.getVideo(id).then(response => {
        this.video = response.data.video
        // this.video.title = response.data.video.
      })
    },
    // 删除小节
    removeVideo (id) {
      this.$confirm('此操作将删除小节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        video.deleteVideo(id).then(response => { // 删除成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '删除小节成功!'
          })
          // 回到列表页面
          this.getChapterVideo()
        })
      }) // 点击取消，执行catch方法
    },
    // 添加小节弹框
    openVideo (chapterId) {
      // 弹框
      this.dialogVideoFormVisible = true
      // 设置章节id
      this.video.chapterId = chapterId
      // 表单数据清空
      this.video.title = ''
      this.video.sort = 0
      this.video.isFree = true
      this.video.videoSourceId = ''
      this.video.videoOriginalName = ''
    },
    // 添加小节
    addVideo () {
      // 设置课程id
      this.video.courseId = this.courseId
      video.addVideo(this.video).then(response => {
        // 关闭弹框
        this.dialogVideoFormVisible = false
        // 提示信息
        this.$message({
          type: 'success',
          message: '添加小节成功'
        })
        // 刷新页面
        this.getChapterVideo()
        this.video = {}
        this.fileList = []
      })
    },
    saveOrUpdateVideo () {
      // this.addVideo()
      if (!this.video.id) {
        this.addVideo()
      } else {
        this.updateVideo()
      }
    },
    // ==============================章节操作=========================================
    // 删除章节
    removeChapter (chapterId) {
      // 确认弹框
      this.$confirm('此操作将永久删除该章节记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确认执行
          chapter.deleteChapter(chapterId).then((response) => {
            // 删除成功 提示删除成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getChapterVideo()
          })
        })
        .catch(() => {
          // 点击取消执行
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击修改按钮弹框和回显
    openEditChatper (chapterId) {
      chapter.getChapter(chapterId).then((response) => {
        this.chapter = response.data.chapter
      })
      // 获取到信息回显弹框
      this.dialogChapterFormVisible = true
    },
    // 修改章节
    updateChapter () {
      chapter.updateChapter(this.chapter).then((respnse) => {
        // 关闭弹框
        this.dialogChapterFormVisible = false
        // 关闭弹框后将表单数据清空
        this.chapter.title = ''
        this.chapter.sort = 0
        // 提示信息
        this.$message({
          type: 'success',
          message: '修改章节成功!'
        })
        // 刷新页面
        this.getChapterVideo()
      })
    },
    // 添加章节
    addChapter () {
      // 设置章节表需要的课程id
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter).then((respnse) => {
        // 关闭弹框
        this.dialogChapterFormVisible = false
        // 关闭弹框后将表单数据清空
        this.chapter.title = ''
        this.chapter.sort = 0
        // 提示信息
        this.$message({
          type: 'success',
          message: '添加章节成功!'
        })
        // 刷新页面
        this.getChapterVideo()
      })
    },
    // 保存修改二合一
    saveOrUpdate () {
      // 通过 章节id 标志位 判断是修改还是添加
      if (this.chapter.id !== '') {
        this.updateChapter()
      } else {
        this.addChapter()
      }
    },
    // 章节弹框方法
    openChapterDialog () {
      this.chapter.title = ''
      this.chapter.sort = 0
      // 添加章节点击时清空chapter的id
      this.chapter.id = ''
      this.dialogChapterFormVisible = true
    },
    // 根据课程id查询章节和小结列表
    getChapterVideo () {
      chapter.getAllChapterVideo(this.courseId).then((response) => {
        this.chapterVideoList = response.data.allChatperVideo
      })
    },
    previous () {
      console.log('previous')
      this.$router.push({ path: '/edu/course/info/' + this.courseId })
    },
    next () {
      console.log('next')
      this.$router.push({ path: '/edu/course/publish/' + this.courseId })
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li {
  position: relative;
}
.chapterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
