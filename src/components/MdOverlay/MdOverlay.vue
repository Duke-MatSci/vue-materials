<script>
import { h, Transition } from "vue"
import MdPortal from "@/components/MdPortal/MdPortal.vue"

export default {
  name: "MdOverlay",
  inheritAttrs: false,
  components: { MdPortal },
  props: {
    mdActive: Boolean,
    mdAttachToParent: Boolean,
    mdFixed: Boolean,
  },
  emits: ["click"],
  computed: {
    overlayClasses() {
      return { "md-fixed": this.mdFixed }
    },
  },
  render() {
    // Keep MdPortal mounted at all times; toggle child content inside Transition
    const child = h(
      Transition,
      { name: "md-overlay" },
      {
        default: () => (
          this.mdActive
            ? h(
                "div",
                {
                  class: ["md-overlay", this.overlayClasses],
                  onClick: (e) => this.$emit && this.$emit("click", e),
                },
                []
              )
            : null
        ),
      }
    )

    return h(
      MdPortal,
      { mdAttachToParent: this.mdAttachToParent },
      { default: () => [child] }
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
  background: rgba(#000, 0.6);
  transition: 0.35s $md-transition-default-timing;
  transition-property: opacity;
  will-change: opacity;

  body > &,
  &.md-fixed {
    position: fixed;
  }
}

.md-overlay-enter,
.md-overlay-leave-active {
  opacity: 0;
}
</style>
