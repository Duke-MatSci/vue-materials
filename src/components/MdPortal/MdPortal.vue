<script>
import { h, Teleport, nextTick } from "vue"

export default {
  name: "MdPortal",
  inheritAttrs: false,
  emits: ["md-initial-parent", "md-destroy"],
  props: {
    mdAttachToParent: Boolean,
    mdTarget: {
      type: null,
      validator(value) {
        if (
          typeof HTMLElement !== "undefined" &&
          value &&
          value instanceof HTMLElement
        ) {
          return true
        }
        if (value == null) return true
        console.warn(
          "The mdTarget prop is invalid. You should pass a valid HTMLElement."
        )
        return false
      },
    },
  },
  data() {
    return { toEl: null, anchorEl: null, originalParentEl: null }
  },
  watch: {
    mdTarget() {
      this.updateTarget()
    },
    mdAttachToParent() {
      this.updateTarget()
    },
  },
  mounted() {
    // anchorEl is the component container; use its parent as original
    this.originalParentEl = this.$el ? this.$el.parentNode : null
    if (this.originalParentEl) this.$emit("md-initial-parent", this.originalParentEl)
    this.anchorEl = this.$el || null
    this.updateTarget()
  },
  beforeUnmount() { this.$emit("md-destroy") },
  methods: {
    updateTarget() {
      const anchor = this.anchorEl
      if (this.mdAttachToParent) {
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
    let to = null
    if (typeof document !== 'undefined') {
      const candidate = this.toEl || document.body
      to = candidate && document.contains(candidate) ? candidate : 'body'
    }

    // Create teleport content dynamically - do NOT hoist vnodes by calling slots outside render
    const getTeleportContent = () => {
      if (!this.$slots.default) return []
      const children = this.$slots.default()
      const hasValidChildren = children && children.length > 0 && children.some((c) => c != null)
      return hasValidChildren ? [children[0]] : []
    }

    // Wrap in a display: contents anchor to compute parent when mdAttachToParent=true
    const teleported = to ? h(Teleport, { to }, getTeleportContent()) : (getTeleportContent()[0] || null)
    return h("span", { style: { display: "contents" } }, teleported ? [teleported] : [])
  },
}
</script>
