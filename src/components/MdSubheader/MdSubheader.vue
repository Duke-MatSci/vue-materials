<script>
import { h } from "vue"

export default {
  name: "MdSubheader",
  inheritAttrs: false,
  render() {
    return h(
      "div",
      {
        class: "md-subheader",
        ...this.$attrs,
      },
      this.$slots.default ? this.$slots.default() : []
    )
  },
}
</script>

<style lang="scss">
.md-subheader {
  min-height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  font-size: 14px;
  font-weight: 500;
}
</style>