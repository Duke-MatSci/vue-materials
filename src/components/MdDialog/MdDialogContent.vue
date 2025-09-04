<script>
import { h } from "vue"
import MdComponent from "@/core/MdComponent"

export default MdComponent({
  name: "MdDialogContent",
  render() {
    return h("div", { class: ["md-dialog-content", this.$mdActiveTheme] }, this.$slots.default ? this.$slots.default() : [])
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-dialog-content { padding: 0 24px 24px; flex:1; flex-basis:auto; overflow:auto; position:relative; }
.md-dialog-content:first-child { padding-top:24px; }
.md-dialog-content p:first-child:not(:only-child) { margin-top:0; }
.md-dialog-content p:last-child:not(:only-child) { margin-bottom:0; }
</style>

