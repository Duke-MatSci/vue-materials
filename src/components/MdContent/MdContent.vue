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
    return h(
      this.mdTag,
      {
        class: ["md-content", this.$mdActiveTheme],
        ...this.$attrs,
      },
      this.$slots.default ? this.$slots.default() : []
    )
  },
})
</script>

