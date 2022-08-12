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
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <input type="button" value="✕" class=" bg-transparent border-0 text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-lg-4 position-relative">
              <h3 style="text-shadow: 3px 6px 1px #dcdddf;">用戶資料</h3>
              <table class="table border-top border-2 border-primary">
                <tbody class="border box-shadow" v-if="order.user">
                  <tr>
                    <th style="width: 100px;">姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12 col-lg-8">
              <h3 style="text-shadow: 3px 6px 1px #dcdddf;">訂單細節</h3>
              <table class="table border-top border-3 border-primary">
                <tbody class="border box-shadow">
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ order.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(order.create_at)}}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="order.paid_date">
                        {{ $filters.date(order.paid_date) }}
                      </span>
                      <span v-else></span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="order.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-danger">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td class="text-danger">
                      NT$ {{ $filters.currency(order.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 class="border-bottom border-3 border-primary mb-0 pb-2" style="text-shadow: 3px 6px 1px #dcdddf;">選購商品</h3>
              <div class="order-user-buy-product overflow-scroll border box-shadow">
                <table class="table mb-0">
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <th>
                        <div class="d-flex">
                          <p class="border text-secondary text-center me-2 mb-0" style="width:70px;">{{ item.product.category }}</p>
                          <span>{{ item.product.title }}</span>
                        </div>
                      </th>
                      <td class="text-end px-0">
                        {{ item.qty }} ／ {{ item.product.unit }}
                      </td>
                      <td class="d-none d-md-table-cell text-end">
                          <span>NT${{ $filters.currency(item.final_total) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.order-user-buy-product{
  max-height: 206px;
  @media (min-width:992px) {
    max-height: 345px;
  }
}
</style>

<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    tempOrder: {}
  },
  watch: {
    tempOrder () {
      this.order = this.tempOrder
    }
  },
  data () {
    return {
      modal: {},
      order: {}
    }
  },
  mixins: [ModalMixin]
}
</script>
