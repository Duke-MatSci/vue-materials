<script>
import { h } from "vue"
import MdTableHead from "./MdTableHead.vue"
import MdTableHeadSelection from "./MdTableHeadSelection.vue"

export default {
  name: "MdTableThead",
  inject: ["MdTable"],
  render() {
    const items = this.MdTable.items || {}
    const headNodes = [h(MdTableHeadSelection)]

    Object.keys(items)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((key) => {
      const item = items[key]
      if (!item) return
      headNodes.push(h(MdTableHead, { key, ...item }))
    })

    return h("thead", [h("tr", headNodes)])
  },
}
</script>
