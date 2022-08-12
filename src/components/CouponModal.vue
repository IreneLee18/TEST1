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
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">優惠卷</h5>
          <input type="button" value="✕" class=" bg-transparent border-0 text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <v-form v-slot="{ errors }">
            <div class="mb-3">
              <label for="title" class="form-label">標題<span class="text-danger">*</span></label>
              <v-field type="text" class="form-control" id="title"
                      placeholder="請輸入標題"
                      v-model="tempCoupon.title"
                      name="標題"
                      :class="{ 'is-invalid': errors['標題'] }"
                      rules="required"
              />
              <error-message name="標題" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="coupon_code" class="form-label">優惠碼<span class="text-danger">*</span></label>
              <v-field type="text" class="form-control" id="coupon_code"
                      placeholder="請輸入優惠碼"
                      v-model="tempCoupon.code"
                      name="優惠代碼"
                      :class="{ 'is-invalid': errors['優惠代碼'] }"
                      rules="required"
              />
              <error-message name="優惠代碼" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="due_date" class="form-label">到期日<span class="text-danger">*</span></label>
              <v-field type="date" class="form-control" id="due_date"
                      v-model="due_date"
                      name="到期日"
                      :class="{ 'is-invalid': errors['到期日'] }"
                      rules="required"
              />
              <error-message name="到期日" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="percent" class="form-label">折扣百分比<span class="text-danger">*</span></label>
              <v-field type="number" class="form-control" id="percent"
                      placeholder="請輸入折扣百分比"
                      v-model="tempCoupon.percent"
                      name="折扣百分比"
                      :class="{ 'is-invalid': errors['折扣百分比'] }"
                      rules="required"
              />
              <error-message name="折扣百分比" class="invalid-feedback" />
            </div>
            <div class="mb-3 d-flex flex-column">
              <label class="form-label" for="is_enabled">
                啟用(<span v-if="tempCoupon.is_enabled === 1">是</span><span v-else>否</span>)
              </label>
              <input class="form-check-input" type="checkbox"
                    id="is_enabled"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempCoupon.is_enabled"
                    >
            </div>
          </v-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
          @click="$emit('add-coupon',tempCoupon)"
          >確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    coupon: {}
  },
  emits: ['add-coupon'],
  watch: {
    coupon () {
      // 單向數據流關係，要將外層傳進來的coupon，傳送給內層定義的tempCoupon中
      this.tempCoupon = this.coupon
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      this.due_date = dateAndTime[0]
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date)) / 1000
    }
  },
  data () {
    return {
      modal: {},
      tempCoupon: {},
      due_date: ''
    }
  },
  mixins: [ModalMixin]
}
</script>
