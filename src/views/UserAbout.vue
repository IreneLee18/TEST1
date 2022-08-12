<template>
  <LoadingView :active="isLoading"></LoadingView>
  <!-- <h1 class="container mb-2 fs-2">關於COFFEEEEE</h1> -->
  <div class="aboutMe">
    <div class="img-bg-top"></div>
    <div class="container h-100 position-relative">
      <div class="about-content">
        <p>嗨，我是COFFEEE。</p>
        <p>相信著許多人每天都要來一杯咖啡，而這就是我存在的目的。</p>
        <p>為了向大家分享我所喜愛的風味，也為了推廣很照顧我的前輩所建立的。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    loading () {
      this.isLoading = false
    }
  },
  created () {
    window.setTimeout(this.loading, 2000)
    window.scrollTo(0, 0)
  }
}
</script>
