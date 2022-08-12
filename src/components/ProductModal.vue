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
            <span>產品</span>
          </h5>
          <input type="button" value="✕" class=" bg-transparent border-0 text-white" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <v-form class="row" v-slot="{ errors }">
            <div class="col-12 col-lg-6 position-relative">
              <div class="row gx-2">
                <div class="mb-3 col-12 col-lg-6">
                  <label for="title" class="form-label">名稱<span class="text-danger">*</span></label>
                  <v-field type="text" class="form-control" id="title"
                    placeholder="請輸入產品名稱"
                    name="產品名稱"
                    :class="{ 'is-invalid': errors['產品名稱'] }"
                    rules="required"
                    v-model="tempProduct.title"
                  />
                <error-message name="產品名稱" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-6 col-lg-3">
                  <label for="category" class="form-label">分類<span class="text-danger">*</span></label>
                  <v-field as="select" class="form-control" id="category"
                    v-model="tempProduct.category"
                    @click.prevent="addCategory = false"
                    name="產品分類"
                    :class="{ 'is-invalid': errors['產品分類'] }"
                    rules="required"
                  >
                    <option value="請選擇" disabled>請選擇</option>
                    <option :value="item" v-for="item in category" :key="item">{{ item }}</option>
                  </v-field>
                  <error-message name="產品分類" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-6 col-lg-3">
                  <label class="form-label opacity-0">新增分類</label>
                  <button type="button" class="btn btn-primary w-100" @click.prevent="showAdd(true)">新增分類</button>
                </div>
              </div>
              <div class="add-category box-shadow" :class="{'opacity1':addCategory,'top-13':addCategory}">
                <input type="text" class="form-control"
                  placeholder="請輸入分類名稱"
                  v-model="newCategory"
                >
                <div class="d-flex justify-content-between mt-3">
                  <button class="btn btn-outline-secondary px-4" @click="showAdd(false)">取消</button>
                  <button class="btn btn-primary px-4" @click.prevent="addNew">新增</button>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="mb-3 col-6">
                  <label for="unit" class="form-label">單位<span class="text-danger">*</span></label>
                  <v-field type="text" class="form-control" id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                    name="產品單位"
                    :class="{ 'is-invalid': errors['產品單位'] }"
                    rules="required"
                  />
                <error-message name="產品單位" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-6">
                  <label for="is_enabled" class="form-label">上架
                    <span v-if="tempProduct.is_enabled">(是)</span>
                    <span v-else>(否)</span>
                  </label>
                  <div>
                    <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-6">
                  <label for="origin_price" class="form-label">原價<span class="text-danger">*</span></label>
                  <v-field type="number" class="form-control" id="origin_price"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                    name="產品原價"
                    :class="{ 'is-invalid': errors['產品原價'] }"
                    rules="required"
                  />
                <error-message name="產品原價" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-6">
                  <label for="price" class="form-label">售價<span class="text-danger">*</span></label>
                  <v-field type="number" class="form-control" id="price"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                    name="產品售價"
                    :class="{ 'is-invalid': errors['產品售價'] }"
                    rules="required"
                  />
                <error-message name="產品售價" class="invalid-feedback" />
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="content" class="form-label">說明</label>
                <textarea class="form-control" id="content"
                  placeholder="請輸入產品說明內容"
                  rows="5"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <div class="mb-3">
                <input type="button" class="btn btn-primary pointer"
                  value="加入參考連結" :class="{'d-none':referenceUrl}"
                  @click.prevent="referenceUrl=true"
                >
                <input type="text" class="form-control w-100"
                  placeholder="請輸入參考連結"
                  :class="{'d-none':!referenceUrl}"
                  v-model="tempProduct.referenceUrl">
              </div>
              <div class="mb-3">
                <template v-if="!newDescription">
                  <label class="form-label">描述</label>
                  <div class="row border rounded-2 g-0" style="padding:1rem 0.75rem;">
                    <div class="col-6">
                      <ul class="list-unstyled m-0">
                        <li v-for="description in tempProduct.description" :key="description">
                          {{description.title}}：{{description.content}}
                        </li>
                      </ul>
                    </div>
                    <div class="col-6 text-end align-self-end">
                      <button class="btn btn-primary pointer"
                        @click="openDescription(false, tempProduct.description)"
                      >編輯產品描述</button>
                    </div>
                  </div>
                </template>
                <button class="btn btn-primary pointer"
                  @click="openDescription(true)"
                  v-if="newDescription"
                >新增產品描述</button>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <!-- main image -->
              <div class="row">
                <span class="form-label">上傳主要圖片<small>( 網址／檔案 )</small></span>
                <div class="col-8">
                  <div class="row">
                    <div class="col-12 mb-3">
                      <input type="text" class="form-control" id="imageMailUrl"
                      placeholder="請輸入圖片連結"
                      v-model="tempProduct.imageUrl"
                      >
                    </div>
                    <div class="col-12 mb-3">
                      <input
                        type="file"
                        id="imageMailFile"
                        class="form-control"
                        @change="uploadFile('main',$event)"
                        >
                    </div>
                  </div>
                </div>
                <div class="col-4 text-end">
                  <div class="border" style="height:92px;" v-if="tempProduct.imageUrl === ''">
                    <p class="text-center" style="line-height:92px;">
                      <i class="bi bi-image"></i>
                    </p>
                  </div>
                  <img class="files img-fluid" :src="tempProduct.imageUrl">
                </div>
              </div>

              <!-- multiple image -->
              <div class="row">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span>上傳次要圖片<small>( 網址／檔案 )</small></span>
                  <input type="button" class="btn btn-primary" value="新增"
                    @click="addImages(tempProduct.images.length)"
                  >
                </div>
                <template v-if="tempProduct.images">
                  <div class="col-6 mb-3" v-for="(image, index) in tempProduct.images" :key="index">
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="mb-0">次要圖片 {{index+1}} </p>
                      <i class="bi bi-trash pointer" @click="tempProduct.images.splice(index,1)"></i>
                    </div>
                    <input type="text" class="form-control mb-3" :id="`imagesUrl${index}`"
                      placeholder="請輸入圖片連結"
                      v-model="tempProduct.images[index]"
                    >
                    <label :for="`imagesFile${index}`" class="images-label w-100 pointer">
                      <input
                        type="file"
                        :id="`imagesFile${index}`"
                        class="d-none"
                        @change="uploadFile(index,$event)"
                      >
                      <div class="border rounded-3" style="height:172.45px;" v-if="tempProduct.images[index]===''">
                        <p class="text-center" style="line-height:172.45px;">
                          <i class="bi bi-cloud fs-4"></i>
                        </p>
                      </div>
                      <img class="img-fluid" style="height:172.45px;" :src="image">
                    </label>
                  </div>
                </template>
              </div>

            </div>
          </v-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
          data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary"
          @click="addProduct"
          >確認</button>
        </div>
      </div>
    </div>
  </div>
  <!-- description modal -->
  <description-modal
  :describe="tempProduct.description"
  @add-description="updateDescription"
  ref="descriptionModal"
  ></description-modal>
</template>

<style lang="scss">
.add-category{
  position: absolute;
  top:-1000000000px;
  right: 10px;
  background: #fff;
  border: 1px solid #53565C;
  border-radius: 0.3rem;
  padding: 2rem;
  opacity: 0;
}
.files{
  height: 92px !important;
}
.images-label{
  .bi-cloud{
    &::before{
      transition: transform .5s;
    }
  }
  &:hover{
    .bi-cloud{
      &::before{
        content: '\f297';
        transform: scale(2);
      }
    }
  }
}
</style>

<script>
import ModalMixin from '@/mixins/ModalMixin'
import descriptionModal from '@/components/DescriptionModal.vue'
export default {
  components: {
    descriptionModal
  },
  props: {
    product: {
      type: Object,
      default () { return {} }
    }
  },
  emits: ['add-product'],
  inject: ['emitter'],
  mixins: [ModalMixin],
  watch: {
    product () {
      this.tempProduct = this.product
      // 當沒有this.tempProduct.images(反轉他變成true)，就新增一個空陣列
      if (!this.tempProduct.images) {
        this.tempProduct.images = []
      }
      // 當沒有this.tempProduct.images(反轉他變成true)，就新增一個空陣列
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
      // 當沒有this.tempProduct.referenceUrl(反轉他變成true)，就將加入參考連結按鈕顯示出來，並隱藏存放連結的input
      if (!this.tempProduct.referenceUrl) {
        this.referenceUrl = false
      } else {
        this.referenceUrl = true
      }
    },
    // 監聽tempProduct裡面的description === undefined，就將產品描述按鈕改成新增，反之則改成編輯
    'tempProduct.description' () {
      if (this.tempProduct.description === undefined || this.tempProduct.description.length === 0) {
        this.newDescription = true
      } else {
        this.newDescription = false
      }
    }
  },
  data () {
    return {
      modal: {}, // 存放modal回傳的資料
      tempProduct: {}, // 存放外層(ProductsView)回傳的資料
      category: [],
      addCategory: false, // open & close : add category input
      newCategory: '',
      referenceUrl: false,
      newDescription: true
    }
  },
  methods: {
    getCategory () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then((res) => {
          res.data.products.forEach(item => {
            if (!this.category.includes(item.category)) {
              this.category.push(item.category)
            }
          })
        })
        .catch((err) => console.log(err))
    },
    showAdd (key) {
      if (key) {
        this.addCategory = true
      } else {
        this.addCategory = false
      }
    },
    addNew () {
      const haveCategory = this.category.indexOf(this.newCategory)
      if (haveCategory !== -1) {
        alert('已經有此分類名稱囉！')
      } else {
        this.category.push(this.newCategory)
        this.addCategory = false
      }
      this.newCategory = ''
    },
    openDescription (key, item) {
      if (key) {
        // 每次都清空資料欄
        this.tempProduct.description = []
      } else {
        this.tempProduct.description = [...item]
      }
      this.emitter.emit('openDescription', false)
      this.$refs.descriptionModal.showModal()
    },
    updateDescription (item, key) {
      this.tempProduct.description = item
      this.newDescription = key
    },
    uploadFile (key, e) {
      this.addImages = false
      const file = e.target.files[0]
      const formData = new FormData()
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      formData.append('file-to-upload', file)
      this.$http.post(api, formData)
        .then((res) => {
          if (res.data.success) {
            if (key === 'main') {
              this.tempProduct.imageUrl = res.data.imageUrl
            } else {
              this.tempProduct.images[key] = res.data.imageUrl
            }
          }
        })
        .catch((err) => console.log(err.response))
    },
    addImages (index) {
      const images = this.tempProduct.images
      console.log(images[index - 1], images[0] !== '')
      if (images.length < 4) {
        if (images[index - 1] === '' || images[0] === '') {
          alert('不要那麼貪心><!先加入照片再新增新的!!')
        } else {
          images.push('')
        }
      } else {
        alert('次要圖片最多只能上傳四張唷！')
      }
    },
    addProduct () {
      // 防止新增空陣列
      this.tempProduct.images.forEach((item, index) => {
        if (item === '') {
          this.tempProduct.images.splice(index, 1)
          // console.log(item, '刪掉空格', index)
        }
      })
      this.$emit('add-product', this.tempProduct)
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>
