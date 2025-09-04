<script>
import { h } from "vue"
import MdComponent from "@/core/MdComponent"
import MdAppMixin from "./MdAppMixin"

export default MdComponent({
  name: "MdAppInternalDrawer",
  mixins: [MdAppMixin],
  props: {
    toolbar: null,
    content: null,
    drawerLeft: null,
    drawerRight: null,
    drawerRightPrevious: null,
  },
  render() {
    const left = this.drawerLeft || []
    const rightPrev = this.drawerRightPrevious || []
    const right = this.drawerRight || []
    const toolbar = this.toolbar || []
    const content = this.content || []

    return h(
      "div",
      { class: ["md-app", "md-app-internal-drawer", "md-layout-column", this.appClasses, this.$mdActiveTheme] },
      [
        ...toolbar,
        h(
          "main",
          {
            class: ["md-app-container", "md-flex", "md-layout-row", this.$mdActiveTheme, this.scrollerClasses],
            style: [this.containerStyles, this.contentStyles],
          },
          [
            ...left,
            ...rightPrev,
            h(
              "div",
              { class: ["md-app-scroller", "md-layout-column", "md-flex", this.$mdActiveTheme, this.scrollerClasses] },
              content
            ),
            ...right,
          ]
        ),
      ]
    )
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-app-internal-drawer { flex-direction: column; .md-app-scroller { overflow: auto; } }
</style>
