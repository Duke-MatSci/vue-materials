<script>
import { h } from "vue"
export default {
  name: "MdDialogActions",
  render() {
    return h("div", { class: "md-dialog-actions" }, this.$slots.default ? this.$slots.default() : [])
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-dialog-actions { min-height:52px; padding:8px 8px 8px 24px; display:flex; align-items:center; justify-content:flex-end; position:relative; }
.md-dialog-actions:before { height:1px; position:absolute; top:-1px; right:0; left:0; content:" "; }
.md-dialog-actions .md-button { min-width:64px; margin:0; }
.md-dialog-actions .md-button + .md-button { margin-left:8px; }
</style>

