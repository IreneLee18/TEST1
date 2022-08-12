<template>
    <LoadingView :active="isLoading"></LoadingView>
    <div class="userProduct-bg pb-10" >
      <div class="container">
        <ul class="list-unstyled d-flex align-items-center pt-4 pb-2 ">
          <li>
            <router-link to="/" class="text-primary">
              <p class="fs-6 mb-0 text-center text-md-start">首頁</p>
            </router-link>
          </li>
          <li>
            <p class="mb-0 mx-2">></p>
          </li>
          <li>
            <router-link to="/products/全部商品" class="text-primary">
              <p class="fs-6 mb-0">全部商品</p>
            </router-link>
          </li>
          <li v-if="category !== '全部商品'">
            <p class="mb-0 mx-2">></p>
          </li>
          <li v-if="category !== '全部商品'">
            <h1 class="fs-6 mb-0 fw-normal">{{ category }}</h1>
          </li>
        </ul>
        <div class="py-2 px-5 rounded-2" style="background:rgba(255,255,255,.9);">
          <div class="d-flex justify-content-end align-items-center mb-3">
            <div class="sortPrcie position-relative text-center">
              <i class="bi bi-arrow-down-up fs-4 me-2"></i>
              <span class="text-primary">排序</span>
              <div class="sortPrcie-btnGroup bg-white border rounded-2 position-absolute start-50 translate-middle-x" style="width:232%;">
                <ul class="list-unstyled py-2 px-4 lh-lg text-center">
                  <li>
                    <a href="" @click.prevent="sortPrice('down')" :class="{'selectPrice':!price.down}">$ 由高到低
                    </a>
                  </li>
                  <li>
                    <a href="" @click.prevent="sortPrice('up')" :class="{'selectPrice':!price.up}">$ 由低到高
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <template v-if="pageData.length===0">
            <div class="position-relative pb-7">
              <h2 class="not-found-category">不存在該商品類別唷！</h2>
            </div>
          </template>
          <ul class="row list-unstyled">
            <li class="col-12 col-md-6 col-xl-3 mb-4 h-100"
              v-for="product in pageData" :key="product.id"
            >
              <div class="box-shadow h-100 rounded-3 overflow-hidden">
                <div class="productTop position-relative"
                  style="height:235px;"
                  @click="introduce(product)"
                >
                  <p class="introduce position-absolute w-100 h-100 text-center">詳細介紹</p>
                  <div class="onsale" v-if="product.origin_price !== product.price">SALE</div>
                  <div class="category">
                    <i class="bi bi-tag"></i>
                    {{product.category}}
                  </div>
                  <img class="w-100 h-100" :src="product.imageUrl" :alt="product.title">
                </div>
                <div class="bg-white p-3">
                  <p class="mb-2">{{product.title}}</p>
                  <div>
                    <span class="me-2" v-if="product.origin_price !== product.price">NT${{$filters.currency(product.price)}}</span>
                    <span class="" :class="{'text-secondary':product.origin_price !== product.price,'text-decoration-line-through':product.origin_price !== product.price}">NT${{$filters.currency(product.origin_price)}}</span>
                  </div>
                  <div>
                    <i class="pointer"
                      :data-id="product.id"
                      :class="{'bi bi-heart-fill':status.heartID.indexOf(product.id) !== -1,
                        'bi bi-heart': status.heartID.indexOf(product.id) === -1}"
                      @click="like(product)"
                    ></i>
                    <i class="bi bi-cart ps-3 pointer"
                      :data-id="product.id"
                      @click="addProduct(product.id)"
                    ></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <pagination :pages="pagination" @change-page="getPagination"
          ></pagination>
        </div>
      </div>
    </div>
</template>

<script>
import pagination from '@/components/PaginationView.vue'
export default {
  components: {
    pagination
  },
  data () {
    return {
      isLoading: false,
      price: {
        down: true,
        up: true
      },
      products: [], // allData
      category: '全部商品',
      // filterData: [],
      pageData: [], // per page data
      perPage: 8, // per page have 8 data
      pagination: {
        current_page: 0,
        total_pages: 0,
        has_next: false,
        has_pre: false
      },
      status: {
        heartID: [],
        heart: []
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.products = res.data.products
            this.getPagination(1)
            window.scrollTo(0, 0)
          }
        })
        .catch((err) => console.log(err))
    },
    getPagination (now) {
      const page = this.pagination
      page.current_page = now
      page.total_pages = Math.ceil(this.filterProduct.length / this.perPage)
      this.pageData = []
      window.scrollTo(0, 0)
      if (page.current_page > page.total_pages) {
        page.current_page = page.total_pages
      }
      if (page.current_page < 1) {
        page.current_page = 1
      }
      // 原本在這用三元運算子，但跳出「Unnecessary use of boolean literals in conditional expression.」，所以將後方的三元運算子給刪除後依舊可以正常取得值～
      page.has_pre = page.current_page > 1
      page.has_next = page.current_page < page.total_pages
      const minData = (page.current_page * this.perPage) - this.perPage + 1
      const maxData = (page.current_page * this.perPage)
      this.filterProduct.forEach((item, index) => {
        const num = index + 1
        if (num >= minData && num <= maxData) {
          this.pageData.push(item)
        }
      })
    },
    like (item) {
      const selectID = item.id
      const heart = this.status.heart
      // const heartID = this.status.heartID
      const haveHeart = heart.some((item) => item.id === selectID)
      if (!haveHeart) {
        heart.push(item)
        // heartID.push(selectID)
        localStorage.setItem('heart', JSON.stringify(heart))
        this.$message('success', '已加入我的最愛')
      } else {
        const removeHeart = heart.find((item) => item.id === selectID)
        heart.splice(heart.indexOf(removeHeart), 1)
        // heartID.splice(heartID.indexOf(selectID), 1)
        localStorage.setItem('heart', JSON.stringify(heart))
        this.$message('danger', '已刪除我的最愛')
      }
      this.getHeart()
    },
    getHeart () {
      this.status.heart = JSON.parse(localStorage.getItem('heart')) || []
      this.status.heartID = []
      this.status.heart.forEach((item) => {
        this.status.heartID.push(item.id)
      })
      this.emitter.emit('add-heart', this.status.heart)
    },
    addProduct (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.$message('success', res.data.message)
        })
    },
    introduce (item) {
      this.$router.push(`/product-detail/${item.id}`)
    },
    // 排序＄＄
    sortPrice (key) {
      if (key === 'down') {
        this.filterProduct.sort((a, b) => {
          return b.price - a.price
        })
        this.price.down = false
        this.price.up = true
      } else if (key === 'up') {
        this.filterProduct.sort((a, b) => {
          return a.price - b.price
        })
        this.price.down = true
        this.price.up = false
      }
      this.getPagination(1)
    }
  },
  computed: {
    filterProduct () {
      let filterData = []
      switch (this.category) {
        case '全部商品':
          filterData = this.products.filter((item) => {
            return item
          })
          break
        case '咖啡豆':
          filterData = this.products.filter((item) => {
            return item.category === '咖啡豆'
          })
          break
        case '耳掛包':
          filterData = this.products.filter((item) => {
            return item.category === '耳掛包'
          })
          break
        case '咖啡器具':
          filterData = this.products.filter((item) => {
            return item.category === '咖啡器具'
          })
          break
        case '杯子':
          filterData = this.products.filter((item) => {
            return item.category === '杯子'
          })
          break
      }
      return filterData
    }
  },
  watch: {
    $route () {
      this.category = this.$route.params.category
    },
    filterProduct () {
      // 原本這樣寫會導致初始化第一頁會超過八個資料，但改成this.getPagination(1)之後就可以順利取得到八個為一頁的資料～
      // this.pageData = this.filterProduct

      // 每切換tab就將排序做初始化
      this.getPagination(1)
      this.price.down = true
      this.price.up = true
    }
  },
  mounted () {
    this.category = this.$route.params.category
    this.getProducts()
    this.getHeart()
  }
}
</script>
