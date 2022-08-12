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
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-transparent border-0">
        <div class="d-flex py-2 pe-2 justify-content-end">
          <input type="button" value="CLOSE" class=" bg-transparent border text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <img :src="image" :alt="image" class=" m-auto mt-2 w-75">
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    image: {}
  },
  watch: {
    image () {
      this.tempImage = this.image
    }
  },
  emits: ['delete-item'],
  data () {
    return {
      modal: {},
      tempImage: ''
    }
  },
  mixins: [ModalMixin]
}
</script>
