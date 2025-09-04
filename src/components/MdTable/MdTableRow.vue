<script>
import { h } from 'vue'
import MdPropValidator from "@/core/utils/MdPropValidator"
import MdTableCellSelection from "./MdTableCellSelection.vue"

export default {
  name: 'MdTableRow',
  components: { MdTableCellSelection },
  props: {
    mdIndex: [Number, String],
    mdId: [Number, String],
    mdSelectable: { type: [String], ...MdPropValidator('md-selectable', ['multiple', 'single']) },
    mdDisabled: Boolean,
    mdAutoSelect: Boolean,
    mdItem: [Array, Object],
  },
  inject: ['MdTable'],
  data: () => ({ index: null }),
  computed: {
    selectableCount() { return this.MdTable.selectable.length },
    isMultipleSelected() { return this.MdTable.selectedItems.includes(this.mdItem) },
    isSingleSelected() { return this.MdTable.singleSelection === this.mdItem },
    hasMultipleSelection() { return this.MdTable.hasValue && this.mdSelectable === 'multiple' },
    hasSingleSelection() { return this.MdTable.hasValue && this.mdSelectable === 'single' },
    rowClasses() {
      if (this.MdTable.hasValue) {
        return {
          'md-has-selection': !this.mdDisabled && (this.mdAutoSelect || this.hasSingleSelection),
          'md-selected': this.isMultipleSelected,
          'md-selected-single': this.isSingleSelected,
        }
      }
      return {}
    },
    isInSelectedItems() { return this.MdTable.selectedItems.includes(this.mdItem) },
  },
  watch: {
    mdDisabled() { this.mdDisabled ? this.removeSelectableItem() : this.addSelectableItem() },
    mdSelectable() { this.MdTable.selectingMode = this.mdSelectable },
    mdItem(after, before) { this.removeSelectableItem(before); this.$nextTick(this.addSelectableItem) },
  },
  methods: {
    onClick() {
      if (this.MdTable.hasValue && !this.mdDisabled) {
        if (this.hasMultipleSelection) this.selectRowIfMultiple()
        else if (this.hasSingleSelection) this.selectRowIfSingle()
      }
    },
    toggleSelection() { this.MdTable.manageItemSelection(this.mdItem) },
    addSelection() { if (!this.isMultipleSelected) this.MdTable.selectedItems = this.MdTable.selectedItems.concat([this.mdItem]) },
    removeSelection() { if (this.isMultipleSelected) this.MdTable.selectedItems = this.MdTable.selectedItems.filter((t) => t !== this.mdItem) },
    selectRowIfSingle() { this.MdTable.singleSelection = this.MdTable.singleSelection === this.mdItem ? null : this.mdItem },
    selectRowIfMultiple() { if (this.mdAutoSelect) this.toggleSelection() },
    addSelectableItem() {
      if (!this.hasMultipleSelection || this.mdDisabled) return false
      if (this.MdTable.selectable.includes(this.mdItem)) return false
      this.MdTable.selectable = this.MdTable.selectable.concat([this.mdItem])
    },
    removeSelectableItem(target = this.mdItem) { if (this.mdSelectable === 'multiple') this.MdTable.selectable = this.MdTable.selectable.filter((i) => i !== target) },
  },
  created() { this.$nextTick(() => { this.addSelectableItem(); this.MdTable.selectingMode = this.mdSelectable }) },
  beforeUnmount() { this.removeSelectableItem() },
  render() {
    const children = this.$slots.default ? this.$slots.default() : []
    const selectionCell = this.selectableCount
      ? h(MdTableCellSelection, {
          value: this.isMultipleSelected,
          mdDisabled: this.mdDisabled,
          mdSelectable: this.mdSelectable === 'multiple',
          mdRowId: this.mdIndex,
          onInput: (selected) => (selected ? this.addSelection() : this.removeSelection()),
        })
      : null
    return h(
      'tr',
      { class: ['md-table-row', this.rowClasses], onClick: this.onClick, ...this.$attrs },
      [selectionCell, ...children]
    )
  }
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-table-row { transition: .3s $md-transition-default-timing; transition-property: background-color, font-weight; will-change: background-color, font-weight; }
.md-table-row.md-has-selection { cursor: pointer; }
.md-table-row.md-selected-single { font-weight: 500; }
tbody .md-table-row td { border-top: 1px solid; }
</style>

