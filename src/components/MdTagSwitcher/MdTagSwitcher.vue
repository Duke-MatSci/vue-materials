<script>
import { h, resolveDynamicComponent } from "vue"
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
    const component = mapped || resolveDynamicComponent(this.mdTag || "div")
    const slots = this.$slots
    const raw = this.$attrs || {}
    // Strip any ref-like internals from forwarded attrs
    const { ref: _ref_omit, ref_for: _rf, ref_key: _rk, ...attrs } = raw
    const slotObj = slots.default ? { default: () => slots.default() } : undefined
    return h(component, attrs, slotObj)
  },
}
</script>
