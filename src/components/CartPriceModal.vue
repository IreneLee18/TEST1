<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white" id="staticBackdropLabel">折扣優惠碼試算</h5>
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
      modal: {}
    }
  },
  mixins: [ModalMixin]
}
</script>
