import Dropdown from 'bootstrap/js/dist/dropdown'
export default {
  methods: {
    showDropdown () {
      this.dropDown.show()
    },
    hideDropdown () {
      this.dropDown.hide()
    }
  },
  mounted () {
    this.dropDown = new Dropdown(this.$refs.dropdown)
  }
}
