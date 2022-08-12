<template>
  <div class="descriptionModal" :class="{'d-none':hideDescriptionModal}">
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref="modal"
      style="z-index:1062;"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h5 class="modal-title" id="staticBackdropLabel">產品描述</h5>
            <input type="button" value="✕" class=" bg-transparent border-0" data-bs-dismiss="modal" aria-label="Close" @click="hideModal">
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mb-3">
                <label for="description" class="form-label">標題</label>
                <div class="row justify-content-between">
                  <div class="col-6">
                    <select class="form-control" id="description"
                      :disabled="!isAdd"
                      v-model="newTitle" @click="addTitle=true"
                    >
                      <option value="請選擇" disabled>請選擇</option>
                      <option v-for="item in descriptionTitle"
                        :key="item" :value="item"
                      >{{item}}</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <input type="button" class="btn btn-secondary w-100"
                      value="新增標題"
                      :disabled="!isAdd"
                      :class="{'d-none':!addTitle}"
                      @click.prevent="showAdd(true)"
                    >
                    <div class="d-flex align-items-center">
                      <input type="text" class="form-control w-80"
                        placeholder="請輸入標題"
                        :class="{'d-none':addTitle}"
                        v-model="newTitle">
                      <i class="bi bi-patch-check pointer ms-2 fs-3" :class="{'d-none':addTitle}"
                        @click.prevent="addNewTitle"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 內容 -->
              <div class="col-12 mb-3">
                <label for="description" class="form-label">內容</label>
                <input type="text" class="form-control" placeholder="請輸入產品描述內容"
                  v-model="newContent"
                  v-if="isAdd"
                  @keyup.enter="addDescription(true)"
                >
                <input type="text" class="form-control" placeholder="請輸入產品描述內容"
                  v-model="newContent"
                  v-else
                  @keyup.enter="addDescription(false)"
                >
              </div>
            </div>
            <button class="btn btn-secondary w-100 mb-3"
              v-if="isAdd"
              @click="addDescription"
            >新增產品描述</button>
            <button class="btn btn-secondary w-100 mb-3"
              v-else
              @click="addDescription(false,'sendEdit')"
            >修改產品描述</button>
            <ul class="list-unstyled">
              <li class="d-flex justify-content-between" v-for="(item, index) in description" :key="item">
                <p class="w-85 mb-1">{{item.title}}：{{item.content}}</p>
                <div>
                  <i class="bi bi-pencil pointer me-3"
                    @click="addDescription(false,'edit',index)"
                  ></i>
                  <i class="bi bi-trash pointer"
                    @click="deleteDescription(index)"
                  ></i>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="hideModal">取消</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="addFinal"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.descriptionModal{
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 1061;
  background-color: rgb(83, 86, 92,.3);
}
</style>
<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  props: {
    describe: {
      type: Array,
      default () { return [] }
    }
  },
  emits: ['add-description'],
  inject: ['emitter'],
  mixins: [ModalMixin],
  data () {
    return {
      modal: {},
      description: [],
      hideDescriptionModal: true,
      descriptionTitle: ['國家', '處理法', '烘焙程度', '風味', '重量(g)', '尺寸(mm)', '材質', '容量(ml)'],
      isAdd: true,
      alreadyHaveTitle: false,
      addTitle: true,
      newTitle: '',
      newContent: ''
    }
  },
  watch: {
    describe () {
      this.description = this.describe
    },
    newTitle () {
      if (this.newTitle !== '') {
        this.description.forEach((item) => {
          if (item.title === this.newTitle && this.isAdd) {
            alert(`該標題「${item.title}」已經選過囉！請再選其他的標題：）`)
            this.newTitle = ''
          }
        })
      }
    }
  },
  methods: {
    showAdd (key) {
      if (key) {
        this.addTitle = false
      } else {
        this.addTitle = true
      }
    },
    addNewTitle () {
      const haveDescriptionTitle = this.descriptionTitle.indexOf(this.newTitle)
      if (haveDescriptionTitle !== -1) {
        alert('已經有此分類名稱囉！')
      } else if (this.newTitle === '') {
        alert('請輸入標題！')
      } else {
        this.descriptionTitle.push(this.newTitle)
        this.addTitle = true
      }
      this.newTitle = ''
    },
    addDescription (key, editKey, index) {
      if (key) {
        if (this.newTitle !== '' && this.newContent !== '') {
          const obj = {}
          // 將title賦予到description物件中的屬性名稱，並將content賦予到屬性名稱下的變數值
          obj.title = this.newTitle
          obj.content = this.newContent
          this.description.push(obj)
          // this.message('success', '新增成功')
          // 淨空title & content
          this.render()
        } else {
          alert('欄位不能是空白的唷！')
        }
      } else {
        this.isAdd = false
        scrollTo(0, 0)
        if (editKey === 'edit') {
          this.newTitle = this.description[index].title
          this.newContent = this.description[index].content
        } else {
          this.description.forEach((item) => {
            if (item.title === this.newTitle) {
              item.content = this.newContent
              this.render()
            }
          })
          this.isAdd = true
        }
      }
    },
    deleteDescription (index) {
      this.description.splice(index, 1)
    },
    addFinal () {
      if (this.description.length === 0) {
        this.$emit('add-description', this.description, true)
      } else {
        this.$emit('add-description', this.description, false)
      }
      this.description = []
      this.render()
      this.hideDescriptionModal = true
    },
    hideModal () {
      this.render()
      this.hideDescriptionModal = true
    },
    render () {
      this.newTitle = ''
      this.newContent = ''
      this.isAdd = true
    }
  },
  created () {
    // 註冊監聽
    this.emitter.on('openDescription', (data) => {
      this.hideDescriptionModal = data
    })
  }
}
</script>
