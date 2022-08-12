<template>
  <LoadingView :active="isLoading"></LoadingView>
  <header>
    <!-- carousel -->
      <div id="carousel"
        class="carousel slide" data-bs-ride="carousel"
        ref="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="img-bg-top"></div>
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/irenelee-api/1657097373048.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=E0XxnPXOoGKgk%2Beeb98Ol%2Fn08h4rjepsdZu8kkTHnDJ39RrizqdFqRm11nzRtKE9kYFbtG9RUscBklzHZ4Tn0Zmh7M7MjJpOkK2gwsL6d7Li%2BPuiH3vdOkfWBAFeJJCo9dDHQcyTgxiIJL8LaRdDSuqiCTFYZ9bvFhfSbxgZj3JdwViDmR6Dw%2BqmZgpizJdbYFXjFfajYb3EKsFmQFEawNh7UWbIKv%2FE9DLZa2CTVVyhnj5ykfeGHNCdt6%2FiUJplI5ikU8dPCOVj2tgjqAfYlSdgTkx%2BLAaJ1JfvcvVI15Aly5diVt2tjuzsh09PibG53Rkn6Fl2UL3yLXDcFtIrnA%3D%3D" class="d-block w-100" alt="where there is coffee,there is way">
            <div class="position-absolute bottom-0 start-50 translate-middle-x w-100">
              <p class="font-Lobster text-center">Where there is coffee , there is way.</p>
            </div>
          </div>
          <div class="carousel-item">
            <div class="img-bg-top"></div>
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/irenelee-api/1657097410808.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dtvWUVEuh8XuWAAepp5kbiW4SWhajn1BCiMvoR5ICfYVvkDT09CFFY1fQxkP4DoeNGHsDZjuZdYSjRZPrKxs2n3VxTxv1D3O%2B7drF%2BwAcInfTFTCCoUWflnhrck6CDY%2FlVvocDCo%2BLqMVHFIOhB2G%2BWqsDqLEe0zEgRTMCQFlBrdz8y%2Fbry1We%2B%2F5c%2FP%2BqYvz9uLsmy4sGHvXd4EaWQWtEQLGZWK6QAgPiUhxQAyEUAfD9Mzwe%2FAIx0eTwLx7QVUpDXfJquhIHn5i1Y8SsZQPHYxJIgvjw2mzXiqOrbBEnjtkC0wE%2B2rH04j2eIIa3Ojk5klBNuFDjiKO3upjDQINw%3D%3D" class="d-block w-100" alt="life is like a cup of coffee">
            <div class="position-absolute bottom-0 start-50 translate-middle-x w-100">
              <p class="font-Lobster text-center">Life is like a cup of coffee.</p>
            </div>
          </div>
          <div class="carousel-item">
            <div class="img-bg-top"></div>
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/irenelee-api/1657097441189.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lZfqk1PxlrtIqmf5xh2R%2B3lj1bbvVID3OV2xpIM%2B7Jcj0Kwx1IqjZHa%2BhNUGem31OBVE4Ax%2BbAq16oy04I4Y84Dq8Yag6zi2RPZdxJd%2FoZ6yYB5FJkLVeLt30lsvMkuS5BsMVfq2WSUJOgJS9O2Zgf1MOVzZFiuM0NmD4qGtJabjQctwBXKW35Mb0uG%2BtdgQIkxuXlGNdPMsgMUk17CxDqc5SWkcvmFM6ReZDD0kWLruzt7STBjeUJ09AX3gPB4U1evKrDFBYdFwzU7OOU%2BZmokeuvBPZNzLemXn%2FSqAEo%2FYyDQL6CzT4Mq6RhU9oubC4guEm%2FsPuL0u%2FoMMybYtfw%3D%3D" class="d-block w-100" alt="a coffee a day keeps the doctor away">
            <div class="position-absolute bottom-0 start-50 translate-middle-x w-100">
              <p class="font-Lobster text-center">A coffee a day keeps the doctor away.</p>
            </div>
          </div>
          <div class="carousel-item">
            <div class="img-bg-top"></div>
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/irenelee-api/1657097424502.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Kasb9e%2BCZGhgQmrts2GgwhSrFvLKhAysXeJT5h9%2FhHqJixX8tK%2BbuE%2BptdL7xcCkfW%2F61b9sCvUqg4R89qqtXw8caAArknBh8i07ZbcjM62GUABlJZrX60VGJ2nUJznK0mqGW6OBitdfK6J57ZtV%2FsdZXuPPvgEnOghkWSVeme0gyKq15%2BfUcy6A8%2FPwe1AvDGdQfdKKEkiJailfPHnoiTRMFnPn28wcez6%2FoVVJ7SrXQCUJjapGh9rchHfLlyJL3Em%2F4dEgo2xiCi5wyKokZH9G2N%2FURQs1jHip1FoIHgdO4MmyCAgQCR8X23pafQwL%2BACmglFEJL28vAsmlWRDvw%3D%3D" class="d-block w-100" alt="coffee never goes out of fashion">
            <div class="position-absolute bottom-0 start-50 translate-middle-x w-100">
              <p class="font-Lobster text-center">Coffee never goes out of fashion.</p>
            </div>
          </div>
        </div>
      </div>
  </header>

  <section class="">
    <div class="goShopping">
      <div class="content">
        <router-link to="/products/全部商品"><p>來一杯咖啡<br>開啟美好的一天</p></router-link>
      </div>
    </div>
  </section>

  <section class="hotProduct">
    <h2 class="text-center fs-1 my-4">熱門商品</h2>
    <!-- carousel -->
    <div id="carousel"
      class="carousel slide" data-bs-ride="carousel"
      ref="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <router-link to="/products/咖啡豆">
            <div class="img-bg-top"></div>
            <img src="https://media.istockphoto.com/photos/isolated-coffee-beans-top-view-picture-id168797677?k=20&m=168797677&s=612x612&w=0&h=G14xCMy0lBdOmRuu2CnzR2pcSxEri-qyPmD_k1rQb9E=" class="d-block w-100" alt="咖啡豆">
            <div class="position-absolute top-50 start-50 translate-middle">
              <p class="font-Lobster">Coffee Bean</p>
            </div>
          </router-link>
        </div>
        <div class="carousel-item">
          <router-link to="/products/耳掛包">
            <div class="img-bg-top"></div>
            <img src="https://www.zhanlu.com.tw/wp-content/uploads/2020/05/dfc54292dc07b7eea9c44864b9c695cd.jpg" class="d-block w-100" alt="耳掛包">
            <div class="position-absolute top-50 start-50 translate-middle">
              <p class="font-Lobster">Drip Bag Coffee</p>
            </div>
          </router-link>
        </div>
        <div class="carousel-item">
          <router-link to="/products/咖啡器具">
            <div class="img-bg-top"></div>
            <img src="https://images.unsplash.com/photo-1568431710123-a7e75af79e8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" class="d-block w-100" alt="咖啡器具">
            <div class="position-absolute top-50 start-50 translate-middle">
              <p class="font-Lobster">Coffee Maker
  </p>
            </div>
          </router-link>
        </div>
        <div class="carousel-item">
          <router-link to="/products/杯子">
            <div class="img-bg-top"></div>
            <img src="https://images.unsplash.com/photo-1510682999913-847a6d3cf221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" class="d-block w-100" alt="杯子">
            <div class="position-absolute top-50 start-50 translate-middle">
              <p class="font-Lobster">Coffee Cup</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>

</template>
<style lang="scss">
header{
  img{
    object-fit: cover;
    height: 40vh;
    @media (min-width:992px){
      height: calc(100vh - (v-bind(deskTop)));
      margin-top: 0;
    }
  }
  p{
    font-size: 36px;
    color: #fff;
    @media (min-width:768px){
      font-size: 52px;
    }
    @media (min-width:992px){
      font-size: 72px;
    }
  }
}
.carousel-item{
    position: relative;
  .img-bg-top{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(220, 221, 223, 0.3)
  }
  p{
    font-size: 36px;
    @media (min-width:768px){
      font-size: 52px;
    }
    @media (min-width:992px){
      font-size: 72px;
    }
  }
}
.hotProduct{
  img{
    object-fit: cover;
    height: 40vh;
    @media (min-width:992px){
      height: calc(100vh - (v-bind(deskTop)) - 48px - 1.5rem);
    }
  }
  .carousel-item{
    p{
      color: #53565C;
    }
    .img-bg-top{
      transition: background-color .4s;
    }
    &:hover{
      p{
        color: #fff !important;
      }
      .img-bg-top{
        background-color: rgb(220, 221, 223, 0.5) !important;
      }
    }
  }
}

.goShopping{
  background-image: url(https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);
  // background-attachment: fixed;
  background-size: 280%;
  background-position: 37% -91%;
  margin-top: 4.5rem;
  position: relative;
  height: 40vh;
  @media (min-width:768px){
    background-size: 180%;
    background-position: 32% 76%;
    margin-top: 6rem;
  }
  @media (min-width:992px){
    height: calc(100vh - (v-bind(deskTop)));
    background-size: 120%;
    background-position: 47% 82%;
  }
  .content{
    width: 100%;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
    text-align: center;
    font-size: 36px;
    p{
      color: #fff;
      text-shadow: 10px 10px 3px #53565C;
      transition: text-shadow .4s;
    }
    @media (min-width:768px){
      font-size: 52px;
      right: 6%;
      transform: translateY(-50%);
      text-align: end;
    }
    @media (min-width:992px){
      font-size: 72px;
      // right: 2%;
    }
    &:hover{
      p{
        text-shadow: 10px 20px 3px #53565C;
      }
    }
  }
}
</style>
<script>
import Carousel from 'bootstrap/js/dist/carousel'
export default {
  data () {
    return {
      carousel: {},
      isLoading: true,
      deskTop: '121px'
    }
  },
  methods: {
    loading () {
      this.isLoading = false
    },
    navbarScroll () {
      if (window.screen.width >= 992) {
        if (window.scrollY !== 0) {
          this.deskTop = '76px'
        } else {
          this.deskTop = '121px'
        }
      }
    }
  },
  created () {
    this.carousel = new Carousel(this.$refs.carousel)
    window.setTimeout(this.loading, 2000)
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.navbarScroll)
  }
}
</script>
