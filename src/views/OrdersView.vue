<template>
  <LoadingView :active="isLoading"></LoadingView>
  <template v-if="orders.length === 0">
    <div class="position-absolute top-50 start-50 translate-middle fs-1">目前沒有訂單</div>
  </template>

  <template v-else>
    <div class="d-lg-flex justify-content-lg-end mt-md-12 mb-3">
      <label for="searchUserId" class="d-flex align-items-center border rounded-3">
        <i class="bi bi-search px-2"></i>
        <input type="text" class="border-0 p-2" placeholder="請填入想找的訂單編號" id="searchUserId" v-model="searchID">
      </label>
    </div>
    <table class="d-none d-md-table table">
      <thead>
        <tr>
          <th class="d-none d-md-table-cell">訂購時間</th>
          <th>訂單編號</th>
          <th class="d-none d-lg-table-cell">購買人資訊</th>
          <th class="d-none d-lg-table-cell">應付金額</th>
          <th class="text-center">付款<span class="d-none d-md-inline">狀態</span></th>
          <th class="text-center">詳情</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in filterOrder" :key="item.id">
          <tr>
            <td class="d-none d-md-table-cell">{{ $filters.date(item.create_at) }}</td>
            <td>{{ item.id }}</td>
            <td class="d-none d-lg-table-cell">{{ item.user.name }} ／ {{ item.user.tel }} ／ {{ item.user.email }}</td>
            <td class="d-none d-lg-table-cell text-right">NT$ {{ $filters.currency(item.total) }}</td>
            <td class="text-center">
              <span class="text-success" v-if="item.is_paid">YES</span>
              <span class="text-danger" v-else>NO</span>
            </td>
            <td class="text-center">
              <i class="bi bi-eye-fill pointer" @click="openModal('watch', item)"></i>
            </td>
            <td class="text-end">
              <i class="bi bi-pencil pointer me-1 me-md-4" @click="openModal('edit', item)"></i>
              <i class="bi bi-trash pointer"  @click="openModal('one',item)"></i>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- phone Size -->
    <div class="card mb-4 d-md-none" v-for="item in filterOrder" :key="item.id">
      <div class="card-body px-0 pb-0">
        <div class="card-text px-3">
          <div class="row mb-2 pb-2 border-bottom">
            <div class="col-2">編號</div>
            <h5 class="col-10 mb-0">{{item.id}}</h5>
          </div>
          <div class="row mb-2">
            <div class="col-2">姓名</div>
            <div class="col-10">
              <span>{{ item.user.name }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-2">電話</div>
            <div class="col-10">
              <span>{{ item.user.tel }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-2">信箱</div>
            <div class="col-10">
              <span>{{ item.user.email }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-2">日期</div>
            <div class="col-10">
              <span>{{ $filters.date(item.create_at) }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-2">金額</div>
            <div class="col-10">
              <span>NT$ {{ $filters.currency(item.total) }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-2">付款</div>
            <div class="col-10">
              <span class="text-success" v-if="item.is_paid">YES</span>
              <span class="text-danger" v-else>NO</span>
            </div>
          </div>
        </div>
        <div class="border-top border-1">
          <button class="order-phoneSize-edit-btn col-4 border-0 border-end py-2 text-primary"
            @click="openModal('watch', item)"
          >
            詳情
          </button>
          <button class="order-phoneSize-edit-btn col-4 border-0 border-end py-2 text-success"
            @click="openModal('edit', item)"
          >
            編輯
          </button>
          <button class="order-phoneSize-edit-btn col-4 border-0 py-2 text-danger"
            @click="openModal('one',item)"
          >
            刪除
          </button>
        </div>
      </div>
    </div>

    <!-- 為什麼這裡不能使用tooltip？？但productView可以使用 -->
    <button class="icon-btn position-fixed bottom-15 end-5"
      data-bs-toggle="tooltip" data-bs-placement="top" title="刪除"
      ref="tooltip"
      @click="openModal('all', orders)"
    >
      <i class="bi bi-x-circle"></i>
    </button>
    <order-watch-modal
      ref="showOrderWatchModal"
      :tempOrder="tempOrder"
    ></order-watch-modal>
    <order-edit-modal
      ref="showOrderEditModal"
      :tempOrder="tempOrder"
      @edit-order="editOrder"
    ></order-edit-modal>
    <delete-modal
      ref="showDeleteModal"
      :item="tempOrder"
      :type="key"
      @delete-item="deleteOrder"
    ></delete-modal>
    <template v-if="pagination.total_pages>1">
      <pagination :pages="pagination"
        @change-page="getOrders"
      ></pagination>
    </template>
  </template>
</template>

<style lang="scss">
.order-phoneSize-edit-btn{
  background: #fff;
  &:hover{
    color: #fff !important;
    &:first-child{
      background: #53565C;
    }
    &:nth-child(2){
      background: #198754;
    }
    &:last-child{
      background: #FF6363;
    }
  }
}
</style>

<script>
// import ToolTip from '@/mixins/ToolTip'
import orderWatchModal from '@/components/OrderWatchModal.vue'
import orderEditModal from '@/components/OrderEditModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
import pagination from '@/components/PaginationView.vue'

export default {
  components: {
    orderWatchModal,
    orderEditModal,
    deleteModal,
    pagination
  },
  data () {
    return {
      isLoading: false,
      orders: [], // 負責存放API傳出來的資料
      filterOrder: [], // 負責存放顯示畫面
      tempOrder: {}, // 負責存放傳入MODAL的
      pagination: {},
      searchID: '',
      key: '' // 負責記錄目前是刪除單一筆還全部
    }
  },
  inject: ['emitter'],
  // mixins: [ToolTip],
  watch: {
    searchID () {
      if (this.searchID === '') {
        this.filterOrder = this.orders
      } else {
        this.filterOrder = []
        this.orders.forEach((data) => {
          // trim:防止前後有空白鍵
          if (data.id === this.searchID.trim()) {
            this.filterOrder.push(data)
          }
        })
      }
    },
    orders () {
      this.filterOrder = this.orders
    }
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch((err) => console.log(err.response))
    },
    openModal (key, item) {
      this.tempOrder = { ...item }
      if (key === 'watch') {
        this.$refs.showOrderWatchModal.showModal()
      } else if (key === 'edit') {
        this.$refs.showOrderEditModal.showModal()
      } else {
        this.key = key
        this.$refs.showDeleteModal.showModal()
      }
    },
    editOrder (item) {
      this.tempOrder = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      // 一開始不管怎麼寫都無法更新，想說都取得到item也帶入資料為何不行？結果發現到是因為格式錯誤...
      // this.$http.put(api, this.tempOrder)
      this.$http.put(api, { data: this.tempOrder })
        .then(res => {
          if (res.data.success) {
            this.$refs.showOrderEditModal.hideModal()
            this.getOrders()
            this.$message('success', '編輯成功')
          }
        })
        .catch(err => console.log(err.response))
    },
    deleteOrder () {
      if (this.key === 'one') {
        // deleteONE
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
        this.$http.delete(api)
          .then(res => {
            if (res.data.success) {
              this.$refs.showDeleteModal.hideModal()
              this.getOrders()
              this.$message('success', '刪除成功')
            }
          })
          .catch(err => console.log(err.response))
      } else {
        // deleteALL
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`
        this.$http.delete(api)
          .then(res => {
            if (res.data.success) {
              this.$refs.showDeleteModal.hideModal()
              this.getOrders()
              this.$message('success', '刪除成功')
            }
          })
          .catch(err => console.log(err.response))
      }
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
