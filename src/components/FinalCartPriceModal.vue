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
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="staticBackdropLabel">最終確認</h5>
          <input type="button" value="✕" class=" bg-transparent border-0 text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="px-3 pb-3 lh-40">
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
                  @click="$emit('get-coupon',couponCode),couponInput"
                >
              </div>
            </div>
          </div>
          <span class="text-danger lh-40 px-3" style="font-size:14px;">{{ orders.total >= 5000 ? '商品滿 NT$ 5,000 免運 ♡ ♡ ♡' : `還差 NT$ ${5000 - orders.total} 就享有免運！` }}</span>
          <div class="d-flex justify-content-between justify-content-md-end border-top align-items-center ps-3">
            <div class="me-2">
              <div>
                <span class="me-2" style="font-size:14px;">總金額</span>
                <span class="text-danger fw-bold">NT$ {{ orders.total >= 5000 ? $filters.currency(orders.final_total) : $filters.currency(orders.final_total+100) }}</span>
              </div>
              <div v-if="orders.total != orders.final_total">
                <span class="text-secondary me-2" style="font-size:14px;">已省下</span>
                <span class="text-danger" style="font-size:14px;">NT$ {{$filters.currency(orders.total - orders.final_total)}}</span>
              </div>
            </div>
            <button class="btn btn-danger p-3 text-white rounded-0"
              @click="$emit('go-pay')"
            >立即結帳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    orders: {}
  },
  data () {
    return {
      modal: {},
      couponInput: false,
      couponCode: ''
    }
  },
  emits: ['go-pay', 'get-coupon'],
  mixins: [ModalMixin]
}
</script>
