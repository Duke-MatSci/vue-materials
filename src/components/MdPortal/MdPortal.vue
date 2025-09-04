<script>
import { h, Teleport } from "vue"

export default {
  name: "MdPortal",
  inheritAttrs: false,
  props: {
    mdAttachToParent: Boolean,
    mdTarget: {
      type: null,
      validator(value) {
        if (typeof HTMLElement !== "undefined" && value && value instanceof HTMLElement) {
          return true
        }
        if (value == null) return true
        console.warn("The md-target-el prop is invalid. You should pass a valid HTMLElement.")
        return false
      },
    },
  },
  data() {
    return { toEl: null, anchorEl: null }
  },
  mounted() {
    // Mirror old behavior: attach to parent’s parent when requested, else to target or body
    // In Vue 3, a component that renders only a Teleport still has an anchor comment node in DOM
    this.anchorEl = this.$el || null
    this.updateTarget()
  },
  watch: {
    mdTarget() { this.updateTarget() },
    mdAttachToParent() { this.updateTarget() },
  },
  methods: {
    updateTarget() {
      // Use the component's anchor position in the DOM to compute relative targets
      const anchor = this.anchorEl
      if (this.mdAttachToParent) {
        // Move one level up from where this portal is anchored (parent of the container where Portal sits)
        this.toEl = anchor && anchor.parentNode && anchor.parentNode.parentNode
          ? anchor.parentNode.parentNode
          : (typeof document !== 'undefined' ? document.body : null)
      } else if (this.mdTarget) {
        this.toEl = this.mdTarget
      } else {
        this.toEl = typeof document !== "undefined" ? document.body : null
      }
    },
  },
  render() {
    const children = this.$slots.default ? this.$slots.default() : []
    // If there is no target (SSR), render inline fallback
    return this.toEl ? h(Teleport, { to: this.toEl }, children) : (children[0] || null)
  },
}
</script>
