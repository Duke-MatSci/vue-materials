<script>
import { h } from "vue"

export default {
  name: "MdTableCell",
  props: {
    mdId: [String, Number],
    mdLabel: String,
    mdNumeric: Boolean,
    mdTooltip: String,
    mdSortBy: String,
  },
  inject: {
    MdTable: { default: () => ({}) },
    MdTableRow: { default: null },
  },
  data: () => ({
    columnIndex: null,
  }),
  computed: {
    cellClasses() {
      return {
        "md-numeric": this.mdNumeric,
      }
    },
  },
  watch: {
    mdSortBy: "notifyUpdate",
    mdNumeric: "notifyUpdate",
    mdLabel: "notifyUpdate",
    mdTooltip: "notifyUpdate",
  },
  methods: {
    getCellData() {
      return {
        id: this.mdId,
        label: this.mdLabel,
        numeric: this.mdNumeric,
        tooltip: this.mdTooltip,
        sortBy: this.mdSortBy,
      }
    },
    notifyUpdate() {
      if (this.columnIndex == null) return
      if (this.MdTableRow && typeof this.MdTableRow.updateCell === "function") {
        this.MdTableRow.updateCell(this, this.getCellData())
      } else if (this.MdTable && typeof this.MdTable.registerStandaloneCell === "function") {
        this.MdTable.registerStandaloneCell(this, this.getCellData())
      }
    },
  },
  mounted() {
    if (this.MdTableRow && typeof this.MdTableRow.registerCell === "function") {
      this.columnIndex = this.MdTableRow.registerCell(this, this.getCellData())
    } else if (this.MdTable && typeof this.MdTable.registerStandaloneCell === "function") {
      this.columnIndex = this.MdTable.registerStandaloneCell(this, this.getCellData())
    }
  },
  beforeUnmount() {
    if (this.MdTableRow && typeof this.MdTableRow.unregisterCell === "function") {
      this.MdTableRow.unregisterCell(this)
    } else if (this.MdTable && typeof this.MdTable.unregisterStandaloneCell === "function") {
      this.MdTable.unregisterStandaloneCell(this)
    }
  },
  render() {
    const slot = this.$slots.default ? this.$slots.default() : []
    return h("td", { class: ["md-table-cell", this.cellClasses] }, [
      h("div", { class: "md-table-cell-container" }, slot),
    ])
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table-cell {
  height: 48px;
  position: relative;
  transition: .3s $md-transition-default-timing;
  font-size: 13px;
  line-height: 18px;

  &.md-numeric {
    text-align: right;
  }

  &:last-child .md-table-cell-container {
    padding-right: 24px;
  }
}

.md-table-cell-container {
  padding: 6px 32px 6px 24px;
}
</style>
