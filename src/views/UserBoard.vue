<template>
  <button class="scrollTopBtn icon-btn z-index fs-5"
    :class="{'d-none':toTopBtn}"
    @click.prevent="scrollToTop"
  >
  </button>

  <!-- navbar  -->
  <nav class="userNav sticky-top" :class="{'d-none':deskTop}">
    <div class="d-flex justify-content-between align-items-center"
      :class="{'justify-content-md-center':pad}"
    >
      <a href="#" class="nav-link" :class="{'d-md-none':pad}"
        @click.prevent="bar=!bar"
      ><i class="bi bi-list"></i></a>
      <div class="d-flex align-items-center">
        <router-link to="/" class="nav-link font-RubikMoonrocks fs-1">COFFEEEEE</router-link>
      </div>
      <div class="heartANDcard" :class="{'heartANDcard-poesiotn-absolute':pad}">
        <div class="dropdown" ref="dropdown" @click="this.$refs.dropdown.showDropdown">
          <div id="heartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="nav-link pointer position-relative">
              <i class="bi bi-suit-heart"></i>
              <div class="heart-length" :class="{'d-none':heart.length===0}"><div>{{heart.length}}</div></div>
            </div>
          </div>
          <ul class="dropdown-menu px-3" aria-labelledby="heartDropdown">
            <li class="mt-2 mb-9" :class="{'d-none':heart.length!==0}">
              <router-link to="/products/全部商品"><p class="mb-2 text-center">還未有我的最愛</p>
              <p class="text-center">快去新增一些吧！</p></router-link>
              </li>
            <li class="row border-bottom pb-2 mb-2" v-for="item in heart" :key="item.id">
                <div class="col-3 h-100">
                  <img class="w-100 h-100" :src="item.imageUrl" :alt="item.id">
                </div>
                <div class="col-6 d-flex align-items-center">
                  <router-link class="heart-title ps-0" :to="`/product-detail/${item.id}`">{{item.title}}</router-link>
                  </div>
                <div class="col-3 d-flex justify-content-between align-items-center">
                  <i class="bi bi-cart ps-3 pointer"
                    :data-id="item.id"
                    @click="addProduct(item.id)"
                  ></i>
                  <i class="bi bi-trash pointer"
                    @click="removeHeart(item)"
                  ></i>
                </div>
            </li>
          </ul>
        </div>
        <router-link to="/cart" class="nav-link">
          <i class="bi bi-bag"></i>
        </router-link>
      </div>
    </div>
    <div class="product-link d-flex flex-column align-items-center justify-content-center" :class="{'d-none':bar,'d-md-flex':pad,'flex-md-row':pad}">
      <router-link :to="tab.url" class="mx-3" v-for="tab in tabs" :key="tab">{{tab.title}}</router-link>
    </div>
  </nav>

  <!-- navbar scroll -->
  <nav class="userNav sticky-top" :class="{'d-none':!deskTop}">
    <div class="container">
      <div class="d-flex align-items-center position-relative">
        <router-link to="/" class="nav-link font-RubikMoonrocks fs-1 ps-0">COFFEEEEE</router-link>
        <div class="product-link">
          <router-link :to="tab.url" class="mx-3" v-for="tab in tabs" :key="tab">{{tab.title}}</router-link>
        </div>
        <div class="d-flex position-absolute top-25 end-0">
          <div class="dropdown" ref="dropdown" @click="this.$refs.dropdown.showDropdown">
          <div id="heartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="nav-link pointer position-relative">
              <i class="bi bi-suit-heart"></i>
              <div class="heart-length" :class="{'d-none':heart.length===0}"><div>{{heart.length}}</div></div>
            </div>
          </div>
          <ul class="dropdown-menu px-3" aria-labelledby="heartDropdown">
            <li class="mt-2 mb-3" :class="{'d-none':heart.length!==0}">
              <router-link to="/products/全部商品"><p class="mb-2 text-center">還未有我的最愛</p>
              <p class="text-center">快去新增一些吧！</p></router-link>
              </li>
            <li class="row border-bottom pb-2 mb-2" v-for="item in heart" :key="item.id">
                <div class="col-3 h-100">
                  <img class="w-100 h-100" :src="item.imageUrl" :alt="item.id">
                </div>
                <div class="col-6 d-flex align-items-center">
                  <router-link class="heart-title ps-0" :to="`/product-detail/${item.id}`">{{item.title}}</router-link>
                  </div>
                <div class="col-3 d-flex justify-content-between align-items-center">
                  <i class="bi bi-cart ps-3 pointer"
                    :data-id="item.id"
                    @click="addProduct(item.id)"
                  ></i>
                  <i class="bi bi-trash pointer"
                    @click="removeHeart(item)"
                  ></i>
                </div>
            </li>
          </ul>
        </div>
          <router-link to="/cart" class="nav-link pe-0">
            <i class="bi bi-bag"></i>
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- toast message -->
  <div class="position-relative">
    <Toast-list></Toast-list>
  </div>

  <!-- main -->
  <div class="container-fluid px-0">
    <router-view/>
  </div>

  <!-- footer  -->
  <footer class="position-absolute w-100 bg-primary text-secondary">
    <div class="container">
      <ul class="row col-lg-7 list-unstyled pt-4">
        <li class="col-auto pe-md-4">
          <router-link to="/about">關於<span class="font-RubikMoonrocks">COFFEEEEE</span></router-link>
        </li>
        <li class="col-auto pe-md-4">
          <router-link to="/Q&A">常見問題</router-link>
        </li>
        <li class="col-auto pe-md-4">
          <router-link to="/reference-source">參考來源</router-link>
        </li>
      </ul>
      <div class="row">
        <div class="col-md-9 col-lg-7 mt-3 mt-md-0">
          <div class="input-footer">
            <input type="email" placeholder="請輸入Email來獲得最新優惠情報">
            <input type="button" value="送出">
          </div>
          <div class="d-flex flex-column pt-4">
            <span><i class="bi bi-telephone"></i> 02-2222-2222</span>
            <span><i class="bi bi-envelope"></i> coffeeeee@coffeeeee.com.tw</span>
            <span><i class="bi bi-calendar-check"></i> MON.~FRI. 09:00 - 17:00</span>
          </div>
        </div>
        <div class="col-md-3 col-lg-5 text-start text-md-end pt-4 pt-md-0 fs-3">
            <a class="me-4 me-md-0 ms-md-4" href="https://www.facebook.com/" target="blank">
              <i class="bi bi-facebook"></i>
            </a>
            <a class="me-4 me-md-0 ms-md-4" href="https://www.instagram.com/" target="blank">
              <i class="bi bi-instagram"></i>
            </a>
            <a class="me-4 me-md-0 ms-md-4" href="https://github.com/" target="blank">
              <i class="bi bi-github"></i>
            </a>
        </div>
      </div>
      <p class="text-start text-lg-end pt-4">ⓒ IreneLee <router-link to="/dashboard"><i class="bi bi-person"></i></router-link> 僅個人作品練習，無任何商業用途，若有侵權請聯繫 <a href="mailto: cc86418520@gmail.com"><i class="bi bi-envelope text-danger"></i></a></p>
    </div>
  </footer>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastList from '@/components/ToastList.vue'
import DropDown from '@/mixins/DropDown'

export default {
  components: {
    ToastList
  },
  provide () {
    return {
      emitter
    }
  },
  mixins: [DropDown],
  data () {
    return {
      toTopBtn: true,
      bar: true,
      deskTop: false,
      pad: true,
      tabs: [
        {
          title: '全部商品',
          url: '/products/全部商品'
        },
        {
          title: '咖啡豆',
          url: '/products/咖啡豆'
        },
        {
          title: '耳掛包',
          url: '/products/耳掛包'
        },
        {
          title: '咖啡器具',
          url: '/products/咖啡器具'
        },
        {
          title: '杯子',
          url: '/products/杯子'
        }
      ],
      heart: [],
      tempHeart: []
    }
  },
  methods: {
    scroll () {
      // navBar
      if (window.screen.width >= 992) {
        if (window.scrollY !== 0) {
          this.deskTop = true
        } else {
          this.deskTop = false
        }
      } else if (window.screen.width >= 768) {
        if (window.scrollY !== 0) {
          this.pad = false
        } else {
          this.pad = true
          this.bar = true
        }
      }
      // To Top btn
      if (window.scrollY >= 334) {
        this.toTopBtn = false
      } else {
        this.toTopBtn = true
      }
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    removeHeart (item) {
      const id = item.id
      const removeHeart = this.heart.find((item) => item.id === id)
      console.log(removeHeart)
      this.heart.splice(this.heart.indexOf(removeHeart), 1)
      localStorage.setItem('heart', JSON.stringify(this.heart))
      this.$message('danger', '已刪除我的最愛')
    },
    addProduct (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.$message('success', res.data.message)
        })
    }
  },
  watch: {
    tempHeart () {
      this.heart = this.tempHeart
    },
    heart () {
      if (this.tempHeart.length !== 0) {
        this.heart = this.tempHeart
      } else {
        this.heart = JSON.parse(localStorage.getItem('heart')) || []
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.scroll)
    this.heart = JSON.parse(localStorage.getItem('heart')) || []
    emitter.on('add-heart', (data) => {
      this.tempHeart = data
    })
  }
}
</script>
