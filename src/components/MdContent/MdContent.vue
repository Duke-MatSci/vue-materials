<script>
import MdComponent from "@/core/MdComponent"
import { h } from "vue"

export default MdComponent({
  name: "MdContent",
  props: {
    mdTag: {
      type: String,
      default: "div",
    },
  },
  render() {
    const { ref: _r, ...attrs } = this.$attrs || {}
    return h(this.mdTag, { class: ["md-content", this.$mdActiveTheme], ...attrs }, this.$slots.default ? this.$slots.default() : [])
  },
})
</script>
