<template>
  <LoadingView :active="isLoading"></LoadingView>

  <div class="container mb-5" :class="{'mb-lg-0':openProductList}">
    <!-- step -->
    <ul class="list-unstyled row align-items-center justify-content-center mt-3 mb-5">
      <li class="col-2 cart-step finish-step"><span>step1</span></li>
      <li class="col-2 cart-step-line finish-step-line"></li>
      <li class="col-2 cart-step finish-step"><span>step2</span></li>
      <li class="col-2 cart-step-line" :class="{'finish-step-line':finishPay}"></li>
      <li class="col-2 cart-step" :class="{'finish-step':finishPay}"><span>step3</span></li>
    </ul>
    <!-- main -->
    <div class="container buyer-checkout-list" :class="{'buyer-checkout-list-height':openProductList}">
      <ul class="list-group border mb-3" v-if="finishPayWantShowOrder">
        <li class="d-flex border-bottom pb-3 my-3">
          <div class="col-4 ps-3">訂單編號</div>
          <div class="col-8">{{ buyerID }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">訂單日期</div>
          <div class="col-8">{{ $filters.date(order.create_at) }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">姓名</div>
          <div class="col-8">{{ user.name }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">電話</div>
          <div class="col-8">{{ user.tel }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">信箱</div>
          <div class="col-8">{{ user.email }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">地址</div>
          <div class="col-8">{{ user.address }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">備註</div>
          <div class="col-8">{{ order.message }}</div>
        </li>
        <li class="d-flex border-bottom pb-3 mb-3">
          <div class="col-4 ps-3">總金額</div>
          <div class="col-8">NT$ {{ $filters.currency(order.total) }}</div>
        </li>
        <li class="d-flex pb-3">
          <div class="col-4 ps-3">訂購商品</div>
          <div class="col-8 pe-3 d-flex justify-content-between">
            <span>共 {{ orderLength }} 項</span>
            <div class="open-product-list position-relative pointer"
              @click="openProductList=!openProductList"
            >
            <i class="position-absolute bi"
              :class="{'bi-eye-slash':openProductList,'bi-eye':!openProductList}"
            ></i>
            <span class="position-absolute">
              <span v-if="openProductList">顯示商品</span>
              <span v-else>隱藏商品</span>
            </span>
            </div>
          </div>
        </li>
      </ul>
      <!-- order-product-list -->
      <ul class="buyer-open-product-list list-group box-shadow px-3 mb-3"
        :class="{'d-none':openProductList}"
      >
        <li class="row py-2 border-bottom" v-for="order in order.products" :key="order.id">
          <div class="d-none d-md-flex col-2 h-100 pe-0">
            <img :src="order.product.imageUrl" :alt="order.id" class="w-100 h-100">
          </div>
          <div class="col-6 col-md-5 d-flex align-items-center">{{order.product.title}}</div>
          <div class="col-2 d-flex align-items-center">x {{order.qty}}</div>
          <div class="col-4 col-md-3 d-flex align-items-center justify-content-end">NT$ {{$filters.currency(order.final_total)}}</div>
        </li>
      </ul>
      <div class="buyer-finish position-relative mb-3 overflow-hidden" v-if="!finishPayWantShowOrder">
        <i class="bi bi-balloon-heart position-absolute start-50 translate-middle text-danger" style="font-size:100px;"></i>
        <p class="fs-1 position-absolute top-60 start-50 translate-middle">已完成付款</p>
        <div class="buyer-finish-question position-absolute top-70 start-50 translate-middle-x">
          <small>♡ 若有任何疑問，歡迎與我們聯繫 ♡</small>
        </div>
      </div>
      <div class="text-end" v-if="!finishPay">
        <button class="btn btn-danger text-white"
          @click="pay"
        >確認付款</button>
      </div>
      <div class="text-end" v-else>
        <button class="btn btn-primary"
        @click="finishPayWantShowOrder=!finishPayWantShowOrder"
        >
          <span v-if="!finishPayWantShowOrder">查看訂單</span>
          <span v-else>隱藏訂單</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.buyer-checkout-list{
  @media (min-width:992px){
    width: 50%;
    margin: 0 auto;
  }
  .open-product-list{
    width: 50%;
    @media (min-width:768px){
      width: 25%;
    }
    .bi{
      right: 0;
      transition: .3s;
    }
    span{
      right: 0;
      opacity: 0;
      transition: .3s;
    }
    &:hover{
      .bi{
        opacity: 0;
      }
      span{
        opacity: 1;
      }
    }
  }
  .buyer-finish{
    max-height: 350px;
    @media (min-width:768px){
      height: 514px;
    }
  }
  .bi-balloon-heart{
    top: 30%;
    animation: updown 3s infinite;
  }
  .buyer-finish-question{
    animation:type 2.5s steps(18) infinite;
    text-align: center;
    overflow:hidden;
    white-space:nowrap;
    width:100%;
  }

}
.buyer-checkout-list-height{
    @media (min-width:992px){
    height: calc(100vh - 184px);
  }
}
</style>

<script>
export default {
  data () {
    return {
      isLoading: false,
      order: {},
      user: {},
      orderLength: 0,
      buyerID: '',
      openProductList: true,
      finishPay: false,
      finishPayWantShowOrder: true
    }
  },
  methods: {
    getBuyerInfo () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.buyerID}`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.order = res.data.order
            this.user = res.data.order.user
            this.orderLength = Object.keys(res.data.order.products).length
            window.scrollTo(0, 0)
          }
        })
        .catch((err) => console.log(err.response))
    },
    pay () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.buyerID}`
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.finishPay = true
            this.openProductList = true
            this.finishPayWantShowOrder = false
            window.scrollTo(0, 0)
          }
        })
        .catch((err) => console.log(err.response))
    }
  },
  mounted () {
    this.buyerID = this.$route.params.buyerID
    this.getBuyerInfo()
  }
}
</script>
