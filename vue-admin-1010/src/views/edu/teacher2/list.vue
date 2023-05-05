<template>
  <div class="app-container">
    证书列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name2" clearable placeholder="证书名称" />
      </el-form-item>

      <!-- <el-form-item>
        <el-select v-model="teacherQuery.level2" clearable placeholder="证书等级">
          <el-option :value="1" label="一级证书" />
          <el-option :value="2" label="二级证书" />
          <el-option :value="3" label="三级证书" />
          <el-option :value="4" label="四级证书" />
        </el-select>
      </el-form-item> -->

      <el-button id="button" type="primary" icon="el-icon-search" @click="getList1()">查询</el-button>
      <el-button id="button" type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" min-width="12" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="id2" label="证书id" min-width="20" align="center" />
      <el-table-column prop="name2" label="证书名称" min-width="20" align="center" />

      <el-table-column prop="level2" label="证书等级" min-width="12" align="center" />

      <el-table-column prop="intro2" label="证书简介" min-width="20" align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.intro2" />
        </template>
      </el-table-column>

      <el-table-column prop="preparation" label="证书备考信息" min-width="20" align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.preparation" />
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" min-width="12" align="center" />

      <el-table-column prop="gmtModified" label="修改时间" min-width="12" align="center" />

      <!-- <el-table-column prop="viewCount" label="浏览数量" min-width="12" align="center" /> -->

      <el-table-column label="操作" min-width="20" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher2/info/' + scope.row.id2">
            <el-button id="button" type="primary" size="mini" icon="el-icon-edit">编辑证书信息</el-button>
          </router-link>
          <el-button id="button" type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id2)">删除证书信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getList" />
  </div>
</template>
<script>
// 引入调用teacher.js文件
import teacher2 from '@/api/edu/teacher2'
import throttle from '@/utils/throttle'
export default {
  data () {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      teacherQuery: {
        name2: '',
        id2: '',
        level2: '',
        intro2: '',
        preparation: '',
        gmtCreate: '',
        gmtModified: ''
      } // 条件封装对象
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
    // getList () {
    //   // teacher2.getTeacher2List(this.teacherQuery).then((response) => {
    //     // if (response.data.rows == null) {
    //     //   this.getList(this.current - 1)
    //     // }
    //     this.list = response.data.items
    //     // this.list = response.data.rows
    //     // this.total = response.data.total
    //   })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    getList (page = 1) {
      this.page = page
      teacher2.getTeacher2ListPage1(this.page, this.limit, this.teacherQuery).then((response) => {
        if (response.data.items == null) {
          this.getList(this.page - 1)
        }
        this.list = response.data.items
        this.total = response.data.total
        console.log('1111111')
        console.log(this.teacherQuery.name2)
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getList1 (page = 1) {
      this.page = page
      teacher2.getTeacher2ListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          this.list = response.data.items
          this.total = response.data.total
        })
    },
    resetData () {
      // 表单输入项数据清空
      // console.log('resetData')
      this.teacherQuery = {}
      this.getList()
    },
    // 删除证书信息
    removeDataById (teacher2Id) {
      this.$confirm('此操作将永久删除证书记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确认执行
        // 调用删除方法
        teacher2.deleteTeacher2ById(teacher2Id).then((response) => {
          // 删除成功 提示删除成功
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新回到该页面
          this.getList(this.page)
          // this.getList()
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
