<script>
import { h } from 'vue'
import MdTableHead from './MdTableHead.vue'

export default {
  name: 'MdTableHeadSelection',
  components: { MdTableHead },
  inject: ['MdTable'],
  computed: {
    selectableCount() { return Object.keys(this.selectable||{}).length },
    isDisabled() { return !this.selectableCount },
    selectable() { return this.MdTable.selectable },
    selectedItems() { return this.MdTable.selectedItems },
    allSelected() { if (this.selectableCount === 0) return false; return this.selectable.every(item => this.selectedItems.includes(item)) },
  },
  methods: {
    onChange(val) { if (val) this.MdTable.selectedItems = this.selectedItems.concat(this.selectable.filter(item => !this.selectedItems.includes(item))); else this.MdTable.selectedItems = this.selectedItems.filter(item => !this.selectable.includes(item)) },
  },
  render() {
    if (!this.selectableCount) return null
    const checkbox = h('md-checkbox', { model: this.allSelected, disabled: this.isDisabled, onChange: this.onChange })
    return h(MdTableHead, { class: 'md-table-cell-selection' }, { default: () => [h('div', { class: 'md-table-cell-container' }, [checkbox])] })
  }
}
</script>
