<script>
import { h, Teleport } from "vue"
import MdPortal from "@/components/MdPortal/MdPortal.vue"

export default {
  name: "MdMenu",
  inheritAttrs: false,
  props: {
    mdActive: Boolean,
    mdClass: String,
    mdTarget: null, // HTMLElement anchor; optional
  },
  computed: {
    menuStyles() {
      const el = this.mdTarget
      if (!el || typeof window === "undefined") return {}
      try {
        const rect = el.getBoundingClientRect()
        const top = rect.bottom + window.scrollY
        const left = rect.left + window.scrollX
        const width = rect.width
        return { position: "absolute", top: `${top}px`, left: `${left}px`, minWidth: `${width}px` }
      } catch (e) {
        return {}
      }
    },
  },
  render() {
    const body = this.mdActive
      ? h(
          "div",
          {
            class: ["md-menu-content", this.mdClass],
            style: this.menuStyles,
            onClick: (e) => e.stopPropagation(),
          },
          this.$slots.default ? this.$slots.default() : []
        )
      : null

    // Teleport via MdPortal to body while preserving existing portal behavior
    return h(MdPortal, null, { default: () => (body ? [body] : []) })
  },
}
</script>

<style lang="scss">
/* Minimal: rely on existing prebuilt CSS for .md-menu-content positioning/look */
</style>

