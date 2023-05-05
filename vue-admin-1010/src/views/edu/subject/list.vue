<template>
  <div class="app-container">
    <el-input id="input" v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree ref="tree2" :data="data2" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree" default-expand-all />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'
import debounce from '@/utils/debounce'
export default {

  data () {
    return {
      filterText: '',
      data2: [], // 返回所有分类数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted () {
    // 防抖
    var els = document.querySelectorAll('#input')
    for (const el of els) {
      el.addEventListener('input', debounce(function (event) {
        console.log(event.target.value)
      }), 1000)
    }
  },
  created () {
    this.getAllSubjectList()
  },
  methods: {
    getAllSubjectList () {
      subject.getSubjectList()
        .then(response => {
          this.data2 = response.data.list
        })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
