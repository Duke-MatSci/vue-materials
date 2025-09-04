<script>
import { h } from 'vue'

export default {
  name: 'MdTableCell',
  props: { mdId: [String, Number], mdLabel: String, mdNumeric: Boolean, mdTooltip: String, mdSortBy: String },
  inject: ['MdTable'],
  data: () => ({ index: null, parentNode: null }),
  computed: { cellClasses() { return { 'md-numeric': this.mdNumeric } } },
  watch: { mdSortBy() { this.setCellData() }, mdNumeric() { this.setCellData() }, mdLabel() { this.setCellData() }, mdTooltip() { this.setCellData() } },
  methods: {
    computeIndex() {
      if (!this.$el || !this.$el.parentNode) return
      const siblings = Array.from(this.$el.parentNode.childNodes).filter(({ tagName, classList }) => {
        const isSelection = classList && classList.contains('md-table-cell-selection')
        const isTd = tagName && tagName.toLowerCase() === 'td'
        return isTd && !isSelection
      })
      this.index = siblings.indexOf(this.$el)
    },
    setCellData() {
      if (this.index == null) this.computeIndex()
      if (this.index == null || this.index < 0) return
      this.$nextTick(() => {
        this.MdTable.items[this.index] = { id: this.mdId, label: this.mdLabel, numeric: this.mdNumeric, tooltip: this.mdTooltip, sortBy: this.mdSortBy }
      })
    },
  },
  mounted() { this.parentNode = this.$el.parentNode; this.computeIndex(); this.setCellData() },
  render() {
    return h('td', { class: ['md-table-cell', this.cellClasses] }, [h('div', { class: 'md-table-cell-container' }, this.$slots.default ? this.$slots.default() : [])])
  }
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-table-cell { height: 48px; position: relative; transition: .3s $md-transition-default-timing; font-size: 13px; line-height: 18px; }
.md-table-cell.md-numeric { text-align: right; }
.md-table-cell:last-child .md-table-cell-container { padding-right: 24px; }
.md-table-cell-container { padding: 6px 32px 6px 24px; }
</style>

