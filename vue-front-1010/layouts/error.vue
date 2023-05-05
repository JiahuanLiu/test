<template>

  <!-- <body> -->
  <div class="_404">
    <h2 class="m-0">抱歉，页面未找到，<span>{{countDown}}</span>s后自动跳转到
      <a href="javascript:;" @click="goHome">首页</a>
    </h2>
    <img src="~/assets/img/403.png" alt="页面未找到">
  </div>
  <!-- </body> -->

</template>
<script>
export default {
  props: ['error'],
  name: 'NF404',
  data () {
    return {
      countDown: 5
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  },
  created () {
    setInterval(() => {
      this.countDown > 0 ? this.countDown-- : this.$router.push('/')
    }, 1000)
  }
}
</script>

<style scoped>
body {
  background-color: #dceebc;
}

._404 {
  width: 30%;
  margin: 5rem auto;
}

._404 img {
  width: 30rem;
}

._404 a {
  color: #010101;
}

._404 a:hover {
  color: skyblue;
}
</style>

