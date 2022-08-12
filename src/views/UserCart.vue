<template>
  <LoadingView :active="isLoading"></LoadingView>
  <button class="scrollPrice icon-btn z-index fs-5"
    :class="{'d-none':scrollPrice}"
    @click="this.$refs.showFinalCartPrice.showModal()"
  >
    <i class="bi bi-currency-dollar"></i>
  </button>

  <div class="cartIsNull" v-if="cartLength===0">
    <router-link to="/products/全部商品"><h2 class="position-absolute top-50 start-50 translate-middle text-white">尚未有商品請去新增</h2></router-link>
  </div>

  <div class="container" v-else>
    <!-- step -->
    <ul class="list-unstyled row align-items-center justify-content-center mt-3 mb-5">
      <li class="col-2 cart-step"><span>step1</span></li>
      <li class="col-2 cart-step-line not-yet-step-line"></li>
      <li class="col-2 cart-step not-yet-step"><span>step2</span></li>
      <li class="col-2 cart-step-line not-yet-step-line"></li>
      <li class="col-2 cart-step not-yet-step"><span>step3</span></li>
    </ul>
    <!-- phone & pad size -->
    <div class="d-lg-none">
      <!-- cart product -->
      <ul class="list-unstyled">
        <li class="border rounded-2 mb-3 p-3" v-for="(order, index) in orders.carts" :key="`order${index}`" style="height:170px;">
          <div class="row w-100 h-100 position-relative">
            <div class="col-5 col-md-4 h-100 pe-0">
              <img :src="order.product.imageUrl" :alt="order.product.title" class="w-100 h-100">
            </div>
            <div class="col-6 col-md-7">
              <div class="d-md-flex mb-md-2">
                <p class="mb-1">
                  <span class="text-secondary border px-1 me-2">{{order.product.category}}</span>
                </p>
                <p class="mb-1">{{ order.product.title }}</p>
              </div>
              <div class="mb-2">
                <small class="me-2 text-decoration-line-through text-secondary" v-if="order.product.origin_price!=order.product.price">$ {{ $filters.currency(order.product.origin_price) }}</small>
                <span :class="{'text-danger':order.product.origin_price!=order.product.price}">$ {{ $filters.currency(order.product.price) }}</span>
              </div>
              <div class="quantity-group">
                <input type="button" value="-"
                  ref="btn"
                  @click="updateOrder(order.id, order.qty-1)">
                <input type="number" min="1"
                  ref="number"
                  @change="updateOrder(order.id,order.qty)"
                  v-model="order.qty"
                >
                <input type="button" value="+"
                  ref="btn"
                  @click="updateOrder(order.id, order.qty+1)"
                >
              </div>
            </div>
            <div class="col-1 position-absolute top-50 end-0 translate-middle-y text-end">
              <i class="bi bi-trash pointer"
                @click="deleteOrder(order.id)"
              ></i>
            </div>
          </div>
        </li>
      </ul>
      <!-- cart price -->
      <div class="position-fixed bottom-0 w-100 start-0 bg-white z-index" :class="{'d-none':!scrollPrice}">
        <div class="pt-3 box-shadow-top">
          <div class="d-flex align-items-center justify-content-between ps-3">
            <p class="mb-0">
              <i class="bi bi-ticket-perforated me-2 fs-5 text-danger"></i>
              <span>優惠卷</span>
            </p>
            <div class="d-flex align-items-center" :class="{'w-75':couponInput}">
              <span class="text-success border border-success px-2"
                :class="{'d-none':couponInput}"
                v-if="orders.final_total!=orders.total"
              >已套用優惠卷</span>
              <i class="bi bi-chevron-right px-3 pointer"
                v-if="!couponInput"
                @click="couponInput=true"
              ></i>
              <i class="bi bi-chevron-left px-3 pointer"
                v-else
                @click="couponInput=false"
              ></i>
              <div class="cart-coupons-group w-100 pe-3" :class="{'d-none':!couponInput}">
                <input type="text" class="border-1" placeholder="優惠卷代碼" v-model="couponCode">
                <input type="button" class="bg-secondary border-1 transition-03sec" value="確認"
                  @click="addCoupon(couponCode,'small'),couponInput=false"
                >
              </div>
            </div>
          </div>
          <span class="text-danger lh-40 px-3" style="font-size:14px;">{{ orders.total >= 5000 ? '商品滿 NT$ 5,000 免運 ♡ ♡ ♡' : `還差 NT$ ${5000 - orders.total} 就享有免運！` }}</span>
          <div class="d-flex justify-content-end border-top align-items-center">
            <div class="me-2">
              <div>
                <span class="me-2" style="font-size:14px;">總金額</span>
                <span class="text-danger fw-bold">NT$ {{ orders.total >= 5000 ? $filters.currency(orders.final_total) : $filters.currency(orders.final_total+100) }}</span>
              </div>
              <div v-if="orders.total != orders.final_total">
                <span class="text-secondary me-2" style="font-size:14px;">已省下</span>
                <span class="text-danger" style="font-size:14px;">NT$ {{$filters.currency(orders.total - orders.final_total)}}</span>
                <i class="bi bi-chevron-up pointer px-2"
                  @click="this.$refs.showCartPrice.showModal()"
                ></i>
              </div>
            </div>
            <button class="btn btn-danger p-3 text-white rounded-0"
              @click="goPay"
            >立即結帳</button>
          </div>
        </div>
      </div>
    </div>
    <!-- deskSide -->
    <div class="d-none d-lg-flex row justify-content-between">
      <!-- title -->
      <ul class="list-unstyled d-flex col-7 border-bottom border-3 pb-2 fw-bold">
        <li class="col-5">商品</li>
        <li class="col-2">單價</li>
        <li class="col-2">數量</li>
        <li class="col-3">總計</li>
      </ul>
      <!-- content -->
      <ul class="list-unstyled col-7 overflow-scroll cart-product g-0">
        <li class="row mb-3 g-0" style="height:90px;" v-for="order in orders.carts" :key="order.id">
          <div class="col-5 h-100 p-0">
            <img :src="order.product.imageUrl" alt="order.product.title" class="w-30 me-3 h-100">
            <span>{{ order.product.title }}</span>
          </div>
          <div class="col-2 lh-90">
              NT$ {{ $filters.currency(order.product.price) }}
          </div>
          <div class="col-2 position-relative">
            <div class="quantity-group position-absolute top-50 translate-middle-y">
              <input type="button" value="-"
                ref="btn"
                @click="updateOrder(order.id, order.qty-1)">
              <input type="number" min="1"
                ref="number"
                @change="updateOrder(order.id,order.qty)"
                v-model="order.qty"
              >
              <input type="button" value="+"
                ref="btn"
                @click="updateOrder(order.id, order.qty+1)"
              >
            </div>
          </div>
          <div class="col-3 d-flex justify-content-between lh-90">
            NT$ {{ $filters.currency(order.total) }}
            <i class="bi bi-trash pointer"
              @click="deleteOrder(order.id)"
            ></i>
          </div>
        </li>
      </ul>
      <!-- cart price -->
      <div class="col-4">
        <div class="card mb-3">
          <div class="card-body">
            <div class="cart-coupons-group">
              <input type="text" class="border-1" placeholder="優惠卷代碼" v-model="couponCode">
              <input type="button" class="bg-secondary border-1 transition-03sec" value="確認"
                @click="addCoupon(couponCode)"
              >
            </div>
            <div class="pt-3 pb-5 lh-40">
              <div class="d-flex justify-content-between">
                <span class="">小計</span>
                <span>NT$ {{ $filters.currency(orders.total) }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="">優惠折抵</span>
                <span>- NT$ {{Math.round(orders.total - orders.final_total)}}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="">運費
                  <span class="text-secondary" style="font-size:12px;">(滿NT$5,000免運)</span>
                </span>
                <span>NT$ {{ orders.total >= 5000 ? 0 : 100 }}</span>
              </div>
            </div>
            <span class="text-danger lh-40" style="font-size:14px;">{{ orders.total >= 5000 ? '商品滿 NT$ 5,000 免運 ♡ ♡ ♡' : `還差 NT$ ${5000 - orders.total} 就享有免運！` }}</span>
            <div class="d-flex justify-content-between border-top lh-40">
              <span class="">總金額</span>
              <span class="fw-bold">NT$ {{ orders.total >= 5000 ? $filters.currency(orders.final_total) : $filters.currency(orders.final_total+100) }}</span>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3"
              @click="goPay"
            >立即結帳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <final-cart-price
    ref="showFinalCartPrice"
    :orders="orders"
    @go-pay="goPay"
    @get-coupon="addCoupon"
    ></final-cart-price>
  <cart-price
    ref="showCartPrice"
    :orders="orders"
    ></cart-price>
</template>

<style lang="scss">
.cart-product{
  height: calc(100vh - 60px - 76px - 35px - 3.5rem);
  margin-bottom: 5rem;
}
.lh-40{
  line-height: 40px;
}
.lh-90{
  line-height: 90px;
}
.cartIsNull{
  background-image: url(https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80);
  height: calc(100vh - 76px);
  background-size: cover;
  opacity: 0.3;
  h2{
    animation:type 3s steps(10) infinite;
    width: 100%;
    text-align: center;
    overflow:hidden;
    white-space:nowrap;
    font-size: 60px;
  }
}
</style>

<script>
import finalCartPrice from '@/components/FinalCartPriceModal.vue'
import cartPrice from '@/components/CartPriceModal.vue'
export default {
  components: {
    finalCartPrice,
    cartPrice
  },
  data () {
    return {
      isLoading: false,
      scrollPrice: true,
      orders: [],
      cartLength: 0,
      couponCode: '',
      couponInput: false
    }
  },
  inject: ['emitter'],
  methods: {
    scroll () {
      if (window.scrollY >= 334) {
        this.scrollPrice = false
      } else {
        this.scrollPrice = true
      }
    },
    getOrders () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.orders = res.data.data
            this.cartLength = res.data.data.carts.length
            window.scrollTo(0, 0)
          }
        })
        .catch((err) => console.log(err.response))
    },
    deleteOrder (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      console.log(api)
      this.$http.delete(api)
        .then(() => {
          this.isLoading = false
          this.getOrders()
          this.$message('success', '刪除成功')
        })
        .catch((err) => console.log(err.response))
    },
    updateOrder (id, item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      const cart = {
        product_id: id,
        qty: item > 1 ? item : 1 // 設定預設為1，防止點擊到小於1，或輸入1以下得數字，導致計算出錯。
      }
      if (item === 0) {
        this.$message('danger', '商品不得少於一樣')
      } else {
        this.isLoading = true
        this.$http.put(api, { data: cart })
          .then(() => {
            this.isLoading = false
            this.getOrders()
            this.$message('success', '更新成功')
          })
          .catch((err) => console.log(err.response))
      }
    },
    addCoupon (couponCode, key) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: couponCode
      }
      this.$http.post(api, { data: coupon })
        .then((res) => {
          if (!res.data.success) {
            this.$message('danger', '優惠代碼有誤')
          } else {
            if (key === 'small') {
              this.couponInput = false
            }
            this.getOrders()
            this.$message('success', '成功套用優惠卷')
          }
        })
    },
    goPay () {
      this.$refs.showFinalCartPrice.hideModal()
      this.$router.push('/cart/check')
    }
  },
  created () {
    this.getOrders()
    window.addEventListener('scroll', this.scroll)
  }
}
</script>
