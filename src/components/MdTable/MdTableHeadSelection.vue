<script>
import { h } from "vue"
import MdTableHead from "./MdTableHead.vue"

export default {
  name: "MdTableHeadSelection",
  components: { MdTableHead },
  inject: ["MdTable"],
  computed: {
    selectable() {
      return this.MdTable.selectable || []
    },
    selectedItems() {
      return this.MdTable.selectedItems || []
    },
    selectableCount() {
      return this.selectable.length
    },
    isDisabled() {
      return !this.selectableCount
    },
    allSelected() {
      if (!this.selectableCount) return false
      return this.selectable.every((item) => this.selectedItems.includes(item))
    },
  },
  methods: {
    onChange(val) {
      if (val) {
        const additions = this.selectable.filter((item) => !this.selectedItems.includes(item))
        this.MdTable.selectedItems = this.selectedItems.concat(additions)
      } else {
        this.MdTable.selectedItems = this.selectedItems.filter((item) => !this.selectable.includes(item))
      }
    },
  },
  render() {
    if (!this.selectableCount) {
      return null
    }

    const checkbox = h("md-checkbox", {
      disabled: this.isDisabled,
      modelValue: this.allSelected,
      "onUpdate:modelValue": (val) => this.onChange(val),
    })

    const container = h("div", { class: "md-table-cell-container" }, [checkbox])

    return h(
      MdTableHead,
      { class: "md-table-cell-selection" },
      { default: () => [container] }
    )
  },
}
</script>

<style lang="scss">
</style>
