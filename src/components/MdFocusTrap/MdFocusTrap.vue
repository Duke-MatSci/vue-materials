<script>
import { h } from "vue"

export default {
  name: "MdFocusTrap",
  abstract: true,
  methods: {
    setFocus() {
      window.setTimeout(() => {
        if (this.$el && this.$el.tagName) {
          this.$el.setAttribute("tabindex", "-1")
          this.$el.focus()
        }
      }, 20)
    },
  },
  mounted() {
    this.setFocus()
  },
  render() {
    try {
      const slotFn = this.$slots.default
      if (!slotFn) return null
      const nodes = slotFn()
      if (!nodes || nodes.length === 0) return null
      if (nodes.length > 1) throw new Error()
      return nodes[0]
    } catch (e) {
      console.warn(
        "MdFocusTrap can only render one, and exactly one child component.",
        this
      )
      return null
    }
  },
}
</script>

