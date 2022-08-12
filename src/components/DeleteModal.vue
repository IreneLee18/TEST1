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
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="staticBackdropLabel">刪除{{item.title}}</h5>
          <input type="button" value="✕" class=" bg-transparent border-0 text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          確認要刪除{{item.title}}嗎？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger text-white"
          @click="$emit('delete-item')"
          >確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    item: {}
  },
  emits: ['delete-item'],
  data () {
    return {
      modal: {}
    }
  },
  mixins: [ModalMixin]
}
</script>
