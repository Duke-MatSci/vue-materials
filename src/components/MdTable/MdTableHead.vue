<script>
import { h } from "vue"
import MdUpwardIcon from "@/core/icons/MdUpwardIcon.vue"
import MdResizeObserver from "@/core/utils/MdResizeObserver"

export default {
  name: "MdTableHead",
  components: {
    MdUpwardIcon,
  },
  props: {
    mdNumeric: Boolean,
    numeric: Boolean,
    id: [String, Number],
    label: String,
    tooltip: String,
    sortBy: String,
  },
  inject: ["MdTable"],
  data: () => ({
    width: null,
    windowResizeObserver: null,
  }),
  computed: {
    hasSort() {
      return this.MdTable.sort && this.sortBy
    },
    isSorted() {
      return this.MdTable.sort === this.sortBy
    },
    isDescSorted() {
      return this.isSorted && this.MdTable.sortOrder === "desc"
    },
    isAscSorted() {
      return this.isSorted && this.MdTable.sortOrder === "asc"
    },
    headStyles() {
      return this.width != null ? { width: this.width + "px" } : null
    },
    headClasses() {
      return {
        "md-numeric": this.numeric || this.mdNumeric,
        "md-sortable": !!this.hasSort,
        "md-sorted": this.isSorted,
        "md-sorted-desc": this.isDescSorted,
      }
    },
  },
  watch: {
    mdSortBy() {
      this.setWidth()
    },
    mdNumeric() {
      this.setWidth()
    },
    mdLabel() {
      this.setWidth()
    },
    tooltip() {
      this.setWidth()
    },
  },
  methods: {
    changeSort() {
      if (!this.hasSort) return

      this.MdTable.sortOrder = this.isAscSorted ? "desc" : "asc"
      this.MdTable.sort = this.sortBy
      this.MdTable.emitEvent("md-sorted", this.MdTable.sort)
      this.MdTable.emitEvent("update:mdSort", this.MdTable.sort)
      this.MdTable.emitEvent("update:mdSortOrder", this.MdTable.sortOrder)
      this.MdTable.sortTable()
    },
    getChildNodesBySelector(el, selector) {
      return Array.from(el.childNodes).filter(
        ({ classList }) => classList && classList.contains(selector)
      )
    },
    getNodeIndex(nodes, el) {
      return [].indexOf.call(nodes, el)
    },
    setWidth() {
      if (!this.MdTable.fixedHeader) return
      const thEls = this.getChildNodesBySelector(
        this.$el.parentNode,
        "md-table-head"
      )
      const tdEls = this.MdTable.contentEl
        ? this.MdTable.contentEl.querySelectorAll(
            "tr:first-child .md-table-cell"
          )
        : []
      const nodeIndex = this.getNodeIndex(thEls, this.$el)
      const target = nodeIndex >= 0 ? tdEls[nodeIndex] : null
      const width = target ? target.offsetWidth : this.$el.offsetWidth
      if (width) {
        this.width = width
      }
    },
  },
  mounted() {
    this.$nextTick(this.setWidth)
    if (this.MdTable.fixedHeader) {
      this.windowResizeObserver = MdResizeObserver(window, this.setWidth)
    }
  },
  updated() {
    this.$nextTick(this.setWidth)
  },
  beforeUnmount() {
    if (this.windowResizeObserver) {
      this.windowResizeObserver.destroy()
      this.windowResizeObserver = null
    }
  },
  render() {
    const children = []
    const hasDefaultSlot = !!this.$slots.default

    if (hasDefaultSlot) {
      children.push(
        h("div", { class: "md-table-head-container" }, [
          h("div", { class: "md-table-head-label" }, this.$slots.default()),
        ])
      )
    } else {
      const labelChildren = []
      if (this.hasSort) {
        labelChildren.push(h(MdUpwardIcon, { class: "md-table-sortable-icon" }))
      }
      if (this.label) {
        labelChildren.push(this.label)
      }
      if (this.tooltip) {
        labelChildren.push(
          h("md-tooltip", null, {
            default: () => [this.tooltip],
          })
        )
      }
      const label = h("div", { class: "md-table-head-label" }, labelChildren)
      children.push(
        h(
          "md-ripple",
          { class: "md-table-head-container", mdDisabled: !this.hasSort },
          { default: () => [label] }
        )
      )
    }

    return h(
      "th",
      {
        id: this.id,
        class: ["md-table-head", this.headClasses],
        style: this.headStyles,
        onClick: this.changeSort,
      },
      children
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table-head {
  padding: 0;
  position: relative;
  font-size: 12px;
  line-height: 16px;
  text-align: left;

  &:last-child:not(:first-child) .md-table-head-label {
    padding-right: 24px;
  }

  &.md-numeric {
    text-align: right;
  }

  &.md-sortable:first-of-type,
  &.md-table-cell-selection + .md-sortable {
    .md-table-sortable-icon {
      right: 8px;
      left: auto;
    }
  }

  .md-icon {
    $size: 16px;
    width: $size;
    height: $size;
    font-size: $size;

    &:not(.md-sortable-icon) {
      margin: 0 4px;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.md-sortable {
  cursor: pointer;

  &:hover,
  &.md-sorted {
    .md-table-sortable-icon {
      opacity: 1;
    }
  }

  &.md-sorted-desc {
    .md-table-sortable-icon {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}

.md-table-head-container {
  height: 56px;
  padding: 14px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.md-table-head-label {
  height: 28px;
  padding-right: 32px;
  padding-left: 24px;
  display: inline-block;
  position: relative;
}

.md-table-sortable-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  opacity: 0;
  transition: .3s $md-transition-default-timing;
}
</style>
