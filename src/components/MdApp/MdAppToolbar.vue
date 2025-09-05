<script>
import { h } from "vue"
import MdToolbar from "@/components/MdToolbar/MdToolbar.vue"

export default {
  name: "MdAppToolbar",
  inject: ["MdApp"],
  computed: {
    toolbarClasses() {
      return {
        "md-no-elevation": !this.MdApp.toolbar.hasElevation,
        "md-reveal-active": this.MdApp.toolbar.revealActive,
        "md-fixed-last-active": this.MdApp.toolbar.fixedLastActive,
        "md-overlap-off": this.MdApp.toolbar.overlapOff,
      }
    },
    toolbarStyles() {
      const styles = { top: `${this.MdApp.toolbar.top}px` }
      if (this.MdApp.toolbar.fixedLastActive) styles.transform = `translate3D(0, ${this.MdApp.toolbar.fixedLastHeight}px, 0)`
      return styles
    },
  },
  mounted() {
    const title = this.$el.querySelector(".md-title, .md-display-1, .md-display-2")
    this.MdApp.toolbar.element = this.$el
    this.MdApp.toolbar.titleElement = title
    if (title) this.MdApp.toolbar.titleSize = parseInt(window.getComputedStyle(title).fontSize, 10)
  },
  render() {
    const { class: attrsClass, style: attrsStyle, ...rest } = this.$attrs || {}
    const klass = ["md-app-toolbar", this.toolbarClasses, attrsClass]
    const style = [this.toolbarStyles, attrsStyle]

    return h(
      MdToolbar,
      { ...rest, class: klass, style },
      this.$slots.default ? this.$slots.default() : []
    )
  },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-no-elevation { box-shadow: none !important; }
.md-reveal .md-reveal-active, .md-fixed-last .md-reveal-active, .md-flexible .md-reveal-active, .md-overlap .md-reveal-active { transform: translate3d(0, calc(100% + 10px), 0); transition: .3s $md-transition-stand-timing; transition-property: box-shadow, transform; will-change: height, box-shadow, transform; }
.md-app-toolbar { min-height: 64px; }
.md-overlap .md-app-toolbar { height: 196px; }
.md-fixed-last-active { transition: .3s $md-transition-stand-timing; transition-property: box-shadow, transform; will-change: height, box-shadow, transform; }
.md-overlap-off { z-index: 3 !important; }
</style>
