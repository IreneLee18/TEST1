<template>
  <LoadingView :active="isLoading"></LoadingView>
  <template v-if="coupons.length === 0">
    <div class="position-absolute top-50 start-50 translate-middle fs-1">目前無優惠卷</div>
  </template>

  <template v-else>
    <table class="d-none d-md-table table mt-8 mt-md-10">
      <thead>
        <tr>
          <th>名稱</th>
          <th>代碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th class="text-center">啟用</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <!-- <td>{{ item.due_date }}</td> -->
          <td>{{ $filters.date(item.due_date) }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled === 1" class="text-success">YES</span>
            <span v-else class="text-danger">NO</span>
          </td>
          <td class="text-end">
            <i class="bi bi-pencil pointer me-1 me-md-4" @click="openModal('edit', item)"></i>
            <i class="bi bi-trash pointer"  @click="openModal('delete',item)"></i>
            <!-- <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
              @click="openModal('edit',item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm"
              @click="openModal('delete',item)"
              >刪除</button>
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>

    <!-- phone-szie -->
    <div class="card mb-4 d-md-none" v-for="item in coupons" :key="item">
      <div class="position-relative">
        <div class="position-absolute end-0" style="top:.5rem;">
          <span class="text-success fs-1 pe-3 bi bi-check2-circle" v-if="item.is_enabled"></span>
          <span class="text-danger fs-1 pe-3 bi bi-x-circle" v-else></span>
        </div>
      </div>
      <div class="card-body px-0 pb-0">
        <h5 class="card-title d-flex justify-content-between px-3 mb-3">{{item.title}}</h5>
        <div class="card-text px-3">
          <p>
            <span>折扣代碼：</span>
            <span>{{ item.code }}</span>
          </p>
          <p>
            <span>有效日期：</span>
            <span>{{ $filters.date(item.due_date) }}</span>
          </p>
          <p>
            <span>折扣百分比：</span>
            <span>{{ item.percent }}%</span>
          </p>
        </div>
        <div class="border-top border-1">
          <button class="coupons-phoneSize-edit-btn col-6 border-0 border-end py-2 text-success"
            @click="openModal('edit',item)"
          >
            編輯
          </button>
          <button class="coupons-phoneSize-edit-btn col-6 border-0 py-2 text-danger"
            @click="openModal('delete',item)"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  </template>

  <button class="icon-btn position-fixed bottom-15 end-5"
    data-bs-toggle="tooltip" data-bs-placement="top" title="新增"
    ref="tooltip"
    @click.prevent="openModal('add')"
  >
    <i class="bi bi-plus-circle"></i>
  </button>

  <coupon-modal
    ref="showCouponModal"
    :coupon="tempCoupon"
    @add-coupon="updateCoupon"
  ></coupon-modal>
  <delete-modal
    ref="showDeleteModal"
    :item="tempCoupon"
    @delete-item="deleteCoupon"
  ></delete-modal>
  <template v-if="pagination.total_pages>1">
    <pagination :pages="pagination"
      @change-page="getCoupons"
    ></pagination>
  </template>
</template>

<style lang="scss">
.coupons-phoneSize-edit-btn{
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
import couponModal from '@/components/CouponModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
import pagination from '@/components/PaginationView.vue'
import ToolTip from '@/mixins/ToolTip'

export default {
  components: {
    couponModal,
    deleteModal,
    pagination
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  mixins: [ToolTip],
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      // console.log(api)
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          scrollTo(0, 0)
        })
        .catch((err) => console.log(err.response))
    },
    updateCoupon (item) {
      this.tempCoupon = item
      // 新增
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(api, { data: this.tempCoupon })
          .then(res => {
            if (res.data.success) {
              this.getCoupons()
              this.$message('success', res.data.message)
            } else {
              this.$message('danger', '新增失敗')
            }
          })
          .catch(err => console.log(err.response))
        this.$refs.showCouponModal.hideModal()
      } else {
        // 編輯
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(api, { data: this.tempCoupon })
          .then(res => {
            if (res.data.success) {
              this.getCoupons()
              this.$message('success', '更新成功')
            } else {
              this.$message('danger', '更新失敗')
            }
          })
          .catch(err => console.log(err.response))
        this.$refs.showCouponModal.hideModal()
      }
    },
    openModal (type, item) {
      if (type === 'delete') {
        this.tempCoupon = { ...item }
        this.$refs.showDeleteModal.showModal()
      } else {
        if (type === 'add') {
          this.tempCoupon = {
            // 因為在新增時候如果沒點checkbox，讓他先吃到true&false的話，會一直是空值，雖然搞不懂為什麼會這樣，但試著在這裡直接填寫預設，就解決問題了。
            is_enabled: 0,
            // 日期轉換格式-老師寫法
            due_date: new Date().getTime() / 1000
            // due_date: new Date().getTime() // 後面再寫時意識到API回傳的時間就已經先「 除 1000 」，所以在filter才要將1000乘回來，但due_date是我們自己傳進去ＡＰＩ的所以還是需要將數字除1000，這樣filter就不用寫兩個轉換date了
          }
        } else {
          this.tempCoupon = { ...item }
        }
        this.$refs.showCouponModal.showModal()
      }
    },
    deleteCoupon () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(api)
        .then(res => {
          if (res.data.success) {
            this.getCoupons()
            this.$message('success', res.data.message)
          }
        })
        .catch(err => console.log(err.response))
      this.$refs.showDeleteModal.hideModal()
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
