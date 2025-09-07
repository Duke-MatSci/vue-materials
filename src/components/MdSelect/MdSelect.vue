<script>
import { h } from "vue"
import MdMenu from "@/components/MdMenu/MdMenu.vue"

export default {
  name: "MdSelect",
  inheritAttrs: false,
  props: {
    modelValue: null,
    mdDense: Boolean,
    mdClass: String, // forwarded to MdMenu for class hooks like 'md-pagination-select'
  },
  emits: ["update:modelValue", "changed"],
  data() {
    return {
      open: false,
      anchorEl: null,
      currentValue: this.modelValue,
    }
  },
  watch: {
    modelValue(val) {
      this.currentValue = val
    },
  },
  methods: {
    onSelect(val) {
      this.currentValue = val
      this.$emit("update:modelValue", val)
      this.$emit("changed", val)
      this.open = false
    },
  },
  provide() {
    return { mdSelectOnSelect: (val) => this.onSelect(val) }
  },
  render() {
    const attrs = this.$attrs || {}
    const valueText = this.currentValue != null ? String(this.currentValue) : ""

    const root = h(
      "div",
      {
        ...attrs,
        class: [attrs.class, "md-select", { "md-dense": this.mdDense }],
        onVnodeMounted: (v) => (this.anchorEl = v && v.el),
        onVnodeUnmounted: () => (this.anchorEl = null),
        onClick: (e) => {
          e.stopPropagation()
          this.open = !this.open
        },
      },
      [h("div", { class: "md-select-value" }, valueText)]
    )

    const menu = h(
      MdMenu,
      { mdActive: this.open, mdClass: this.mdClass, mdTarget: this.anchorEl },
      { default: () => (this.$slots.default ? this.$slots.default() : []) }
    )

    return h("div", { class: "md-select-container" }, [root, menu])
  },
}
</script>

<style lang="scss">
/* Minimal hooks for layout; rely on theme CSS */
.md-select-container { position: relative; display: inline-block; }
.md-select { cursor: pointer; }
.md-select-value { font-size: 13px; }
</style>
