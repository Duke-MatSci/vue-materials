<script>
import { h, nextTick } from "vue"
import Popper from "popper.js"
import deepmerge from "deepmerge"
import MdPortal from "@/components/MdPortal/MdPortal.vue"

export default {
  name: "MdPopover",
  inheritAttrs: false,
  emits: ["md-active", "md-anchor", "md-destroy"],
  props: {
    mdActive: Boolean,
    mdSettings: { type: Object, default: () => ({}) },
    mdAttachToParent: Boolean,
    mdTarget: { type: null },
  },
  data: () => ({
    popperInstance: null,
    anchorEl: null,
    originalParentEl: null,
    popEl: null,
    shouldRender: false,
    shouldActivate: false,
    toEl: null,
  }),
  computed: {
    popoverClasses() {
      if (this.shouldActivate) return "md-active"
      if (this.shouldRender) return "md-rendering"
      return ""
    },
  },
  watch: {
    mdActive: {
      immediate: true,
      handler(shouldRender) {
        this.shouldRender = shouldRender
        if (shouldRender) this.bindPopper()
        else this.shouldActivate = false
      },
    },
    mdSettings: {
      deep: true,
      handler() {
        if (this.popperInstance) this.createPopper()
      },
    },
  },
  methods: {
    getPopperOptions() {
      return {
        placement: "bottom",
        modifiers: {
          preventOverflow: { boundariesElement: "viewport", padding: 16 },
          computeStyle: { gpuAcceleration: false },
        },
        onCreate: () => {
          this.shouldActivate = true
          this.$emit("md-active")
        },
      }
    },
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
    killPopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
    },
    bindPopper() {
      nextTick(() => {
        if (!this.originalParentEl && this.anchorEl) {
          this.originalParentEl = this.anchorEl.parentNode || null
          this.$emit("md-anchor", this.originalParentEl)
        }
        this.updateTarget()
        if (this.originalParentEl) this.createPopper()
      })
    },
    createPopper() {
      const options = deepmerge(this.getPopperOptions(), this.mdSettings || {})
      if (this.popEl && this.originalParentEl) {
        this.killPopper()
        this.popperInstance = new Popper(this.originalParentEl, this.popEl, options)
      }
    },
    resetPopper() {
      if (this.popperInstance) {
        this.killPopper()
        this.createPopper()
      }
    },
    handleAnchorMount(vnode) {
      this.anchorEl = vnode && vnode.el ? vnode.el : null
      if (!this.originalParentEl && this.anchorEl) {
        this.originalParentEl = this.anchorEl.parentNode || null
        this.$emit("md-anchor", this.originalParentEl)
      }
      this.updateTarget()
      if (this.shouldRender && this.originalParentEl) this.createPopper()
    },
    handleAnchorUnmount() {
      this.anchorEl = null
      this.originalParentEl = null
      this.toEl = null
      this.killPopper()
      this.$emit("md-destroy")
    },
    handlePopElMount(vnode) {
      this.popEl = vnode && vnode.el ? vnode.el : null
      if (this.popEl && this.shouldRender && this.originalParentEl) this.createPopper()
    },
    handlePopElUnmount() {
      this.popEl = null
      this.killPopper()
    },
  },
  mounted() {
    this.updateTarget()
    this.resetPopper()
  },
  beforeUnmount() {
    this.killPopper()
    this.$emit("md-destroy")
  },
  render() {
    const body = this.shouldRender
      ? h(
          "div",
          {
            class: ["md-popover", this.popoverClasses],
            onVnodeMounted: this.handlePopElMount,
            onVnodeUnmounted: this.handlePopElUnmount,
          },
          this.$slots.default ? this.$slots.default() : []
        )
      : null

    // Anchor element as wrapper; portal teleports body to computed target
    const portal = h(
      MdPortal,
      { mdTarget: this.toEl },
      { default: () => (body ? [body] : []) }
    )

    return h(
      "span",
      { style: { display: "contents" }, onVnodeMounted: this.handleAnchorMount, onVnodeUnmounted: this.handleAnchorUnmount },
      [portal]
    )
  },
}
</script>

<style lang="scss">
.md-popover.md-rendering {
  opacity: 0;
  transition: none !important;
}
</style>
