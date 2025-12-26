<script>
import { h } from "vue"
export default {
  name: "MdDialogTitle",
  render() {
    return h("span", { class: "md-dialog-title md-title" }, this.$slots.default ? this.$slots.default() : [])
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-dialog-title {
  margin-bottom: 20px;
  padding: 24px 24px 0;
}
</style>

