<script>
import { h } from "vue"

export default {
  name: "MdTagSwitcher",
  inheritAttrs: false,
  props: {
    mdTag: { type: String, default: "div" },
  },
  render() {
    // Forward attrs and slots to the chosen tag
    const tag = this.mdTag || "div"
    const slots = this.$slots
    const { ref: _r, ...attrs } = this.$attrs || {}
    return h(tag, attrs, slots.default ? slots.default() : [])
  },
}
</script>
