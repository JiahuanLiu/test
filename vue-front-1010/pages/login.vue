<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <!-- v-model表单双向绑定，实时修改数据 -->
            <el-input type="text" id="input" placeholder="手机号" v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" id="input" placeholder="密码" v-model="user.password" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend" style="float:left;width:60%" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <div>
            <el-input maxlength="4" type="text" id="input" placeholder="请输入验证码" v-model="user.code" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <!-- <el-form-item> -->
        <div>
          <VerificationCode :changeCode.sync='identifyCode' ref="kei" @changeCode="changeCode"></VerificationCode>
        </div>
        <!-- </el-form-item> -->
        <div class="btn">
          <input type="button" id="button" class="sign-in-button" value="登录" @click="submitLogin()">
          <router-link to="/" tag="li" active-class="current" exact>
            <input type="button" id="button" class="sign-in-button" value="返回首页">
          </router-link>
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import cookie from 'js-cookie'
import loginApi from '@/api/login'
import debounce from '@/utils/debounce'
import throttle from '@/utils/throttle'
import CryptoJS from 'crypto-js'
const CRYPTOJSKEY = 'abcdefgabcdefg12'
import VerificationCode from '@/components/VerificationCode'
const encrypt = (plaintText) => {
  // var plaintText = plaintText
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }
  var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY)
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options)
  var encryptedBase64Str = encryptedData.toString()
  // encryptedBase64Str = encryptedBase64Str;
  return encryptedBase64Str
}
export default {
  components: {
    VerificationCode
  },
  encrypt,
  layout: 'sign',
  data () {
    return {
      identifyCode: '',
      identifyCodes: '0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ',
      // 封装登录手机号和密码对象
      user: {
        mobile: '',
        password: '',
        code: ''
      },
      // 用户信息
      loginInfo: {}
    }
  },
  mounted () {
    // 防抖
    var els = document.querySelectorAll('#input')
    // el.addEventListener('input', debounce(function (event) {
    //   console.log(event.target.value)
    // }), 1000)
    for (const el of els) {
      el.addEventListener('input', debounce(function (event) {
        // console.log(event.target.value)
      }), 1000)
    }
    // // 节流
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
        // console.log('11111')
        _throttle('节流节流')
      }
    }
  },
  create () {
    this.begin()
  },
  methods: {
    begin () {
      this.$router.go(0)
    },
    // 登录的方法
    submitLogin () {
      // 第一步 调用接口进行登录，返回token字符串
      // 验证码统一小写后判定
      this.user.code = this.user.code.toLowerCase()
      this.identifyCode = this.identifyCode.toLowerCase()
      // console.log(this.user.code)
      // console.log(this.identifyCode)
      this.user.password = encrypt(this.user.password)
      if (this.user.mobile !== '' && this.user.password !== '') {
        // if (this.user.mobile !== '' && this.user.password !== '') {
        if (this.checkPhone1(this.user.mobile)) {
          this.$message.error('手机号码格式不正确')
          this.user.password = ''
        } else if (this.user.code !== this.identifyCode) {
          this.$message.error('验证码错误')
          this.$refs.kei.changeCode()
          this.user.password = ''
        } else {
          loginApi.submitLoginUser(this.user)
            .then(response => {
              // console.log(123213123)
              // 第二步 获取token字符串放到cookie里面
              // 第一个参数cookie名称，第二个参数值，第三个参数作用范围
              // response对返回的数据进行了包装，数据字段在response.data中
              // 要获取数据时，要response.data.data
              // cookie.set('guli_token', response.data.data.token, { domain: 'localhost' })
              cookie.set('token', response.data.data.token, { domain: 'localhost' })
              // cookie.set('token', response.data.data.token, { domain: '47.113.224.91' })
              // console.log(123213123)
              // 第四步 调用接口 根据token获取用户信息，为了首页面显示
              loginApi.getLoginUserInfo()
                .then(response => {
                  // console.log(1)
                  this.loginInfo = response.data.data.userInfo
                  // console.log(this.loginInfo)
                  // console.log(1)
                  // 获取返回用户信息，放到cookie里面
                  cookie.set('guli_ucenter', this.loginInfo, { domain: 'localhost' })
                  // cookie.set('guli_ucenter', this.loginInfo, { domain: '47.113.224.91' })
                  // console.log(1)
                  // 跳转页面
                  window.location.href = '/'
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                })
            })
          // .catch(response => {
          //   this.$message.error(response)
          // })
        }
      } else {
        this.$message.error('缺少用户信息')
      }
    },
    checkPhone (rule, value, callback) {
      // debugger
      if (!(/^1[345789]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    },
    checkPhone1 (value) {
      // debugger
      if (!(/^1[345789]\d{9}$/.test(value))) {
        return 1
      }
      return 0
    }
  }
}
</script>
<style>
/* 表单校验失败的信息显示 */
.el-form-item__error {
  /* 在最上层显示 */
  z-index: 9999999;
}
</style>
