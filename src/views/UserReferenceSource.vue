<template>
  <LoadingView :active="isLoading"></LoadingView>
  <div class="reference-bg">
    <div class="reference-bg-top"></div>
    <div class="container">
      <h1 class="referenceTitle z-index">參考來源</h1>
      <div class="referenceSource-bg">
        <div class="referenceSource-bg-top"></div>
      </div>
      <div class="referenceContent border border-white rounded-3 mt-4 p-4 p-lg-7">
        <div class="referenceContent-bg-top"></div>
        <div class="z-index" v-for="item in reference" :key="item.id">
          <h2>{{ item.title }}：
            <a :href="item.url" target="_blank">{{ item.shopName }}</a>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true,
      reference: [
        {
          id: 1,
          title: '照片',
          shopName: 'Unsplash',
          url: 'https://unsplash.com/'
        },
        {
          id: 2,
          title: '產品杯子',
          shopName: '小器',
          url: 'https://www.thexiaoqi.com/'
        },
        {
          id: 3,
          title: '產品器具',
          shopName: '小器',
          url: 'https://www.thexiaoqi.com/'
        },
        {
          id: 4,
          title: '產品咖啡豆',
          shopName: 'JackCoffee',
          url: 'https://www.instagram.com/jackcoffee___/'
        },
        {
          id: 5,
          title: '產品耳掛包',
          shopName: 'JackCoffee',
          url: 'https://www.instagram.com/jackcoffee___/'
        }
      ]
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
