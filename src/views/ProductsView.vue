<template>
    <LoadingView :active="isLoading"></LoadingView>
    <!-- pad & desktop Size -->
    <table class="products-view d-none d-md-block table mt-4">
      <thead>
        <tr>
          <th>圖片</th>
          <th>分類</th>
          <th>名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th class="text-center">啟用</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width:10%;"><img :src="item.imageUrl" alt="" class="img-fluid"></td>
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>NT$ {{$filters.currency(item.origin_price)}}</td>
          <td>NT$ {{$filters.currency(item.price)}}</td>
          <td class="text-center">
            <span class="text-success" v-if="item.is_enabled">YES</span>
            <span class="text-danger" v-else>NO</span>
          </td>
          <td class="text-end">
            <div class="btn-group">
              <i class="bi bi-pencil pointer me-1 me-md-4" @click="openModal('edit', item)"></i>
              <i class="bi bi-trash pointer"  @click="openModal('delete',item)"></i>
              <!-- <button class="btn btn-outline-primary btn-sm"
              @click="openModal('edit',item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm"
              @click="openModal('delete',item)"
              >刪除</button> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- phone Size -->
    <div class="card mb-4 d-md-none" v-for="item in products" :key="item.id">
      <div class="position-relative">
        <img :src="item.imageUrl" class="card-img-top" :alt="item.id">
        <div class="position-absolute top-5 start-0 d-flex justify-content-between align-items-center w-100">
          <span class="bg-secondary px-4 py-2 text-primary">
            {{item.category}}
          </span>
          <span class="text-success fs-1 pe-3 bi bi-check2-circle" v-if="item.is_enabled"></span>
          <span class="text-danger fs-1 pe-3 bi bi-x-circle" v-else></span>
        </div>
      </div>
      <div class="card-body px-0 pb-0">
        <h5 class="card-title d-flex justify-content-between px-3">
          {{item.title}}
          <span v-if="item.origin_price===item.price">
              NT$ {{$filters.currency(item.price)}}
          </span>
        </h5>
        <p class="card-text px-3">
          <span v-if="item.origin_price!=item.price">
            <span>
              原價：NT$ {{$filters.currency(item.origin_price)}}
            </span>
            <span>
              售價：NT$ {{$filters.currency(item.price)}}
            </span>
          </span>
        </p>
        <div class="border-top border-1">
          <button class="product-phoneSize-edit-btn col-6 border-0 border-end py-2 text-success"
            @click="openModal('edit',item)"
          >
            編輯
          </button>
          <button class="product-phoneSize-edit-btn col-6 border-0 py-2 text-danger"
            @click="openModal('delete',item)"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
    <button class="icon-btn position-fixed bottom-15 end-5"
      data-bs-toggle="tooltip" data-bs-placement="top" title="新增"
      ref="tooltip"
      @click.prevent="openModal('add')"
    >
      <i class="bi bi-plus-circle"></i>
    </button>
    <product-modal ref="showProductModal"
    :product="tempProduct"
    @add-product="updateProduct"
    ></product-modal>
    <delete-modal ref="showDeleteModal"
    :item="tempProduct"
    @delete-item="deleteProduct"
    ></delete-modal>
    <template v-if="pagination.total_pages>1">
      <pagination :pages="pagination"
        @change-page="getProducts"
      ></pagination>
    </template>
</template>

<style lang="scss">
.products-view{
  tr{
    height: 100px;
    td{
      line-height: 100px;
    }
  }
}
.product-phoneSize-edit-btn{
  background: #fff;
  &:hover{
    color: #fff !important;
    &:first-child{
      background: #198754;
    }
    &:last-child{
      background: #FF6363;
    }
  }
}
</style>

<script>
import productModal from '@/components/ProductModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
import pagination from '@/components/PaginationView.vue'
import ToolTip from '@/mixins/ToolTip'
// import { currency } from '@/methods/filters'
export default {
  components: {
    productModal,
    deleteModal,
    pagination
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNewProduct: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  mixins: [ToolTip],
  methods: {
    // currency,
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.products = res.data.products
            this.pagination = res.data.pagination
            scrollTo(0, 0)
          }
        })
        .catch((err) => console.log(err.response))
    },
    // 開啟新增＆編輯&刪除
    openModal (key, item) {
      if (key === 'add') {
        // 每次都清空資料欄
        this.tempProduct = {}
        this.isNewProduct = true
        this.$refs.showProductModal.showModal()
      } else if (key === 'edit') {
        this.tempProduct = { ...item }
        this.isNewProduct = false
        this.$refs.showProductModal.showModal()
      } else {
        this.tempProduct = { ...item }
        this.$refs.showDeleteModal.showModal()
      }
    },
    updateProduct (item) {
      this.tempProduct = item

      // 新增狀態
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯狀態
      if (!this.isNewProduct) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }

      const productModalComponent = this.$refs.showProductModal
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          productModalComponent.hideModal()
          // 製作吐司列表（ 查看回傳成功與否）
          if (res.data.success) {
            this.getProducts()
            this.$message('success', '更新成功')
          } else {
            this.$message('danger', '失敗！請再試一次！')
          }
        })
    },
    deleteProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.$refs.showDeleteModal.hideModal()
            this.getProducts()
            this.$message('success', '刪除成功')
          }
        })
        .catch((err) => console.log(err.response))
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
