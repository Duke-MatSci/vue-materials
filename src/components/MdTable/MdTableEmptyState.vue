<script>
import { h } from "vue"
import MdEmptyState from "@/components/MdEmptyState/MdEmptyState.vue"
import MdEmptyStateProps from "@/components/MdEmptyState/MdEmptyStateProps.js"

export default {
  name: "MdTableEmptyState",
  props: MdEmptyStateProps,
  inject: ["MdTable"],
  render() {
    const slot = this.$slots.default ? this.$slots.default() : []
    return h(
      MdEmptyState,
      { ...this.$props, class: ["md-table-empty-state"] },
      { default: () => slot }
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table-empty-state {
  padding-left: 24px;
}
</style>
