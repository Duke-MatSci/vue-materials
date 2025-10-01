<script>
import { h } from "vue"

const getPageData = (data, mdPage, mdPageSize) => {
  return data.slice((mdPage - 1) * mdPageSize, ((mdPage - 1) * mdPageSize) + mdPageSize)
}

export default {
  name: "MdTablePagination",
  inject: ["MdTable"],
  props: {
    mdData: {
      type: [Array, Object],
    },
    mdPageOptions: {
      type: [Array, Boolean],
      default: () => [5, 10, 25, 50, 100],
    },
    mdPaginatedData: {
      type: Array,
      default: () => [],
    },
    mdPageSize: {
      type: Number,
      default: 10,
    },
    mdUpdate: {
      type: Function,
      default: () => true,
    },
    mdLabel: {
      type: String,
      default: "Rows per page:",
    },
    mdSeparator: {
      type: String,
      default: "of",
    },
  },
  data: () => ({
    mdPage: 0,
    mdCount: 0,
    currentPageSize: 0,
  }),
  computed: {
    pageCount() {
      return this.getPageCount()
    },
    isExternalPagination() {
      return this.mdData && this.mdData.mdData
    },
  },
  watch: {
    mdData: {
      immediate: true,
      handler(mdData) {
        this.$emit("update:mdData", mdData)
        this.updatePage()
      },
    },
    mdPageSize: {
      immediate: true,
      handler(pageSize) {
        this.currentPageSize = pageSize
        this.updatePage()
      },
    },
    currentPageSize: {
      immediate: true,
      handler() {
        if (
          this.mdUpdate(
            this.mdPage,
            this.currentPageSize,
            this.MdTable.sort,
            this.MdTable.sortOrder
          ) !== false
        ) {
          this.updatePage()
          this.$emit("update:mdPageSize", this.currentPageSize)
        }
      },
    },
  },
  methods: {
    getPageCount() {
      return Math.ceil(this.mdCount / this.currentPageSize)
    },
    setPage(mdPage, mdCount) {
      this.mdPage = mdCount > 0 ? (mdPage > 0 ? mdPage : this.mdPage > 0 ? this.mdPage : 1) : 0
      const pageCount = this.getPageCount()
      if (this.mdPage > pageCount) {
        this.mdPage = pageCount
      }
    },
    updatePage() {
      if (this.currentPageSize === 0) return
      if (this.isExternalPagination) {
        this.mdCount = this.mdData.mdCount
        this.setPage(this.mdData.mdPage, this.mdCount)
        this.$emit("update:mdPaginatedData", this.mdData.mdData)
      } else if (Array.isArray(this.mdData)) {
        this.mdCount = this.mdData.length
        this.setPage(this.mdPage, this.mdCount)
        if (this.mdPage > 0) {
          this.$emit(
            "update:mdPaginatedData",
            getPageData(this.mdData, this.mdPage, this.currentPageSize)
          )
        } else {
          this.$emit("update:mdPaginatedData", [])
        }
      }
    },
    changePage(delta) {
      if (
        this.mdUpdate(
          this.mdPage + delta,
          this.currentPageSize,
          this.MdTable.sort,
          this.MdTable.sortOrder
        ) === false
      ) {
        return
      }
      this.mdPage = this.mdPage + delta
      this.$emit("update:mdPage", this.mdPage)
      if (!this.isExternalPagination && Array.isArray(this.mdData)) {
        this.$emit(
          "update:mdPaginatedData",
          getPageData(this.mdData, this.mdPage, this.currentPageSize)
        )
      }
    },
  },
  render() {
    const children = []

    if (this.mdPageOptions !== false) {
      const options = (this.mdPageOptions || []).map((amount) =>
        h("md-option", { key: amount, value: amount }, { default: () => [amount] })
      )

      const select = h(
        "md-select",
        {
          modelValue: this.currentPageSize,
          "onUpdate:modelValue": (val) => {
            this.currentPageSize = val
          },
          mdDense: true,
          mdClass: "md-pagination-select",
        },
        { default: () => options }
      )

      const field = h("md-field", null, { default: () => [select] })

      children.push(h("span", { class: "md-table-pagination-label" }, this.mdLabel))
      children.push(field)
    }

    const start = this.mdCount === 0 ? 0 : (this.mdPage - 1) * this.currentPageSize + 1
    const end = Math.min(this.mdPage * this.currentPageSize, this.mdCount)
    children.push(h("span", null, `${start}–${end} ${this.mdSeparator} ${this.mdCount}`))

    children.push(
      h(
        "md-button",
        {
          class: "md-icon-button md-table-pagination-previous",
          onClick: () => this.changePage(-1),
          disabled: this.mdPage === 1,
        },
        { default: () => [h("md-icon", null, { default: () => ["keyboard_arrow_left"] })] }
      )
    )

    children.push(
      h(
        "md-button",
        {
          class: "md-icon-button md-table-pagination-next",
          onClick: () => this.changePage(1),
          disabled: this.mdPage === this.pageCount,
        },
        { default: () => [h("md-icon", null, { default: () => ["keyboard_arrow_right"] })] }
      )
    )

    return h("div", { class: "md-table-pagination" }, children)
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table-pagination {
  height: 56px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid;
  font-size: 12px;

  .md-table-pagination-previous {
    margin-right: 2px;
    margin-left: 18px;
  }

  .md-field {
    width: 48px;
    min-width: 36px;
    margin: -16px 24px 0 32px;

    &:after,
    &:before {
      display: none;
    }

    .md-select-value {
      font-size: 13px;
    }
  }
}

.md-menu-content.md-pagination-select {
  max-width: 82px;
  min-width: 56px;
  margin-top: 5px;
}
</style>
