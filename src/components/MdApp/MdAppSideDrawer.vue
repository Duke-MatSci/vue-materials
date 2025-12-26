<script>
import { h } from "vue"
import MdComponent from "@/core/MdComponent"
import MdAppMixin from "./MdAppMixin"

export default MdComponent({
  name: "MdAppSideDrawer",
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
      { class: ["md-app", "md-app-side-drawer", "md-layout-row", this.appClasses, this.$mdActiveTheme] },
      [
        ...left,
        ...rightPrev,
        h(
          "main",
          {
            class: ["md-app-container", "md-flex", "md-layout-column", this.$mdActiveTheme, this.scrollerClasses],
            style: this.contentStyles,
            onScrollPassive: this.handleScroll,
          },
          [
            ...toolbar,
            h(
              "div",
              {
                class: ["md-app-scroller", "md-layout-column", "md-flex", this.$mdActiveTheme, this.scrollerClasses],
                style: this.containerStyles,
                onScrollPassive: this.handleScroll,
              },
              content
            ),
          ]
        ),
        ...right,
      ]
    )
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-app-side-drawer { .md-app-container { flex-direction: column; } }
</style>
