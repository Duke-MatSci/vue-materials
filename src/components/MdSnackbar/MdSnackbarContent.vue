<script>
import { h, Transition } from "vue"

export default {
  name: "MdSnackbarContent",
  props: { mdClasses: Array },
  render() {
    const content = h("div", { class: "md-snackbar-content" }, this.$slots.default ? this.$slots.default() : [])
    const root = h("div", { class: ["md-snackbar", this.mdClasses] }, [content])
    return h(Transition, { name: "md-snackbar", appear: true }, { default: () => root })
  },
}
</script>

