<script>
import { h, cloneVNode } from "vue"

export default {
  name: "MdTableRowGhost",
  props: {
    mdIndex: [String, Number],
    mdId: [String, Number],
    mdItem: [Array, Object],
  },
  render() {
    if (!this.$slots.default) {
      return null
    }
    const vnodes = this.$slots.default()
    if (!vnodes || !vnodes.length) {
      return null
    }
    const vnode = vnodes[0]
    return cloneVNode(
      vnode,
      {
        mdIndex: this.mdIndex,
        mdId: this.mdId,
        mdItem: this.mdItem,
      },
      true
    )
  },
}
</script>
