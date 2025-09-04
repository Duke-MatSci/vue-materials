<script>
import { h } from 'vue'

export default {
  name: 'MdTableCellSelection',
  props: { value: Boolean, mdRowId: [Number, String], mdSelectable: Boolean, mdDisabled: Boolean },
  inject: ['MdTable'],
  data: () => ({ isSelected: false }),
  watch: { value: { immediate: true, handler(v) { this.isSelected = v } } },
  methods: { onChange() { this.$emit('input', this.isSelected) } },
  render() {
    if (!this.mdSelectable) return null
    const checkbox = h('md-checkbox', { modelValue: this.isSelected, disabled: !this.mdSelectable || this.mdDisabled, onChange: this.onChange })
    return h('td', { class: ['md-table-cell', 'md-table-cell-selection'] }, [h('div', { class: 'md-table-cell-container' }, [checkbox])])
  }
}
</script>

<style lang="scss">
.md-table-cell-selection { width: 66px; }
.md-table-cell-selection + th .md-table-head-label { padding-left: 0; }
.md-table-cell-selection + td .md-table-cell-container { padding-left: 0; }
.md-table-cell-selection .md-table-head-container,
.md-table-cell-selection .md-table-cell-container,
.md-table-cell-selection .md-table-head-label,
.md-table-cell-selection .md-table-cell-label { padding: 0; display: flex; align-items: center; justify-content: center; overflow: visible; }
.md-table-cell-selection .md-checkbox { margin: 0; }
</style>

