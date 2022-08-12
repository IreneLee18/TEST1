<template>
  <LoadingView :active="isLoading"></LoadingView>
  <!-- when scroll down can't see addOrderBtn then show this cart btn -->
  <button class="scrollCart icon-btn z-index fs-5"
    :class="{'d-none':scrollCart}"
    @click.prevent="addOrder"
  >
    <i class="bi bi-cart2"></i>
  </button>
  <template v-if="!haveProduct">
    <div class="position-relative not-found-height">
      <h2 class="not-found-category top-40">不存在該商品唷！</h2>
    </div>
  </template>
  <!-- top -->
  <main class="product-detail" v-else>
    <div class="container">
      <!-- link: home / all product / same category product / current product-->
      <div class="mb-4">
        <router-link to="/" class="text-primary">首頁</router-link>
        <span class="px-2">></span>
        <router-link to="/products/全部商品"  class="text-primary">全部商品</router-link>
        <span class="px-2">></span>
        <router-link :to="`/products/${product.category}`" class="text-primary">{{ product.category }}</router-link>
        <span class="px-2">></span>
        <span class="text-primary">{{ product.title }}</span>
      </div>
      <!-- phone & paid size title & price -->
      <div class="smallSizeTitle mb-3">
        <h1 class="fs-3 mt-4 mb-2"><span>{{ product.title }}</span></h1>
        <p class="fs-5 text-danger mb-2">NT$ {{ product.price }}</p>
        <small class="bg-secondary opacity text-primary py-1 px-2 me-2">{{product.category}}</small>
        <small class="bg-danger opacity text-white py-1 px-2 me-2">滿NT$5,000免運</small>
        <small class="bg-danger opacity text-white py-1 px-2"
          v-if="product.origin_price !== product.price"
        >特價中</small>
      </div>
      <div class="row g-0 justify-content-between">
        <div class="main col-12 col-lg-7 g-0 mb-4">
          <!-- current image & zoom-in picture -->
          <div class="position-relative overflow-hidden zoom-in h-70"
            @mousemove="zoomInImage($event)"
            @mouseenter="zoomIn.show=true"
            @mouseleave="zoomIn.show=false"
            @click.prevent="showImage"
          >
          <img :src="currentImage"  :alt="currentImage"
            class="h-100 w-100" :class="{'opacity-0':zoomIn.show}"
          >
          <img :src="currentImage" :alt="currentImage"
            class="currentImage-zoon-in"
            :class="{'opacity-100':zoomIn.show}"
            :style="{'top':`${zoomIn.offestY}px`,'left':`${zoomIn.offestX}px`}"
          >
          </div>
          <!-- select images -->
          <ul class="list-unstyled d-flex border overflow-scroll p-2">
            <li class="images col-6 col-md-4 col-lg-3"
              :class="{'opacity-50':currentImage === picture}"
              v-for="(picture, index) in images"
              :key="picture+index"
            >
              <img :src="picture" :alt="index"
                class="w-100 h-100 pointer"
                @click="changeImage(picture)"
              >
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-4 mb-4">
          <!-- desk size title & price -->
          <div class="deskSizeTitle">
            <h1 class="fs-3 mt-4 mb-2"><span>{{ product.title }}</span></h1>
            <small class="bg-secondary opacity text-primary py-1 px-2 me-2">{{product.category}}</small>
            <small class="bg-danger opacity text-white py-1 px-2 me-2">滿NT$5,000免運</small>
            <small class="bg-danger opacity text-white py-1 px-2"
              v-if="product.origin_price !== product.price"
            >特價中</small>
            <div class="d-flex align-items-center">
              <p class="fs-5 text-danger my-2 me-2">NT$ {{ product.price }}</p>
              <p class="fs-6 text-secondary my-2 text-decoration-line-through" v-if="product.price!==product.origin_price">NT$ {{ product.origin_price }}</p>
            </div>
          </div>
          <!-- content -->
          <div class="detail-description-mark px-4 py-3 my-3 mt-md-0">
            <p>{{ product.content }}</p>
          </div>
          <!-- description -->
          <ul class="detail-description-mark px-4 py-3 list-unstyled">
            <li class="row" v-for="item in product.description" :key="item">
              <div class="col-4 col-md-2 col-lg-3">{{item.title}}</div>
              <div class="col-1">：</div>
              <div class="col-7">{{item.content}}</div>
            </li>
          </ul>
          <!-- select quantity -->
          <div class="quantity-group mb-3 fs-5">
            <input type="button" class="py-1" value="-" style="width:10%;"
              @click.prevent="slesctOrderNum(quantity-1)"
            >
            <input type="number" class="py-1" v-model="quantity" style="width:80%;">
            <input type="button" class="py-1" value="+" style="width:10%;"
              @click.prevent="slesctOrderNum(quantity+1)"
            >
          </div>
          <!-- add order -->
          <button class="w-100 border-0 rounded-2 bg-primary text-white mb-3 py-1" @click="addOrder">
            <i class="bi bi-cart2 ps-3 fs-4 pointer"></i>
            <span class="ms-2">加入購物車</span>
          </button>
          <!-- like & share btn -->
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center pointer"
              @click="likeProduct"
            >
              <i class="bi bi-chat-heart fs-4" v-if="!like"></i>
              <i class="bi bi-chat-heart-fill fs-4" v-else></i>
              <span class="text-secondary ms-2">LIKE</span>
            </div>
            <div class="d-flex align-items-center pointer" id="shareUrl"
              @click="shareProduct" :data-clipboard-text="currentUrl"
            >
              <i class="bi bi-share fs-4"></i>
              <span class="text-secondary ms-2">SHARE</span>
            </div>
          </div>
          <small class="text-secondary" v-if="product.hasOwnProperty('referenceUrl')">參考來源：<a :href="product.referenceUrl" target="blank" class="text-decoration-underline">連結</a>
          </small>
        </div>
      </div>
      <div class="row">
        <!-- buy information -->
        <div class="col-12 position-relative mb-7">
          <h2 class="fs-3">購買資訊</h2>
          <p class="mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam esse nobis doloremque delectus ullam iure, numquam quis omnis, distinctio mollitia blanditiis sapiente quod adipisci nesciunt autem deserunt culpa velit illo sed magnam ex? Eveniet sunt commodi et molestiae cumque exercitationem fuga voluptas ipsam, illum consectetur excepturi totam accusantium earum, voluptatem perspiciatis! Asperiores, similique. Qui, sint! Quibusdam dolores aliquam, nesciunt repellendus magni voluptate minus, eum eius maxime impedit, ipsam consectetur dolore delectus. A earum sunt nostrum nam ad placeat labore recusandae provident est? Officia reiciendis, incidunt minima in ipsa quae et eaque nam exercitationem. Incidunt explicabo tempore dolore accusantium eveniet ullam?</p>
        </div>
        <!-- delivery information -->
        <div class="col-12 position-relative mb-7">
          <h2 class="fs-3">配送資訊</h2>
          <p class="mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam esse nobis doloremque delectus ullam iure, numquam quis omnis, distinctio mollitia blanditiis sapiente quod adipisci nesciunt autem deserunt culpa velit illo sed magnam ex? Eveniet sunt commodi et molestiae cumque exercitationem fuga voluptas ipsam, illum consectetur excepturi totam accusantium earum, voluptatem perspiciatis! Asperiores, similique. Qui, sint! Quibusdam dolores aliquam, nesciunt repellendus magni voluptate minus, eum eius maxime impedit, ipsam consectetur dolore delectus. A earum sunt nostrum nam ad placeat labore recusandae provident est? Officia reiciendis, incidunt minima in ipsa quae et eaque nam exercitationem. Incidunt explicabo tempore dolore accusantium eveniet ullam?</p>
        </div>
        <!-- recommend product -->
        <div class="col-12 position-relative mb-7">
          <h2 class="recommendInformation fs-3">推薦商品</h2>
          <ul class="list-unstyled d-flex overflow-scroll mt-4 pe-2 py-2 mb-0 pb-lg-0">
            <li class="recommendProduct col-6 col-md-4 col-lg-3 pe-3 pointer position-relative"
              v-for="(item,index) in sameCategoryProduct" :key="item.id"
                @click.prevent="changeProductPage(item.id)"
            >
              <div class="box-shadow">
                <img class="rounded-2 w-100 h-70" :src="item.imageUrl" :alt="index">
              </div>
              <span class="border border-danger text-danger p-1 position-absolute top-5" style="right:1rem;" v-if="item.origin_price!==item.price">SALE</span>
              <h3 class="fs-6 mt-3">{{item.title}}</h3>
              <p class="text-danger">NT${{item.price}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
  <image-modal :image="currentImage" ref="imageModal"></image-modal>
</template>

<style lang="scss">
.scrollCart{
  width: 60px;
  height: 60px;
  background-color: rgb(220, 221, 223,0.5);
  box-shadow: 0px 5px 10px rgb(83, 86, 92,0.3);
  border-radius: 50%;
  position: fixed;
  bottom: 20%;
  right: 2%;
  transition: color .4s;
  i{
    font-size: 24px;
  }
  &:hover{
    color:#fff;
  }
}

.not-found-height{
  height: calc(100vh - 57.44px);
  @media (min-width:768px){
    height: calc(100vh - 45px - 66.28px);
  }
  @media (min-width:992px) {
    height: calc(100vh - 45px - 76px);
  }
}

.product-detail{

  .main{
    height: calc(100vh - 57.44px - 48px - 113.66px);
    @media (min-width:768px){
      height: calc(100vh - 112.45px - 48px - 116.48px);
    }
    @media (min-width:992px) {
      height: calc(100vh - 121px);
    }
  }

  .currentImage-zoon-in{
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    opacity: 0;
  }

  .images{
    margin-left: .5rem;
    &:first-child{
      margin-left: 0;
    }
  }

  .smallSizeTitle{
    display: block;
    @media (min-width:992px) {
      display: none;
    }
  }

  .deskSizeTitle{
    display: none;
    position: relative;
    // &::after{
    //   content: '';
    //   position: absolute;
    //   top: -5%;
    //   left: 50%;
    //   height: 80vh;
    //   width: 90%;
    //   background-color: rgb(220, 221, 223, .2);
    //   border-radius: 50%;
    //   z-index: -20000;
    //   transform: rotate(22deg) translateX(-50%);
    // }
    @media (min-width:992px) {
      display: block;
    }
  }

  .detail-description-mark{
    position: relative;
    p{
      height: 100px;
      overflow: scroll;
      margin: 0;
    }
    &::before,&::after{
      content: '';
      height: 20px;
      width: 20px;
      }
    &::before{
      border-top: 4px solid #DCDDDF;
      border-left: 4px solid #DCDDDF;
      position: absolute;
      top: 0;
      left: 0;
    }
    &::after{
      border-bottom: 4px solid #DCDDDF;
      border-right: 4px solid #DCDDDF;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .recommendProduct{
    span{
      transition: opacity .5s;
    }
    .box-shadow{
      transition: .4s;
      transition-delay: .2s;
    }
    &:hover{
      img{
        animation: flip 1.5s;
      }
      span{
        opacity: 0;
      }
      .box-shadow{
        box-shadow: 0px 0px 0px transparent;
      }
    }
  }

}
</style>

<script>
import imageModal from '@/components/FullImageModal.vue'
import Clipboard from 'clipboard'

export default {
  components: {
    imageModal
  },
  data () {
    return {
      isLoading: false,
      scrollCart: true,
      currentUrl: '',
      id: '',
      product: {},
      allProduct: [],
      images: [],
      currentImage: '',
      zoomIn: {
        offestX: -125,
        offestY: 0,
        show: false
      },
      quantity: 1,
      like: false,
      heartAry: []
    }
  },
  inject: ['emitter'],
  methods: {
    scroll () {
      if (window.scrollY >= 334) {
        this.scrollCart = false
      } else {
        this.scrollCart = true
      }
    },
    getProductDetail () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.product = res.data.product
            if (res.data.product.images) {
              this.images = res.data.product.images
            }
            this.images.unshift(res.data.product.imageUrl)
            this.currentImage = res.data.product.imageUrl
            this.currentUrl = window.location.href
          }
        })
        .catch((err) => console.log(err.response))
    },
    getAllProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.allProduct = res.data.products
          }
        })
        .catch((err) => console.log(err))
    },
    zoomInImage (e) {
      this.zoomIn.offestX = -e.clientX
      this.zoomIn.offestY = e.clientY - 600
      // console.log(this.offestX, this.offestY)
    },
    changeImage (picture) {
      this.currentImage = picture
    },
    showImage () {
      this.$refs.imageModal.showModal()
    },
    addOrder () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: this.product.id,
        qty: this.quantity
      }
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.$message('success', res.data.message)
        })
    },
    slesctOrderNum (item) {
      this.quantity = item > 1 ? item : 1
      // 設定預設為1，防止點擊到小於1，或輸入1以下得數字，導致計算出錯。
    },
    likeProduct () {
      if (this.like) {
        const removeHeart = this.heartAry.find((item) => item.id === this.id)
        this.heartAry.splice(this.heartAry.indexOf(removeHeart), 1)
        localStorage.setItem('heart', JSON.stringify(this.heartAry))
        this.$message('danger', '已刪除我的最愛')
      } else {
        this.heartAry.push(this.product)
        localStorage.setItem('heart', JSON.stringify(this.heartAry))
        this.$message('success', '已加入我的最愛')
      }
      this.getHeart()
    },
    getHeart () {
      this.heartAry = JSON.parse(localStorage.getItem('heart')) || []
      this.emitter.emit('add-heart', this.heartAry)
      if (localStorage.getItem('heart').indexOf(this.id) !== -1) {
        this.like = true
      } else {
        this.like = false
      }
    },
    shareProduct () {
      const clipboard = new Clipboard('#shareUrl') // 这里括号里填写上面点击事件绑定的class名
      clipboard.on('success', e => {
        // console.log('text', e.text)
        this.$message('success', '複製成功')
        // 釋放內存
        clipboard.destroy()
      })
      clipboard.on('error', () => this.$message('danger', '複製失敗！請再嘗試看看！或手動複製！'))
    },
    changeProductPage (id) {
      // 切換頁面
      this.$router.push(`/product-detail/${id}`)
      // 賦予新的id並再次呼叫getProductDetail來取得資料
      this.id = id
      this.getProductDetail()
      scrollTo(0, 0)
    }
  },
  computed: {
    sameCategoryProduct () {
      const sameCategoryProduct = []
      const product = this.allProduct
      product.forEach((data) => {
        if (data.category === this.product.category && data.title !== this.product.title) {
          sameCategoryProduct.push(data)
        }
      })
      return sameCategoryProduct
    },
    haveProduct () {
      // const havProductAry = []
      let haveProduct = false
      const product = this.allProduct
      product.forEach((data) => {
        this.isLoading = false
        if (data.id === this.id) {
          haveProduct = true
        }
      })
      return haveProduct
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getProductDetail()
    this.getAllProduct()
    this.getHeart()
    window.addEventListener('scroll', this.scroll)
  }
}
</script>
