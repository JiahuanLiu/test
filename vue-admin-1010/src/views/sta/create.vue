<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="日期">
        <el-date-picker v-model="day" type="date" placeholder="选择要统计的日期" value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-button id="button" :disabled="btnDisabled" type="primary" @click="create()">生成</el-button>
    </el-form>

  </div>
</template>
<script>
import sta from '@/api/sta'
import throttle from '@/utils/throttle'
export default {
  data () {
    return {
      day: '',
      btnDisabled: false
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
    create () {
      sta.createStaData(this.day)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '生成数据成功'
          })
          // 跳转到图表显示页面
          this.$router.push({ path: '/sta/show' })
        })
    }
  }
}
</script>

