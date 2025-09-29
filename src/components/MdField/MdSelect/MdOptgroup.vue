<script>
import { h } from "vue"

export default {
  name: "MdOptgroup",
  inheritAttrs: false,
  props: {
    label: String,
    disabled: Boolean,
  },
  provide() {
    return {
      MdOptgroup: {
        disabled: this.disabled,
      },
    }
  },
  render() {
    const children = []
    if (this.label) {
      children.push(h("md-subheader", null, this.label))
    }
    if (this.$slots.default) {
      children.push(...this.$slots.default())
    }

    return h("div", { class: "md-optgroup" }, children)
  },
}
</script>

<style lang="scss">
.md-optgroup {
  .md-subheader {
    text-transform: uppercase;
  }

  .md-ripple.md-list-item-content {
    padding-left: 24px;
  }
}
</style>

