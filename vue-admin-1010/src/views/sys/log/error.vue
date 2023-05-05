<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-button id="button" type="info" plain @click="exportExcel()">导出</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table id="out-table" :data="list" border fit highlight-current-row>

      <el-table-column prop="requestUri" label="请求URI" min-width="16" align="center" />

      <el-table-column prop="requestMethod" label="请求方式" min-width="10" align="center" />

      <!-- <el-table-column prop="requestParams" label="请求参数" min-width="16" align="center" show-overflow-tooltip /> -->

      <el-table-column prop="ip" label="操作IP" min-width="16" align="center" />

      <el-table-column prop="userAgent" label="用户代理" min-width="16" align="center" show-overflow-tooltip />

      <el-table-column prop="gmtCreate" label="创建时间" min-width="16" sortable align="center" />

      <el-table-column prop="operation" label="操作" min-width="10" align="center">
        <template slot-scope="scope">
          <el-button id="button" type="text" size="small" @click="getoperation(scope)">异常信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getList" />
  </div>
</template>
<script>
import log from '@/api/log/log'
import throttle from '@/utils/throttle'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      exceptionQuery: {}// 条件封装对象
      // list: [
      //   {
      //     requesturi: '/edu/course',
      //     requestmode: 'GET',
      //     requestparameters: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      //     requestlength: '1ms',
      //     state: '失败',
      //     IP: '192.168.1.1',
      //     userAgent: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      //     gmtCreate: '20221023 20:55'
      //   }
      // ]
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
    getoperation (scope) {
      this.$alert(scope.row.errorInfo, '异常信息', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    getList (current = 1) {
      this.current = current
      // log.getRecentExceptionListPage(this.current, this.limit, this.exceptionQuery).then(response => {
      //   if (response.data.rows == null) {
      //     this.getList(this.current - 1)
      //   }
      log.getRecentexception().then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
        .catch((error) => {
          console.log(error)
        })
    },
    resetData () { // 清空的方法
      // 表单输入项数据清空
      this.logQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 定义导出Excel表格事件
    exportExcel () {
      var xlsxParam = { raw: true }
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#out-table'),
        xlsxParam
      )
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          '异常日志.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>
