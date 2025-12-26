import { h, cloneVNode } from "vue"
import MdTable from "./MdTable.vue"

const SLOT_COMPONENT_MAP = {
  MdTableToolbar: "md-table-toolbar",
  MdTableEmptyState: "md-table-empty-state",
  MdTablePagination: "md-table-pagination",
}

export default {
  name: "MdTableContainer",
  inheritAttrs: false,
  props: MdTable.props,
  render() {
    const slotNodes = this.$slots.default ? this.$slots.default() : []
    const namedSlots = { ...this.$slots }
    const contentNodes = []

    slotNodes.forEach((node) => {
      if (!node || typeof node !== "object") {
        contentNodes.push(node)
        return
      }

      const compName = node.type && node.type.name
      const slotName = SLOT_COMPONENT_MAP[compName]

      if (slotName) {
        namedSlots[slotName] = () => [cloneVNode(node, {}, true)]
      } else {
        contentNodes.push(node)
      }
    })

    namedSlots.default = () => contentNodes

    return h(MdTable, { ...this.$attrs, ...this.$props }, namedSlots)
  },
}
