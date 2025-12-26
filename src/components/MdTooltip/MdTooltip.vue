<script>
import { h, Transition } from "vue"
import MdComponent from "@/core/MdComponent"
import MdPropValidator from "@/core/utils/MdPropValidator"
import MdPopover from "@/components/MdPopover/MdPopover.vue"

export default MdComponent({
  name: "MdTooltip",
  components: { MdPopover },
  props: {
    mdActive: Boolean,
    mdDelay: { type: [String, Number], default: 0 },
    mdDirection: { type: String, default: "bottom", ...MdPropValidator("md-direction", ["top", "right", "bottom", "left"]) },
  },
  emits: ["update:mdActive"],
  data: () => ({ shouldRender: false, targetEl: null }),
  computed: {
    tooltipClasses() { return "md-tooltip-" + this.mdDirection },
    tooltipStyles() { return `transition-delay: ${this.mdDelay}ms` },
    popperSettings() {
      return { placement: this.mdDirection, modifiers: { offset: { offset: "0, 16" } } }
    },
  },
  watch: {
    mdActive() { this.shouldRender = this.mdActive },
    shouldRender(val) { this.$emit("update:mdActive", val) },
  },
  methods: {
    onAnchor(el) {
      // Prefer the immediate parent (original parent) as the positioning anchor,
      // but attach hover listeners to a hoverable element. Disabled buttons or
      // elements with pointer-events: none won’t receive mouse events, so fall
      // back to the parent node for listening in that case.
      this.targetEl = el
      const canHover = (node) => {
        if (!node) return false
        try {
          if (node.disabled) return false
          const style = window.getComputedStyle(node)
          return style.pointerEvents !== "none"
        } catch (e) {
          return true
        }
      }
      const listenerEl = canHover(this.targetEl)
        ? this.targetEl
        : (this.targetEl && this.targetEl.parentNode) || this.targetEl

      if (listenerEl) {
        listenerEl.addEventListener("mouseenter", this.show, false)
        listenerEl.addEventListener("mouseleave", this.hide, false)
        // Fallback for cases where pointer enters from siblings within same container
        listenerEl.addEventListener("mouseover", this.show, false)
        listenerEl.addEventListener("mouseout", this.hide, false)
        // Track for cleanup
        this.__mdTooltipListenerEl = listenerEl
      }
    },
    show() { this.shouldRender = true },
    hide() { this.shouldRender = false },
  },
  mounted() { this.shouldRender = this.mdActive },
  beforeUnmount() {
    const el = this.__mdTooltipListenerEl || this.targetEl
    if (el) {
      el.removeEventListener("mouseenter", this.show)
      el.removeEventListener("mouseleave", this.hide)
      el.removeEventListener("mouseover", this.show)
      el.removeEventListener("mouseout", this.hide)
    }
  },
  render() {
    const body = this.shouldRender
      ? h(
          Transition,
          { name: "md-tooltip" },
          {
            default: () => [
              h(
                "div",
                { class: ["md-tooltip", this.tooltipClasses, this.$mdActiveTheme], style: this.tooltipStyles },
                this.$slots.default ? this.$slots.default() : []
              ),
            ],
          }
        )
      : null

    return h(
      MdPopover,
      { ...this.$attrs, mdSettings: this.popperSettings, mdActive: this.shouldRender, onMdAnchor: this.onAnchor },
      { default: () => [body] }
    )
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdLayout/mixins";

$md-tooltip-height: 22px;
$md-tooltip-height-mobile: 32px;

.md-tooltip {
  height: $md-tooltip-height;
  padding: 0 8px;
  position: fixed;
  z-index: 111;
  pointer-events: none;
  border-radius: 2px;
  transition: .15s $md-transition-enter-timing;
  transition-property: opacity, transform;
  will-change: opacity, transform, top, left !important;
  font-size: 10px;
  line-height: $md-tooltip-height;
  text-transform: none;
  white-space: nowrap;

  @include md-layout-small {
    height: $md-tooltip-height-mobile;
    font-size: 14px;
    line-height: $md-tooltip-height-mobile;
  }

  &.md-tooltip-leave-active { transition-timing-function: $md-transition-leave-timing; }

  &.md-tooltip-enter,
  &.md-tooltip-leave-active {
    opacity: 0;

    &.md-tooltip-top { transform: translate3d(0, 4px, 0) scale(.95); }
    &.md-tooltip-right { transform: translate3d(-4px, 0, 0) scale(.95); }
    &.md-tooltip-bottom { transform: translate3d(0, -4px, 0) scale(.95); }
    &.md-tooltip-left { transform: translate3d(4px, 0, 0) scale(.95); }
  }

  // Fallback theme (matches Vue 2 default variables)
  // Applied when prebuilt theme CSS doesn’t include tooltip rules
  background-color: rgba(#616161, 0.9);
  color: #fff;
}
</style>
