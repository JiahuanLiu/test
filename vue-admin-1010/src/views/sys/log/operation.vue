<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="operationQuery.status" clearable placeholder="状态">
          <el-option value="defeat" label="失败" />
          <el-option value="success" label="成功" />
        </el-select>
      </el-form-item>

      <el-button id="button" type="primary" plain icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button id="button" type="default" @click="resetData()">清空</el-button>
      <el-button id="button" type="info" plain @click="exportExcel()">导出</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table id="out-table" :data="list" border fit highlight-current-row>

      <el-table-column prop="creatorName" label="用户名" min-width="10" align="center" />

      <el-table-column prop="operation" label="用户操作" min-width="10" align="center" />

      <el-table-column prop="requestUri" label="请求URI" min-width="10" align="center" />

      <el-table-column prop="requestMethod" label="请求方式" min-width="10" align="center" />

      <el-table-column prop="requestParams" label="请求参数" min-width="10" align="center" show-overflow-tooltip />

      <el-table-column prop="requestTime" label="请求时长" min-width="10" sortable align="center" />

      <el-table-column prop="status" label="状态" min-width="15" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status === '1' ? '成功' : '失败'">{{ scope.row.status }}</el-tag> -->
          {{ scope.row.status === 1 ? "成功" : "失败" }}
        </template>
      </el-table-column>

      <el-table-column prop="ip" label="操作IP" min-width="10" align="center" />

      <el-table-column prop="userAgent" label="User_Agent" min-width="10" align="center" show-overflow-tooltip />

      <el-table-column prop="gmtCreate" label="创建时间" min-width="10" sortable align="center" />

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
      operationQuery: {} // 条件封装对象
      // list: [
      //   {
      //     title: 'wuwu',
      //     operation: '导出',
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
    getList (current = 1) {
      this.current = current
      // log.getOperationListPage(this.current, this.limit, this.operationQuery).then(response => {
      //   if (response.data.rows == null) {
      //     this.getList(this.current - 1)
      //   }
      //   this.list = response.data.rows
      //   this.total = response.data.total
      // })
      log.getRecnetOperation().then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
        .catch((error) => {
          console.log(error)
        })
    },
    resetData () { // 清空的方法
      // 表单输入项数据清空
      this.operationQuery = {}
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
          '操作日志.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>
