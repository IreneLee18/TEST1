<template>
  <ul class="pagination justify-content-center">
    <li class="page-item fs-3" :class="{'d-none':!pages.has_pre}">
      <a class="pages-next-link" href="#"
      @click.prevent="updatedPage(pages.current_page - 1)"
      >
        <span aria-hidden="true">⇠</span>
      </a>
    </li>
    <li class="page-item fs-3"
      v-for="page in pages.total_pages" :key="page"
      :class="{'active':pages.current_page === page}"
    >
      <a class="pages-link" href="#"
        @click.prevent="updatedPage(page)"
      >{{page}}</a>
    </li>
    <li class="page-item fs-3" :class="{'d-none':!pages.has_next}">
      <a class="pages-next-link" href="#"
      @click.prevent="updatedPage(pages.current_page + 1)"
      >
        <span aria-hidden="true">⇢</span>
      </a>
    </li>
  </ul>
</template>
<style lang="scss">
@mixin pageLink {
  padding: 0 1rem;
  color: #53565C;
  position: relative;
  transition: color .4s;
  &:hover{
    color: #a7a9ae;
  }
}
.pagination{
  .pages-next-link{
    @include pageLink;
  }
  .pages-link{
    @include pageLink;
    &::after{
      content: '';
      height: 2px;
      width: 0;
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #a7a9ae;
      transition: width .4s;
    }
    &:hover{
      &::after{
        width: 75%;
      }
    }
  }
  .active{
    .pages-link{
      &::after{
        width: 75%;
        background: #53565C;
      }
      &:hover{
        color: #53565C;
      }
    }
  }
}

</style>
<script>
export default {
  props: ['pages'],
  methods: {
    updatedPage (page) {
      this.$emit('change-page', page)
    }
  }
}
</script>
