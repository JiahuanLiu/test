<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

        <el-form-item :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]" class="input-prepend restyle" prop="nickname">
          <div>
            <el-input v-model="params.nickname" type="text" id="input" placeholder="你的昵称" />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]" class="input-prepend restyle no-radius" prop="mobile">
          <div>
            <el-input v-model="params.mobile" type="text" id="input" placeholder="手机号" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]" class="input-prepend restyle no-radius" prop="code">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input v-model="params.code" type="text" id="input" placeholder="验证码" />
            <i class="iconfont icon-phone" />
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a :value="codeTest" href="javascript:" type="button" id="button" style="border: none;background-color: none" @click="getCodeFun()">{{ codeTest }}</a>
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]" class="input-prepend" prop="password">
          <div>
            <el-input v-model="params.password" type="password" id="input" placeholder="设置密码" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" id="button" class="sign-up-button" value="注册" @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <!-- <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i class="iconfont icon-weixin" /></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq" /></a></li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import registerApi from '@/api/register'
import debounce from '@/utils/debounce'
import throttle from '@/utils/throttle'
import CryptoJS from 'crypto-js'

const CRYPTOJSKEY = 'abcdefgabcdefg12'

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
  encrypt,
  layout: 'sign',
  data () {
    return {
      params: { // 封装注册输入数据
        mobile: '',
        code: '', // 验证码
        nickname: '',
        password: ''
      },
      sending: true, // 是否发送验证码
      second: 60, // 倒计时间
      codeTest: '获取验证码'
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
        console.log(event.target.value)
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
        console.log('11111')
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
    // 注册提交的方法
    submitRegister () {
      this.params.password = encrypt(this.params.password)
      registerApi.registerMember(this.params)
        .then(response => {
          // 提示注册成功
          // 消息提示组件
          this.$message({
            type: 'success',
            message: '注册成功'
          })
          // 跳转登录页面
          this.$router.push({ path: '/login' })
        })
    },
    // timeDown () {
    //   const result = setInterval(() => {
    //     --this.second
    //     this.codeTest = this.second
    //     if (this.second < 1) {
    //       clearInterval(result)
    //       this.sending = true
    //       // this.disabled = false;
    //       this.second = 60
    //       this.codeTest = '获取验证码'
    //     }
    //   }, 1000)
    // },
    // 验证码
    getPhoneMsg () {
      this.loading = true
      registerApi.sendCode(this.params.mobile).then(res => {
        if (this.canClick) return
        this.canClick = true
        this.btnText = this.totalTime + 's后重新发送'
        const clock = window.setInterval(() => {
          this.totalTime--
          this.btnText = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.btnText = '重新发送验证码'
            this.totalTime = 3
            this.canClick = false
          }
        }, 1000)
        const code = res.data.code
        if (code === 200) {
          this.$message.success('短信发送成功，请注意查看')
        } else {
          this.$message.error('短信发送失败，请稍后重试')
        }
        // console.log('公钥为：%s', data)
        // sessionStorage.setItem(PUBLICKEY, data) //公钥存入session
      })
      this.loading = false
    },
    // 通过输入手机号发送验证码
    getCodeFun () {
      registerApi.sendCode(this.params.mobile)
        .then(response => {
          this.sending = false
          // 调用倒计时的方法
          // this.timeDown()
          this.getPhoneMsg()
        })
    },

    checkPhone (rule, value, callback) {
      // debugger
      if (!(/^1[345789]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    }
  }
}
</script>

