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
    const raw = this.$attrs || {}
    const {
      ref: _ref_omit,
      ref_for: _rf,
      ref_key: _rk,
      class: externalClass,
      style: externalStyle,
      ...attrs
    } = raw
    const slots = this.$slots.default ? { default: () => this.$slots.default() } : undefined
    return h(
      this.mdTag,
      {
        ...attrs,
        class: [externalClass, "md-content", this.$mdActiveTheme],
        style: externalStyle,
      },
      slots
    )
  },
})
</script>
