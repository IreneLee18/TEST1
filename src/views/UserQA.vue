<template>
  <LoadingView :active="isLoading"></LoadingView>
  <div class="QandA-bg">
    <div class="h-100 position-relative">
      <div class="accordion">
        <div class="accordion-item"
          v-for="item in question" :key="item.title" :data-id="item.id"
          @click="openAccordion(item)"
        >
          <h2 class="accordion-header">
            <button class="accordion-button fw-bold shadow-none" type="button" :class="{'collapsed':item.btn}">
              <span class="border rounded-circle bg-secondary p-1 me-3">Q{{item.id}}</span>{{item.title}}
            </button>
          </h2>
          <div class="accordion-collapse collapse" :class="{'show':item.openContent}">
            <div class="accordion-body">
              {{item.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true,
      question: [
        {
          id: 1,
          title: '退款換貨須知',
          content: '若商品不符合預期，在商品收到後隔日起７天內提出，我們會在兩天內與您聯繫，並通知您退款換貨流程。（注意：包裹皆須附上完整商品）',
          btn: true,
          openContent: false
        },
        {
          id: 2,
          title: '保存方式',
          content: '請勿曝曬在高溫下，並保持乾燥，若豆子已開封請確實密封好。',
          btn: true,
          openContent: false
        },
        {
          id: 3,
          title: '咖啡豆最佳飲用時機',
          content: '商品皆有標示烘豆日期，建議參考烘豆日期，並加７天時間在開封。',
          btn: true,
          openContent: false
        },
        {
          id: 4,
          title: '咖啡豆保存期限',
          content: '若保存方式完善，皆可存放一至兩個月時間。有效日期皆標示在背後。',
          btn: true,
          openContent: false
        },
        {
          id: 5,
          title: '耳掛包保存期限',
          content: '若保存方式完善，皆可存放一年時間。有效日期皆標示在背後。',
          btn: true,
          openContent: false
        },
        {
          id: 6,
          title: '研磨服務',
          content: '提供研磨服務，可以在購買時備註並告知我們您的器具。',
          btn: true,
          openContent: false
        }
      ]
    }
  },
  methods: {
    loading () {
      this.isLoading = false
    },
    openAccordion (key) {
      // eslint-disable-next-line array-callback-return
      this.question.filter(item => {
        if (item.id === key.id) {
          item.btn = !item.btn
          item.openContent = !item.openContent
        }
      })
    }
  },
  created () {
    window.setTimeout(this.loading, 2000)
    window.scrollTo(0, 0)
  }
}
</script>
