<template>
  <div class="app-container">
    <!--查询表单-->
    <!-- <el-form :inline="true" class="demo-form-inline"> -->
    <!-- <el-form-item>
        <el-input v-model="bannerQuery.title" placeholder="图片名" />
      </el-form-item> -->

    <!-- <el-form-item>
        <el-select v-model="bannerQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item> -->

    <!-- <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button> -->
    <!-- </el-form> -->

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>

      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
          <!-- {{ scope.row.sort }} -->
          <!-- {{ (page - 1) * limit + scope.id + 1 }} -->
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="100" />

      <!-- <el-table-column label="头衔" width="100">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column> -->

      <!-- <el-table-column prop="intro" label="资历" width="200" /> -->
      <el-table-column prop="imageUrl" label="图片">
        <!-- <template slot-scope="scope" > -->
        <template scope="scope">
          <!-- <el-image v-for="(item, index) in scope.row.imageUrl" :key="index" :src="item.imageUrl" :preview-src-list="[item.image]" style="width: 30px; height: 30px" /> -->
          <img :src="scope.row.imageUrl" height="100%" width="100%">
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl" label="展示内容" width="150" />

      <el-table-column prop="gmtCreate" label="添加时间" width="200" />
      <el-table-column prop="gmtModified" label="修改时间" width="200" />

      <!-- <el-table-column prop="sort" label="展示序号" width="200" /> -->

      <!-- <el-table-column prop="sort" label="排序" width="60" /> -->

      <!-- <el-table-column prop="img" label="图片111" width="100">
        <template v-slot:default="scope">
          <el-image :src="scope.row.img" />
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/cms/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="demo-image">
      <div v-for="fit in fits" :key="fit" class="block">
        <span class="demonstration">{{ fit }}</span>
        <el-image :src="url" :fit="fit" style="width: 100px; height: 100px" />
      </div>
    </div> -->
    <!-- 分页 -->
    <el-pagination :page-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @page-change="getList" />
  </div>

</template>
<script>
// 引入调用banner.js文件
import banner from '@/api/banner'
export default {
  // 写核心代码
  data () {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      bannerQuery: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList (page = 1) {
      this.page = page
      banner.getBannerListPage(this.page, this.limit, this.courseQuery).then((response) => {
        if (response.data.items == null) {
          this.getList(this.page - 1)
        }
        this.list = response.data.items
        this.total = response.data.total
      })
        .catch((error) => {
          console.log(error)
        })
    },
    resetData () { // 清空的方法
      // 表单输入项数据清空
      this.bannerQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    removeDataById (id) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        banner.deleteBannerId(id)
          // eslint-disable-next-line no-unused-vars
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 回到列表页面
            this.getList()
          })
      }) // 点击取消，执行catch方法
    }
  }
}
</script>

