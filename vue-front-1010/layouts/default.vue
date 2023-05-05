<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/" title="极客学院">
            <img src="~/assets/img/logo1.png" width="100%" alt="极客学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav" style="margin-left:-15px">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/teacher2" tag="li" active-class="current">
              <a>证书</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/tutor" tag="li" active-class="current">
              <a>用户指南</a>
            </router-link>
            <router-link v-if="loginInfo.id" to="/ucenter" tag="li" active-class="current">
              <a>个人中心</a>
            </router-link>
            <!-- <router-link to="/ucenter" tag="li" active-class="current">
              <a>个人中心</a>
            </router-link> -->
          </ul>
          <!-- / nav -->
          <!-- / nav -->
          <ul class="h-r-login">
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
            <!-- 如果没有loginInfo.id，表示未登录 -->
            <!-- 页面显示登录和注册 -->
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <!-- <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li> -->
            <!-- 如果有loginInfo.id，表示已登录 -->
            <!-- 显示用户名和退出 -->
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt>
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <!-- <form :action="baseURL + '/eduoss/fileoss'" method="post"> -->
              <!-- <label class="h-r-s-box" v-if=" this.$route.path === '/techer2'">
                <input type="text" placeholder="输入你想学的证书" v-model="keyword" value>
                <button type="submit" class="s-btn" @click="handSearch1()">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label> -->

              <label class="h-r-s-box" v-if="this.$route.path.includes('/teacher2')">
                <input type="text" placeholder="输入你想学的证书" v-model="keyword" value>
                <!-- <button type="submit" class="s-btn" @click="handSearch()"> -->
                <button type="submit" class="s-btn" @click="handSearch()">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
              <label class="h-r-s-box" v-else>
                <input type="text" placeholder="输入你想学的证书" v-model="keyword" value>
                <nuxt-link :to="{ path: '/teacher2',query:{keyword: this.keyword},params: {keyword: this.keyword}}" target='_self' tag="a">
                  <button type="submit" class="s-btn">
                    <em class="icon18">&nbsp;</em>
                  </button>
                </nuxt-link>
              </label>

            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt />
    <div v-html="str"></div>
    <div v-html="str"></div>
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <!-- <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4> -->
          <ul class="of flink-list">
            <!-- <li>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank">用户指南</a>
            </li> -->
            <router-link to="/tutor" tag="li" active-class="current">
              <a title="用户指南" style="color:white;font-size: 120%;">用户指南</a>
            </router-link>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-8465416549(成都)</span>
                <span>Email：keikei@163.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2022课程版权均归极客学院所有 京ICP备129846542号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import '~/assets/css/pages-weixinpay.css'
import request from '@/utils/request'

import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
  data () {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      },
      str: '',
      baseURL: '',
      keyword: ''
    }
  },
  created () {
    this.baseURL = request.defaults.baseURL
    // 获取路径里面token值
    // this.token = this.$route.query.token
    this.token = cookie.get('token')
    // console.log(this.token)
    if (this.token) { // 判断路径是否有token值
      this.wxLogin()
    }
    this.showInfo()
  },
  methods: {
    // 微信登录显示的方法
    wxLogin () {
      // console.log('************'+this.token)
      // 把token值放到cookie里面
      cookie.set('token', this.token, { domain: 'localhost' })
      cookie.set('guli_ucenter', '', { domain: 'localhost' })
      // cookie.set('token', this.token, { domain: '47.113.224.91' })
      // cookie.set('guli_ucenter', '', { domain: '47.113.224.91' })
      // console.log('====='+cookie.get('guli_token'))
      // 调用接口，根据token值获取用户信息
      loginApi.getLoginUserInfo()
        .then(response => {
          // console.log('################'+response.data.data.userInfo)
          this.loginInfo = response.data.data.userInfo
          cookie.set('guli_ucenter', this.loginInfo, { domain: 'localhost' })
          // cookie.set('guli_ucenter', this.loginInfo, { domain: '47.113.224.91' })
        })
    },
    // 创建方法，从cookie获取用户信息
    showInfo () {
      // 从cookie获取用户信息
      var userStr = cookie.get('guli_ucenter')
      // 把字符串转换json对象(js对象)
      if (userStr) {
        this.loginInfo = userStr
        // console.log(this.loginInfo)
        // console.log({ 1: 2, 3: 4 })
      }
    },

    // 退出
    logout () {
      // 清空cookie值
      cookie.set('token', '', { domain: 'localhost' })
      // cookie.set('token', '', { domain: '47.113.224.91' })
      cookie.set('guli_ucenter', '', { domain: 'localhost' })
      // cookie.set('guli_ucenter', '', { domain: '47.113.224.91' })
      // 回到首页面
      window.location.href = '/'
    },

    handSearch () {
      // this.$router.push('/teacher2')
      // this.$router.go(0)
      // this.$router.push({
      //   path: '/teacher2/', query: { keyword: this.keyword },
      //   params: {
      //     keyword: this.keyword
      //   }
      // })
      this.$router.push('/teacher2')
      this.$router.push({
        path: '/teacher2/', query: { keyword: this.keyword },
        params: {
          keyword: this.keyword
        }
      })
    }
    // handSearch1 () {
    //   this.$router.push('/teacher2')
    //   // this.$router.go(0)
    //   this.$router.push({
    //     path: '/teacher2/', query: { keyword: this.keyword },
    //     params: {
    //       keyword: this.keyword
    //     }
    //   })
    //   console.log(656)
    // }

  }
}
</script>
