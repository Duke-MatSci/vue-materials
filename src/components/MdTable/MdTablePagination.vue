<script>
import { h } from 'vue'

export default {
  name: 'MdTablePagination',
  inject: ['MdTable'],
  props: {
    mdPageSize: { type: [String, Number], default: 10 },
    mdPageOptions: { type: Array, default: () => [10, 25, 50, 100] },
    mdPage: { type: Number, default: 1 },
    mdTotal: { type: [String, Number], default: 'Many' },
    mdLabel: { type: String, default: 'Rows per page:' },
    mdSeparator: { type: String, default: 'of' },
  },
  emits: ['update:mdPage', 'update:mdPageSize'],
  data: () => ({ currentPageSize: 0 }),
  computed: {
    currentItemCount() { return (this.mdPage - 1) * this.mdPageSize + 1 },
    currentPageCount() { return this.mdPage * this.mdPageSize },
  },
  watch: { mdPageSize: { immediate: true, handler() { this.currentPageSize = this.pageSize } } },
  methods: {
    setPageSize() { this.$emit('update:mdPageSize', this.currentPageSize) },
    goToPrevious() { if (this.mdPage > 1) this.$emit('update:mdPage', this.mdPage - 1) },
    goToNext() { const total = Number(this.mdTotal)||0; const size = Number(this.mdPageSize)||1; const max = Math.max(1, Math.ceil(total/size)); if (this.mdPage < max) this.$emit('update:mdPage', this.mdPage + 1) },
  },
  created() { this.currentPageSize = this.mdPageSize },
  render() {
    const select = h('md-field', null, [h('md-select', { modelValue: this.currentPageSize, mdDense: true, mdClass: 'md-pagination-select', onChanged: this.setPageSize }, { default: () => (this.mdPageOptions||[]).map(a => h('md-option', { key: a, value: a }, { default: () => String(a) })) })])
    const label = h('span', { class: 'md-table-pagination-label' }, this.mdLabel)
    const leftBtn = h('md-button', { class: 'md-icon-button md-table-pagination-previous', disabled: this.mdPage === 1, onClick: this.goToPrevious }, { default: () => [h('md-icon', null, { default: () => 'keyboard_arrow_left' })] })
    const rightBtn = h('md-button', { class: 'md-icon-button md-table-pagination-next', onClick: this.goToNext }, { default: () => [h('md-icon', null, { default: () => 'keyboard_arrow_right' })] })
    const summary = h('span', null, `${this.currentItemCount}-${this.currentPageCount} ${this.mdSeparator} ${this.mdTotal}`)
    const controls = [summary, leftBtn, rightBtn]
    if (this.mdPageOptions !== false) controls.unshift(select)
    if (this.mdPageOptions !== false) controls.unshift(label)
    return h('div', { class: 'md-table-pagination' }, controls)
  }
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-table-pagination { height: 56px; display: flex; flex: 1; align-items: center; justify-content: flex-end; border-top: 1px solid; font-size: 12px; }
.md-table-pagination .md-table-pagination-previous { margin-right: 2px; margin-left: 18px; }
.md-table-pagination .md-field { width: 48px; min-width: 36px; margin: -16px 24px 0 32px; }
.md-table-pagination .md-field:after, .md-table-pagination .md-field:before { display: none; }
.md-table-pagination .md-field .md-select-value { font-size: 13px; }
.md-menu-content.md-pagination-select { max-width: 82px; min-width: 56px; margin-top: 5px; }
</style>
