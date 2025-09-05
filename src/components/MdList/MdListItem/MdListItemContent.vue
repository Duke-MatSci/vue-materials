<script>
import { h } from "vue"
import MdRipple from "@/components/MdRipple/MdRipple.vue"

export default {
  name: "MdListItemContent",
  components: { MdRipple },
  props: { mdDisabled: Boolean },
  render() {
    return h(
      MdRipple,
      { class: "md-list-item-content", mdDisabled: this.mdDisabled },
      this.$slots.default ? { default: () => this.$slots.default() } : undefined
    )
  },
}
</script>
