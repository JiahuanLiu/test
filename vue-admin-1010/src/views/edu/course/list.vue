<template>
  <div class="app-container">
    课程列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布" />
          <el-option value="Draft" label="未发布" />
        </el-select>
      </el-form-item>

      <el-button id="button" type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button id="button" type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" min-width="12" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="课程id" min-width="12" align="center" />
      <el-table-column prop="title" label="课程名称" min-width="20" align="center" />

      <el-table-column label="课程状态" min-width="12" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" min-width="12" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" min-width="12" align="center" />

      <el-table-column prop="viewCount" label="浏览数量" min-width="12" align="center" />

      <el-table-column label="操作" min-width="20" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/info/' + scope.row.id">
            <el-button id="button" type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/edu/course/chapter/' + scope.row.id">
            <el-button id="button" type="primary" size="mini" icon="el-icon-edit">编辑课程大纲信息</el-button>
          </router-link>
          <el-button id="button" type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getList" />
  </div>
</template>
<script>
// 引入调用teacher.js文件
import course from '@/api/edu/course'
import throttle from '@/utils/throttle'
export default {
  data () {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      courseQuery: {} // 条件封装对象
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
    this.getList()
  },
  methods: {
    getList (current = 1) {
      this.current = current
      course.getCourseListPage(this.current, this.limit, this.courseQuery).then((response) => {
        if (response.data.rows == null) {
          this.getList(this.current - 1)
        }
        this.list = response.data.rows
        this.total = response.data.total
      })
        .catch((error) => {
          console.log(error)
        })
    },
    // getList(){
    //   course.getListCourse().then(response=>{
    //     this.list=response.data.list
    //   })
    // },
    resetData () {
      // 表单输入项数据清空
      this.courseQuery = {}
      this.getList()
    },
    // 删除课程信息
    removeDataById (courseId) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确认执行
        // 调用删除方法
        course.deleteCourseById(courseId).then((response) => {
          // 删除成功 提示删除成功
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新回到该页面
          this.getList(this.current)
        })
      })
        .catch(() => {
          // 点击取消执行
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
