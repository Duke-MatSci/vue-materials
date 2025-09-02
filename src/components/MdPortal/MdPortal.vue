<script>
import { h, Teleport, nextTick } from "vue"

export default {
  name: "MdPortal",
  props: {
    mdAttachToParent: Boolean,
    mdTarget: {
      type: null,
      validator(value) {
        if (typeof HTMLElement !== "undefined" && value && value instanceof HTMLElement) {
          return true
        }
        console.warn("The md-target-el prop is invalid. You should pass a valid HTMLElement.")
        return false
      },
    },
  },
  emits: ["md-destroy", "md-initial-parent"],
  data() {
    return {
      toEl: null,
      initialParent: null,
    }
  },
  mounted() {
    // Parent element of this component in the DOM tree
    const parentEl = this.$.parent && this.$.parent.vnode ? this.$.parent.vnode.el : null
    this.initialParent = parentEl || null
    this.$emit("md-initial-parent", this.initialParent)
    this.updateTarget()
  },
  beforeUnmount() {
    this.$emit("md-destroy")
  },
  watch: {
    mdTarget() {
      this.updateTarget()
    },
    mdAttachToParent() {
      this.updateTarget()
    },
  },
  methods: {
    computeTarget() {
      if (this.mdAttachToParent) {
        const parentEl = this.$.parent && this.$.parent.vnode ? this.$.parent.vnode.el : null
        return parentEl && parentEl.parentNode ? parentEl.parentNode : null
      }
      if (this.mdTarget) return this.mdTarget
      if (typeof document !== "undefined") return document.body
      return null
    },
    updateTarget() {
      this.toEl = this.computeTarget()
      nextTick()
    },
  },
  render() {
    const children = this.$slots.default ? this.$slots.default() : []
    const to = this.toEl || (typeof document !== "undefined" ? document.body : null)
    return to ? h(Teleport, { to }, children) : (children[0] || null)
  },
}
</script>
