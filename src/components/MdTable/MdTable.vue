<script>
import { h, KeepAlive } from "vue"
import raf from "raf"
import MdTagSwitcher from "@/components/MdTagSwitcher/MdTagSwitcher.vue"
import MdUuid from "@/core/utils/MdUuid"
import MdPropValidator from "@/core/utils/MdPropValidator"
import MdTableThead from "./MdTableThead.vue"
import MdTableAlternateHeader from "./MdTableAlternateHeader.vue"
import MdTableRowGhost from "./MdTableRowGhost.vue"
import MdResizeObserver from "@/core/utils/MdResizeObserver"

const getObjectAttribute = (object, key) => {
  let value = object
  for (const attribute of key.split(".")) {
    if (value == null) return undefined
    value = value[attribute]
  }
  return value
}

export default {
  name: "MdTable",
  components: {
    MdTagSwitcher,
    MdTableAlternateHeader,
    MdTableThead,
    MdTableRowGhost,
  },
  props: {
    value: [Array, Object],
    mdModelId: {
      type: String,
      default: "id",
    },
    mdCard: Boolean,
    mdFixedHeader: Boolean,
    mdHeight: {
      type: [Number, String],
      default: 400,
    },
    mdSort: String,
    mdSortOrder: {
      type: String,
      default: "asc",
      ...MdPropValidator("md-sort-order", ["asc", "desc"]),
    },
    mdSortFn: {
      type: Function,
      default(value) {
        const sortBy = this.MdTable.sort
        const isAsc = this.MdTable.sortOrder === "asc"
        const multiplier = isAsc ? 1 : -1

        const comparator = (a, b) => {
          const aAttr = getObjectAttribute(a, sortBy)
          const bAttr = getObjectAttribute(b, sortBy)

          if (aAttr === bAttr) {
            return 0
          } else if (aAttr === null || aAttr === undefined || Number.isNaN(aAttr)) {
            return 1
          } else if (bAttr === null || bAttr === undefined || Number.isNaN(bAttr)) {
            return -1
          } else if (typeof aAttr === "number" && typeof bAttr === "number") {
            return (aAttr - bAttr) * multiplier
          }
          return String(aAttr).localeCompare(String(bAttr)) * multiplier
        }

        return value.slice().sort(comparator)
      },
    },
    mdSelectedValue: {
      type: [Array, Object],
    },
  },
  data() {
    return {
      windowResizeObserver: null,
      fixedHeaderTableWidth: 0,
      fixedHeaderPadding: 0,
      hasContentScroll: false,
      registeredRows: [],
      standaloneCells: new Map(),
      MdTable: {
        items: {},
        sort: null,
        sortOrder: null,
        singleSelection: null,
        selectedItems: [],
        selectable: [],
        fixedHeader: null,
        contentPadding: null,
        contentEl: null,
        hasValue: false,
        definitionRow: null,
        emitEvent: (...args) => this.emitEvent(...args),
        sortTable: (...args) => this.sortTable(...args),
        manageItemSelection: (...args) => this.manageItemSelection(...args),
        getModel: (...args) => this.getModel(...args),
        getModelItem: (...args) => this.getModelItem(...args),
        selectingMode: null,
        updateRowCells: (...args) => this.updateRowCells(...args),
        registerRow: (...args) => this.registerRow(...args),
        unregisterRow: (...args) => this.unregisterRow(...args),
        registerStandaloneCell: (...args) => this.registerStandaloneCell(...args),
        unregisterStandaloneCell: (...args) => this.unregisterStandaloneCell(...args),
      },
      itemsUuidMap: new WeakMap(),
    }
  },
  computed: {
    contentTag() {
      return this.mdCard ? "md-card" : "md-content"
    },
    headerCount() {
      return Object.keys(this.MdTable.items).length
    },
    selectedCount() {
      return this.MdTable.selectedItems.length
    },
    headerStyles() {
      if (this.mdFixedHeader) {
        return { paddingRight: `${this.fixedHeaderPadding}px` }
      }
      return null
    },
    hasValue() {
      return Array.isArray(this.value) && this.value.length !== 0
    },
    headerClasses() {
      if ((this.mdFixedHeader && this.hasContentScroll) || !this.hasValue) {
        return "md-table-fixed-header-active"
      }
      return ""
    },
    contentStyles() {
      if (this.mdFixedHeader) {
        const height = typeof this.mdHeight === "number" ? `${this.mdHeight}px` : this.mdHeight
        return { height, maxHeight: height }
      }
      return null
    },
    contentClasses() {
      if (this.mdFixedHeader && (!this.value || this.value.length === 0)) {
        return "md-table-empty"
      }
      return ""
    },
    fixedHeaderTableStyles() {
      return { width: `${this.fixedHeaderTableWidth}px` }
    },
  },
  provide() {
    return { MdTable: this.MdTable }
  },
  watch: {
    mdSort: {
      immediate: true,
      handler() {
        this.MdTable.sort = this.mdSort
      },
    },
    mdSortOrder: {
      immediate: true,
      handler() {
        this.MdTable.sortOrder = this.mdSortOrder
      },
    },
    mdFixedHeader: {
      immediate: true,
      handler() {
        this.MdTable.fixedHeader = this.mdFixedHeader
      },
    },
    hasValue: {
      immediate: true,
      handler(val) {
        this.MdTable.hasValue = val
      },
    },
    "MdTable.selectedItems": {
      handler(val, old) {
        const isValEmpty = !val || val.length === 0
        const isOldEmpty = !old || old.length === 0
        let changed
        if (isValEmpty && isOldEmpty) {
          changed = false
        } else if (!isValEmpty && !isOldEmpty) {
          changed = val.length !== old.length || !val.every((item, index) => item === old[index])
        } else {
          changed = true
        }
        if (changed) {
          this.select(val)
        }
      },
    },
    "MdTable.singleSelection": {
      handler(val, old) {
        if (val !== old) {
          this.select(val)
        }
      },
    },
    mdSelectedValue() {
      this.syncSelectedValue()
    },
    value() {
      this.syncSelectedValue()
      this.setWidth()
    },
  },
  methods: {
    registerRow(row) {
      if (!this.registeredRows.includes(row)) {
        this.registeredRows.push(row)
      }
      if (!this.MdTable.definitionRow) {
        this.MdTable.definitionRow = row
        if (typeof row.getCellsData === "function") {
          this.updateRowCells(row, row.getCellsData())
        }
      }
    },
    unregisterRow(row) {
      this.registeredRows = this.registeredRows.filter((item) => item !== row)
      if (this.MdTable.definitionRow === row) {
        this.MdTable.definitionRow = null
        const nextRow = this.registeredRows[0]
        if (nextRow && typeof nextRow.getCellsData === "function") {
          this.MdTable.definitionRow = nextRow
          this.updateRowCells(nextRow, nextRow.getCellsData())
        } else {
          this.MdTable.items = {}
        }
      }
    },
    registerStandaloneCell(cell, data) {
      this.standaloneCells.set(cell, data)
      this.updateStandaloneColumns()
      const keys = Array.from(this.standaloneCells.keys())
      return keys.indexOf(cell)
    },
    unregisterStandaloneCell(cell) {
      if (this.standaloneCells.has(cell)) {
        this.standaloneCells.delete(cell)
        this.updateStandaloneColumns()
      }
    },
    updateStandaloneColumns() {
      if (this.registeredRows.length) return
      const items = {}
      let index = 0
      this.standaloneCells.forEach((data) => {
        items[index++] = { ...data }
      })
      this.MdTable.items = items
    },
    updateRowCells(row, cells) {
      if (!this.registeredRows.includes(row)) return
      if (!this.MdTable.definitionRow) {
        this.MdTable.definitionRow = row
      }
      if (this.MdTable.definitionRow !== row) return
      const items = {}
      cells.forEach((cell, index) => {
        if (cell) {
          items[index] = { ...cell }
        }
      })
      this.MdTable.items = items
    },
    isEmpty(value) {
      return !value || value.length === 0
    },
    emitEvent(eventName, value) {
      this.$emit(eventName, value)
    },
    getRowId(item, propertyName) {
      let id = item && item[propertyName]
      if (id) {
        return id
      }
      id = this.itemsUuidMap.get(item)
      if (!id) {
        id = "md-row-" + MdUuid()
        this.itemsUuidMap.set(item, id)
      }
      return id
    },
    setScroll(event) {
      raf(() => {
        if (this.mdFixedHeader && this.$refs.fixedHeaderContainer) {
          this.$refs.fixedHeaderContainer.scrollLeft = event.target.scrollLeft
        }
        this.hasContentScroll = event.target.scrollTop > 0
      })
    },
    setHeaderScroll(event) {
      raf(() => {
        if (this.MdTable.contentEl) {
          this.MdTable.contentEl.scrollLeft = event.target.scrollLeft
        }
      })
    },
    setContentEl() {
      const ref = this.$refs.content || null
      this.MdTable.contentEl = ref && ref.$el ? ref.$el : ref
    },
    setHeaderPadding() {
      this.setContentEl()
      const contentEl = this.MdTable.contentEl
      if (!contentEl) return
      const tableEl = contentEl.querySelector("table")
      if (!tableEl) return
      this.fixedHeaderPadding = contentEl.offsetWidth - tableEl.offsetWidth
    },
    getModel() {
      return this.value
    },
    getModelItem(index) {
      return this.value[index]
    },
    manageItemSelection(item) {
      if (this.MdTable.selectedItems.includes(item)) {
        this.MdTable.selectedItems = this.MdTable.selectedItems.filter((target) => target !== item)
      } else {
        this.MdTable.selectedItems = this.MdTable.selectedItems.concat([item])
      }
    },
    sortTable() {
      if (Array.isArray(this.value)) {
        this.$emit("input", this.mdSortFn(this.value))
      }
    },
    select(val) {
      this.$emit("update:mdSelectedValue", val)
      this.$emit("md-selected", val)
    },
    syncSelectedValue() {
      this.$nextTick(() => {
        if (this.MdTable.selectingMode === "single") {
          this.MdTable.singleSelection = this.mdSelectedValue
        } else if (this.MdTable.selectingMode === "multiple") {
          this.MdTable.selectedItems = this.mdSelectedValue || []
        }
      })
    },
    setWidth() {
      if (this.mdFixedHeader && this.$refs.contentTable) {
        this.fixedHeaderTableWidth = this.$refs.contentTable.offsetWidth
      }
    },
  },
  created() {
    if (this.mdSort) {
      this.sortTable()
    }
    this.syncSelectedValue()
  },
  mounted() {
    this.setContentEl()
    this.$nextTick(this.setWidth)
    if (this.mdFixedHeader) {
      this.setHeaderPadding()
      this.windowResizeObserver = MdResizeObserver(window, this.setWidth)
    }
  },
  beforeUnmount() {
    if (this.windowResizeObserver) {
      this.windowResizeObserver.destroy()
      this.windowResizeObserver = null
    }
  },
  render() {
    const children = []

    if (this.$slots["md-table-toolbar"]) {
      children.push(...this.$slots["md-table-toolbar"]())
    }

    const alternateHeaderSlot = this.$slots["md-table-alternate-header"]
    children.push(
      h(KeepAlive, null, {
        default: () =>
          alternateHeaderSlot && this.selectedCount
            ? [
                h(
                  MdTableAlternateHeader,
                  null,
                  {
                    default: () => alternateHeaderSlot({ count: this.selectedCount }),
                  }
                ),
              ]
            : [],
      })
    )

    if (this.mdFixedHeader) {
      children.push(
        h(
          "div",
          {
            class: ["md-table-fixed-header", this.headerClasses],
            style: this.headerStyles,
          },
          [
            h(
              "div",
              {
                class: "md-table-fixed-header-container",
                ref: "fixedHeaderContainer",
                onScroll: this.setHeaderScroll,
              },
              [
                h("table", { style: this.fixedHeaderTableStyles }, [h(MdTableThead)]),
              ]
            ),
          ]
        )
      )
    }

    const defaultRowSlot = this.$slots["md-table-row"]
    const emptySlot = this.$slots["md-table-empty-state"]
    const paginationSlot = this.$slots["md-table-pagination"]

    const tableChildren = []

    if (defaultRowSlot && !this.mdFixedHeader) {
      tableChildren.push(h(MdTableThead))
    }

    if (!defaultRowSlot) {
      tableChildren.push(h("tbody", this.$slots.default ? this.$slots.default() : []))
    } else if (Array.isArray(this.value) && this.value.length) {
      const rows = this.value.map((item, index) => {
        const rowId = this.getRowId(item, this.mdModelId)
        return h(
          MdTableRowGhost,
          {
            key: rowId,
            mdId: rowId,
            mdIndex: index,
            mdItem: item,
          },
          {
            default: () => defaultRowSlot({ item, index }),
          }
        )
      })
      tableChildren.push(h("tbody", rows))
    } else if (emptySlot) {
      tableChildren.push(
        h("tbody", [
          h("tr", [
            h("td", { colspan: this.headerCount }, emptySlot()),
          ]),
        ])
      )
    }

    const table = h(
      "table",
      { ref: "contentTable" },
      tableChildren.filter(Boolean)
    )

    const contentChildren = [table]

    if (paginationSlot) {
      contentChildren.push(...paginationSlot())
    }

    children.push(
      h(
        MdTagSwitcher,
        {
          mdTag: "md-content",
          ref: "content",
          class: ["md-table-content", "md-scrollbar", this.contentClasses],
          style: this.contentStyles,
          onScroll: this.setScroll,
        },
        { default: () => contentChildren }
      )
    )

    if (!this.hasValue && paginationSlot) {
      children.push(...paginationSlot())
    }

    return h(
      MdTagSwitcher,
      { mdTag: this.contentTag, class: "md-table" },
      { default: () => children }
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table {
  display: flex;
  flex-flow: column wrap;
  overflow-x: auto;

  .md-table-fixed-header {
    position: relative;

    .md-table-fixed-header-container {
      -webkit-box-flex: 1;
      flex: 1;
      overflow-x: auto;

      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb,
      &::-webkit-scrollbar-button {
        display: none;
      }
    }
  }

  .md-table-fixed-header-active {
    border-bottom: 1px solid;
  }

  .md-table-content {
    flex: 1;
    overflow-x: auto;
    transition: height .3s $md-transition-default-timing;
  }

  .md-table-empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    overflow: hidden;
  }
}
</style>
