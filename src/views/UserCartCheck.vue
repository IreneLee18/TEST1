<template>
  <LoadingView :active="isLoading"></LoadingView>

  <div class="container mb-5 mb-lg-0">
    <!-- step -->
    <ul class="list-unstyled row align-items-center justify-content-center mt-3 mb-5">
      <li class="col-2 cart-step finish-step"><span>step1</span></li>
      <li class="col-2 cart-step-line"></li>
      <li class="col-2 cart-step"><span>step2</span></li>
      <li class="col-2 cart-step-line not-yet-step-line"></li>
      <li class="col-2 cart-step not-yet-step"><span>step3</span></li>
    </ul>
    <!-- main -->
    <div class="container order-buer-info-list">
      <div class="row justify-content-center justify-content-lg-between">
        <h1 class="fs-3 g-0">購買清單</h1>
        <div class="order-list-outside border rounded-2 col-12 col-lg-4 mb-5">
          <ul class="order-list-final pt-3 px-3 mb-0">
            <li class="row pb-2 mb-2 border-bottom" v-for="order in orders.carts" :key="order.id">
              <div class="col-2 h-100 p-0">
                <img :src="order.product.imageUrl" :alt="order.id" class="w-100 h-100">
              </div>
              <div class="col-5 d-flex align-items-center">{{order.product.title}}</div>
              <div class="col-2 d-flex align-items-center">x {{order.qty}}</div>
              <div class="col-3 d-flex align-items-center justify-content-end p-0">NT$ {{$filters.currency(order.product.price)}}</div>
            </li>
          </ul>
          <div class="d-flex justify-content-between justify-content-lg-end mt-2">
            <p class="fs-5 mb-0 me-lg-10">共 {{orderLength}} 項</p>
            <p class="fs-5 mb-0"><span class="me-3">總計</span>NT$ {{$filters.currency(orders.final_total)}}</p>
          </div>
        </div>

        <v-form class="row col-12 col-lg-7 border rounded-2 pt-3"
          @submit="createOrder" v-slot="{ errors }"
        >
          <div class="col-6">
            <label for="userName" class="form-label">收件人姓名*</label>
            <v-field type="text" class="form-control" id="userName"
              name="姓名"
              placeholder="請輸入收件人姓名"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              v-model="userForm.user.name"
            />
            <error-message name="姓名" class="invalid-feedback" />
          </div>
          <div class="col-6">
            <label for="userPhone" class="form-label">收件人手機*</label>
            <v-field type="text" class="form-control mb-3"
              id="userPhone"
              name="聯絡電話"
              placeholder="請輸入聯絡電話"
              :class="{ 'is-invalid': errors['聯絡電話'] }"
              :rules="isPhone"
              v-model="userForm.user.tel"
            />
            <error-message name="聯絡電話" class="invalid-feedback" />
          </div>
          <div class="col-12">
            <label for="userEmail" class="form-label">收件人信箱*</label>
            <v-field type="email" class="form-control mb-3"
              id="userEmail"
              name="信箱"
              placeholder="請輸入信箱"
              :class="{ 'is-invalid': errors['信箱'] }"
              rules="email|required"
              v-model="userForm.user.email"
            />
            <error-message name="信箱" class="invalid-feedback" />
          </div>
          <div class="col-12">
            <label for="userAddress" class="form-label">收件人地址*</label>
            <v-field type="text" class="form-control mb-3"
              id="userAddress"
              name="地址"
              placeholder="請輸入收件人地址"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              v-model="userForm.user.address"
            />
            <error-message name="地址" class="invalid-feedback" />
          </div>
          <div class="col-12">
            <label for="userMessage" class="form-label">備註</label>
            <textarea type="email" class="form-control mb-3" id="userMessage" rows="4"
              v-model="userForm.message"></textarea>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <router-link to="/cart" class="btn btn-primary">上一步</router-link>
            <button type="submit" class="btn btn-primary">下一步</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.order-buer-info-list{
  @media (min-width:992px){
    height: calc(100vh - 184px);
  }
}
.order-list-outside{
  height: 300px;
  @media (min-width:768px){
    height: 400px;
  }
  @media (min-width:992px){
    height: 300px;
  }
}
.order-list-final{
  height: 250px;
  @media (min-width:768px){
    height: 350px;
  }
  @media (min-width:992px){
    height: 250px;
  }
  overflow: scroll;
  li{
    height: 50px;
    @media (min-width:768px){
      height: 70px;
    }
    @media (min-width:992px){
      height: 60px;
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      isLoading: false,
      orders: [],
      orderLength: 0,
      userForm: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getOrders () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.orders = res.data.data
            this.orderLength = res.data.data.carts.length
            window.scrollTo(0, 0)
          }
        })
        .catch((err) => console.log(err.response))
    },
    createOrder () {
      // loading＆currentstep有問題
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.$http.post(api, { data: this.userForm })
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$router.push({
              name: 'step3',
              params: { buyerID: res.data.orderId }
            })
          }
        })
        .catch((err) => console.log(err.response))
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
