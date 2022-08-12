<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header px-3">
      <i class="bi bi-emoji-heart-eyes fs-1 me-2" :class="`text-${msg.style}`"
      v-if="msg.style==='success'"></i>
      <i class="bi bi-emoji-dizzy fs-1 me-2" :class="`text-${msg.style}`" v-else-if="msg.style==='danger'"></i>

      <strong class="me-auto fs-5" :class="`text-${msg.style}`">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<style lang="scss">
.bi-emoji-heart-eyes,.bi-emoji-dizzy{
  &::before{
    animation: shake 2s;
  }
}
</style>

<script>
import Toast from 'bootstrap/js/dist/toast'
export default {
  props: ['msg'],
  mounted () {
    const toast = new Toast(this.$refs.toast, {
      delay: 2000
    })
    toast.show()
  }
}
</script>
