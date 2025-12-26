<script>
import { h, mergeProps } from "vue"
import MdPropValidator from "@/core/utils/MdPropValidator"
import MdTableCellSelection from "./MdTableCellSelection.vue"

export default {
  name: "MdTableRow",
  components: {
    MdTableCellSelection,
  },
  props: {
    mdIndex: [Number, String],
    mdId: [Number, String],
    mdSelectable: {
      type: String,
      ...MdPropValidator("md-selectable", ["multiple", "single"]),
    },
    mdDisabled: Boolean,
    mdAutoSelect: Boolean,
    mdItem: [Array, Object],
  },
  inject: ["MdTable"],
  data: () => ({
    index: null,
    cellMap: new Map(),
    rowCells: [],
  }),
  computed: {
    selectableCount() {
      return this.MdTable.selectable.length
    },
    isMultipleSelected() {
      return this.MdTable.selectedItems.includes(this.mdItem)
    },
    isSingleSelected() {
      return this.MdTable.singleSelection === this.mdItem
    },
    hasMultipleSelection() {
      return this.MdTable.hasValue && this.mdSelectable === "multiple"
    },
    hasSingleSelection() {
      return this.MdTable.hasValue && this.mdSelectable === "single"
    },
    rowClasses() {
      if (!this.MdTable.hasValue) return {}
      return {
        "md-has-selection": !this.mdDisabled && (this.mdAutoSelect || this.hasSingleSelection),
        "md-selected": this.isMultipleSelected,
        "md-selected-single": this.isSingleSelected,
      }
    },
    isInSelectedItems() {
      return this.MdTable.selectedItems.includes(this.mdItem)
    },
  },
  provide() {
    return {
      MdTableRow: {
        registerCell: (cell, data) => this.registerCell(cell, data),
        updateCell: (cell, data) => this.updateCell(cell, data),
        unregisterCell: (cell) => this.unregisterCell(cell),
        getCellsData: () => this.rowCells,
      },
    }
  },
  watch: {
    mdDisabled() {
      if (this.mdDisabled) {
        this.removeSelectableItem()
      } else {
        this.addSelectableItem()
      }
    },
    mdSelectable() {
      this.MdTable.selectingMode = this.mdSelectable
    },
    mdItem(after, before) {
      this.removeSelectableItem(before)
      this.$nextTick(this.addSelectableItem)
    },
  },
  methods: {
    registerCell(cell, data) {
      let index
      if (this.cellMap.has(cell)) {
        index = this.cellMap.get(cell)
      } else {
        index = this.rowCells.findIndex((entry) => entry === null)
        if (index === -1) {
          index = this.rowCells.length
        }
        this.cellMap.set(cell, index)
      }
      this.rowCells[index] = { ...data }
      this.notifyColumns()
      return index
    },
    updateCell(cell, data) {
      if (!this.cellMap.has(cell)) return
      const index = this.cellMap.get(cell)
      this.rowCells[index] = { ...data }
      this.notifyColumns()
    },
    unregisterCell(cell) {
      if (!this.cellMap.has(cell)) return
      const index = this.cellMap.get(cell)
      this.cellMap.delete(cell)
      this.rowCells[index] = null
      this.notifyColumns()
    },
    getCellsData() {
      return this.rowCells
    },
    notifyColumns() {
      if (typeof this.MdTable.updateRowCells === "function") {
        this.MdTable.updateRowCells(this, this.rowCells)
      }
    },
    onClick() {
      if (this.MdTable.hasValue && !this.mdDisabled) {
        if (this.hasMultipleSelection) {
          this.selectRowIfMultiple()
        } else if (this.hasSingleSelection) {
          this.selectRowIfSingle()
        }
      }
    },
    toggleSelection() {
      this.MdTable.manageItemSelection(this.mdItem)
    },
    addSelection() {
      if (!this.isMultipleSelected) {
        this.MdTable.selectedItems = this.MdTable.selectedItems.concat([this.mdItem])
      }
    },
    removeSelection() {
      if (this.isMultipleSelected) {
        this.MdTable.selectedItems = this.MdTable.selectedItems.filter((target) => target !== this.mdItem)
      }
    },
    selectRowIfSingle() {
      if (this.MdTable.singleSelection === this.mdItem) {
        this.MdTable.singleSelection = null
      } else {
        this.MdTable.singleSelection = this.mdItem
      }
    },
    selectRowIfMultiple() {
      if (this.mdAutoSelect) {
        this.toggleSelection()
      }
    },
    addSelectableItem() {
      if (!this.hasMultipleSelection || this.mdDisabled) return
      if (this.MdTable.selectable.includes(this.mdItem)) return
      this.MdTable.selectable = this.MdTable.selectable.concat([this.mdItem])
    },
    removeSelectableItem(target = this.mdItem) {
      if (this.mdSelectable === "multiple") {
        this.MdTable.selectable = this.MdTable.selectable.filter((item) => item !== target)
      }
    },
  },
  created() {
    if (typeof this.MdTable.registerRow === "function") {
      this.MdTable.registerRow(this)
    }
    this.$nextTick(() => {
      this.addSelectableItem()
      this.MdTable.selectingMode = this.mdSelectable
    })
  },
  beforeUnmount() {
    this.removeSelectableItem()
    if (typeof this.MdTable.unregisterRow === "function") {
      this.MdTable.unregisterRow(this)
    }
  },
  render() {
    const attrs = this.$attrs || {}
    const children = []

    if (this.selectableCount) {
      children.push(
        h(MdTableCellSelection, {
          value: this.isMultipleSelected,
          mdDisabled: this.mdDisabled,
          mdSelectable: this.mdSelectable === "multiple",
          mdRowId: this.mdIndex,
          onInput: (selected) => {
            if (selected) this.addSelection()
            else this.removeSelection()
          },
        })
      )
    }

    if (this.$slots.default) {
      children.push(...this.$slots.default())
    }

    return h(
      "tr",
      mergeProps(
        {
          class: ["md-table-row", this.rowClasses],
          onClick: this.onClick,
        },
        attrs
      ),
      children
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table-row {
  transition: .3s $md-transition-default-timing;
  transition-property: background-color, font-weight;
  will-change: background-color, font-weight;

  &.md-has-selection {
    cursor: pointer;
  }

  &.md-selected-single {
    font-weight: 500;
  }

  tbody & td {
    border-top: 1px solid;
  }
}
</style>
