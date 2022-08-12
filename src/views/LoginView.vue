<template>
  <div class="vh-100 login-bg">
    <router-link to="/" class="goHomePage">
      <i class="fs-1 bi bi-house-door"></i>
      <span class="fs-1">返回首頁</span>
    </router-link>
    <div class="container">
      <form class="row"
        @submit.prevent="signIn"
      >
        <div class="col-11 col-md-6 rounded-3 p-4 position-absolute top-50 start-50 translate-middle" style="background:rgba(255,255,255,.3);">
          <h1 class="h3 mb-3 font-weight-normal">管理者登入</h1>
          <div class="mb-2">
            <label for="inputEmail" class="sr-only mb-2 text-primary">信箱｜Email</label>
            <input type="email" id="inputEmail" class="form-control" required autofocus
              v-model="user.username" />
          </div>
          <div class="mb-2 position-relative">
            <label for="inputPassword" class="sr-only mb-2 text-primary">密碼｜Password</label>
            <input :type="type" id="inputPassword" class="form-control" required
              v-model="user.password" />
              <i class="bi bi-eye-slash pointer" v-if="type==='password'" @click="changeType('password')"></i>
              <i class="bi bi-eye pointer" v-else @click="changeType('text')"></i>
          </div>
          <div class="mb-2 checkbox">
            <label for="rememberMe">
              <input type="checkbox" id="rememberMe" v-model="remember">
              <span>記住我</span>
            </label>
          </div>

          <div class="text-center">
            <button class="btn btn-lg btn-primary w-100 mb-2" type="submit">
              登入
            </button>
            <a href="" class="text-dark" @click.prevent="forgotPsw">忘記密碼｜Forgot your password？</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
  .login-bg{
    /* background: linear-gradient(45deg,#53565c, #dcdddf); */
    background-image: url(https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);
    background-size: cover;
    background-position: bottom;
  }
  .goHomePage{
    color: #53565C;
    padding: 1rem;
    position: relative;
    i{
      position: absolute;
      left: 1rem;
      transition: all .3s;
    }
    span{
      opacity: 0;
      transition: all .3s;
    }
    &:hover{
      color: #fff;
      i{
        opacity: 0;
        right: 0;
      }
      span{
        opacity: 1;
      }
    }
  }
  .bi-eye-slash,.bi-eye{
    position: absolute;
    top: 39px;
    right: 10px;
  }
</style>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      type: 'password',
      remember: false
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `myToken=${token};expires=${new Date(expired)}`
            // console.log(token, expired, new Date(expired)) // 在設定之前可以先看是否有取得到資料
            this.$router.push('/dashboard')
            if (this.remember) {
              localStorage.setItem('rememberMe', JSON.stringify(this.user))
              localStorage.setItem('rememberMeCheck', JSON.stringify(this.remember))
            }
          }
        })
        .catch((err) => console.log(err.response))
    },
    forgotPsw () {
      alert('Hi！Irene～忘記密碼了是嗎？去翻翻你的記事本會找到密碼的：）')
    },
    changeType (type) {
      if (type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('rememberMe')) || {}
    this.remember = JSON.parse(localStorage.getItem('rememberMeCheck')) || false
  }
}
</script>
