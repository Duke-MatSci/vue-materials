<script>
import { h } from "vue"
import MdToolbar from "@/components/MdToolbar/MdToolbar.vue"

export default {
  name: "MdTableToolbar",
  inject: ["MdTable"],
  render() {
    const slot = this.$slots.default ? this.$slots.default() : []
    return h(
      MdToolbar,
      { class: ["md-table-toolbar", "md-transparent"], mdElevation: 0 },
      { default: () => slot }
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table-toolbar {
  padding-left: 24px;

  .md-title {
    flex: 1;
    font-size: 20px;
  }
}
</style>
