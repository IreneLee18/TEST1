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
              <h3 style="text-shadow: 3px 6px 1px #dcdddf;">用戶資料</h3>
              <v-form v-slot="{ errors }">
                <table class="table border-top border-2 border-primary">
                  <tbody class="border box-shadow" v-if="order.user">
                    <tr>
                      <th class="position-relative" style="width: 100px;">
                        <label for="name" class="form-label position-absolute top-50 translate-middle-y">姓名</label>
                      </th>
                      <td>
                        <v-field type="text" class="form-control"
                          id="name"
                          v-model="order.user.name"
                          :class="{'is-invalid': errors['姓名']}"
                          name="姓名"
                          rules="required"
                        />
                        <error-message name="姓名" class="invalid-feedback" />
                      </td>
                    </tr>
                    <tr>
                      <th class="position-relative">
                        <label for="email" class="form-label position-absolute top-50 translate-middle-y">Email</label>
                      </th>
                      <td>
                        <v-field type="text" class="form-control"
                          id="email"
                          v-model="order.user.email"
                          :class="{'is-invalid': errors['信箱']}"
                          name="信箱"
                          rules="email|required"
                        />
                        <error-message name="信箱" class="invalid-feedback" />
                      </td>
                    </tr>
                    <tr>
                      <th class="position-relative">
                        <label for="tel" class="form-label position-absolute top-50 translate-middle-y">電話</label>
                      </th>
                      <td>
                        <v-field type="text" class="form-control"
                          id="tel"
                          v-model="order.user.tel"
                          :class="{'is-invalid': errors['電話']}"
                          name="電話"
                          :rules="isPhone"
                        />
                        <error-message name="電話" class="invalid-feedback" />
                      </td>
                    </tr>
                    <tr>
                      <th class="position-relative">
                        <label for="address" class="form-label position-absolute top-50 translate-middle-y">地址</label>
                      </th>
                      <td>
                        <v-field type="text" class="form-control"
                          id="address"
                          v-model="order.user.address"
                          :class="{'is-invalid': errors['地址']}"
                          name="地址"
                          rules="required"
                        />
                        <error-message name="地址" class="invalid-feedback" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-form>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
            @click="$emit('edit-order',order)"
          >確認
          </button>
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
    tempOrder: {
      type: Object,
      default () { return {} }
    }
  },
  emits: ['edit-order'],
  inject: ['emitter'],
  mixins: [ModalMixin],
  watch: {
    tempOrder () {
      this.order = this.tempOrder
    }
  },
  data () {
    return {
      modal: {},
      order: {}
    }
  },
  methods: {
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
    }
  }
}
</script>
