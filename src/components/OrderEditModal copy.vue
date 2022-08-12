<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>編輯訂單</span>
          </h5>
          <input type="button" value="✕" class=" bg-transparent border-0 text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-lg-4 position-relative">
              <h3 style="text-shadow: 3px 6px 1px #dcdddf;">用戶資料（編輯）</h3>
                <table class="table border-top border-2 border-primary">
                  <tbody class="border box-shadow" v-if="order.user">
                    <tr>
                      <th style="width: 100px;">姓名</th>
                      <td class="position-relative">
                        <span :class="{'d-none':edit.name}">{{ order.user.name }}</span>
                        <input type="text" v-model="order.user.name"
                          :class="{'d-none':!edit.name}"
                          name="姓名"
                          rules="required"
                        />
                        <i class="bi bi-patch-check pointer fs-5 position-absolute" style="right:0.5rem;top:0.5rem;" :class="{'d-none':!edit.name}"
                          @click="renew('name',order.user.name)"
                        ></i>
                        <i class="bi bi-pencil pointer position-absolute" style="right:0.5rem;" :class="{'d-none':edit.name}"
                          @click="edit.name=true"
                        ></i>
                        <span class="d-block">姓名為必填</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td class="position-relative">
                        <span :class="{'d-none':edit.email}">{{ order.user.email }}</span>
                        <input type="text" v-model="order.user.email"
                          :class="{'d-none':!edit.email}"
                          name="信箱"
                          rules="email|required"
                        />
                        <span class="d-block">信箱格式有誤</span>
                        <i class="bi bi-patch-check pointer fs-5 position-absolute" style="right:0.5rem;top:0.5rem;" :class="{'d-none':!edit.email}"
                          @click="renew('email',order.user.email)"
                        ></i>
                        <i class="bi bi-pencil pointer position-absolute" style="right:0.5rem;" :class="{'d-none':edit.email}"
                          @click="edit.email=true"
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td class="position-relative">
                        <span :class="{'d-none':edit.tel}">{{ order.user.tel }}</span>
                        <input type="text" v-model="order.user.tel"
                          :class="{'d-none':!edit.tel}"
                          name="電話"
                          :rules="isPhone"
                        />
                        <span class="d-block">請輸入正確的電話號碼</span>
                        <i class="bi bi-patch-check pointer fs-5 position-absolute" style="right:0.5rem;top:0.5rem;" :class="{'d-none':!edit.tel}"
                          @click="renew('tel',order.user.tel)"
                        ></i>
                        <i class="bi bi-pencil pointer position-absolute" style="right:0.5rem;" :class="{'d-none':edit.tel}"
                          @click="edit.tel=true"
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td class="position-relative">
                        <span :class="{'d-none':edit.address}">{{ order.user.address }}</span>
                        <input type="text" v-model="order.user.address"
                          :class="{'d-none':!edit.address}"
                          name="地址"
                          rules="required"
                        />
                        <span class="d-block">地址為必填</span>
                        <i class="bi bi-patch-check pointer fs-5 position-absolute" style="right:0.5rem;top:0.5rem;" :class="{'d-none':!edit.address}"
                          @click="renew('address',order.user.address)"
                        ></i>
                        <i class="bi bi-pencil pointer position-absolute" style="right:0.5rem;" :class="{'d-none':edit.address}"
                          @click="edit.address=true"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="col-12 col-lg-8">
              <h3 style="text-shadow: 3px 6px 1px #dcdddf;">訂單細節</h3>
              <table class="table border-top border-3 border-primary">
                <tbody class="border box-shadow">
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ order.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(order.create_at)}}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="order.paid_date">
                        {{ $filters.date(order.paid_date) }}
                      </span>
                      <span v-else></span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td class="d-flex justify-content-between align-items-center">
                      <div class="checkbox">
                        <label for="isPaid">
                          <input type="checkbox" id="isPaid" v-model="order.is_paid">
                          <span>
                            <span v-if="order.is_paid" class="text-success fw-bold">已付款</span>
                            <span v-else class="text-danger">尚未付款</span>
                          </span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td class="text-danger">
                      NT$ {{ $filters.currency(order.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 class="border-bottom border-3 border-primary mb-0 pb-2" style="text-shadow: 3px 6px 1px #dcdddf;">選購商品（編輯）</h3>
              <div class="order-user-buy-product overflow-scroll border box-shadow">
                <table class="table mb-0">
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <th>
                        <div class="d-flex">
                          <p class="border text-secondary text-center me-2 mb-0" style="width:70px;">{{ item.product.category }}</p>
                          <span>{{ item.product.title }}</span>
                        </div>
                      </th>
                      <td class="text-end px-0">
                        {{ item.qty }} ／ {{ item.product.unit }}
                      </td>
                      <td class="d-none d-md-table-cell text-end">
                          <span>NT${{ $filters.currency(item.final_total) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.order-user-buy-product{
  max-height: 206px;
  @media (min-width:992px) {
    max-height: 345px;
  }
}
</style>

<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    tempOrder: {}
  },
  emits: ['add-coupon'],
  data () {
    return {
      modal: {},
      order: {},
      edit: {
        name: false,
        email: false,
        tel: false,
        address: false
      }
    }
  },
  watch: {
    tempOrder () {
      this.order = this.tempOrder
    },
    'order.user.tel' () {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(this.order.user.tel) ? true : '請輸入正確的電話號碼'
    }
  },
  methods: {
    renew (key, item) {
      if (item !== '') {
        switch (key) {
          case 'name':
            this.edit.name = false
            break
          case 'email':
            this.edit.email = false
            break
          case 'tel':
            this.edit.tel = false
            break
          case 'address':
            this.edit.address = false
            break
        }
      }
    }
  },
  mixins: [ModalMixin]
}
</script>
