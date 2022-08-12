<template>
  <button class="icon-btn position-fixed bottom-5 end-5" style="z-index:1;"
    data-bs-toggle="tooltip" data-bs-placement="top" title="To Top"
    ref="tooltip"
    :class="{'d-none':toTopBtn}"
    @click.prevent="scrollToTop"
  >
  <i class="bi bi-arrow-up-circle"></i>
  </button>

  <Navbar></Navbar>
  <div class="container-fluid mt-10 mt-md-5">
    <Toast-list></Toast-list>
    <router-view />
  </div>

</template>

<script>
import emitter from '@/methods/emitter'
import Navbar from '@/components/NavBar.vue'
import ToastList from '@/components/ToastList.vue'
import ToolTip from '@/mixins/ToolTip'
export default {
  components: {
    Navbar,
    ToastList
  },
  provide () {
    return {
      emitter
    }
  },
  mixins: [ToolTip],
  data () {
    return {
      bar: '',
      toTopBtn: true
    }
  },
  methods: {
    scroll () {
      if (window.scrollY >= 334) {
        this.toTopBtn = false
      } else {
        this.toTopBtn = true
      }
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    showbar (item) {
      this.bar = item
    }
  },
  created () {
    window.addEventListener('scroll', this.scroll)
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    // console.log(token)
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login')
        }
        this.$message('success', '登入成功')
      })
      .catch((err) => console.log(err.response))
  }
}
</script>
