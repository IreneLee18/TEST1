import Tooltip from 'bootstrap/js/dist/tooltip'
export default {
  mounted () {
    this.tooltip = new Tooltip(this.$refs.tooltip)
  }
}
