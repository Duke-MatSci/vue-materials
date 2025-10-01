<script>
import { h } from "vue"
import MdCard from "@/components/MdCard/MdCard.vue"
import MdContent from "@/components/MdContent/MdContent.vue"

const componentMap = {
  "md-card": MdCard,
  "md-content": MdContent,
}

export default {
  name: "MdTagSwitcher",
  inheritAttrs: false,
  props: {
    mdTag: { type: String, default: "div" },
  },
  render() {
    // Forward attrs and slots to the chosen tag
    const mapped = componentMap[this.mdTag]
    const component = mapped || this.mdTag || "div"
    const slots = this.$slots
    const raw = this.$attrs || {}
    // Handle ref properly - extract ref and forward others
    const { ref, ref_for: _rf, ref_key: _rk, ...attrs } = raw
    const slotObj = slots.default ? { default: slots.default } : undefined

    // Create props object, adding ref if it exists
    const props = ref ? { ...attrs, ref } : attrs

    return h(component, props, slotObj)
  },
}
</script>
